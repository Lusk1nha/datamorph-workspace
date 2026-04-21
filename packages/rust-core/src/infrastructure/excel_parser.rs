use calamine::{Data, Reader, Xlsx, open_workbook_from_rs};
use serde_json::{Map, Value};
use std::io::Cursor;

use crate::domain::errors::CoreError;

pub fn extract_json_from_excel_bytes(bytes: &[u8]) -> Result<String, CoreError> {
    let cursor = Cursor::new(bytes);

    // 1. O 'match' resolve o problema de inferência de tipos instantaneamente.
    // Ele extrai o Workbook se der sucesso, ou converte para nossa String de erro se falhar.
    let mut workbook: Xlsx<_> = match open_workbook_from_rs(cursor) {
        Ok(wb) => wb,
        Err(e) => return Err(CoreError::ExcelParsingError(e.to_string())),
    };

    let sheet_names = workbook.sheet_names().to_owned();
    let first_sheet = sheet_names.first().ok_or(CoreError::EmptySheet)?;

    // 2. Usamos o match aqui também por segurança contra mudanças da API
    let range = match workbook.worksheet_range(first_sheet) {
        Ok(r) => r,
        Err(e) => return Err(CoreError::ExcelParsingError(e.to_string())),
    };

    let mut rows = range.rows();

    let headers: Vec<String> = match rows.next() {
        Some(row) => row.iter().map(|h| h.to_string()).collect(),
        None => return Err(CoreError::EmptySheet),
    };

    let mut json_array: Vec<Value> = Vec::new();

    for row in rows {
        let mut json_obj = Map::new();
        for (i, cell) in row.iter().enumerate() {
            if let Some(header) = headers.get(i) {
                let json_val = match cell {
                    Data::Int(v) => Value::Number((*v).into()),
                    Data::Float(v) => serde_json::Number::from_f64(*v)
                        .map(Value::Number)
                        .unwrap_or(Value::Null),
                    Data::String(v) => Value::String(v.clone()),
                    Data::Bool(v) => Value::Bool(*v),
                    _ => Value::Null,
                };
                json_obj.insert(header.clone(), json_val);
            }
        }
        json_array.push(Value::Object(json_obj));
    }

    serde_json::to_string(&json_array).map_err(|e| CoreError::JsonConversionError(e.to_string()))
}
