#https://docs.python.org/zh-cn/3.7/library/ctypes.html
import ctypes
from ctypes import POINTER,c_void_p,c_char_p, c_int,c_size_t,Structure
lib=ctypes.cdll.LoadLibrary("target/debug/libmylib.so")
'''
class MyClass(Structure):
    pass

lib.myclass_new.restype = POINTER(MyClass)
lib.myclass_free.argtypes =( POINTER(MyClass),)

lib.myclass_populate.argtypes = (POINTER(MyClass),)

lib.myclass_getkey.argtypes = ( POINTER(MyClass),c_void_p)
lib.myclass_getkey.restype  = c_void_p
'''

obj=lib.myclass_new()
lib.myclass_populate(obj)

ptr = lib.myclass_getkey(obj , "name".encode('utf-8') )
name = ctypes.cast(ptr,ctypes.c_char_p).value.decode('utf-8')
print( name )

lib.myclass_free(obj)
