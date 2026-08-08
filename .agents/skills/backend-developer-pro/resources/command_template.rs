use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestPayload {
    pub id: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ResponsePayload {
    pub status: String,
    pub timestamp: u64,
}

#[tauri::command]
pub async fn template_backend_command(
    payload: RequestPayload,
) -> Result<ResponsePayload, String> {
    if payload.id.is_empty() {
        return Err("Payload ID cannot be empty".to_string());
    }

    Ok(ResponsePayload {
        status: "OK".to_string(),
        timestamp: 1700000000,
    })
}
