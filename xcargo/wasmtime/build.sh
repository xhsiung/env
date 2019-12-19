#!/bin/bash
cd mylib
export WASM_INTERFACE_TYPES=1
wasm-pack build

cd ..
cargo run
