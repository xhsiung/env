#!/bin/bash
main=myproj
cargo build
cp target/debug/$main .
echo "run process"
./$main
