#!/bin/bash
cd mylib
#cargo clean
cargo build --release --target wasm32-unknown-unknown

cd ..
cargo run
