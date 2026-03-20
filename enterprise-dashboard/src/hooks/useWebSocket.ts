import { useEffect, useRef, useCallback } from 'react';
import { wsService } from '@services/websocket/WebSocketService';
import type { WSEventType } from '@types/api.types';

export function useWebSocket<T>(
  event: WSEventType,
  handler: (payload: T) => void,
  enabled = true
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) return;
    const unsubscribe = wsService.on<T>(event, (payload) => handlerRef.current(payload));
    return unsubscribe;
  }, [event, enabled]);
}

export function useWebSocketConnection() {
  const connectRef = useRef(false);

  useEffect(() => {
    if (!connectRef.current) {
      wsService.connect();
      connectRef.current = true;
    }
    return () => {
      wsService.disconnect();
      connectRef.current = false;
    };
  }, []);

  const send = useCallback((type: WSEventType, payload: unknown) => {
    wsService.send(type, payload);
  }, []);

  return { send, isConnected: wsService.isConnected };
}
