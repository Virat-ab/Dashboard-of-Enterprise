import type { WSMessage, WSEventType } from '@types/api.types';

type Listener<T = unknown> = (payload: T) => void;

export class WebSocketService {
  private ws: WebSocket | null = null;
  private url: string;
  private listeners = new Map<WSEventType, Set<Listener>>();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectDelay = 1000;
  private maxReconnectDelay = 30_000;
  private isManualClose = false;
  private mockInterval: ReturnType<typeof setInterval> | null = null;
  public isConnected = false;

  constructor(url: string) {
    this.url = url;
  }

  connect(): void {
    if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
      this.startMockMode();
      return;
    }
    this.isManualClose = false;
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      this.isConnected = true;
      this.reconnectDelay = 1000;
      this.emit('system_alert', { message: 'Connected to real-time feed' });
    };
    this.ws.onmessage = (event) => {
      try {
        const msg: WSMessage = JSON.parse(event.data as string);
        this.emit(msg.type, msg.payload);
      } catch { /* ignore malformed */ }
    };
    this.ws.onclose = () => {
      this.isConnected = false;
      if (!this.isManualClose) this.scheduleReconnect();
    };
    this.ws.onerror = () => { this.ws?.close(); };
  }

  private scheduleReconnect(): void {
    this.reconnectTimer = setTimeout(() => {
      this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.maxReconnectDelay);
      this.connect();
    }, this.reconnectDelay);
  }

  private startMockMode(): void {
    this.isConnected = true;
    const { generateMockStats, generateMockNotifications, rand } = require('@utils/mockDataGenerator');
    this.mockInterval = setInterval(() => {
      // Push metric update every 3s
      const stats = generateMockStats('24h');
      this.emit('metrics_update', { metrics: stats.metrics });

      if (Math.random() > 0.85) {
        const [notif] = generateMockNotifications(1);
        this.emit('notification', notif);
      }
    }, 3000);
  }

  on<T>(event: WSEventType, listener: Listener<T>): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(listener as Listener);
    return () => this.listeners.get(event)?.delete(listener as Listener);
  }

  private emit(event: WSEventType, payload: unknown): void {
    this.listeners.get(event)?.forEach((l) => l(payload));
  }

  send(type: WSEventType, payload: unknown): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload, timestamp: new Date().toISOString() }));
    }
  }

  disconnect(): void {
    this.isManualClose = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    if (this.mockInterval) clearInterval(this.mockInterval);
    this.ws?.close();
    this.isConnected = false;
  }
}

export const wsService = new WebSocketService(
  import.meta.env.VITE_WS_URL ?? 'wss://ws.enterprise-demo.com'
);
