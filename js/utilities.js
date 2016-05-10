/**
 * @preserve
 *
 *                                      .,,,;;,'''..
 *                                  .'','...     ..',,,.
 *                                .,,,,,,',,',;;:;,.  .,l,
 *                               .,',.     ...     ,;,   :l.
 *                              ':;.    .'.:do;;.    .c   ol;'.
 *       ';;'                   ;.;    ', .dkl';,    .c   :; .'.',::,,'''.
 *      ',,;;;,.                ; .,'     .'''.    .'.   .d;''.''''.
 *     .oxddl;::,,.             ',  .'''.   .... .'.   ,:;..
 *      .'cOX0OOkdoc.            .,'.   .. .....     'lc.
 *     .:;,,::co0XOko'              ....''..'.'''''''.
 *     .dxk0KKdc:cdOXKl............. .. ..,c....
 *      .',lxOOxl:'':xkl,',......'....    ,'.
 *           .';:oo:...                        .
 *                .cd,      ╔═╗┌┬┐┬┌┬┐┌─┐┬─┐    .
 *                  .l;     ║╣  │││ │ │ │├┬┘    '
 *                    'l.   ╚═╝─┴┘┴ ┴ └─┘┴└─   '.
 *                     .o.                   ...
 *                      .''''','.;:''.........
 *                           .'  .l
 *                          .:.   l'
 *                         .:.    .l.
 *                        .x:      :k;,.
 *                        cxlc;    cdc,,;;.
 *                       'l :..   .c  ,
 *                       o.
 *                      .,
 *
 *              ╦ ╦┬ ┬┌┐ ┬─┐┬┌┬┐  ╔═╗┌┐  ┬┌─┐┌─┐┌┬┐┌─┐
 *              ╠═╣└┬┘├┴┐├┬┘│ ││  ║ ║├┴┐ │├┤ │   │ └─┐
 *              ╩ ╩ ┴ └─┘┴└─┴─┴┘  ╚═╝└─┘└┘└─┘└─┘ ┴ └─┘
 *
 *
 * Created by Valentin on 10/22/14.
 *
 * Copyright (c) 2015 Valentin Heun
 *
 * All ascii characters above must be included in any redistribution.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
/*********************************************************************************************************************
 ******************************************** TODOS *******************************************************************
 **********************************************************************************************************************

 **
 * TODO
 **

 **********************************************************************************************************************
 ******************************************** Utilities Section ******************************************************
 **********************************************************************************************************************/

var newURLTextLoad = function (){
    globalStates.newURLText = encodeURIComponent(document.getElementById('newURLText').value);
    cout("newURLTextLoad");
};


/**
 * @desc
 * @param
 * @param
 * @return
 **/

function multiplyMatrix(m2, m1) {
    var r = [];
    // Cm1che only the current line of the second mm1trix
    r[0] = m2[0]*m1[0] + m2[1]*m1[4] + m2[2]*m1[8] + m2[3]*m1[12];
    r[1] = m2[0]*m1[1] + m2[1]*m1[5] + m2[2]*m1[9] + m2[3]*m1[13];
    r[2] = m2[0]*m1[2] + m2[1]*m1[6] + m2[2]*m1[10] + m2[3]*m1[14];
    r[3] = m2[0]*m1[3] + m2[1]*m1[7] + m2[2]*m1[11] + m2[3]*m1[15];

    r[4] = m2[4]*m1[0] + m2[5]*m1[4] + m2[6]*m1[8] + m2[7]*m1[12];
    r[5] = m2[4]*m1[1] + m2[5]*m1[5] + m2[6]*m1[9] + m2[7]*m1[13];
    r[6] = m2[4]*m1[2] + m2[5]*m1[6] + m2[6]*m1[10] + m2[7]*m1[14];
    r[7] = m2[4]*m1[3] + m2[5]*m1[7] + m2[6]*m1[11] + m2[7]*m1[15];

    r[8] = m2[8]*m1[0] + m2[9]*m1[4] + m2[10]*m1[8] + m2[11]*m1[12];
    r[9] = m2[8]*m1[1] + m2[9]*m1[5] + m2[10]*m1[9] + m2[11]*m1[13];
    r[10] = m2[8]*m1[2] + m2[9]*m1[6] + m2[10]*m1[10] + m2[11]*m1[14];
    r[11] = m2[8]*m1[3] + m2[9]*m1[7] + m2[10]*m1[11] + m2[11]*m1[15];

    r[12] = m2[12]*m1[0] + m2[13]*m1[4] + m2[14]*m1[8] + m2[15]*m1[12];
    r[13] = m2[12]*m1[1] + m2[13]*m1[5] + m2[14]*m1[9] + m2[15]*m1[13];
    r[14] = m2[12]*m1[2] + m2[13]*m1[6] + m2[14]*m1[10] + m2[15]*m1[14];
    r[15] = m2[12]*m1[3] + m2[13]*m1[7] + m2[14]*m1[11] + m2[15]*m1[15];
    return r;
}

var multiplyMatrix4 = function(m1, m2) {
    var r = [];
    var x = m1[0], y = m1[1], z = m1[2], w = m1[3];
    r[0] = m2[0] * x + m2[4] * y + m2[8] * z + m2[12] * w;
    r[1] = m2[1] * x + m2[5] * y + m2[9] * z + m2[13] * w;
    r[2] = m2[2] * x + m2[6] * y + m2[10] * z + m2[14] * w;
    r[3] = m2[3] * x + m2[7] * y + m2[11] * z + m2[15] * w;
    return r;
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function copyMatrix(matrix) {
    var r = []; //new Array(16);
    r[0] = matrix[0];
    r[1] = matrix[1];
    r[2] = matrix[2];
    r[3] = matrix[3];
    r[4] = matrix[4];
    r[5] = matrix[5];
    r[6] = matrix[6];
    r[7] = matrix[7];
    r[8] = matrix[8];
    r[9] = matrix[9];
    r[10] = matrix[10];
    r[11] = matrix[11];
    r[12] = matrix[12];
    r[13] = matrix[13];
    r[14] = matrix[14];
    r[15] = matrix[15];
    return r;
}

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var invertMatrix = function (a) {
    var b = [];
    var c = a[0], d = a[1], e = a[2], g = a[3], f = a[4], h = a[5], i = a[6], j = a[7], k = a[8], l = a[9], o = a[10], m = a[11], n = a[12], p = a[13], r = a[14], s = a[15], A = c * h - d * f, B = c * i - e * f, t = c * j - g * f, u = d * i - e * h, v = d * j - g * h, w = e * j - g * i, x = k * p - l * n, y = k * r - o * n, z = k * s - m * n, C = l * r - o * p, D = l * s - m * p, E = o * s - m * r, q = 1 / (A * E - B * D + t * C + u * z - v * y + w * x);
    b[0] = (h * E - i * D + j * C) * q;
    b[1] = ( - d * E + e * D - g * C) * q;
    b[2] = (p * w - r * v + s * u) * q;
    b[3] = ( - l * w + o * v - m * u) * q;
    b[4] = ( - f * E + i * z - j * y) * q;
    b[5] = (c * E - e * z + g * y) * q;
    b[6] = ( - n * w + r * t - s * B) * q;
    b[7] = (k * w - o * t + m * B) * q;
    b[8] = (f * D - h * z + j * x) * q;
    b[9] = ( - c * D + d * z - g * x) * q;
    b[10] = (n * v - p * t + s * A) * q;
    b[11] = ( - k * v + l * t - m * A) * q;
    b[12] = ( - f * C + h * y - i * x) * q;
    b[13] = (c * C - d * y + e * x) * q;
    b[14] = ( - n * u + p * B - r * A) * q;
    b[15] = (k * u - l * B + o * A) * q;
    return b;
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function toAxisAngle(matrix) {
    var rY = Math.atan(matrix[6], matrix[10]);
    var rX = Math.atan(matrix[2], matrix[10]);

    return [rX, rY];

}

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/
var checkLineCross = function (x11, y11, x12, y12, x21, y21, x22, y22, w, h) {
    var l1 = lineEq(x11, y11, x12, y12),
        l2 = lineEq(x21, y21, x22, y22);
  
    var interX = calculateX(l1, l2); //calculate the intersection X value
    if (interX > w || interX < 0) {
        return false; //false if intersection of lines is output of canvas
    }
    var interY = calculateY(l1, interX);
    // cout("interX, interY",interX, interY);

    if (!interY || !interX) {
        return false;
    }
    if (interY > h || interY < 0) {
        return false; //false if intersection of lines is output of canvas
    }
    //  cout("point on line --- checking on segment now");
    return (checkBetween(x11, x12, interX) && checkBetween(y11, y12, interY)
    && checkBetween(x21, x22, interX) && checkBetween(y21, y22, interY));
};

/**********************************************************************************************************************
 **********************************************************************************************************************/

//function for calculating the line equation.
//returns [m, b], where this corresponds to y = mx + b
//y = [(y1-y2)/(x1-x2), -(y1-y2)/(x1-x2)*x1 + y1]

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var lineEq = function (x1, y1, x2, y2) {
    var m = slopeCalc(x1, y1, x2, y2);
    // if(m == 'vertical'){
    //     return ['vertical', 'vertical'];
    // }
    return [m, -1 * m * x1 + y1];

};

/**********************************************************************************************************************
 **********************************************************************************************************************/

//function for calucating the slope of given points
//slope has to be multiplied by -1 because the y-axis value increases we we go down

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var slopeCalc = function (x1, y1, x2, y2) {
    if ((x1 - x2) == 0) {
        return 9999; //handle cases when slope is infinity
    }
    return (y1 - y2) / (x1 - x2);
};

/**********************************************************************************************************************
 **********************************************************************************************************************/

//calculate the intersection x value given two line segment
//param: [m1,b1], [m2,b2]
//return x -> the x value

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var calculateX = function (seg1, seg2) {
    return (seg2[1] - seg1[1]) / (seg1[0] - seg2[0]);
};

/**********************************************************************************************************************
 **********************************************************************************************************************/

//calculate y given x and the line equation

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var calculateY = function (seg1, x) {
    return seg1[0] * x + seg1[1];
};

/**********************************************************************************************************************
 **********************************************************************************************************************/

//given two end points of the segment and some other point p,
//return true - if p is between thw two segment points,  false otherwise

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var checkBetween = function (e1, e2, p) {
    const marg2 = 2;
    // cout("e1,e2,p :",e1,e2,p);
    if (e1 - marg2 <= p && p <= e2 + marg2) {
        return true;
    }
    if (e2 - marg2 <= p && p <= e1 + marg2) {
        return true;
    }

    return false;
};

function map(x, in_min, in_max, out_min,out_max) {
    if (x > in_max) x = in_max;
    if (x < in_min) x = in_min;
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// created by Valentin
var uuidTime = function (){
    var dateUuidTime =new Date();
    var abcUuidTime = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var stampUuidTime = parseInt(Math.floor((Math.random() * 199) + 1)+""+dateUuidTime.getTime()).toString(36);
    while(stampUuidTime.length<12) stampUuidTime =abcUuidTime.charAt(Math.floor(Math.random() * abcUuidTime.length))+stampUuidTime;
    return stampUuidTime
};

var uuidTimeShort = function (){
    var dateUuidTime =new Date();
    var abcUuidTime = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var stampUuidTime = parseInt(""+dateUuidTime.getMilliseconds()+dateUuidTime.getMinutes()+dateUuidTime.getHours()+dateUuidTime.getDay()).toString(36);
    while(stampUuidTime.length<8) stampUuidTime =abcUuidTime.charAt(Math.floor(Math.random() * abcUuidTime.length))+stampUuidTime;
    return stampUuidTime
};


var randomIntInc = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * @author Erik Karlsson, www.nonobtrusive.com
 **/
var countEventHandlers = function (){


   cout("amount of event listenrs: " +ec);

};


/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function checkForNetworkLoop(globalObjectA, globalLocationInA, globalObjectB, globalLocationInB){

    var signalIsOk = true;
    var thisTempObject = objectExp[globalObjectA];
    var thisTempObjectLinks = thisTempObject.objectLinks;

    // check if connection is with it self
    if (globalObjectA === globalObjectB && globalLocationInA === globalLocationInB) {
        signalIsOk = false;
    }

    // todo check that objects are making these checks as well for not producing overlapeses.
    // check if this connection already exists?
    if(signalIsOk) {
        for (var thisSubKey in thisTempObjectLinks) {
            if (thisTempObjectLinks[thisSubKey].ObjectA === globalObjectA &&
                thisTempObjectLinks[thisSubKey].ObjectB === globalObjectB &&
                thisTempObjectLinks[thisSubKey].locationInA === globalLocationInA &&
                thisTempObjectLinks[thisSubKey].locationInB === globalLocationInB) {
                signalIsOk = false;
            }

        }
    }
    // check that there is no endless loops through it self or any other connections
    if(signalIsOk) {
        searchL(globalLocationInB, globalObjectB, globalLocationInA, globalObjectA);

        function searchL(locationInB, ObjectB, locationInA, ObjectA) {
            for (var key in objectExp[ObjectB].objectLinks) {
                cout(ObjectB);
                var Bn = objectExp[ObjectB].objectLinks[key];
                if (locationInB === Bn.locationInA) {
                    if (locationInA === Bn.locationInB && ObjectA === Bn.ObjectB) {
                        signalIsOk = false;
                        break;
                    } else {
                        searchL(Bn.locationInB, Bn.ObjectB, locationInA, ObjectA);
                    }
                }
            }
        }
    }

    return signalIsOk;
}

function cout(e){
    if(globalStates.debug){
        console.log(e);
    }
}

function timeSynchronizer(timeing) {
    timeing.now = Date.now();
    timeing.delta = (timeing.now - timeing.then)/198;
    timeing.then = timeing.now;
}

/**********************************************************************************************************************
 **********************************************************************************************************************/

//@author Ben Reynolds
// given a 4x4 matrix and a
// return true - if p is between thw two segment points,  false otherwise

/**
 * @desc Given a 4x4 transformation matrix and an x, y coordinate pair,
            calculates the z-position of the ring point
 * @return the ring z-coordinate (float)
 * @author Ben Reynolds
 **/


function getCenterOfPoints(points) {
    if (points.length < 1) { return [0,0]; }
    var sumX = 0;
    var sumY = 0;
    points.forEach(function(point) {
        sumX += point[0];
        sumY += point[1];
    });
    var avgX = sumX / points.length;
    var avgY = sumY / points.length;
    return [avgX, avgY];
}

function sortPointsClockwise(points) {
    var centerPoint = getCenterOfPoints(points);
    var centerX = centerPoint[0];
    var centerY = centerPoint[1];

    var comparePoints = function(a,b) {
        var atanA = Math.atan2(a[1] - centerY, a[0] - centerX);
        var atanB = Math.atan2(b[1] - centerY, b[0] - centerX);
        if (atanA < atanB) return -1;
        else if (atanB > atanA) return 1;
        return 0;
    }

    return points.sort(comparePoints);
}

function getCornersClockwise(thisCanvas) {
    return [[0, 0, 0],
        [thisCanvas.width, 0, 0],
        [thisCanvas.width, thisCanvas.height, 0],
        [0, thisCanvas.height, 0]];
}

function areCornersEqual(corner1, corner2) {
    return (corner1[0] === corner2[0] && corner1[1] === corner2[1]);
}


function areCornerPairsIdentical(c1a, c1b, c2a, c2b) {
    return (areCornersEqual(c1a, c2a) && areCornersEqual(c1b, c2b));
}

function areCornerPairsSymmetric(c1a, c1b, c2a, c2b) {
    return (areCornersEqual(c1a, c2b) && areCornersEqual(c1b, c2a));
}

function areCornersAdjacent(corner1, corner2) {
    return (corner1[0] === corner2[0] || corner1[1] === corner2[1]);
}

function areCornersOppositeZ(corner1, corner2) {
    var z1 = corner1[2];
    var z2 = corner2[2];
    var oppositeSign = ((z1 * z2) < 0);
    return oppositeSign;
}




// makes sure we don't add symmetric pairs to list
function addCornerPairToOppositeCornerPairs(cornerPair, oppositeCornerPairs) {
    var corner1 = cornerPair[0];
    var corner2 = cornerPair[1];
    var safeToAdd = true;
    if (oppositeCornerPairs.length > 0) {
        oppositeCornerPairs.forEach(function(pairList) {
            var existingCorner1 = pairList[0];
            var existingCorner2 = pairList[1];
            if (areCornerPairsSymmetric(existingCorner1, existingCorner2, corner1, corner2)) {
                // console.log("symmetric", existingCorner1, existingCorner2, corner1, corner2);
                safeToAdd = false;
                return;
            }
            if (areCornerPairsIdentical(existingCorner1, existingCorner2, corner1, corner2)) {
                // console.log("identical", existingCorner1, existingCorner2, corner1, corner2);
                safeToAdd = false;
                return;
            }
        });
    }
    if (safeToAdd) {
        oppositeCornerPairs.push([corner1, corner2]);
    }
}

function estimateIntersection(theObject, mCanvas) {

    var thisCanvas = document.getElementById("canvas"+theObject);

    // var newMatrix = copyMatrix(multiplyMatrix(globalMatrix.begin, invertMatrix(globalMatrix.temp)));

   // var mCanvas = mat1x16From4x4(matrix);
    // var mCanvas = getTransformMatrixForDiv(theDiv);

    // console.log("mCanvas: ", mCanvas);
    // console.log("newMatrix: ", newMatrix);

    // console.log("estimate");
    ////////////////////////////////////////

    var corners = getCornersClockwise(thisCanvas);
    var out = [0,0,0,0];
    corners.forEach(function(corner, index) {
        var x = corner[0] - thisCanvas.width/2;
        var y = corner[1] - thisCanvas.height/2;
        var input = [x,y,0,1]; // assumes z-position of corner is always 0
        // console.log(out, input, mCanvas);

        out=  multiplyMatrix4(input, mCanvas);
        // var z = getTransformedZ(matrix,x,y)
        corner[2] = out[2]; // sets z position of corner to its eventual transformed value
    });

    // console.log("corners", corners);

    var oppositeCornerPairs = [];
    corners.forEach(function(corner1) {
        corners.forEach(function(corner2) {
            // only check adjacent pairs of corners
            // ignore same corner
            if (areCornersEqual(corner1, corner2)) { return; }

            // x or y should be the same
            if (areCornersAdjacent(corner1, corner2)) {
                if (areCornersOppositeZ(corner1, corner2)) {
                    addCornerPairToOppositeCornerPairs([corner1, corner2], oppositeCornerPairs);
                }
            }
        });
    });

    // console.log("oppositeCornerPairs", oppositeCornerPairs);

    // for each opposite corner pair, binary search for the x,y location that will correspond with 0 z-pos
    // .... or can it be calculated directly....? it's just a linear equation!!!
    var interceptPoints = [];
    oppositeCornerPairs.forEach(function(cornerPair) {
        var c1 = cornerPair[0];
        var c2 = cornerPair[1];
        var x1 = c1[0];
        var y1 = c1[1];
        var z1 = c1[2];
        var x2 = c2[0];
        var y2 = c2[1];
        var z2 = c2[2];

        if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
            // console.log("dx");
            var slope = ((z2 - z1)/(x2 - x1));
            var x_intercept = x1 - (z1 / slope);
            interceptPoints.push([x_intercept, y1]);
        } else {
            // console.log("dy");
            var slope = ((z2 - z1)/(y2 - y1));
            var y_intercept = y1 - (z1 / slope);
            interceptPoints.push([x1, y_intercept]);
        }
    });

    // console.log("interceptPoints", interceptPoints);

    ////////////////////////////////////////

    // get corners, add in correct order so they get drawn clockwise

    corners.forEach(function(corner) {
        if (corner[2] < 0) {
            interceptPoints.push(corner);
        }
    });

    // console.log("interceptPoints+corners", interceptPoints);

    var sortedPoints = sortPointsClockwise(interceptPoints);
    // console.log("sortedPoints", sortedPoints);

    // draws blue and purple diagonal lines to mask the image
    var ctx=thisCanvas.getContext("2d");
    ctx.clearRect(0, 0, thisCanvas.width, thisCanvas.height);

    var diagonalLineWidth = 22;
    ctx.lineWidth = diagonalLineWidth;
    ctx.strokeStyle = '#01FFFC';
    for (var i=-thisCanvas.height; i<thisCanvas.width; i+=2.5*diagonalLineWidth) {
        ctx.beginPath();
        ctx.moveTo(i, -diagonalLineWidth/2);
        ctx.lineTo(i + thisCanvas.height+diagonalLineWidth/2, thisCanvas.height+diagonalLineWidth/2);
        ctx.stroke();
    }

    // Save the state, so we can undo the clipping
    ctx.save();

    // Create a circle
    ctx.beginPath();

    if (sortedPoints.length > 2) {
        ctx.beginPath();
        ctx.moveTo(sortedPoints[0][0], sortedPoints[0][1]);
        sortedPoints.forEach(function(point) {
            ctx.lineTo(point[0], point[1]);
        });
        ctx.closePath();
        // ctx.fill();
    }
    // Clip to the current path
    ctx.clip();

    // draw whatever needs to get masked here!

    var diagonalLineWidth = 22;
    ctx.lineWidth = diagonalLineWidth;
    ctx.strokeStyle = '#FF01FC';
    for (var i=-thisCanvas.height; i<thisCanvas.width; i+=2.5*diagonalLineWidth) {
        ctx.beginPath();
        ctx.moveTo(i, -diagonalLineWidth/2);
        ctx.lineTo(i + thisCanvas.height+diagonalLineWidth/2, thisCanvas.height+diagonalLineWidth/2);
        ctx.stroke();
    }

    // Undo the clipping
    ctx.restore();
}