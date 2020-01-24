extern crate neon;
// {JsValue, Value, JsObject, JsArray, JsFunction, JsBoolean, JsNumber, JsString, StringResult, JsNull, JsUndefined}

use neon::prelude::*;
use neon::types;

mod loader;
mod interpreter;

fn hello(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let bin = loader::load_bin_code();
    interpreter::read_code(&bin);
    Ok(cx.number(bin.len() as f64))
}

register_module!(mut cx, {
    cx.export_function("hello", hello)
});
