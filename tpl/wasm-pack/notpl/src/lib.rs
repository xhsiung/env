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

thread_local! {
    static EV: EventEmitter = EventEmitter::new();
}

#[wasm_bindgen]
pub fn on( name: &str, listener: &js_sys::Function){
    EV.with(|ev| {
        ev.on( name , listener)
    })
}

#[wasm_bindgen]
pub fn emit(name: &str, value: &JsValue){
    EV.with(|ev| {
        ev.emit( name , value)
    });
}
