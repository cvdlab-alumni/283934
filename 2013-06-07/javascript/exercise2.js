/* 283934 - HOMEWORK 3 */

//EXERCISE 1
function getZ (v) {
	if(v[0]>v[1]){
		for (var i = v[0]; i >= 0; i--) {
			z = Math.floor((Math.sin(v[1])-Math.cos(v[0]) + Math.cos(v[1])-Math.sin(v[0]))*10)*0.05;
			}
		}
	else{
		for (var i = v[0]; i >= 0; i--) {
			z = Math.floor((Math.sin(v[1])-Math.cos(v[0]) + Math.cos(v[1])-Math.sin(v[0]))*10)*0.05;
		}

	
	if(z<=0)
		z=1 + 1/v[0]+1/v[1];

	return z;
	}
}

function generateArea(){
	var brown = [1.39,1.29,0.76]
	var domain = PROD1x1([INTERVALS(1)(16),INTERVALS(1)(16)]);
	var c0 = BEZIER(S0)([[0,0,0],[3,0,0]]);
	var c1 = BEZIER(S0)([[0,3,0],[3,5,0],[3,3,0]]);
	var out = MAP(BEZIER(S1)([c0,c1]))(domain);
	outT = STRUCT([R([0,1])(-PI/2),T([0,2])([1,0.12]),out]);
	var area = STRUCT([T([1])([2]),outT,T([1])([-2]),outT,T([1])([-2]),outT,T([1])([-2]),outT,T([1])([-2]),outT,T([1])([-2]),outT,T([1])([-2]),outT,T([1])([-2]),outT]);
	return STRUCT([COLOR(brown),area]);
}


var mapping = function (v) { return [v[0],v[1], getZ(v)]};
var dom =   PROD1x1([INTERVALS(19)(16),INTERVALS(19)(16)])
var mapped = STRUCT([COLOR([0.69,1.69,0.3]),MAP(mapping)(dom)]);
var mapped2 =STRUCT([T([0,1])([19,1]),R([0,1])(PI),mapped]);
var model01 = STRUCT([mapped,mapped2,generateArea()]);


//EXERCISE 2

var genLake = function(dim,trasl,col){return COLOR(col)(T([0,1,2])(trasl)(CUBOID(dim)));};

var dim = [19,35,0.05];
var trasl = [0,-16,0.05];
var col = [0.32,1.78,1.70];
var lake = genLake(dim, trasl,col);

var model = STRUCT([model01,lake]);
DRAW(model);
