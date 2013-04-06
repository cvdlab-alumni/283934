#ex02: Define plan by plan, with names floor0, floor1, floor2, floor3, and floor4, 
#the 5 models of horizontal partitions, and add them to the STRUCT of the building model.

from pyplasm import *

#initialize utils and info
GRID = COMP([INSR(PROD),AA(QUOTE)])
solh = 0.5

f0x = 10.2
f0y = 5.9
hp0 = GRID([[f0x],[f0y],[solh]])
fp = T([1,2])([2.1,3.4])(hp0)

#little extras
fpt = CUBOID([2.8,2.6,solh])
fp1 = T([2])([6.7])(fpt)

#some adjustments...
building2 = T([1])([0.5])(building)
building = STRUCT([building2,fp1])


def circleArea (p) :
    alpha,r,h = p
    return [r*COS(alpha),r*SIN(alpha),h]


dom2D =INSR(PROD)([INTERVALS(PI)(24),INTERVALS(2)(1),INTERVALS(solh)(1)])
obj = MAP(circleArea)(dom2D)
obj2 = T([1,2])([13.6,7.15])(R([1,2])(-PI/2)(obj))

obj2e=CUBOID([1,4,solh])
obj2t = T([1,2])([12.6,5.15])(obj2e)


dom2D1 =INSR(PROD)([INTERVALS(PI)(24),INTERVALS(0.9)(1),INTERVALS(solh)(1)])
objt = MAP(circleArea)(dom2D1)
obj3 = T([1,2])([3.5,3.4])(R([1,2])(-PI)(objt))

arczones = STRUCT([obj2,obj2t,obj3])
floor0 = STRUCT([fp,fp1,arczones])

hp21t = GRID([[16.6],[1.6],[solh]])
hp21f = GRID([[4],[1.2],[solh]])
hp22t = GRID([[3],[7.3],[solh]])

hp21 = T([2])([7.3])(hp21t)
hollow = T([1,2])([6.5,7.5])(hp21f)

hp21fin = DIFFERENCE([hp21,hollow])
hp22 = T([1])([13.6])(hp22t)

fl1 = STRUCT([hp21fin,hp22])

floor1 = T([3])([cilh])(fl1)

f2 = T([3])([cilh])(floor1)

f2ex = CUBOID([4,7.3,solh])

f2ext = T([1,3])([9.6,2*cilh])(f2ex)

floor2 = STRUCT([f2,f2ext])

f3 = T([3])([cilh])(floor2)

f3ex = CUBOID([9.6,7.3,solh])
f3ext = T([3])([3*cilh])(f3ex)
floor3 = STRUCT([f3,f3ext])

f4 = T([3])([cilh*2])(floor2)
f4ex = T([3])([cilh*4])(hollow)

f4ex2 = CUBOID([2,7.3,solh])
f4ex2t = T([1,3])([7.6,4*cilh])(f4ex2)

floor4 = STRUCT([f4,f4ex,f4ex2t])

trav1 = GRID([[16.5],[pild],[-cilh,solh,-pilh,solh,-pilh,solh]]);

building=STRUCT([building2,floor0,floor1,floor2,floor3,floor4,trav1])