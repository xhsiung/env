#!/usr/bin/env python3
import os,sys
sys.path.append(os.getcwd())

import my
print( my.name("alex") )

m=my.MyClass(1,"test")
print( m.my_method(1,2) )

