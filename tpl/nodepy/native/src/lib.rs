use neon::prelude::*;
use pyo3::prelude::*;
use pyo3::types::*;
use pyo3::{py_run, wrap_pyfunction };

fn getPyEval()->String{
    let gil = Python::acquire_gil();
    let py = gil.python();
    let name = py.eval("'Alex'",None,None).unwrap().extract::<String>().unwrap();
    name
}

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    let x = getPyEval();
    Ok(cx.string(x))
}

register_module!(mut cx, {
    cx.export_function("hello" , hello);
    Ok(())
});
