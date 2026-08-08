#[cfg(test)]
mod tests {
    #[test]
    fn test_basic_assertion() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }

    #[test]
    fn test_option_handling() {
        let data: Option<&str> = Some("geosource");
        assert!(data.is_some());
        assert_eq!(data.unwrap(), "geosource");
    }
}
