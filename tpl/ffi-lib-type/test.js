const ffi = require("ffi-napi");
const struct = require("ref-struct-napi")
const Tuple = struct({
	x:"int",
	y:"int"
})

const lib = ffi.Library("target/debug/libmylib",{
	mytuple:[Tuple,[Tuple] ],
})
const tup = new Tuple({x:10,y:20})
const result = lib.mytuple( tup)
console.log( result.x)
console.log( result.y)


