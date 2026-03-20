import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@hooks/useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));
    expect(result.current).toBe('hello');
  });

  it('does not update before the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );
    rerender({ value: 'updated', delay: 300 });
    expect(result.current).toBe('initial');
  });

  it('updates after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );
    rerender({ value: 'updated', delay: 300 });
    act(() => { jest.advanceTimersByTime(300); });
    expect(result.current).toBe('updated');
  });

  it('resets timer on rapid updates', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'a', delay: 300 } }
    );
    rerender({ value: 'b', delay: 300 });
    act(() => { jest.advanceTimersByTime(100); });
    rerender({ value: 'c', delay: 300 });
    act(() => { jest.advanceTimersByTime(100); });
    expect(result.current).toBe('a');
    act(() => { jest.advanceTimersByTime(300); });
    expect(result.current).toBe('c');
  });
});
