# Tauri Desktop Release & Packaging Guide

## Release Gates
1. **Version Sync**: Always use `scripts/sync-version.ps1` before initiating release builds.
2. **NSIS Installer Customization**: Use standard NSIS headers and silent install options for Windows.
3. **Auto-Updater Public Key Verification**: Never deploy updater binaries without verifying signature hashes.
