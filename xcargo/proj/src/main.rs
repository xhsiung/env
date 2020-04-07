use log4rs;
use log::*;
use ini::Ini;

fn readini(sec:&str,key:&str) -> String{
    let conf = Ini::load_from_file("conf/conf.ini").unwrap();
    let x = conf.get_from(Some(sec), key );
    x.unwrap().to_string()
}


fn main() {
    log4rs::init_file("conf/log4rs.yml", Default::default()).unwrap();
    let server = readini("server", "ip");
    let port = readini("server", "port").parse::<i32>().unwrap();
    println!("{:?}", port );
    debug!("A debug");
    warn!("A warn");
    error!("A error");
}
