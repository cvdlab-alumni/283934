
var nf = CUBOID([0.2,9.6,pilh+solh])

var hol1n = CUBOID([0.2,0.2,pilh])

var hol2n = STRUCT([hol1n,T([2])([0.4]),hol1n])

var hol2nt = T([2,3])([0.2,0.2])(hol2n)

var holbn = CUBOID([0.2,5.8,pilh/2])
var holbnt = T([2,3])([3.5,1.2])(holbn)

var holNorth = STRUCT([hol2nt,holbnt])

//northfl = DIFFERENCE([nf,holNorth])

var northt= STRUCT(NN(3)([northfl,T([3])([pilh+solh])]))
var north = T([1,2,3])([16.8,9.5,cilh])(R([1,2])(PI)(northt))
var building = STRUCT([building2,floor0,floor1,floor2,floor3,floor4,trav1,north])
var VIEW(building)

var sf = CUBOID([0.2,9.6,pilh+solh])

var holbs1 = CUBOID([0.2,5.8,pilh/2])
var holbs1t = T([2,3])([cilh+1.5,1.2])(holbs1)
var holbs1w = STRUCT(NN(2)([holbs1t,T([3])([pilh+solh])]))

var holps = CUBOID([0.2,0.8,pilh-0.7])
var holpst = T([2,3])([8,cilh+solh+0.3])(holps)

var holbigs = CUBOID([0.2,8,pilh/2])
var holbigst = T([3])([cilh+pilh+solh+pilh+solh+1.2])(holbigs)

var hols = STRUCT([holbigst,holpst,holbs1w])

var southp = STRUCT(NN(3)([sf,T([3])([pilh+solh])]))
var southp = T([3])([solh+cilh])(southp)

//to be continued...
