#!/bin/bash
#sudo apt install python3-dev python-dev
#rustup toolchain install nightly
#cargo +nightly build 
cargo build 

cp target/debug/libmy.so my.so
