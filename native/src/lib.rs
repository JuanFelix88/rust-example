extern crate neon;
// {JsValue, Value, JsObject, JsArray, JsFunction, JsBoolean, JsNumber, JsString, StringResult, JsNull, JsUndefined}

use neon::prelude::*;
use neon::types;

use std::{fs, thread};

fn load_bin_code() -> Vec<u8> {
    let mut data: Vec<u8> = fs::read("native/index.node").expect("File not avaible!");
    let length: usize = data.len() - 1;
    let mut codex: Vec<u8> = vec![];
        let handler = thread::spawn(move || {
        for index in (4465031..length) {
            codex.push(data[index]);
        }
        codex
    });

    let result = handler.join().unwrap();
    return result;
}

fn hello(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let bin = load_bin_code();
    Ok(cx.number(bin.len() as f64))
}

register_module!(mut cx, {
    cx.export_function("hello", hello)
});
