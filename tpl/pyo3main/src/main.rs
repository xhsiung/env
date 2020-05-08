use pyo3::prelude::*;
use pyo3::types::*;
use pyo3::wrap_pyfunction;
use pyo3::py_run;

fn main() -> Result<(),()> {
    let gil = Python::acquire_gil();
    let py = gil.python();
    main_(py).map_err(|e|{
        e.print_and_set_sys_last_vars(py );
    })
}

fn main_(py: Python) -> PyResult<()>{
   //sys.path.append("/home/alex")
   let sys = py.import("sys")?;
   let syspath  = sys.get("path")?.to_object(py);
   syspath.call_method1(py, "append", args)?;

   Ok(())
}


