#[macro_use]
extern crate napi_derive;

use rust_core::application::process_data::ProcessDataUseCase;

#[napi]
pub struct DataProcessor;

#[napi]
impl DataProcessor {
    #[napi(constructor)]
    pub fn new() -> Self {
        DataProcessor
    }

    #[napi]
    pub fn health_check(&self) -> String {
        "Motor Rust 🦀 operando com sucesso na velocidade do metal!".to_string()
    }

    #[napi]
    pub fn process_excel_to_json(
        &self,
        file_buffer: napi::bindgen_prelude::Buffer,
    ) -> napi::Result<String> {
        // Passa os bytes puros do Node.js para o ecossistema do Rust
        match ProcessDataUseCase::execute_excel_to_json(file_buffer.as_ref()) {
            Ok(json_string) => Ok(json_string),
            Err(e) => {
                // Traduz o CoreError do Rust para um Erro nativo do JavaScript
                Err(napi::Error::new(
                    napi::Status::GenericFailure,
                    e.to_string(),
                ))
            }
        }
    }
}
