use std::ffi::{CStr, CString};
use std::slice;
use libc::{c_int,c_char,c_schar};
use std::collections::HashMap;

pub struct MyClass{
    data: HashMap<String, String>
}

impl MyClass{
    fn new() -> MyClass {
        MyClass{
            data: HashMap::new()
        }
    }

    fn populate(&mut self){
        self.data.insert("name".to_string(),"alex".to_string());
        self.data.insert("mobile".to_string(),"0938058218".to_string());
    }

    fn getkey(&self, key:&str) -> &str{
        self.data.get(key).unwrap()
    }
}

#[no_mangle]
pub extern fn myclass_new() -> Box<MyClass> { //原先*mut MyClass
    // Box::into_raw( Box::new( MyClass:new() ))
    Box::new(  MyClass::new() )
}

#[no_mangle]
pub extern fn myclass_free(ptr:*mut MyClass)  {
    if ptr.is_null() { return }
    unsafe {   Box::from_raw(ptr); }
}

#[no_mangle]
pub extern fn myclass_populate(ptr:*mut MyClass)  {
    let myclass = unsafe {
        assert!(!ptr.is_null());
        &mut *ptr
    };
    myclass.populate();
}

#[no_mangle]
pub extern fn myclass_getkey(ptr: *const MyClass, key: *const c_schar)-> *mut c_schar{
    let myclass = unsafe{
        assert!(!ptr.is_null());
        &*ptr
    };
    let kstr = unsafe{
        assert!(!key.is_null());
        CStr::from_ptr(key)
    };
    let kkstr = kstr.to_str().unwrap();
    let kv = myclass.data.get(kkstr ).unwrap();
    CString::new( kv.clone()).unwrap().into_raw()
}

