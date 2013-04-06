#exercise01.py

from pyplasm import *

cilh = 3.5
cilr = 0.5
cilspanx = 3.4
cilspany = 7.2
solh = 0.5

#da rivedere altezza
cylbase = CYLINDER([cilr,cilh])(36);

cylrow0 = STRUCT(NN(5)([cylbase,T([1])([cilr+cilspanx])]))

cylsol = T([2,3])([cilspany,solh])(CYLINDER([cilr,cilh-solh])(36))

GRID = COMP([INSR(PROD),AA(QUOTE)])

pilh = cilh-solh
pild = 0.5
pilxd1 = 1.6
pilxd2 = 1.4
pilxd3 = 3.4
pildy = 7

pilRow0 = GRID([[-pild, -pilxd1, pild, -pilxd2, pild, -pilxd3, pild,-pilxd3,pild],[-pildy, pild],[-solh,pilh]])


pillars0 = STRUCT([cylrow0,cylsol,pilRow0])

pil1=GRID([[pild,-cilspanx,pild,-cilspanx,pild,-cilspanx,pild,-cilspanx,pild],[pild],[-cilh,-solh,pilh]])
pilrow1 = T([1,2])([-0.25,-0.25])(pil1)

#per il primo pilastro lo faccio a mano
pilRow11 = GRID([[-pild,-cilspanx,pild,-cilspanx,pild,-cilspanx,-pild,-cilspanx,pild],[-pildy,pild],[-cilh,-solh,pilh]])

pilsol1 = T([1])([-0.25])(STRUCT([GRID([[pild],[-pildy,pild],[-cilh,-solh,pilh]])]))


#pilastro cilindrico p1
cil1temp = CYLINDER([cilr,cilh-solh])(36)
cil1 = T([1,2,3])([pild+cilspanx+pild+cilspanx+pild+cilspanx+0.25,pildy+0.25,cilh+solh])(cil1temp)

pillars1 = STRUCT([pilrow1,pilRow11,pilsol1,cil1])

#terzo piano
pilRow21 = GRID([[-pild,-cilspanx,pild,-cilspanx,pild,-cilspanx,pild,-cilspanx,pild],[-pildy,pild],[-cilh,-solh,-pilh,-solh,pilh]])

pilsol2 = T([1])([-0.25])(STRUCT([GRID([[pild],[-pildy,pild],[-cilh,-solh,-pilh,-solh,pilh]])]))

pil2=GRID([[pild,-cilspanx,pild,-cilspanx,-pild,-cilspanx,-pild,-cilspanx,pild],[pild],[-cilh,-solh,-pilh,-solh,pilh]])
pilrow2 = T([1,2])([-0.25,-0.25])(pil2)

pillars2 = STRUCT([pilRow21,pilsol2,pilrow2])


#quarto piano
pilRow31 = GRID([[-pild,-cilspanx,-pild,-cilspanx,pild,-cilspanx,pild,-cilspanx,pild],[-pildy,pild],[-cilh,-solh,-pilh,-solh,-pilh,-solh,pilh]])

pil3=GRID([[-pild,-cilspanx,-pild,-cilspanx,pild,-cilspanx,-pild,-cilspanx,pild],[pild],[-cilh,-solh,-pilh,-solh,-pilh,-solh,pilh]])
pilrow3 = T([1,2])([-0.25,-0.25])(pil3)

pilsd = 0.2
pilsm3 = GRID([[-pilsd,-pild,-cilspanx,pilsd],[-pildy,pilsd],[-cilh,-solh,-pilh,-solh,-pilh,-solh,pilh]])
pilsol3 = T([1])([-0.25])(STRUCT([GRID([[pilsd],[-pildy,pilsd],[-cilh,-solh,-pilh,-solh,-pilh,-solh,pilh]])]))
pillars3 = STRUCT([pilRow31,pilrow3,pilsm3,pilsol3])

building = STRUCT([pillars0,pillars1,pillars2,pillars3])
VIEW(building)
