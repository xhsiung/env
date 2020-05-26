#https://docs.python.org/zh-cn/3.7/library/ctypes.html
import ctypes
from ctypes import POINTER,c_int,c_size_t,Structure
lib=ctypes.cdll.LoadLibrary("target/debug/libmylib.so")

class Tuple(Structure):
    _fields_ = [ ("x",c_int),
                ("y",c_int)]
    def __str__(self):
        return "{},{}".format(self.x,self.y)
'''
lib.mytuple.argtypes = (Tuple,)
lib.mytuple.restype = Tuple
'''
tup = Tuple(10,20)

print(lib.mytuple(tup))

