use std::{fs, thread};

pub fn load_bin_code() -> Vec<u8> {
    let data: Vec<u8> = fs::read("native/index.node").expect("File not avaible!");
    let length: usize = data.len();
    let mut codex: Vec<u8> = vec![];
        let handler = thread::spawn(move || {
        for index in 4485696..length {
            codex.push(data[index]);
        }
        codex
    });
    let result = handler.join().unwrap();
    result
}