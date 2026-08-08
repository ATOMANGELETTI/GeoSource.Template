#[cfg(test)]
mod tests {
    use std::sync::Mutex;

    struct AppState {
        counter: Mutex<i32>,
    }

    fn increment_counter_logic(state: &AppState, delta: i32) -> Result<i32, String> {
        let mut count = state.counter.lock().map_err(|e| e.to_string())?;
        *count += delta;
        Ok(*count)
    }

    #[test]
    fn test_increment_counter_success() {
        let state = AppState {
            counter: Mutex::new(10),
        };

        let res = increment_counter_logic(&state, 5);
        assert!(res.is_ok());
        assert_eq!(res.unwrap(), 15);
    }

    #[tokio::test]
    async fn test_async_ipc_task_simulation() {
        let async_action = async {
            tokio::time::sleep(std::time::Duration::from_millis(5)).await;
            Ok::<_, String>("payload_processed".to_string())
        };

        let result = async_action.await;
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), "payload_processed");
    }
}
