use std::ffi::{CStr, CString};
use std::slice;
use libc::{c_int,c_schar};
use std::os::raw::c_char;

#[no_mangle]
pub extern fn add( a:c_int ,b:c_int) -> c_int {
    a + b
}

#[no_mangle]
pub extern fn strcount( s:*const c_schar )-> c_int {
    let cstr = unsafe {
        assert!(!s.is_null());
        CStr::from_ptr( s)
    };
    let rstr = cstr.to_str().unwrap();
    rstr.chars().count() as c_int
}

#[no_mangle]
pub extern fn myname( s: *const c_schar ) -> *mut c_schar {
    let cstr = unsafe{
        assert!(!s.is_null());
        CStr::from_ptr( s  )
    };
    let x= cstr.to_str().unwrap();

    let mut x1 = String::from( x );
    x1.push_str(" myjohn");
    //let mut s = String::from("alex");

    CString::new(x1).unwrap().into_raw()
}

#[no_mangle]
pub  extern fn sumarr(n:*const c_int, len:c_int)->c_int{
    let nums =unsafe{
        assert!(!n.is_null());
        slice::from_raw_parts( n, len as usize)
    };

    let mut sum = 0;
    for n in nums.iter(){
      sum += n.clone();
    };
    sum as c_int
}
