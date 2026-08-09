# GeoSource Config Files

This directory holds three YAML files that control application behaviour. You can edit
them directly in any text editor — no recompile required. Changes take effect on the
next application launch (or immediately if changed through the in-app settings panel).

---

## Files at a Glance

| File | Purpose | Writable by app? |
|------|---------|-----------------|
| `settings.yaml` | Appearance & behaviour | ✅ Yes — saved on every settings change |
| `bindings.yaml` | Keyboard shortcuts | ✅ Yes — saved when bindings are updated |
| `appinfo.yaml` | Release metadata | ❌ No — read once at startup, never overwritten |

---

## `settings.yaml`

Controls the application appearance and window behaviour.

```yaml
theme: "polar-night" # polar-night | snow-storm | frost | aurora | system
language: "en"       # ISO 639-1 code (en, fr, de, es, …)

window:
  remember_size: true     # Restore window size from last session
  start_maximized: false  # Always launch maximized

log_level:
  trace: false
  debug: false
  info: true
  warn: true
  error: true
```

**Field reference:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `theme` | string | `"polar-night"` | UI color theme: `"polar-night"` (Nord Dark), `"snow-storm"` (Nord Light), `"frost"` (Nord Cyan/Ice Blue), `"aurora"` (Nord Cosmic Purple/Vibrant), or `"system"` (follows OS). |
| `language` | string | `"en"` | Display language. Add translations to `src/locales/` to unlock more codes. |
| `window.remember_size` | bool | `true` | If `true`, the window reopens at its last dimensions. |
| `window.start_maximized` | bool | `false` | Forces the window to maximize on launch, overriding `remember_size`. |
| `log_level.trace` | bool | `false` | Enable trace level diagnostics in `other/logs/`. |
| `log_level.debug` | bool | `false` | Enable debug level messages. |
| `log_level.info` | bool | `true` | Enable general information events. |
| `log_level.warn` | bool | `true` | Enable warning messages. |
| `log_level.error` | bool | `true` | Enable error & critical failure logs. |

---

## `bindings.yaml`

Maps action identifiers to keyboard accelerator strings.

```yaml
bindings:
  toggle_sidebar: "Ctrl+B"
  open_settings:  "Ctrl+,"
  quit:           "Alt+F4"
  reload:         "Ctrl+R"
```

**Accelerator format:** `[Modifier+]Key`

Supported modifiers: `Ctrl`, `Shift`, `Alt`, `Super` (Windows key / Cmd on macOS).

**Built-in actions:**

| Action | Default | Description |
|--------|---------|-------------|
| `toggle_sidebar` | `Ctrl+B` | Show/hide the sidebar panel |
| `open_settings` | `Ctrl+,` | Open the settings panel |
| `quit` | `Alt+F4` | Exit the application |
| `reload` | `Ctrl+R` | Reload the current view |

> **Tip:** You can add custom action keys and read them from `configStore.ts` via
> `useConfigStore(s => s.bindings.bindings["your_action"])`.

---

## `appinfo.yaml`

Read-only release metadata. The application reads this once at startup and **never
writes back to it**, so your manual edits are always preserved.

```yaml
version:     "0.1.0"
codename:    "Meridian"
build:       "dev"          # dev | alpha | beta | rc | stable
description: "GeoSource Tauri Template Desktop Application"
```

> **Note:** `version` here is informational only. The binary version is authoritative
> and is set in `src-tauri/Cargo.toml` and `src-tauri/tauri.conf.json`.

---

## How to Reset to Defaults

**settings.yaml / bindings.yaml** — delete the file and relaunch. The app will
recreate it with all defaults.

**appinfo.yaml** — restore the values manually from the reference above, or from
version control (`git checkout other/configs/appinfo.yaml`).

---

## Accessing Config in Code

### Frontend (TypeScript / React)

```ts
import { useConfigStore } from "@/lib/store/configStore";

// Inside a component:
const theme = useConfigStore(s => s.settings.theme);
const toggleBinding = useConfigStore(s => s.bindings.bindings["toggle_sidebar"]);
const version = useConfigStore(s => s.appInfo.version);

// Update and persist a setting:
const updateSettings = useConfigStore(s => s.updateSettings);
await updateSettings({ theme: "light" });

// Update a single binding:
const updateBindings = useConfigStore(s => s.updateBindings);
await updateBindings({ toggle_sidebar: "Ctrl+Shift+B" });
```

Load configs once at app startup (e.g. in your root layout):

```ts
useEffect(() => {
  useConfigStore.getState().loadAll();
}, []);
```

### Backend (Rust)

Config is available as managed `State<Mutex<AppConfig>>` in any Tauri command:

```rust
#[tauri::command]
pub fn my_command(state: tauri::State<std::sync::Mutex<AppConfig>>) -> String {
    let cfg = state.lock().unwrap();
    cfg.settings.theme.clone()
}
```

---

## Adding New Settings

1. Add the field to the `AppSettings` struct in `src-tauri/src/config.rs` with a
   `#[serde(default = "...")]` attribute or a custom `Default` impl.
2. Add the corresponding field to the `AppSettings` TypeScript interface in
   `src/lib/config.ts` and update `DEFAULT_SETTINGS`.
3. Add the YAML key with a comment to `settings.yaml`.
4. Update this README.
