let wasm = require('./pkg/test.js');
let e = wasm.EventEmit();
wasm.on(e,"event",(data)=>{
	console.log("event");
	console.log(data);
})

wasm.emit(e,"event", 123);
