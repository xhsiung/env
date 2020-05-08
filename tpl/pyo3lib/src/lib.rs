use pyo3::prelude::*;
use pyo3::types::PyType;
use pyo3::wrap_pyfunction;

#[pyclass]
struct MyClass {}

#[pymethods]
impl MyClass {
    #[new]
    fn new(c: i32, d: &str) -> Self {
        Self {}
    }
    // the self argument should be written $self
    fn my_method(&self, e: i32, f: i32) -> i32 {
        e + f
    }
    #[classmethod]
    fn my_class_method(cls: &PyType, e: i32, f: i32) -> i32 {
        e + f
    }
    #[staticmethod]
    fn my_static_method(e: i32, f: i32) -> i32 {
        e + f
    }
}

#[pyfunction]
fn double(x: usize) -> usize {
    x * 2
}

#[pyfunction]
fn name(x: String) -> String {
    x
}

#[pymodule]
fn my(py: Python, m: &PyModule) -> PyResult<()> {
    //function
    m.add_wrapped(wrap_pyfunction!(double)).unwrap();
    m.add_wrapped(wrap_pyfunction!(name)).unwrap();

    m.add_class::<MyClass>().unwrap();
    Ok(())
}
