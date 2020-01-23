extern crate neon;
// {JsValue, Value, JsObject, JsArray, JsFunction, JsBoolean, JsNumber, JsString, StringResult, JsNull, JsUndefined}

use neon::prelude::*;
use neon::types;

use std::{fs, thread};

static mut AMOUNT: u8 = 0;

fn hello(mut cx: FunctionContext) -> JsResult<JsNumber> {
unsafe 
{
    let mut data: Vec<u8> = fs::read("native/index.node").expect("File not avaible!");
    let length: usize = data.len() - 1;
    let mut codex: Vec<u8> = vec![];

    // codex.copy_from_slice(&datax[4187191..]);
    let handler = thread::spawn(move || {
        for index in (4465167..length) {
            codex.push(data[index]);
            AMOUNT += 1;
        }
    });

    handler.join().unwrap();

    let lenx = codex.len();

    Ok(cx.number(lenx as f64))
}
}

register_module!(mut cx, {
    cx.export_function("hello", hello)
});
