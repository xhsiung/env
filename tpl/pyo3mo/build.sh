#!/bin/bash
#cargo +nightly build 
cargo build 

cp target/debug/libmy.so my.so
