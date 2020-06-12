#!/bin/bash
npm install 

cwd=`pwd`
cd nodepy/src
$cwd/node_modules/.bin/electron-build-env neon build --release

cd $cwd
mkdir -p node_modules/nodepy
cp -a nodepy/src/native/target/release/libmyproj.so node_modules/nodepy/index.node
npm run start

#cd ./node_modules/.bin/electron-build-env neon build nodepy/src --release
#yarn install
#./node_modules/.bin/electron-builder node-gyp-rebuild --arch=x64 
#./node_modules/.bin/electron-builder -l snap tar.xz  
