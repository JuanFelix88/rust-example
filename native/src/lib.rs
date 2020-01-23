extern crate neon;

use neon::prelude::*;
use std::fs;

static mut AMOUNT: u8 = 0;

fn hello(mut cx: FunctionContext) -> JsResult<JsNumber> {
    unsafe {
        let data: Vec<u8> = fs::read("data.bin").expect("File not avaible!");
        for item in data {
            if item == 0 {
                AMOUNT += 1;
            }
        }

        Ok(cx.number(AMOUNT))
    }
}

register_module!(mut cx, {
    cx.export_function("hello", hello)
});
