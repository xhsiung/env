#[macro_use] extern crate serde_derive;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

#[wasm_bindgen(module = "events")]
extern "C" {
    #[wasm_bindgen(js_name = default)]
    pub type EventEmitter;

    #[wasm_bindgen(constructor)]
    pub fn new() -> EventEmitter;

    #[wasm_bindgen(js_class = "default", method)]
    pub fn on(this: &EventEmitter, name: &str, listener: &js_sys::Function);

    #[wasm_bindgen(js_class = "default", method)]
    pub fn emit(this: &EventEmitter, name: &str, value: &JsValue) -> bool;
}

#[wasm_bindgen]
pub fn EventEmit() -> EventEmitter{
    EventEmitter::new()
}

#[wasm_bindgen]
pub fn on(event: &EventEmitter, name: &str, listener: &js_sys::Function){
    event.on(name , listener );
}

#[wasm_bindgen]
pub fn emit(event: &EventEmitter, name: &str, value: &JsValue){
    //let conf: Conf  = value.i:q
    //
    // nto_serde().unwrap();
    event.emit(name , value );
}
