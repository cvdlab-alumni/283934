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
var model02 = STRUCT([model01,lake]);


//EXERCISE 3
var domain = PROD1x1([INTERVALS(1)(20),INTERVALS(1)(6)]);	
var trunkRad = 0.1;
var trunkHeight = 0.2;
var crownRad = 0.2;
var crownHeight = 0.4;
var gap = crownHeight - trunkHeight;

var genTree = function(rad1,rad2,height1,height2,gap){
	var trunk = genTrunk(rad1,height1);
	var crown = genCrown(rad2,height2,gap);
	return STRUCT([trunk,crown]);
};

var genTrunk=function(rad,height){
	var ncpVector = [0,0,height];
	var funProfile = BEZIER(S0)([[-rad,0,0],[-rad,-rad,0],[0,-rad,0],[rad,-rad,0],[rad,0,0],[rad,rad,0],[0,rad,0],[-rad,rad,0],[-rad,0,0]]);
	var trunk = MAP(CYLINDRICAL_SURFACE(funProfile)(ncpVector))(domain);
	return STRUCT([COLOR([1.39,0.71,0.38])(trunk)]);
};

var genCrown = function(rad,ap,gap){
var apex = [0,0,ap];
var funProfile = BEZIER(S0)([[-rad,0,0],[-rad,-rad,0],[0,-rad,0],[rad,-rad,0],[rad,0,0],[rad,rad,0],[0,rad,0],[-rad,rad,0],[-rad,0,0]]);
var crown = MAP(CONICAL_SURFACE(apex)(funProfile))(domain);
return STRUCT([COLOR([0,1.28,0])(STRUCT([T([2])([gap]),crown]))]);
};

function positioning(x,y,tree){
	var z = getZ([x,y]);
	return STRUCT([T([0,1,2])([x,y,z]),tree]);
}

function generateForest(xs,ys){
	var startX = xs[0];
	var endX = xs[1];
	var startY = ys[0];
	var endY = ys[1];


	var forest = new Array();
	for(i=startX;i<endX;i++){
		for(j=startY;j<endY;j++){
			var randomize = Math.random();
		var tree = genTree(trunkRad+randomize/10,crownRad+randomize/10,trunkHeight+randomize/10,crownHeight+randomize/10,(crownHeight+randomize/10)-(trunkHeight+randomize/10));
			forest.push(positioning(i+randomize,j+randomize,tree));
		}
	}

	return STRUCT(forest);
}

var forest1 = generateForest([3,6],[14,16]);
var forest2 = generateForest([3,6],[8,12]);
var model = STRUCT([model02,forest1,forest2]);
DRAW(model);
