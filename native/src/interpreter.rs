/// `none`: not code loaded;
/// `initialized`: on read first bytes;
type StateApp = &'static str;

use std::fmt::Binary;

static mut STATE: StateApp = "none";

pub fn read_code(code: &Vec<u8>) {
unsafe
{
    let element = format!("{:b}", code[0]);

    println!("{}", element);

    let intval = u8::from_str_radix(&element, 2).unwrap();

    println!("{}", intval);

    STATE = match code[0] {
        0 => "initialized",
        1 => "taped",
        _ => "unckown",
    };
    
    println!("{}", STATE);
}
}