use pyo3::prelude::*;
use pyo3::types::*;
use pyo3::{py_run, wrap_pyfunction };

use std::fs::File;
use std::io::Read;
use serde_json::*;

fn getPyEval()->String{
    let gil = Python::acquire_gil();
    let py = gil.python();
    let x = py.eval("'None'",None,None).unwrap().extract::<String>().unwrap();
    x
}

fn getPyRun()->String{
    let gil = Python::acquire_gil();
    let py = gil.python();

    let locals = PyDict::new(py);
    locals.set_item("myname","alex");

    py.run(
        r#"
def max(x):
    return 100*x
name = myname
        "#,
        None,
        Some(locals)).unwrap();

    //get method
    let max = locals.get_item("max").unwrap().to_object(py);
    let result = max.call1(py,(2,)).unwrap().extract::<i32>(py).unwrap();

    //get name
    let name = locals.get_item("name").unwrap().extract::<String>().unwrap();
    format!("{} {}" , name , result )
}

//python function
#[pyfunction]
fn pyemit(num:i32) -> PyResult<()>{
    println!("call pyemit {:?}", num);
    Ok(())
}

fn getPyRunMacro(){
    let gil = Python::acquire_gil();
    let py = gil.python();

    let pyemit = wrap_pyfunction!( pyemit )(py);
    let my = 321;
    py_run!(
        py,
        pyemit my,
        r#"
import asyncio
gpyemit = pyemit
gmy = my

def run():
    print("my run")

async def main():
    import time
    global gpyemit,run,gmy

    while 1:
        gpyemit( gmy )
        run()
        print('go while')
        time.sleep(1)

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
loop.close()
    "#
    )
}

fn main() {
    println!("{:?}" , getPyEval() );
    println!("{:?}" , getPyRun() );
    getPyRunMacro();
}
