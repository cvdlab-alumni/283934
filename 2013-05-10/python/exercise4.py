#Marco Sbaffoni - 283934


# EXERCISE 1 #

# Model: Ferrari F430

# EXERCISE 2 #

from pyplasm import *
import scipy
from scipy import *

#import sys
#sys.path.append("/home/marco/CGlib/larpy/larpy")

from lar import *


dom2D = GRID([5,5])

dom1D = INTERVALS(1)(20)
dom2D = PROD([dom1D,dom1D]) 

leftSideCP = [[0,0,1],[0,0,1],[0,0,1],[0,0,1],[8,0,0],[9,0,2.6],[10,0,2.9],[11,0,3.3],[12,0,2.9],[13,0,2.6],[14,0,0],[14,0,0],[34,0,0],[34,0,0],
[35,0,2.6],[36,0,2.9],[37.5,0,3.6],[39,0,2.9],[40,0,2.6],[41,0,0],[41,0,0],[45,0,2],[45,0,2],[45,0,2],[45,0,2]]
leftSideCP2 = [[0,0,1],[0,0,1],[0,0,1],[0,0,1],[0,0,3],[2,0,3.8],[5,0,4.5],[8,0,5],[9,0,5.6],[11,0,6],[12,0,6],[22,0,11.4],[27,0,12],[32,0,11.4],
[42,0,8],[45,0,8],[45,0,2],[45,0,2],[45,0,2],[45,0,2]]
leftSide = STRUCT([SPLINE(CUBICUBSPLINE(dom1D))(leftSideCP),SPLINE(CUBICUBSPLINE(dom1D))(leftSideCP2)])
rightSide = T(2)(18.72)(leftSide) 

sectionCP = [[0,0.46,1],[0,0.46,1],[0,0.46,1],[0,9,1.3],[0,18.26,1],[0,18.26,1],[0,18.72,5.75],[0,16.26,6.21],[0,13.5,11.4],
[0,12.5,11.4],[0,9.2,12],[0,6.14,11.4],[0,6.14,11.4],[0,3.38,6.21],[0,0.92,5.75],[0,0.46,1],[0,0.46,1],[0,0.46,1]]
section = SPLINE(CUBICUBSPLINE(dom1D))(sectionCP)

middleSide = T(1)(25)(section)

backSide = T(1)(45)(section)

section2CP = [[0,0.46,1],[0,0.46,1],[0,0.46,1],[0,9,1.3],[0,18.26,1],[0,18.26,1],[0,18.72,5.15],[0,16.26,5.21],
[0,3.38,5.21],[0,0.92,5.15],[0,0.46,1],[0,0.46,1],[0,0.46,1]]
section2 = T(1)(8.2)(SPLINE(CUBICUBSPLINE(dom1D))(section2CP))

frontSideCP= [[0,0.46,1],[0,0.46,1],[0,0.46,1],[0,9,1.3],[0,18.26,1],[0,18.26,1],[0,18.72,3.15],[0,16.26,3.21],
[0,3.38,3.21],[0,0.92,3.15],[0,0.46,1],[0,0.46,1],[0,0.46,1]]
frontSide = (SPLINE(CUBICUBSPLINE(dom1D))(frontSideCP))

backSideCP = [[0,0.46,1],[0,0.46,1],[0,0.46,1],[0,9,1.3],[0,18.26,1],[0,18.26,1],[0,18.72,5.75],[0,16.26,6.21],
[0,3.38,6.21],[0,0.92,5.75],[0,0.46,1],[0,0.46,1],[0,0.46,1]]
backSide = T([1,3])([45,2])(SPLINE(CUBICUBSPLINE(dom1D))(backSideCP))

upSideCP = [[8.28,0,5],[8.28,0,5],[8.28,0,5],[9,0,5.6],[11,0,6],[12,0,6],[22,0,11.4],[27,0,12],[32,0,11.4],[42,2,8],[45,3,8],[45,16,8],
[42,16,8],[32,18.4,11.4],[27,18.4,12],[22,18.4,11.4],[12,18.4,6],[11,18.4,6],[9,18.4,5.6],[8.28,18.4,5],[0,9.2,3],[8.28,0,5],[8.28,0,5],[8.28,0,5]]
upSide = SPLINE(CUBICUBSPLINE(dom2D))(upSideCP)
model = T([1,2,3])([-20,-9,-6])(STRUCT([leftSide,rightSide,middleSide,section2,frontSide,backSide,upSide]))
#VIEW(model)


#--EXERCISE 3--#

def circlePointsX(r,pos):
	xIn = r*2*0.05
	yOut = r*(4.0/3.0)
	return [[0,pos,0],[xIn,pos,yOut],[r*2 - xIn,pos,yOut],[r*2,pos,0],[r*2 - xIn,pos,-yOut],[xIn,pos,-yOut],[0,pos,0]]


radiusFront = 3
widthWheel = 2
radiusRear = 3.4

wheelFront = BEZIER(S1)(circlePointsX(radiusFront,0))
wheelRear = BEZIER(S1)(circlePointsX(radiusFront,3))

wheel = COLOR(BLACK)(OFFSET([0.6,0.6,0.6])(MAP(CYLINDRICALSURFACE([wheelFront,[0,widthWheel,0]]))(dom2D)))

wheel0 = T([1,2,3])([-11,-9.1,-4])(wheel)
wheel1= T([1,2,3])([15,-9.1,-4])(wheel)
wheel2 = T([1,2,3])([15,7.5,-4])(wheel)
wheel3 = T([1,2,3])([-11,7.5,-4])(wheel)

model =STRUCT([model,wheel0,wheel1,wheel2,wheel3]) 
#VIEW(model)


## EXERCISE 4 ##

steer = COLOR(BLACK)(STRUCT([T([1,2,3])([-2,-2,-2]),R([1,3])(PI/2),STRUCT([S([1,2,3])([1,1,1])(TORUS([1,2])([30,30]))])]))

model = STRUCT([model,steer])
VIEW(model)
