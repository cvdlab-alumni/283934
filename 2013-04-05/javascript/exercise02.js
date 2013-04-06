var solh = 0.5

var f0x = 10.2
var f0y = 5.9
var hp0 = GRID([[f0x],[f0y],[solh]])
var fp = T([1,2])([2.1,3.4])(hp0)


var fpt = CUBOID([2.8,2.6,solh])
var fp1 = T([2])([6.7])(fpt)


var building2 = T([1])([0.5])(building)
building = STRUCT([building2,fp1])


function circleArea(p){
	var alpha = p[0];
	var r = p[1];
	var h = p[2];
    return [r*COS(alpha),r*SIN(alpha),h];
}

var dom2D =DOMAIN([[0,PI],[2],[solh]])([24,1,1])
var obj = MAP(circleArea)(dom2D)
var obj2 = T([1,2])([13.6,7.15])(R([1,2])(-PI/2)(obj))

var obj2e=CUBOID([1,4,solh])
var obj2t = T([1,2])([12.6,5.15])(obj2e)


var dom2D1 =DOMAIN([[0,PI],[0.9],[solh]])([24,1,1])
var objt = MAP(circleArea)(dom2D1)
var obj3 = T([1,2])([3.5,3.4])(R([1,2])(-PI)(objt))

var arczones = STRUCT([obj2,obj2t,obj3])
var floor0 = STRUCT([fp,fp1,arczones])

var hp21t = GRID([[16.6],[1.6],[solh]])
var hp21f = GRID([[4],[1.2],[solh]])
var hp22t = GRID([[3],[7.3],[solh]])

var hp21 = T([2])([7.3])(hp21t)
var hollow = T([1,2])([6.5,7.5])(hp21f)

//hp21fin = DIFFERENCE([hp21,hollow])
var hp22 = T([1])([13.6])(hp22t)

var fl1 = STRUCT([hp21,hp22])

var floor1 = T([3])([cilh])(fl1)

var f2 = T([3])([cilh])(floor1)

var f2ex = CUBOID([4,7.3,solh])

var f2ext = T([1,3])([9.6,2*cilh])(f2ex)

var floor2 = STRUCT([f2,f2ext])

var f3 = T([3])([cilh])(floor2)

var f3ex = CUBOID([9.6,7.3,solh])
var f3ext = T([3])([3*cilh])(f3ex)
var floor3 = STRUCT([f3,f3ext])

var f4 = T([3])([cilh*2])(floor2)
var f4ex = T([3])([cilh*4])(hollow)

var f4ex2 = CUBOID([2,7.3,solh])
var f4ex2t = T([1,3])([7.6,4*cilh])(f4ex2)

var floor4 = STRUCT([f4,f4ex,f4ex2t])

var trav1 = GRID([[16.5],[pild],[-cilh,solh,-pilh,solh,-pilh,solh]])

building=STRUCT([building2,floor0,floor1,floor2,floor3,floor4,trav1])
