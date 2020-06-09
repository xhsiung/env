#!/bin/bash
yarn install
./node_modules/.bin/electron-builder node-gyp-rebuild --arch=x64 
./node_modules/.bin/electron-builder -l snap tar.xz  
