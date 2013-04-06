T = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });

  return function (values) {
    return function (object) {
     return object.clone().translate(dims, values);
    };
  };
};
  
R = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });
   
  return function (angle) {
    return function (object) {
      return object.clone().rotate(dims, angle);
    };
  };
};
  
S = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });

  return function (values) {
    return function (object) {
      return object.clone().scale(dims, values);
    };
  };
};

S3 = S2;
S2 = S1;
S1 = S0;

GRID = SIMPLEX_GRID;

NN = REPLICA;

VIEW = DRAW;

CYLINDER = CYL_SURFACE;

var cilh = 3.5;
var cilr = 0.5;
var cilspanx = 3.4;
var cilspany = 7.2;
var solh = 0.5;

var cylbase = CYLINDER([cilr,cilh])(36);

var cylrow0 = STRUCT(NN(5)([cylbase,T([1])([cilr+cilspanx])]));

var cylsol = T([2,3])([cilspany,solh])(CYLINDER([cilr,cilh-solh])(36));

var pilh = cilh-solh;
var pild = 0.5;
var pilxd1 = 1.6;
var pilxd2 = 1.4;
var pilxd3 = 3.4;
var pildy = 7;

var pilRow0 = GRID([[-pild, -pilxd1, pild, -pilxd2, pild, -pilxd3, pild,-pilxd3,pild],[-pildy, pild],[-solh,pilh]]);
var pillars0 = STRUCT([cylrow0,cylsol,pilRow0]);
var pil1=GRID([[pild,-cilspanx,pild,-cilspanx,pild,-cilspanx,pild,-cilspanx,pild],[pild],[-cilh,-solh,pilh]]);
var pilrow1 = T([1,2])([-0.25,-0.25])(pil1);

var pilRow11 = GRID([[-pild,-cilspanx,pild,-cilspanx,pild,-cilspanx,-pild,-cilspanx,pild],[-pildy,pild],[-cilh,-solh,pilh]]);
var pilsol1 = T([1])([-0.25])(STRUCT([GRID([[pild],[-pildy,pild],[-cilh,-solh,pilh]])]));

var cil1temp = CYLINDER([cilr,cilh-solh])(36);
var cil1 = T([1,2,3])([pild+cilspanx+pild+cilspanx+pild+cilspanx+0.25,pildy+0.25,cilh+solh])(cil1temp);
var pillars1 = STRUCT([pilrow1,pilRow11,pilsol1,cil1]);

var pilRow21 = GRID([[-pild,-cilspanx,pild,-cilspanx,pild,-cilspanx,pild,-cilspanx,pild],[-pildy,pild],[-cilh,-solh,-pilh,-solh,pilh]]);
var pilsol2 = T([1])([-0.25])(STRUCT([GRID([[pild],[-pildy,pild],[-cilh,-solh,-pilh,-solh,pilh]])]));
var pil2=GRID([[pild,-cilspanx,pild,-cilspanx,-pild,-cilspanx,-pild,-cilspanx,pild],[pild],[-cilh,-solh,-pilh,-solh,pilh]]);
var pilrow2 = T([1,2])([-0.25,-0.25])(pil2);
var pillars2 = STRUCT([pilRow21,pilsol2,pilrow2]);

var pilRow31 = GRID([[-pild,-cilspanx,-pild,-cilspanx,pild,-cilspanx,pild,-cilspanx,pild],[-pildy,pild],[-cilh,-solh,-pilh,-solh,-pilh,-solh,pilh]]);
var pil3=GRID([[-pild,-cilspanx,-pild,-cilspanx,pild,-cilspanx,-pild,-cilspanx,pild],[pild],[-cilh,-solh,-pilh,-solh,-pilh,-solh,pilh]]);
var pilrow3 = T([1,2])([-0.25,-0.25])(pil3);

var pilsd = 0.2;
var pilsm3 = GRID([[-pilsd,-pild,-cilspanx,pilsd],[-pildy,pilsd],[-cilh,-solh,-pilh,-solh,-pilh,-solh,pilh]]);
var pilsol3 = T([1])([-0.25])(STRUCT([GRID([[pilsd],[-pildy,pilsd],[-cilh,-solh,-pilh,-solh,-pilh,-solh,pilh]])]));
var pillars3 = STRUCT([pilRow31,pilrow3,pilsm3,pilsol3]);

var building = STRUCT([pillars0,pillars1,pillars2,pillars3]);
VIEW(building);