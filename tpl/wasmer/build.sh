#!/bin/bash
cargo build --target wasm32-unknown-unknown --release
node test.js
python3 test.py
