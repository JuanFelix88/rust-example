#[macro_use]
extern crate neon;

use neon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let tap = 23;
    Ok(cx.number(tap))
}

register_module!(mut cx, {
    cx.export_function("hello", hello)
});
