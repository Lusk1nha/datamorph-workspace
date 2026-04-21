use crate::domain::errors::CoreError;
use crate::infrastructure::excel_parser::extract_json_from_excel_file;

pub struct ProcessDataUseCase;

impl ProcessDataUseCase {
    pub fn execute_excel_to_json(file_path: &str) -> Result<String, CoreError> {
        println!("Processing Excel file: {}", file_path);
        extract_json_from_excel_file(file_path)
    }
}
