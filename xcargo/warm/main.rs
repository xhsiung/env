use wasmer_runtime::{imports, instantiate,Value};

static WASM: &'static [u8] = include_bytes!("../mylib/target/wasm32-unknown-unknown/release/mylib.wasm");

fn main() {
   let import_object = imports! {};
   let instance = instantiate(WASM, &import_object).unwrap();
   
   //sum 
   let x = instance.call("sum",&[Value::I32(1),Value::I32(2)]).unwrap();

   println!("{:?}", x[0].to_u128());
}

