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

function newURLTextLoad(){

    globalStates.newURLText = encodeURIComponent(document.getElementById('newURLText').value);
}


/**
 * @desc
 * @param
 * @param
 * @return
 **/
/*
function multiplyMatrix(result, matrix2, matrix1) {

    // Cmatrix1che only the current line of the second mmatrix1trix
    result[0] = matrix2[0]*matrix1[0] + matrix2[1]*matrix1[4] + matrix2[2]*matrix1[8] + matrix2[3]*matrix1[12];
    result[1] = matrix2[0]*matrix1[1] + matrix2[1]*matrix1[5] + matrix2[2]*matrix1[9] + matrix2[3]*matrix1[13];
    result[2] = matrix2[0]*matrix1[2] + matrix2[1]*matrix1[6] + matrix2[2]*matrix1[10] + matrix2[3]*matrix1[14];
    result[3] = matrix2[0]*matrix1[3] + matrix2[1]*matrix1[7] + matrix2[2]*matrix1[11] + matrix2[3]*matrix1[15];

    result[4] = matrix2[4]*matrix1[0] + matrix2[5]*matrix1[4] + matrix2[6]*matrix1[8] + matrix2[7]*matrix1[12];
    result[5] = matrix2[4]*matrix1[1] + matrix2[5]*matrix1[5] + matrix2[6]*matrix1[9] + matrix2[7]*matrix1[13];
    result[6] = matrix2[4]*matrix1[2] + matrix2[5]*matrix1[6] + matrix2[6]*matrix1[10] + matrix2[7]*matrix1[14];
    result[7] = matrix2[4]*matrix1[3] + matrix2[5]*matrix1[7] + matrix2[6]*matrix1[11] + matrix2[7]*matrix1[15];

    result[8] = matrix2[8]*matrix1[0] + matrix2[9]*matrix1[4] + matrix2[10]*matrix1[8] + matrix2[11]*matrix1[12];
    result[9] = matrix2[8]*matrix1[1] + matrix2[9]*matrix1[5] + matrix2[10]*matrix1[9] + matrix2[11]*matrix1[13];
    result[10] = matrix2[8]*matrix1[2] + matrix2[9]*matrix1[6] + matrix2[10]*matrix1[10] + matrix2[11]*matrix1[14];
    result[11] = matrix2[8]*matrix1[3] + matrix2[9]*matrix1[7] + matrix2[10]*matrix1[11] + matrix2[11]*matrix1[15];

    result[12] = matrix2[12]*matrix1[0] + matrix2[13]*matrix1[4] + matrix2[14]*matrix1[8] + matrix2[15]*matrix1[12];
    result[13] = matrix2[12]*matrix1[1] + matrix2[13]*matrix1[5] + matrix2[14]*matrix1[9] + matrix2[15]*matrix1[13];
    result[14] = matrix2[12]*matrix1[2] + matrix2[13]*matrix1[6] + matrix2[14]*matrix1[10] + matrix2[15]*matrix1[14];
    result[15] = matrix2[12]*matrix1[3] + matrix2[13]*matrix1[7] + matrix2[14]*matrix1[11] + matrix2[15]*matrix1[15];
    return result;
}
*/
/**
 * @desc
 * @param
 * @param
 * @return
 **/
/*
function copyMatrix(result, matrix) {
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    result[8] = matrix[8];
    result[9] = matrix[9];
    result[10] = matrix[10];
    result[11] = matrix[11];
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = matrix[15];
    return result;
}
*/
/**
 * @desc
 * @param
 * @param
 * @return
 **/
/*
function invertMatrix(matrix) {

    var inverse = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    var output = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

    inverse[0] = matrix[5] * matrix[10] * matrix[15] -
    matrix[5] * matrix[11] * matrix[14] -
    matrix[9] * matrix[6] * matrix[15] +
    matrix[9] * matrix[7] * matrix[14] +
    matrix[13] * matrix[6] * matrix[11] -
    matrix[13] * matrix[7] * matrix[10];

    inverse[4] = -matrix[4] * matrix[10] * matrix[15] +
    matrix[4] * matrix[11] * matrix[14] +
    matrix[8] * matrix[6] * matrix[15] -
    matrix[8] * matrix[7] * matrix[14] -
    matrix[12] * matrix[6] * matrix[11] +
    matrix[12] * matrix[7] * matrix[10];

    inverse[8] = matrix[4] * matrix[9] * matrix[15] -
    matrix[4] * matrix[11] * matrix[13] -
    matrix[8] * matrix[5] * matrix[15] +
    matrix[8] * matrix[7] * matrix[13] +
    matrix[12] * matrix[5] * matrix[11] -
    matrix[12] * matrix[7] * matrix[9];

    inverse[12] = -matrix[4] * matrix[9] * matrix[14] +
    matrix[4] * matrix[10] * matrix[13] +
    matrix[8] * matrix[5] * matrix[14] -
    matrix[8] * matrix[6] * matrix[13] -
    matrix[12] * matrix[5] * matrix[10] +
    matrix[12] * matrix[6] * matrix[9];

    inverse[1] = -matrix[1] * matrix[10] * matrix[15] +
    matrix[1] * matrix[11] * matrix[14] +
    matrix[9] * matrix[2] * matrix[15] -
    matrix[9] * matrix[3] * matrix[14] -
    matrix[13] * matrix[2] * matrix[11] +
    matrix[13] * matrix[3] * matrix[10];

    inverse[5] = matrix[0] * matrix[10] * matrix[15] -
    matrix[0] * matrix[11] * matrix[14] -
    matrix[8] * matrix[2] * matrix[15] +
    matrix[8] * matrix[3] * matrix[14] +
    matrix[12] * matrix[2] * matrix[11] -
    matrix[12] * matrix[3] * matrix[10];

    inverse[9] = -matrix[0] * matrix[9] * matrix[15] +
    matrix[0] * matrix[11] * matrix[13] +
    matrix[8] * matrix[1] * matrix[15] -
    matrix[8] * matrix[3] * matrix[13] -
    matrix[12] * matrix[1] * matrix[11] +
    matrix[12] * matrix[3] * matrix[9];

    inverse[13] = matrix[0] * matrix[9] * matrix[14] -
    matrix[0] * matrix[10] * matrix[13] -
    matrix[8] * matrix[1] * matrix[14] +
    matrix[8] * matrix[2] * matrix[13] +
    matrix[12] * matrix[1] * matrix[10] -
    matrix[12] * matrix[2] * matrix[9];

    inverse[2] = matrix[1] * matrix[6] * matrix[15] -
    matrix[1] * matrix[7] * matrix[14] -
    matrix[5] * matrix[2] * matrix[15] +
    matrix[5] * matrix[3] * matrix[14] +
    matrix[13] * matrix[2] * matrix[7] -
    matrix[13] * matrix[3] * matrix[6];

    inverse[6] = -matrix[0] * matrix[6] * matrix[15] +
    matrix[0] * matrix[7] * matrix[14] +
    matrix[4] * matrix[2] * matrix[15] -
    matrix[4] * matrix[3] * matrix[14] -
    matrix[12] * matrix[2] * matrix[7] +
    matrix[12] * matrix[3] * matrix[6];

    inverse[10] = matrix[0] * matrix[5] * matrix[15] -
    matrix[0] * matrix[7] * matrix[13] -
    matrix[4] * matrix[1] * matrix[15] +
    matrix[4] * matrix[3] * matrix[13] +
    matrix[12] * matrix[1] * matrix[7] -
    matrix[12] * matrix[3] * matrix[5];

    inverse[14] = -matrix[0] * matrix[5] * matrix[14] +
    matrix[0] * matrix[6] * matrix[13] +
    matrix[4] * matrix[1] * matrix[14] -
    matrix[4] * matrix[2] * matrix[13] -
    matrix[12] * matrix[1] * matrix[6] +
    matrix[12] * matrix[2] * matrix[5];

    inverse[3] = -matrix[1] * matrix[6] * matrix[11] +
    matrix[1] * matrix[7] * matrix[10] +
    matrix[5] * matrix[2] * matrix[11] -
    matrix[5] * matrix[3] * matrix[10] -
    matrix[9] * matrix[2] * matrix[7] +
    matrix[9] * matrix[3] * matrix[6];

    inverse[7] = matrix[0] * matrix[6] * matrix[11] -
    matrix[0] * matrix[7] * matrix[10] -
    matrix[4] * matrix[2] * matrix[11] +
    matrix[4] * matrix[3] * matrix[10] +
    matrix[8] * matrix[2] * matrix[7] -
    matrix[8] * matrix[3] * matrix[6];

    inverse[11] = -matrix[0] * matrix[5] * matrix[11] +
    matrix[0] * matrix[7] * matrix[9] +
    matrix[4] * matrix[1] * matrix[11] -
    matrix[4] * matrix[3] * matrix[9] -
    matrix[8] * matrix[1] * matrix[7] +
    matrix[8] * matrix[3] * matrix[5];

    inverse[15] = matrix[0] * matrix[5] * matrix[10] -
    matrix[0] * matrix[6] * matrix[9] -
    matrix[4] * matrix[1] * matrix[10] +
    matrix[4] * matrix[2] * matrix[9] +
    matrix[8] * matrix[1] * matrix[6] -
    matrix[8] * matrix[2] * matrix[5];

    var detector = matrix[0] * inverse[0] + matrix[1] * inverse[4] + matrix[2] * inverse[8] + matrix[3] * inverse[12];

    if (detector == 0) {
        return [[matrix[0], matrix[1], matrix[2], matrix[3]],
            [matrix[4], matrix[5], matrix[6], matrix[7]],
            [matrix[8], matrix[9], matrix[10], matrix[11]],
            [matrix[12], matrix[13], matrix[14], matrix[15]]];


    }

    detector = 1.0 / detector;

    for ( var i = 0; i < 16; i++) {
        output[i] = inverse[i] * detector;
    }

    return output;


}*/

/*
function invertMatrix(result, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

    // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    result[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    result[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    result[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    result[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    result[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    result[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    result[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    result[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    result[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    result[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    result[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    result[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    result[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    result[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    result[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    result[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    
    return result;
}
*/
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
 * @desc Multiply two 2d vectors or alternatively a 2d vector and a number.
 * @param {Array} x 2d vector A
 * @param {Array} y 2d vector B can also be of type {Number}
 * @return {Array} representing the 2d vector
 **/
function vMN(x, y) {
    return ([x[0] * y, x[1] * y]);
}

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc Add two 2d vectors or alternatively a 2d vector and a number.
 * @param {Array} x 2d vector A
 * @param {Array} y 2d vector B can also be of type {Number}
 * @return {Array} representing the 2d vector
 **/

function vA(x, y) {
    return ([x[0] + y[0], x[1] + y[1]]);
}


/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc Divide 2d two vectors or alternatively a 2d vector and a number.
 * @param {Array} x 2d vector A
 * @param {Array} y 2d vector B can also be of type {Number}
 * @return {Array} representing the 2d vector
 **/

function vD(x, y) {
    return ([x[0] - y[0], x[1] - y[1]]);
}


/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc rotates a 2d vector by degrees.
 * @param {Array} vector the 2d vector that will be rotated.
 * @param {Number} rotation by how many degree the 2d vector should be rotated.
 * @return {Array} representing the rotated 2d vector.
 **/

function vR(vector, rotation) {
    return ([Math.cos(rotation) * vector[0] - Math.sin(rotation) * vector[1],
        Math.sin(rotation) * vector[0] + Math.cos(rotation) * vector[1]]);
}

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/
function checkLineCross(x11, y11, x12, y12, x21, y21, x22, y22, w, h) {
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
}

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
function uuidTime(){
    var dateUuidTime =new Date();
    var abcUuidTime = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var stampUuidTime = parseInt(Math.floor((Math.random() * 199) + 1)+""+dateUuidTime.getTime()).toString(36);
    while(stampUuidTime.length<12) stampUuidTime =abcUuidTime.charAt(Math.floor(Math.random() * abcUuidTime.length))+stampUuidTime;
    return stampUuidTime
}

function uuidTimeShort(){
    var dateUuidTime =new Date();
    var abcUuidTime = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var stampUuidTime = parseInt(""+dateUuidTime.getMilliseconds()+dateUuidTime.getMinutes()+dateUuidTime.getHours()+dateUuidTime.getDay()).toString(36);
    while(stampUuidTime.length<8) stampUuidTime =abcUuidTime.charAt(Math.floor(Math.random() * abcUuidTime.length))+stampUuidTime;
    return stampUuidTime
}


function randomIntInc(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}