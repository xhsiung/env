var fs = require('fs');
let wasm_bytes = fs.readFileSync('target/wasm32-unknown-unknown/release/mywasmer.wasm');
WebAssembly.instantiate(wasm_bytes).then(({ instance }) => {
	console.log(instance.exports.sum(40, 2));
});

