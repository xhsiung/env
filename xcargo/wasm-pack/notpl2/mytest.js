let wasm = require('./pkg/test.js');
let mm = wasm.EventEmit.new();
console.log(mm);
mm.on("event",(data)=>{
	console.log("event");
	console.log(data);
})

mm.emit("event", 123);
