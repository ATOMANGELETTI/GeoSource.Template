import { describe, expect, it } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Security & CSP Audit', () => {
  const projectRoot = path.resolve(__dirname, '../../../');
  const tauriConfigPath = path.join(projectRoot, 'src-tauri/tauri.conf.json');
  const capabilityPath = path.join(projectRoot, 'src-tauri/capabilities/default.json');

  it('verifies tauri.conf.json exists and contains a non-null CSP policy', () => {
    expect(fs.existsSync(tauriConfigPath)).toBe(true);
    const content = fs.readFileSync(tauriConfigPath, 'utf-8');
    const tauriConfig = JSON.parse(content);

    expect(tauriConfig.app).toBeDefined();
    expect(tauriConfig.app.security).toBeDefined();
    expect(tauriConfig.app.security.csp).not.toBeNull();
    expect(typeof tauriConfig.app.security.csp).toBe('string');
    expect(tauriConfig.app.security.csp.length).toBeGreaterThan(0);
  });

  it('enforces mandatory CSP directives for Tauri v2 security', () => {
    const content = fs.readFileSync(tauriConfigPath, 'utf-8');
    const tauriConfig = JSON.parse(content);
    const csp: string = tauriConfig.app.security.csp;

    // Check default-src restricts to self and ipc protocol
    expect(csp).toContain("default-src 'self' ipc:");

    // Check script-src restricts script execution to 'self'
    expect(csp).toContain("script-src 'self'");

    // Check connect-src permits Tauri IPC communication
    expect(csp).toContain('connect-src');
    expect(csp).toContain('ipc:');
  });

  it('audits capability default.json for zero wildcard dangerous permissions', () => {
    expect(fs.existsSync(capabilityPath)).toBe(true);
    const content = fs.readFileSync(capabilityPath, 'utf-8');
    const cap = JSON.parse(content);

    expect(Array.isArray(cap.permissions)).toBe(true);

    // Ensure dangerous wildcard scope permissions are forbidden
    const forbiddenPermissions = ['fs:allow-all', 'shell:allow-all', 'core:allow-all', 'all:true'];
    for (const forbidden of forbiddenPermissions) {
      expect(cap.permissions).not.toContain(forbidden);
    }
  });

  it('ensures all defined windows are assigned security capabilities', () => {
    const tauriConfig = JSON.parse(fs.readFileSync(tauriConfigPath, 'utf-8'));
    const cap = JSON.parse(fs.readFileSync(capabilityPath, 'utf-8'));

    const configuredWindows: string[] = tauriConfig.app.windows.map((w: { label: string }) => w.label);
    expect(Array.isArray(cap.windows)).toBe(true);

    for (const windowLabel of configuredWindows) {
      expect(cap.windows).toContain(windowLabel);
    }
  });
});
