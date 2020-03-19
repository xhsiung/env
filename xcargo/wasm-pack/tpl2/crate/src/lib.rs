#[macro_use]
extern crate serde_derive;
extern crate web_sys;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use std::collections::HashMap;

#[wasm_bindgen(module="/js/myclass.js")]
extern "C"{
    pub type MyClass;

    #[wasm_bindgen(constructor)]
    fn new()->MyClass;

    #[wasm_bindgen(method)]
    fn set_conf(this:&MyClass, val:&JsValue );

    #[wasm_bindgen(method)]
    fn get_conf(this:&MyClass)->JsValue;
}


//模擬{"ip":"xxx"} obj
#[derive(Serialize,Deserialize,Debug)]
pub struct Conf( HashMap<String,String> );


#[wasm_bindgen]
pub struct MMyClass{
    myclass: MyClass
}

#[wasm_bindgen]
impl MMyClass{
    pub fn new(jsval:JsValue) -> MMyClass{
        let my = MyClass::new();
        my.set_conf( &jsval );
        MMyClass{
            myclass: my
        }
    }

    pub fn set_conf(&self,jsval: &JsValue ){
        let conf: Conf  = jsval.into_serde().unwrap();

        let ip = conf.0.get("ip").into();
        let port = conf.0.get("port").into();

        //debug
        web_sys::console::log_1(&ip);
        web_sys::console::log_1(&port);
        self.myclass.set_conf( jsval );
    }

    pub fn get_conf(&self) -> JsValue {
        self.myclass.get_conf()
    }
}
