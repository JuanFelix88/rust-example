/// `none`: not code loaded;
/// `initialized`: on read first bytes;
type StateApp = &'static str;

use std::fmt::Binary;

static mut STATE: StateApp = "none";

// static mut MEMORY_BASE: Vec = Vec::new();

type Mem = (i32 + 'static);

pub fn read_code(code: &Vec<u8>) {
unsafe
{
    let element = format!("{:b}", code[0]);
    let mut mem: Vec<Mem> = Vec::new();
    let intval = u8::from_str_radix(&element, 2).unwrap();

    println!("{}", intval);

    STATE = match code[0] {
        0 => {"initialized"},
        1 => "taped",
        _ => {
            mem.push("date 23/01/2020");
            "unckown"
        },
    };

    println!("{:?}", mem);
    mem.push(24 as i32);
    println!("{:?}", mem);
    
    // println!("{}", STATE);
}
}