#pareti

nf = CUBOID([0.2,9.6,pilh+solh])

hol1n = CUBOID([0.2,0.2,pilh])

hol2n = STRUCT([hol1n,T([2])([0.4]),hol1n])

hol2nt = T([2,3])([0.2,0.2])(hol2n)

holbn = CUBOID([0.2,5.8,pilh/2])
holbnt = T([2,3])([3.5,1.2])(holbn)

holNorth = STRUCT([hol2nt,holbnt])

northfl = DIFFERENCE([nf,holNorth])

northt= STRUCT(NN(3)([northfl,T([3])([pilh+solh])]))
north = T([1,2,3])([16.8,9.5,cilh])(R([1,2])(PI)(northt))
building = STRUCT([building2,floor0,floor1,floor2,floor3,floor4,trav1,north])
VIEW(building)


#south
sf = CUBOID([0.2,9.6,pilh+solh])

holbs1 = CUBOID([0.2,5.8,pilh/2])
holbs1t = T([2,3])([cilh+1.5,1.2])(holbs1)
holbs1w = STRUCT(NN(2)([holbs1t,T([3])([pilh+solh])]))

holps = CUBOID([0.2,0.8,pilh-0.7])
holpst = T([2,3])([8,cilh+solh+0.3])(holps)

holbigs = CUBOID([0.2,8,pilh/2])
holbigst = T([3])([cilh+pilh+solh+pilh+solh+1.2])(holbigs)

hols = STRUCT([holbigst,holpst,holbs1w])

southp = STRUCT(NN(3)([sf,T([3])([pilh+solh])]))
southp = T([3])([solh+cilh])(southp)


#to be continued...