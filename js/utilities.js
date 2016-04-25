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
    console.log("newURLTextLoad");
};


/**
 * @desc
 * @param
 * @param
 * @return
 **/

var multiplyMatrix = function (matrix2, matrix1) {
    var result = [];
    for (var j = 0; j < 4; j++) {
        result[j] = [];
        for (var k = 0; k < 4; k++) {
            var sum = 0;
            for (var i = 0; i < 4; i++) {
                sum = sum + (matrix1[i][k] * matrix2[j][i]);
            }
            result[j].push(sum);
        }
    }
    return result;
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var copyMatrix = function (matrix) {
    var result = [];
    for (var j = 0; j < 4; j++) {
        result[j] = [];
        for (var k = 0; k < 4; k++) {
            result[j].push(matrix[j][k]);
        }
    }
    return result;
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var invertMatrix = function (a) {
    b =[];
    var c = a[0][0], d = a[0][1], e = a[0][2], g = a[0][3], f = a[1][0], h = a[1][1], i = a[1][2], j = a[1][3], k = a[2][0], l = a[2][1], o = a[2][2], m = a[2][3], n = a[3][0], p = a[3][1], r = a[3][2], s = a[3][3], A = c * h - d * f, B = c * i - e * f, t = c * j - g * f, u = d * i - e * h, v = d * j - g * h, w = e * j - g * i, x = k * p - l * n, y = k * r - o * n, z = k * s - m * n, C = l * r - o * p, D = l * s - m * p, E = o * s - m * r, q = 1 / (A * E - B * D + t * C + u * z - v * y + w * x);
    b[0] = [];
    b[0].push((h * E - i * D + j * C) * q);
    b[0].push(( - d * E + e * D - g * C) * q);
    b[0].push((p * w - r * v + s * u) * q);
    b[0].push(( - l * w + o * v - m * u) * q);
    b[1] = [];
    b[1].push(( - f * E + i * z - j * y) * q);
    b[1].push((c * E - e * z + g * y) * q);
    b[1].push(( - n * w + r * t - s * B) * q);
    b[1].push((k * w - o * t + m * B) * q);
    b[2] = [];
    b[2].push((f * D - h * z + j * x) * q);
    b[2].push(( - c * D + d * z - g * x) * q);
    b[2].push((n * v - p * t + s * A) * q);
    b[2].push(( - k * v + l * t - m * A) * q);
    b[3] = [];
    b[3].push(( - f * C + h * y - i * x) * q);
    b[3].push((c * C - d * y + e * x) * q);
    b[3].push(( - n * u + p * B - r * A) * q);
    b[3].push((k * u - l * B + o * A) * q);
    return b;
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var toAxisAngle = function (matrix) {
    var rY = Math.atan(matrix[1][2], matrix[2][2]);
    var rX = Math.atan(matrix[0][2], matrix[2][2]);

    return [rX, rY];

};

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc Multiply two 2d vectors or alternatively a 2d vector and a number.
 * @param {Array} x 2d vector A
 * @param {Array} y 2d vector B can also be of type {Number}
 * @return {Array} representing the 2d vector
 **/
var vMN = function (x, y) {
    return ([x[0] * y, x[1] * y]);
};

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc Add two 2d vectors or alternatively a 2d vector and a number.
 * @param {Array} x 2d vector A
 * @param {Array} y 2d vector B can also be of type {Number}
 * @return {Array} representing the 2d vector
 **/

var vA = function (x, y) {
    return ([x[0] + y[0], x[1] + y[1]]);
};


/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc Divide 2d two vectors or alternatively a 2d vector and a number.
 * @param {Array} x 2d vector A
 * @param {Array} y 2d vector B can also be of type {Number}
 * @return {Array} representing the 2d vector
 **/

var vD = function (x, y) {
    return ([x[0] - y[0], x[1] - y[1]]);
};


/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc rotates a 2d vector by degrees.
 * @param {Array} vector the 2d vector that will be rotated.
 * @param {Number} rotation by how many degree the 2d vector should be rotated.
 * @return {Array} representing the rotated 2d vector.
 **/

var vR = function (vector, rotation) {
    return ([Math.cos(rotation) * vector[0] - Math.sin(rotation) * vector[1],
        Math.sin(rotation) * vector[0] + Math.cos(rotation) * vector[1]]);
};

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
    // console.log("interX, interY",interX, interY);

    if (!interY || !interX) {
        return false;
    }
    if (interY > h || interY < 0) {
        return false; //false if intersection of lines is output of canvas
    }
    //  console.log("point on line --- checking on segment now");
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
    // console.log("e1,e2,p :",e1,e2,p);
    if (e1 - marg2 <= p && p <= e2 + marg2) {
        return true;
    }
    if (e2 - marg2 <= p && p <= e1 + marg2) {
        return true;
    }

    return false;
};

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


   console.log("amount of event listenrs: " +ec);

};

/**********************************************************************************************************************
 **********************************************************************************************************************/

//@author Ben Reynolds
// given a 4x4 matrix and a 
// return true - if p is between thw two segment points,  false otherwise

/**
 * @desc Given a 4x4 transformation matrix and an x, y coordinate pair,
            calculates the z-position of the resulting point
 * @return the resulting z-coordinate (float)
 * @author Ben Reynolds
 **/
var getTransformedZ = function (matrix, x, y) {
    // console.log(x, y);
    // console.log(matrix);
    return matrix[2][0] * x + matrix[2][1] * y + matrix[2][3];
};

var getCornersClockwise = function(thisCanvas) {
    return [[0, 0, 0],
        [thisCanvas.width, 0, 0],
        [thisCanvas.width, thisCanvas.height, 0],
        [0, thisCanvas.height, 0]];
}

var areCornersEqual = function(corner1, corner2) {
    return (corner1[0] === corner2[0] && corner1[1] === corner2[1]);
}

var areCornerPairsIdentical = function(c1a, c1b, c2a, c2b) {
    return (areCornersEqual(c1a, c2a) && areCornersEqual(c1b, c2b));
}

var areCornerPairsSymmetric = function(c1a, c1b, c2a, c2b) {
    return (areCornersEqual(c1a, c2b) && areCornersEqual(c1b, c2a));
}

var areCornersAdjacent = function(corner1, corner2) {
    return (corner1[0] === corner2[0] || corner1[1] === corner2[1]); 
}

var areCornersOppositeZ = function(corner1, corner2) {
    var z1 = corner1[2];
    var z2 = corner2[2];
    var oppositeSign = ((z1 * z2) < 0);
    return oppositeSign;
}

// makes sure we don't add symmetric pairs to list
var addCornerPairToOppositeCornerPairs = function(cornerPair, oppositeCornerPairs) {
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

var getCenterOfPoints = function(points) {
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

var sortPointsClockwise = function(points) {
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


