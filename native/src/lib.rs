#[macro_use]
extern crate neon;

use neon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    let tap = "Test addon";
    Ok(cx.string(tap))
}

register_module!(mut cx, {
    cx.export_function("hello", hello)
});
