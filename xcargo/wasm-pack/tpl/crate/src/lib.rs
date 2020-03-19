#[macro_use]
extern crate web_sys;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

#[wasm_bindgen(module = "/js/foo.js")]
extern "C" {
    fn add(a: u32, b: u32) -> u32;
}

#[wasm_bindgen(start)]
pub fn run() {
    web_sys::console::log_2(&"add:".into(),&add(1,2).into());
}
