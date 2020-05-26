use std::ffi::{CStr, CString};
use std::slice;
use libc::{c_int,c_schar};
use std::os::raw::c_char;

#[repr(C)]
pub struct Tuple{
   x:c_int,
   y:c_int
}

impl From< (i32,i32) > for Tuple{
   fn from( tup:  (i32,i32)  ) -> Self {
       Tuple{
           x: tup.0,
           y: tup.1
       }
   }
}

impl From<Tuple> for (i32,i32) {
   fn from( tup: Tuple) -> Self {
       (tup.x, tup.y)
   }
}

#[no_mangle]
pub extern fn mytuple(tup: Tuple ) ->Tuple{
   let (a,b) = tup.into();
   (a+1,b-1).into()
}

