let wasm = require('./pkg/test.js');
wasm.on("event",(data)=>{
	console.log("event");
	console.log(data);
})
wasm.emit("event", 123);
