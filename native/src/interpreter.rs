/// `none`: not code loaded;
/// `initialized`: on read first bytes;
type StateApp = &'static str;

static mut STATE: StateApp = "none";

pub fn read_code(code: &Vec<u8>) {
unsafe
{
    STATE = match code[0] {
        0 => "initialized",
        1 => "",
        _ => "error",
    };
    
    println!("{}", STATE);
}
}