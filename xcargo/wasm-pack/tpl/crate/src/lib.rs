#[macro_use]
extern crate serde_derive;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use std::collections::HashMap;

#[wasm_bindgen(module = "/js/foo.js")]
extern "C" {
    fn add(a: u32, b: u32) -> u32;
}

//window.addEventListener("wasmEvent",{})
pub fn event_listener(){
    let window = web_sys::window().unwrap();
    let cb = Closure::wrap(Box::new(move |jobj:web_sys::CustomEvent| {
        #[derive(Serialize,Deserialize)]
        pub struct mData( HashMap<String,String> );

        let detail = jobj.detail();
        let obj:mData = detail.into_serde().unwrap();
        //get_val 
        let name = obj.0.get("name").into();
        web_sys::console::log_1(&name);
    }) as Box<dyn FnMut(web_sys::CustomEvent)>);

    let mut eventListener = web_sys::EventListener::new();

    //convert js::Function()
    eventListener.handle_event( &cb.as_ref().unchecked_ref() );
    window.add_event_listener_with_event_listener( "wasmEvent" , &eventListener);
    cb.forget();
}

//window.dispatchEvent("evnet",customEvent);
#[wasm_bindgen]
pub fn send_json() {
    #[derive(Serialize,Deserialize,Debug)]
    pub struct Data( HashMap<String,String> );

    let window = web_sys::window().unwrap();
    //let event = web_sys::CustomEvent
    let mut customeventinit = web_sys::CustomEventInit::new();
    let mut jobj = HashMap::new();
    jobj.insert("name".to_string(),"alex".to_string());
    jobj.insert("mobile".to_string(),"0938".to_string());
    let obj = JsValue::from_serde( &Data( jobj ) ).unwrap() ;
    customeventinit.detail(&obj);

    let custom = web_sys::CustomEvent::new_with_event_init_dict("event", &customeventinit);
    window.dispatch_event(&custom.unwrap()).unwrap();
}


#[wasm_bindgen(start)]
pub fn run() {
    send_json();
    event_listener();
    web_sys::console::log_2(&"add:".into(),&add(1,2).into());
}
