import { describe, it, expect, vi, beforeEach } from 'vitest';
import { invoke } from '@tauri-apps/api/core';

vi.mock('@tauri-apps/api/core', () => ({
  invoke: vi.fn(),
}));

async function getAppStatus(): Promise<{ status: string; uptime: number }> {
  return await invoke<{ status: string; uptime: number }>('get_app_status');
}

describe('Tauri IPC Invoke Wrapper Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should invoke get_app_status command and return typed response', async () => {
    const mockResponse = { status: 'healthy', uptime: 3600 };
    vi.mocked(invoke).mockResolvedValueOnce(mockResponse);

    const result = await getAppStatus();

    expect(invoke).toHaveBeenCalledWith('get_app_status');
    expect(result).toEqual(mockResponse);
    expect(result.status).toBe('healthy');
  });

  it('should propagate IPC error on command rejection', async () => {
    vi.mocked(invoke).mockRejectedValueOnce(new Error('Internal Tauri IPC error'));

    await expect(getAppStatus()).rejects.toThrow('Internal Tauri IPC error');
  });
});
