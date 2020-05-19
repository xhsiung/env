use neon::prelude::*;
use pyo3::prelude::*;
use pyo3::types::*;
use pyo3::{py_run, wrap_pyfunction };

fn getPyEval()->String{
    let gil = Python::acquire_gil();
    let py = gil.python();
    let locals = PyDict::new(py);
    locals.set_item("os",py.import("os").unwrap());
    let pwd = py.eval("os.getcwd() ",None,Some(locals) ).unwrap().extract::<String>().unwrap();
    pwd
}

fn getPyRun()->String{
    let gil = Python::acquire_gil();
    let py = gil.python();
    let locals = PyDict::new(py);
    locals.set_item("myname","alex");

    py.run(
        r#"
def pwd():
   import os
   return os.getcwd()
name = myname
       "#,
        None,
        Some(locals)).unwrap();

    //get method
    let max = locals.get_item("pwd").unwrap().to_object(py);
    let result = max.call1(py,()).unwrap().extract::<String>(py).unwrap();

    //get name
    let name = locals.get_item("name").unwrap().extract::<String>().unwrap();
    format!("{} {}" , name , result )
}

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    let x = getPyEval();
    Ok(cx.string(x))
}

fn hello2(mut cx: FunctionContext) -> JsResult<JsString> {
    let x = getPyRun();
    Ok(cx.string(x))
}

register_module!(mut cx, {
    cx.export_function("hello" , hello);
    cx.export_function("hello2" , hello2);
    Ok(())
});
