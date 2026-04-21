use crate::domain::errors::CoreError;
use crate::infrastructure::excel_parser::extract_json_from_excel_file;

pub struct ProcessDataUseCase;

impl ProcessDataUseCase {
    pub fn execute_excel_to_json(file_path: &str) -> Result<String, CoreError> {
        extract_json_from_excel_file(file_path)
    }
}
