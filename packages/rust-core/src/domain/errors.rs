use thiserror::Error;

#[derive(Error, Debug)]
pub enum CoreError {
    #[error("Falha ao ler o arquivo Excel: {0}")]
    ExcelParsingError(String),

    #[error("Planilha vazia ou sem cabeçalhos.")]
    EmptySheet,

    #[error("Falha ao converter os dados para JSON: {0}")]
    JsonConversionError(String),
}
