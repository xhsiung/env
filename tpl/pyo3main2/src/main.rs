use pyo3::prelude::*;
use pyo3::types::*;
use std::fs::File;
use std::io::Read;


fn main() {
    let gil = Python::acquire_gil();
    let py = gil.python();

    //read file
    let mut ff = File::open("main.py").unwrap();
    let mut code = String::new();
    ff.read_to_string(&mut code);

    //set locals
    let globals = PyDict::new(py);
    globals.set_item("myname","my1111");
    py.run(code.as_str(), Some(globals), None).unwrap();

    //get method
    let max = globals.get_item("max").unwrap().to_object(py);

    let result = max.call1(py,(1,)).unwrap().extract::<i32>(py).unwrap();
    //get name
    let name = globals.get_item("name").unwrap().extract::<String>().unwrap();

    println!("{:?}, {:?}", name , result );
}
