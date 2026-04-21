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
        file_path: String,
    ) -> napi::Result<String> {
        match ProcessDataUseCase::execute_excel_to_json(&file_path) {
            Ok(json_string) => Ok(json_string),
            Err(e) => Err(napi::Error::new(
                napi::Status::GenericFailure,
                e.to_string(),
            )),
        }
    }
}
