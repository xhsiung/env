#[macro_use]
extern crate serde_derive;
extern crate web_sys;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use std::collections::HashMap;

#[derive(Serialize,Deserialize,Debug)]
pub struct Example{
    pub field1: HashMap<String, String>,
    pub field2: Vec<f32>,
    pub field3: [f32;4],
}

#[wasm_bindgen(module="/js/myclass.js")]
extern "C"{
    pub type MyClass;

    #[wasm_bindgen(constructor)]
    fn new()->MyClass;

    #[wasm_bindgen(method)]
    fn setConf(this:&MyClass, val:&JsValue );

    #[wasm_bindgen(method)]
    fn getConf(this:&MyClass)->JsValue;

    #[wasm_bindgen(method)]
    fn showConf(this:&MyClass);
}


#[wasm_bindgen]
pub fn fromjs() -> JsValue {
    let mut field1 = HashMap::new();
    field1.insert(String::from("name") , String::from("alex"));

    let example = Example{
        field1,
        field2: vec![ 1.0, 2.0 ],
        field3: [1., 2., 3., 4.]
    };
    
    web_sys::console::log_2(&"test".into(),&"test2".into());
    JsValue::from_serde(&example).unwrap()
}

#[wasm_bindgen]
pub fn myclass(val:&JsValue) -> MyClass {
    MyClass::new()
}

#[wasm_bindgen]
pub fn tojs(my:&MyClass ,val:&JsValue) ->JsValue {
    //let example:Example = val.into_serde().unwrap();
    //let my = MyClass::new();
    my.setConf( val );
    my.showConf();
    my.getConf()
}
