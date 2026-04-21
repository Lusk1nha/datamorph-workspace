#[macro_use]
extern crate napi_derive;

#[napi]
pub struct DataProcessor;

#[napi]
impl DataProcessor {
    #[napi]
    pub fn process_excel_to_json(
        file_buffer: napi::bindgen_prelude::Buffer,
    ) -> napi::Result<String> {
        // 1. Aqui, nós estamos na camada de Infra/Adapter.
        // 2. Convertiríamos os tipos específicos da web para tipos do domínio.
        // 3. Chamaríamos o Use Case do `rust-core` passando o buffer puro.

        // Simulação do retorno para ilustrar:
        let result = format!(
            "Excel processado em Rust! Tamanho do buffer: {} bytes.",
            file_buffer.len()
        );

        Ok(result)
    }
}
