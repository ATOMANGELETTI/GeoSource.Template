# Security Audit Hardener Examples

## Example Tauri v2 Scoped Capability Definition
```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "default-capability",
  "description": "Restricted IPC permissions for GeoSource UI",
  "windows": ["main"],
  "permissions": [
    "path:default",
    "event:default"
  ]
}
```
