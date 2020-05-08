use pyo3::prelude::*;
use pyo3::types::*;
use pyo3::wrap_pyfunction;
use pyo3::py_run;

fn main() -> Result<(),()> {
    let gil = Python::acquire_gil();
    let py = gil.python();
    main_(py).map_err(|e|{
        e.print_and_set_sys_last_vars(py);
    })
}

fn main_(py: Python) -> PyResult<()>{
    //sys.path.append("/home/alex")
    let os = py.import("os")?;
    let mut libpath = os.call0("getcwd")?.extract::<String>()?;
    libpath.push_str("/lib");
    //println!("{:?}", libpath);

    let sys = py.import("sys")?;
    let syspath  = sys.get("path")?.to_object(py);
    let args = PyTuple::new( py, &[ libpath ]);
    syspath.call_method1(py, "append", args)?;

    let count  = py.allow_threads( move ||{
        1234
    });
    println!("{:?}",count);
    Ok(())
}


