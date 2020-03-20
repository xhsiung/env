#[macro_use]
extern crate serde_derive;

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
pub struct EventEmit {
    emitter: EventEmitter,
}

#[wasm_bindgen]
impl EventEmit {
    pub fn new() -> EventEmit {
        EventEmit {
            emitter: EventEmitter::new(),
        }
    }

    // pub fn on<F>(&mut self, name: &str, callback: F) -> &mut Self
    //     where F: FnMut(JsValue) + 'static {
    //
    //     let closure = Closure::wrap(Box::new(callback) as Box<dyn FnMut(JsValue)>);
    //     self.emitter.on(name, closure.as_ref().unchecked_ref());
    //     self
    // }


    pub fn on(&mut self, name: &str, listener: &js_sys::Function){
        self.emitter.on(name , listener );
    }

    pub fn emit(&self, name: &str, value: &JsValue) -> bool {
        self.emitter.emit(name, value)
    }
}