#https://docs.python.org/zh-cn/3.7/library/ctypes.html
import ctypes
from ctypes import POINTER,c_void_p, c_int,c_size_t

lib=ctypes.cdll.LoadLibrary("target/debug/libmylib.so")

'''
lib.add.argtypes = (c_int,c_int)
lib.addrestype = c_int

lib.strcount.argtypes = (c_void_p,)
lib.strcount.restype = c_int

lib.myname.argtypes = (c_void_p,)
lib.myname.restype = c_void_p
lib.myname.free= (c_void_p,)

lib.sumarr.argtypes = (POINTER(c_int), c_size_t)
lib.sumarr.restype = c_int
'''

print(lib.add(1,2))
print(lib.strcount("alex".encode("utf-8")))

ptr=lib.myname("alex".encode("utf-8"))
v=ctypes.cast(ptr,ctypes.c_char_p).value.decode('utf-8')
print(v)

def sum_arr(nums):
    buf_type = c_int*len(nums)
    buf = buf_type(*nums)
    return lib.sumarr(buf, len(nums))
print( sum_arr([1,2,3] ) )
