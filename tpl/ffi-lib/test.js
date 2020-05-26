const ffi = require("ffi-napi");
const ref = require('ref-napi')
const array = require('ref-array-napi')
const U32array = array(ref.types.int);

const lib = ffi.Library("target/debug/libmylib",{
	add:['int',['int','int'] ],
	strcount: ['int',['string']],
	myname:['string',['string']],
	sumarr:['int',[U32array,'size_t']]
})

console.log( lib.add( 1,2));
console.log( lib.strcount('alex')) 
console.log( lib.myname("alex")) 
console.log( lib.sumarr([1,2,3],3))

