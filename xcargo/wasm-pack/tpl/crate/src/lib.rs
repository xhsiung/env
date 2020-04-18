#[macro_use] extern crate serde_derive;
#[macro_use] extern crate serde_json;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use std::collections::HashMap;
use serde_json::Value;

#[wasm_bindgen(module = "/js/foo.js")]
extern "C" {
    fn add(a: u32, b: u32) -> u32;
}

#[wasm_bindgen]
pub fn myjson() {
    let data = json!({
        "name": "alex",
        "mobile": "0938",
        "data": [
                {"name":"alex"},
                {"name":"alex2"},
        ]
    });
    let jobj  = JsValue::from_serde( &data).unwrap() ;
    let window = web_sys::window().unwrap();

    //let event = web_sys::CustomEvent
    let mut customeventinit = web_sys::CustomEventInit::new();
    customeventinit.detail(&jobj);

    let customevent = web_sys::CustomEvent::new_with_event_init_dict("event", &customeventinit);
    window.dispatch_event(&customevent.unwrap()).unwrap();
}


pub fn mylistener(){
    let window = web_sys::window().unwrap();

    let cb = Closure::wrap(Box::new(move |jobj:web_sys::CustomEvent| {
        let detail = jobj.detail();
        let v:Value = detail.into_serde().unwrap();
        //get_val
        let name = v["name"].as_str().unwrap();
        web_sys::console::log_1(&JsValue::from_str( name ));

    }) as Box<dyn FnMut(web_sys::CustomEvent)>);
    let mut event_listener = web_sys::EventListener::new();
    //convert js::Function()
    event_listener.handle_event( &cb.as_ref().unchecked_ref() );
    window.add_event_listener_with_event_listener( "wasmEvent" , &event_listener);
    cb.forget();
}


#[wasm_bindgen(start)]
pub fn run() {
    myjson();
    mylistener();
    //web_sys::console::log_2(&"add:".into(),&add(1,2).into());
    
    //call JS
    let var1 = "test1";
    //format!,變數   --> {}
    //format!,escape--> {{}}
    js_sys::eval(format!(r#"
        console.log('{name}');
        window.addEventListener("wasmEvent",(data)=>{{
            console.log("js_sys");
            console.log(data);
        }})
    "#,name=var1)
    .as_str());
    
}
