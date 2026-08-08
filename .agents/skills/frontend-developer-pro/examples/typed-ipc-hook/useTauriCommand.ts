import { useState, useCallback } from 'react';

// Fallback invoke mock if Tauri runtime is not active in browser environment
const invoke = async <T>(cmd: string, args?: Record<string, unknown>): Promise<T> => {
  if (typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window) {
    const { invoke: tauriInvoke } = await import('@tauri-apps/api/core');
    return tauriInvoke<T>(cmd, args);
  }
  throw new Error(`Tauri core API not available for command '${cmd}' in web preview mode.`);
};

export interface UseTauriCommandState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useTauriCommand<TPayload, TResult>(cmd: string) {
  const [state, setState] = useState<UseTauriCommandState<TResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (args?: TPayload): Promise<TResult | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const result = await invoke<TResult>(cmd, args as Record<string, unknown>);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setState({ data: null, loading: false, error: errorMessage });
        return null;
      }
    },
    [cmd]
  );

  return { ...state, execute };
}
