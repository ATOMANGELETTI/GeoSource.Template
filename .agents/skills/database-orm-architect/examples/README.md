# Database ORM Architect Examples

## Example Async SQLx Pool Setup in Tauri State
```rust
use sqlx::sqlite::SqlitePoolOptions;
use tauri::Manager;

pub async fn init_db(app_handle: &tauri::AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let db_path = app_handle.path().app_data_dir()?.join("geosource.db");
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect(&format!("sqlite:{}?mode=rwc", db_path.display()))
        .await?;
    app_handle.manage(pool);
    Ok(())
}
```
