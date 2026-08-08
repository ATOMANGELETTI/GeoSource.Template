use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::RwLock;

#[derive(Debug, thiserror::Error, Serialize)]
pub enum CommandError {
    #[error("Invalid payload parameter: {0}")]
    InvalidInput(String),
    #[error("Internal service error: {0}")]
    InternalError(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CommandPayload {
    pub key: String,
    pub value: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CommandResponse {
    pub success: bool,
    pub message: String,
}

pub type AppState = Arc<RwLock<Vec<CommandPayload>>>;

#[tauri::command]
pub async fn execute_secure_command(
    payload: CommandPayload,
    state: tauri::State<'_, AppState>,
) -> Result<CommandResponse, CommandError> {
    if payload.key.trim().is_empty() {
        return Err(CommandError::InvalidInput("Key cannot be empty".into()));
    }

    let mut lock = state.write().await;
    lock.push(payload.clone());

    Ok(CommandResponse {
        success: true,
        message: format!("Payload for key '{}' stored successfully.", payload.key),
    })
}
