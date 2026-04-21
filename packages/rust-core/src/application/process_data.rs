use crate::domain::errors::CoreError;
use crate::infrastructure::excel_parser::extract_json_from_excel_bytes;

pub struct ProcessDataUseCase;

impl ProcessDataUseCase {
    pub fn execute_excel_to_json(file_buffer: &[u8]) -> Result<String, CoreError> {
        // Aqui no futuro você pode adicionar validações de negócio,
        // checar tamanho máximo, ou cruzar dados antes de gerar o JSON.
        extract_json_from_excel_bytes(file_buffer)
    }
}
