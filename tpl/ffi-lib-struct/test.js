const ffi = require("ffi-napi");
const lib = ffi.Library("target/debug/libmylib",{
	myclass_new:['pointer',[] ],
	myclass_free:['void',['pointer']],
	myclass_populate:['void',['pointer']],
	myclass_getkey:["string",['pointer','string']]
})
const MyClass = function(){
	this.ptr = lib.myclass_new();
}
MyClass.prototype.free = function(){
	lib.myclass_free();
}
MyClass.prototype.populate= function(){
	lib.myclass_populate( this.ptr);
}
MyClass.prototype.getkey=function( key){
	return lib.myclass_getkey( this.ptr, key);
}
const myclass = new MyClass();
myclass.populate();

console.log( myclass.getkey("name") )
