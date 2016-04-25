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
/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function touchDown(evt) {
    if (!globalStates.editingMode) {
        if (!globalStates.guiButtonState) {
            if (!globalProgram.ObjectA) {
                globalProgram.ObjectA = this.ObjectId;
                globalProgram.locationInA = this.location;
            }
        }
    } else {
        globalStates.editingModeObject = this.ObjectId;
        globalStates.editingModeLocation = this.location;
        globalStates.editingModeHaveObject = true;
    }
}

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function falseTouchUp() {
    if (!globalStates.guiButtonState) {
        globalProgram.ObjectA = false;
        globalProgram.locationInA = false;
    }
    globalCanvas.hasContent = true;
}

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function trueTouchUp() {
    if (!globalStates.guiButtonState) {
        if (globalProgram.ObjectA) {

            var okForNewLink = true;
            var thisTempObject = objectExp[globalProgram.ObjectA];
            var thisTempObjectLinks = thisTempObject.objectLinks;

            globalProgram.ObjectB = this.ObjectId;
            globalProgram.locationInB = this.location;

            // check if connection is with it self
            if (globalProgram.ObjectA === this.ObjectId && globalProgram.locationInA === this.location) {
                okForNewLink = false;
            }

            // todo check that objects are making these checks as well for not producing overlapeses.
            // check if this connection already exists?
            for (var thisSubKey in thisTempObjectLinks) {
                if (thisTempObjectLinks[thisSubKey].ObjectA === globalProgram.ObjectA &&
                    thisTempObjectLinks[thisSubKey].ObjectB === globalProgram.ObjectB &&
                    thisTempObjectLinks[thisSubKey].locationInA === globalProgram.locationInA &&
                    thisTempObjectLinks[thisSubKey].locationInB === globalProgram.locationInB) {
                    okForNewLink = false;
                }

            }

            // check that there is no endless loops through it self or any other connections

            searchL(globalProgram.locationInB,globalProgram.ObjectB,globalProgram.locationInA,globalProgram.ObjectA);

            function searchL(locationInB,ObjectB, locationInA,ObjectA){
                for(var key in objectExp[ObjectB].objectLinks){
                    var Bn = objectExp[ObjectB].objectLinks[key];
                    if(locationInB === Bn.locationInA){
                        if(locationInA === Bn.locationInB && ObjectA === Bn.ObjectB) {
                            okForNewLink = false;
                        }else {
                            searchL(Bn.locationInB, Bn.ObjectB,locationInA,ObjectA);
                        }
                    }
                }
            }


            //  window.location.href = "of://event_" + objectExp[globalProgram.ObjectA].visible;

            if (okForNewLink) {
                var thisKeyId =  uuidTimeShort();

                thisTempObjectLinks[thisKeyId] = {
                    ObjectA: globalProgram.ObjectA,
                    locationInA: globalProgram.locationInA,
                    ObjectB: globalProgram.ObjectB,
                    locationInB: globalProgram.locationInB
                };

                // push new connection to objectA
                uploadNewLink(thisTempObject.ip, globalProgram.ObjectA, thisKeyId, thisTempObjectLinks[thisKeyId]);
            }

            // set everything back to false
            globalProgram.ObjectA = false;
            globalProgram.locationInA = false;
            globalProgram.ObjectB = false;
            globalProgram.locationInB = false;
        }
    }
    globalCanvas.hasContent = true;
}

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function documentPointerUp(evt) {

    if (!globalStates.guiButtonState) {
        falseTouchUp();
        if (!globalProgram.ObjectA && globalStates.drawDotLine) {
            deleteLines(globalStates.drawDotLineX, globalStates.drawDotLineY, evt.clientX, evt.clientY);
        }
        globalStates.drawDotLine = false;
    }
    globalCanvas.hasContent = true;
}

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function canvasPointerDown(evt) {
    if (!globalStates.guiButtonState && !globalStates.editingMode) {
        if (!globalProgram.ObjectA) {
            globalStates.drawDotLine = true;
            globalStates.drawDotLineX = evt.clientX;
            globalStates.drawDotLineY = evt.clientY;

        }
    }
}

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function getPossition(evt) {

    globalStates.pointerPosition = [evt.clientX, evt.clientY];

}


/**
 * @desc
 * @param
 * @param
 * @return
 **/

function MultiTouchStart(evt) {
    evt.preventDefault();
// generate action for all links to be reloaded after upload

    if (globalStates.editingMode && evt.targetTouches.length === 1) {
        globalStates.editingModeObject = this.ObjectId;
        globalStates.editingModeLocation = this.location;
        globalStates.editingModeHaveObject = true;
    }
    globalMatrix.matrixtouchOn = this.location;
    globalMatrix.copyStillFromMatrixSwitch = true;

}

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function MultiTouchMove(evt) {
    evt.preventDefault();
// generate action for all links to be reloaded after upload

    // console.log(globalStates.editingModeHaveObject + " " + globalStates.editingMode + " " + globalStates.editingModeHaveObject + " " + globalStates.editingMode);

    if (globalStates.editingModeHaveObject && globalStates.editingMode && evt.targetTouches.length === 1) {


        var touch = evt.touches[0];

        globalStates.editingModeObjectX = touch.pageX;
        globalStates.editingModeObjectY = touch.pageY;

        var tempThisObject = {};
        if (globalStates.editingModeObject !== globalStates.editingModeLocation) {
            tempThisObject = objectExp[globalStates.editingModeObject].objectValues[globalStates.editingModeLocation];
        } else {
            tempThisObject = objectExp[globalStates.editingModeObject];
        }


        var tempMatrix = copyMatrix(globalMatrix.begin);
        globalStates.angX = toAxisAngle(tempMatrix)[0];
        globalStates.angY = toAxisAngle(tempMatrix)[1];

        var screenCoordinateX = tempMatrix[3][2] * (touch.pageX - globalStates.height / 2);
        var screenCoordinateY = tempMatrix[3][2] * (touch.pageY - globalStates.width / 2);


        // this functions are somehow ok.... The Projection Matrix gives funky interverences once the angle is sharp.
        // Also I might not have find the right calucaltions


        // todo find right calucaltion
        var possitionY = -Math.sqrt(Math.pow(screenCoordinateY, 2) + Math.pow((screenCoordinateY * globalStates.angY / 2), 2));
        if (screenCoordinateY > 0) {
            possitionY = -possitionY;
        }

        // todo find right calucaltion
        var possitionX = -Math.sqrt(Math.pow(screenCoordinateX, 2) + Math.pow((screenCoordinateX * globalStates.angX / 2), 2));

        if (screenCoordinateX > 0) {
            possitionX = -possitionX;
        }

        var tempObjectMatrix = [
            [tempMatrix[0][0], tempMatrix[0][1], tempMatrix[0][2], tempMatrix[0][3]],
            [tempMatrix[1][0], tempMatrix[1][1], tempMatrix[1][2], tempMatrix[1][3]],
            [tempMatrix[2][0], tempMatrix[2][1], tempMatrix[2][2], tempMatrix[2][3]],
            [possitionX, possitionY, tempMatrix[3][2], tempMatrix[3][3]]
        ];

        var invertedObjectMatrix = invertMatrix(tempMatrix);
        var resultMatrix = multiplyMatrix(tempObjectMatrix, invertedObjectMatrix);

        if(typeof resultMatrix[3][0] === "number" && typeof resultMatrix[3][1] === "number") {
            tempThisObject.x = resultMatrix[3][0];
            tempThisObject.y = resultMatrix[3][1];
        }


        // // for interface repositioning... check if it's inside the marker and 
        // var newMatrix = copyMatrix(multiplyMatrix(globalMatrix.begin, invertMatrix(globalMatrix.temp)));
        // var zPosition = newMatrix[3][2];
        // var epsilon = 50.0;
        // // console.log(tempThisObject);
        // // console.log(globalStates.editingModeObject);
        // var theObject = document.getElementById(globalStates.editingModeObject);
        // console.log("eventHandler", theObject);
        // var canvas = document.getElementById("canvas"+theObject.id);
        //estimateIntersection(theObject, newMatrix);

        // drawMarkerIntersection(theObject, newMatrix);
        // console.log("drawMarkerIntersection(theObject, newMatrix)", globalStates.editingModeObject, theObject, newMatrix, globalMatrix.temp);

        // if (zPosition < 0 - epsilon) {
        //     console.log("placed behind the marker!");
        //     theObject.className = "mainProgramInvalid";
        //     // drawMarkerIntersection(theObject, newMatrix);
        // } else {
        //     theObject.className = "mainProgram";
        //     // clearMarkerIntersection(theObject);
        // }
    }

    if (globalStates.editingModeHaveObject && globalStates.editingMode && evt.targetTouches.length === 2) {
        scaleEvent(evt.touches[1]);
    }
}

// var cssTransformToMatrix = function(cssTransformString) {
//     return mat4.clone(cssTransformString.replace(/^.*\((.*)\)$/g, "$1").split(/, +/).map(Number));
// }

// var getTransformMatrixForDiv = function(div) {
//     console.log(div);
//     console.log(div.style);
//     console.log(div.style.transform);
//     return cssTransformToMatrix(div.style.transform);
// }

// var getCornersClockwise = function(thisCanvas) {
// return [[0, 0, 0],
//         [thisCanvas.width, 0, 0],
//         [thisCanvas.width, thisCanvas.height, 0],
//         [0, thisCanvas.height, 0]];
// }

// var areCornersEqual = function(corner1, corner2) {
//     return (corner1[0] === corner2[0] && corner1[1] === corner2[1]);
// }

// var areCornerPairsIdentical = function(c1a, c1b, c2a, c2b) {
//     return (areCornersEqual(c1a, c2a) && areCornersEqual(c1b, c2b));
// }

// var areCornerPairsSymmetric = function(c1a, c1b, c2a, c2b) {
//     return (areCornersEqual(c1a, c2b) && areCornersEqual(c1b, c2a));
// }

// var areCornersAdjacent = function(corner1, corner2) {
//     return (corner1[0] === corner2[0] || corner1[1] === corner2[1]); 
// }

// var areCornersOppositeZ = function(corner1, corner2) {
//     var z1 = corner1[2];
//     var z2 = corner2[2];
//     var oppositeSign = ((z1 * z2) < 0);
//     return oppositeSign;
// }

// // makes sure we don't add symmetric pairs to list
// var addCornerPairToOppositeCornerPairs = function(cornerPair, oppositeCornerPairs) {
//     var corner1 = cornerPair[0];
//     var corner2 = cornerPair[1];
//     var safeToAdd = true;
//     if (oppositeCornerPairs.length > 0) {
//         oppositeCornerPairs.forEach(function(pairList) {
//             var existingCorner1 = pairList[0];
//             var existingCorner2 = pairList[1];
//             if (areCornerPairsSymmetric(existingCorner1, existingCorner2, corner1, corner2)) {
//                 // console.log("symmetric", existingCorner1, existingCorner2, corner1, corner2);
//                 safeToAdd = false;
//                 return;
//             }
//             if (areCornerPairsIdentical(existingCorner1, existingCorner2, corner1, corner2)) {
//                 // console.log("identical", existingCorner1, existingCorner2, corner1, corner2);
//                 safeToAdd = false;
//                 return;
//             }
//         });
//     }
//     if (safeToAdd) {
//         oppositeCornerPairs.push([corner1, corner2]);
//     }
// }

// var getCenterOfPoints = function(points) {
//     if (points.length < 1) { return [0,0]; }
//     var sumX = 0;
//     var sumY = 0;
//     points.forEach(function(point) {
//         sumX += point[0];
//         sumY += point[1];
//     });
//     var avgX = sumX / points.length;
//     var avgY = sumY / points.length;
//     return [avgX, avgY];
// }

// var sortPointsClockwise = function(points) {
//     var centerPoint = getCenterOfPoints(points);
//     var centerX = centerPoint[0];
//     var centerY = centerPoint[1];

//     var comparePoints = function(a,b) {
//         var atanA = Math.atan2(a[1] - centerY, a[0] - centerX);
//         var atanB = Math.atan2(b[1] - centerY, b[0] - centerX);
//         if (atanA < atanB) return -1;
//         else if (atanB > atanA) return 1;
//         return 0;
//     }

//     return points.sort(comparePoints);
// }

// var estimateIntersection = function (theObject, matrix) {

//     var canvas = document.getElementById("canvas"+theObject.id);
//     var theDiv = document.getElementById("thisObject"+theObject.id);

//     // var newMatrix = copyMatrix(multiplyMatrix(globalMatrix.begin, invertMatrix(globalMatrix.temp)));

//     var mCanvas = mat4.clone(mat1x16From4x4(matrix));
//     // var mCanvas = getTransformMatrixForDiv(theDiv);

//     console.log("mCanvas: ", mCanvas);
//     // console.log("newMatrix: ", newMatrix);

//     // console.log("estimate");
//     ////////////////////////////////////////

//     var corners = getCornersClockwise(canvas);
//     // console.log(corners);
//     var out = vec4.create();
//     corners.forEach(function(corner, index) {
//         var x = corner[0] - canvas.width/2;
//         var y = corner[1] - canvas.height/2;
//         var input = vec4.clone([x,y,0,1]); // assumes z-position of corner is always 0
//         // console.log(out, input, mCanvas);
//         vec4.transformMat4(out, input, mCanvas);
//         // var z = getTransformedZ(matrix,x,y)
//         corner[2] = out[2]; // sets z position of corner to its eventual transformed value
//     });

//     // console.log("corners", corners);

//     var oppositeCornerPairs = [];
//     corners.forEach(function(corner1) {
//         corners.forEach(function(corner2) {
//             // only check adjacent pairs of corners
//             // ignore same corner
//             if (areCornersEqual(corner1, corner2)) { return; }

//             // x or y should be the same
//             if (areCornersAdjacent(corner1, corner2)) {  
//                 if (areCornersOppositeZ(corner1, corner2)) {
//                     addCornerPairToOppositeCornerPairs([corner1, corner2], oppositeCornerPairs);
//                 }
//             }
//         });
//     });

//     // console.log("oppositeCornerPairs", oppositeCornerPairs);

//     // for each opposite corner pair, binary search for the x,y location that will correspond with 0 z-pos
//     // .... or can it be calculated directly....? it's just a linear equation!!!
//     var interceptPoints = [];
//     oppositeCornerPairs.forEach(function(cornerPair) {
//         var c1 = cornerPair[0];
//         var c2 = cornerPair[1];
//         var x1 = c1[0];
//         var y1 = c1[1];
//         var z1 = c1[2];
//         var x2 = c2[0];
//         var y2 = c2[1];
//         var z2 = c2[2];

//         if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
//             // console.log("dx");
//             var slope = ((z2 - z1)/(x2 - x1));
//             var x_intercept = x1 - (z1 / slope);
//             interceptPoints.push([x_intercept, y1]);
//         } else {
//             // console.log("dy");
//             var slope = ((z2 - z1)/(y2 - y1));
//             var y_intercept = y1 - (z1 / slope);
//             interceptPoints.push([x1, y_intercept]);
//         }
//     });

//     // console.log("interceptPoints", interceptPoints);

//     ////////////////////////////////////////

//     // get corners, add in correct order so they get drawn clockwise

//     corners.forEach(function(corner) {
//         if (corner[2] < 0) {
//             interceptPoints.push(corner);
//         }
//     });

//     // console.log("interceptPoints+corners", interceptPoints);

//     var sortedPoints = sortPointsClockwise(interceptPoints);
//     // console.log("sortedPoints", sortedPoints);

//     ////////////////////////////////////////

//     var ctx=canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     if (sortedPoints.length > 2) {
//         ctx.beginPath();
//         ctx.moveTo(sortedPoints[0][0], sortedPoints[0][1]);
//         sortedPoints.forEach(function(point) {
//             ctx.lineTo(point[0], point[1]);
//         });
//         ctx.closePath();
//         ctx.fill();
//     }
// }

// var mat1x16From4x4 = function(matrix) {
//     return [matrix[0][0], matrix[0][1], matrix[0][2], matrix[0][3],
//             matrix[1][0], matrix[1][1], matrix[1][2], matrix[1][3],
//             matrix[2][0], matrix[2][1], matrix[2][2], matrix[2][3],
//             matrix[3][0], matrix[3][1], matrix[3][2], matrix[3][3]];
// }

// var getEdgesClockwise = function (canvas, spacing) {
//     var edges = [];
//     for (var x = 0; x < canvas.width; x += spacing) {
//         var isCorner = (x == 0);
//         edges.push([x, 0, isCorner]);
//     }
//     for (var y = 0; y < canvas.height; y += spacing) {
//         var isCorner = (y == 0);
//         edges.push([canvas.width, y, isCorner]);
//     }
//     for (var x = canvas.width; x >= 0; x -= spacing) {
//         var isCorner = (x == canvas.width);
//         edges.push([x, canvas.height, isCorner]);
//     }
//     for (var y = canvas.height; y >= 0; y -= spacing) {
//         var isCorner = (y == canvas.height);
//         edges.push([0, y, isCorner]);
//     }
//     return edges;
// }

// var getCornersClockwise = function(thisCanvas) {
//     return [[0, 0, 0],
//             [thisCanvas.width, 0, 0],
//             [thisCanvas.width, thisCanvas.height, 0],
//             [0, thisCanvas.height, 0]];

//     // return {topLeft: [0, 0, 0],
//     //         topRight: [thisCanvas.width, 0, 0],
//     //         bottomRight: [thisCanvas.width, thisCanvas.height, 0],
//     //         bottomLeft: [0, thisCanvas.height, 0]};
// }

function drawMarkerIntersection(theObject, matrix) {

    console.log("canvas"+theObject.id);
    var canv = document.getElementById("canvas"+theObject.id); //theObject.querySelector(".mainCanvas");
    // console.log(theObject, thisCanvas);
    var ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, canv.width, canv.height);
    // ctx.fillStyle = 'red';

    var mCanvas = mat4.clone(mat1x16From4x4(matrix));

    var corners = getCornersClockwise(canvas);
    corners.forEach(function(corner, index) {
        var x = corner[0] - canv.width/2;
        var y = corner[1] - canv.height/2;
        var isCorner = corner[2];
        var input = vec4.clone([x,y,0,1]);
        var out = vec4.create();
        vec4.transformMat4(out, input, mCanvas);
        // var z = getTransformedZ(matrix,x,y)
        var z = out[2];
        corner[2] = z;
    });

    console.log("corners", corners);
    var oppositeCornerPairs = [];
    corners.forEach(function(corner1) {
        corners.forEach(function(corner2) {
            // only check adjacent pairs of corners

            // ignore same corner
            if (corner1[0] === corner2[0] && corner1[1] === corner2[1]) return; 

            // ignore symmetric corner pair already in list
            if (oppositeCornerPairs.length > 0) {
                oppositeCornerPairs.forEach(function(pairList) {
                    var existingCorner1 = pairList[0];
                    var existingCorner2 = pairList[1];
                    if (existingCorner1[0] === corner2[0] && existingCorner1[1] === corner2[1]) {
                        if (existingCorner2[0] === corner1[0] && existingCorner2[1] === corner1[1]) {
                            return;
                        }
                    }
                });
            }

            // x or y should be the same
            if (corner1[0] === corner2[0] || corner1[1] === corner2[1]) { 
                var z1 = corner1[2];
                var z2 = corner2[2];
                var oppositeSign = ((z1 * z2) < 0);
                if (oppositeSign) {
                    oppositeCornerPairs.push([corner1, corner2]);
                }
            }
        });
    });

    console.log("oppositeCornerPairs", oppositeCornerPairs);

    var spacing = Math.min(canv.width/30, canv.height/30);
    var edges = getEdgesClockwise(canvas, spacing);
    var firstEdge = null;
    var lastEdge = null;
    var wasLastFilled = false;
    var filledCorners = [];

    console.log("length: ", edges.length);

    edges.forEach(function(edge, index) {
        var x = edge[0] - canv.width/2;
        var y = edge[1] - canv.height/2;
        var isCorner = edge[2];
        var input = vec4.clone([x,y,0,1]);
        var out = vec4.create();
        vec4.transformMat4(out, input, mCanvas);
        // var z = getTransformedZ(matrix,x,y)
        var z = out[2];
        if (z < 0) {
            if (isCorner) {
                filledCorners.push([edge, index]);
                // console.log("input", input);
                // console.log("mCanvas", mCanvas);
                // console.log("out", out);
                // console.log("z'", getTransformedZ(matrix,x,y));
            }
            if (!wasLastFilled) {
                firstEdge = [edge, index];
                console.log(firstEdge);
            }
            wasLastFilled = true;
        } else {
            if (wasLastFilled) {
                lastEdge = [edge, index];
                console.log(lastEdge);
            }
            wasLastFilled = false;
        }
    });

    if (firstEdge != null) {
       filledCorners.push(firstEdge); 
    }
    if (lastEdge != null) {
        filledCorners.push(lastEdge);
    }

    console.log(filledCorners);

    filledCorners.sort(function(a,b) {
        return a[1] - b[1];
    });

    //console.log(filledCorners);

    ctx.beginPath();
    ctx.moveTo(filledCorners[0][0][0], filledCorners[0][0][1]);
    filledCorners.forEach(function(edge, index) {
        // if (index > 2) return;
        ctx.lineTo(edge[0][0], edge[0][1]);
    });
    ctx.closePath();
    ctx.fill();

}

// function drawMarkerIntersection_slow(theObject, matrix) {

//     console.log("canvas"+theObject.id);
//     var canv = document.getElementById("canvas"+theObject.id); //theObject.querySelector(".mainCanvas");
//     // console.log(theObject, thisCanvas);
//     var ctx = canv.getContext("2d");
//     ctx.clearRect(0, 0, canv.width, canv.height);
//     // ctx.fillStyle = 'red';

//     var mCanvas = mat4.clone(mat1x16From4x4(matrix));

//     var spacing = Math.min(canv.width/30, canv.height/30);
//     var edges = getEdgesClockwise(canvas, spacing);
//     var firstEdge = null;
//     var lastEdge = null;
//     var wasLastFilled = false;
//     var filledCorners = [];

//     console.log("length: ", edges.length);

//     edges.forEach(function(edge, index) {
//         var x = edge[0] - canv.width/2;
//         var y = edge[1] - canv.height/2;
//         var isCorner = edge[2];
//         var input = vec4.clone([x,y,0,1]);
//         var out = vec4.create();
//         vec4.transformMat4(out, input, mCanvas);
//         // var z = getTransformedZ(matrix,x,y)
//         var z = out[2];
//         if (z < 0) {
//             if (isCorner) {
//                 filledCorners.push([edge, index]);
//                 // console.log("input", input);
//                 // console.log("mCanvas", mCanvas);
//                 // console.log("out", out);
//                 // console.log("z'", getTransformedZ(matrix,x,y));
//             }
//             if (!wasLastFilled) {
//                 firstEdge = [edge, index];
//                 console.log(firstEdge);
//             }
//             wasLastFilled = true;
//         } else {
//             if (wasLastFilled) {
//                 lastEdge = [edge, index];
//                 console.log(lastEdge);
//             }
//             wasLastFilled = false;
//         }
//     });

//     if (firstEdge != null) {
//        filledCorners.push(firstEdge); 
//     }
//     if (lastEdge != null) {
//         filledCorners.push(lastEdge);
//     }

//     console.log(filledCorners);

//     filledCorners.sort(function(a,b) {
//         return a[1] - b[1];
//     });

//     //console.log(filledCorners);

//     ctx.beginPath();
//     ctx.moveTo(filledCorners[0][0][0], filledCorners[0][0][1]);
//     filledCorners.forEach(function(edge, index) {
//         // if (index > 2) return;
//         ctx.lineTo(edge[0][0], edge[0][1]);
//     });
//     ctx.closePath();
//     ctx.fill();

// }

// function drawMarkerIntersection_simple(theObject) {
//     var thisCanvas = document.getElementById("canvas"+theObject.id); //theObject.querySelector(".mainCanvas");
//     // console.log(theObject, thisCanvas);
//     var ctx = thisCanvas.getContext("2d");
//     ctx.clearRect(0, 0, thisCanvas.width, thisCanvas.height);
//     ctx.fillStyle = 'red';
//     ctx.fillRect(0,0,thisCanvas.width,thisCanvas.height);
// }

// function clearMarkerIntersection(theObject) {
//     var thisCanvas = document.getElementById("canvas"+theObject.id); //theObject.querySelector(".mainCanvas");
//     // console.log(theObject, thisCanvas);
//     var ctx = thisCanvas.getContext("2d");
//     ctx.clearRect(0, 0, thisCanvas.width, thisCanvas.height);
//     ctx.fillStyle = 'blue';
//     ctx.fillRect(0,0,thisCanvas.width,thisCanvas.height);
// }

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function MultiTouchEnd(evt) {
    evt.preventDefault();
// generate action for all links to be reloaded after upload
    if (globalStates.editingModeHaveObject) {

        console.log("start");
        // this is where it should be send to the object..

        var tempThisObject = {};
        if (globalStates.editingModeObject != globalStates.editingModeLocation) {
            tempThisObject = objectExp[globalStates.editingModeObject].objectValues[globalStates.editingModeLocation];
        } else {
            tempThisObject = objectExp[globalStates.editingModeObject];
        }



        var content = {};
        content.x = tempThisObject.x;
        content.y = tempThisObject.y;
        content.scale = tempThisObject.scale;

        if(globalStates.unconstrainedPositioning===true) {
            tempThisObject.matrix = copyMatrix(multiplyMatrix(globalMatrix.begin, invertMatrix(globalMatrix.temp)));
            content.matrix = tempThisObject.matrix;

            // var zPosition = content.matrix[3][2];
            // var epsilon = 50.0;
            // console.log(tempThisObject);
            // console.log(globalStates.editingModeObject);
            // var theObject = document.getElementById(globalStates.editingModeObject);
            // if (zPosition < 0 - epsilon) {
            //     console.log("placed behind the marker!");
            //     theObject.className = "mainProgramInvalid";
            // } else {
            //     theObject.className = "mainProgram";
            // }
        }

if(typeof content.x === "number" && typeof content.y === "number" && typeof content.scale === "number") {
    // console.log('http://' + objectExp[globalStates.editingModeObject].ip + ':' + httpPort + '/object/' + globalStates.editingModeObject + "/size/" + globalStates.editingModeLocation);
    // console.log(content);

    postData('http://' + objectExp[globalStates.editingModeObject].ip + ':' + httpPort + '/object/' + globalStates.editingModeObject + "/size/" + globalStates.editingModeLocation, content);
}

    globalStates.editingModeHaveObject = false;
    globalCanvas.hasContent = true;
    globalMatrix.matrixtouchOn = "";
    }
}

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function MultiTouchCanvasStart(evt) {

    evt.preventDefault();
// generate action for all links to be reloaded after upload
    if (globalStates.editingModeHaveObject && globalStates.editingMode && evt.targetTouches.length === 1) {
        var touch = evt.touches[1];

        globalStates.editingScaleX = touch.pageX;
        globalStates.editingScaleY = touch.pageY;
        globalStates.editingScaledistance = Math.sqrt(Math.pow((globalStates.editingModeObjectX - globalStates.editingScaleX), 2) + Math.pow((globalStates.editingModeObjectY - globalStates.editingScaleY), 2));

        var tempThisObject = {};
        if (globalStates.editingModeObject != globalStates.editingModeLocation) {
            tempThisObject = objectExp[globalStates.editingModeObject].objectValues[globalStates.editingModeLocation];
        } else {
            tempThisObject = objectExp[globalStates.editingModeObject];
        }
        globalStates.editingScaledistanceOld = tempThisObject.scale;
    }

}

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function MultiTouchCanvasMove(evt) {
    evt.preventDefault();
// generate action for all links to be reloaded after upload
    if (globalStates.editingModeHaveObject && globalStates.editingMode && evt.targetTouches.length === 1) {
        var touch = evt.touches[1];

        //globalStates.editingModeObjectY
        //globalStates.editingScaleX
        scaleEvent(touch)

    }

}


/**
 * @desc
 * @param
 * @param
 * @return
 **/

function scaleEvent(touch) {
    var thisRadius = Math.sqrt(Math.pow((globalStates.editingModeObjectX - touch.pageX), 2) + Math.pow((globalStates.editingModeObjectY - touch.pageY), 2));
    var thisScale = (thisRadius - globalStates.editingScaledistance) / 300 + globalStates.editingScaledistanceOld;

    // console.log(thisScale);

    var tempThisObject = {};
    if (globalStates.editingModeObject != globalStates.editingModeLocation) {
        tempThisObject = objectExp[globalStates.editingModeObject].objectValues[globalStates.editingModeLocation];
    } else {
        tempThisObject = objectExp[globalStates.editingModeObject];
    }
    if (thisScale < 0.2)thisScale = 0.2;
    if(typeof thisScale === "number" && thisScale>0) {
        tempThisObject.scale = thisScale;
    }
    globalCanvas.context.clearRect(0, 0, globalCanvas.canvas.width, globalCanvas.canvas.height);
    //drawRed(globalCanvas.context, [globalStates.editingModeObjectX,globalStates.editingModeObjectY],[touch.pageX,touch.pageY],globalStates.editingScaledistance);
    drawBlue(globalCanvas.context, [globalStates.editingModeObjectX, globalStates.editingModeObjectY], [touch.pageX, touch.pageY], globalStates.editingScaledistance);

    if (thisRadius < globalStates.editingScaledistance) {

        drawRed(globalCanvas.context, [globalStates.editingModeObjectX, globalStates.editingModeObjectY], [touch.pageX, touch.pageY], thisRadius);

    } else {
        drawGreen(globalCanvas.context, [globalStates.editingModeObjectX, globalStates.editingModeObjectY], [touch.pageX, touch.pageY], thisRadius);

    }

}

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function postData(url, body) {

    var request = new XMLHttpRequest();
    var params = JSON.stringify(body);
    request.open('POST', url, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) console.log("It worked!");
    };
    request.setRequestHeader("Content-type", "application/json");
    //request.setRequestHeader("Content-length", params.length);
    // request.setRequestHeader("Connection", "close");
    request.send(params);

}


/**
 * @desc
 * @param
 * @param
 * @return
 **/

function deleteData(url) {

    var request = new XMLHttpRequest();
    request.open('DELETE', url, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) console.log("It deleted!");
    };
    request.setRequestHeader("Content-type", "application/json");
    //request.setRequestHeader("Content-length", params.length);
    // request.setRequestHeader("Connection", "close");
    request.send();

}

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function uploadNewLink(ip, thisObjectKey, thisKey, content) {
// generate action for all links to be reloaded after upload
    console.log("sending Link");
    postData('http://' + ip + ':' + httpPort + '/object/' + thisObjectKey + "/link/" + thisKey, content);
    // postData('http://' +ip+ ':' + httpPort+"/", content);

}

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function deleteLinkFromObject(ip, thisObjectKey, thisKey) {
// generate action for all links to be reloaded after upload
    console.log("I am deleting a link: " + ip);
    deleteData('http://' + ip + ':' + httpPort + '/object/' + thisObjectKey + "/link/" + thisKey);
}

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function addEventHandlers() {

    globalCanvas.canvas.addEventListener("touchstart", MultiTouchCanvasStart, false);
    globalCanvas.canvas.addEventListener("touchmove", MultiTouchCanvasMove, false);


    for (var thisKey in objectExp) {
        var generalObject2 = objectExp[thisKey];

    if(generalObject2.developer) {
        if (document.getElementById(thisKey)) {
            var thisObject3 = document.getElementById(thisKey);
            //  if (globalStates.guiButtonState) {
            thisObject3.style.visibility = "visible";
            // }

            thisObject3.className = "mainProgram";

            thisObject3.addEventListener("touchstart", MultiTouchStart, false);
            thisObject3.addEventListener("touchmove", MultiTouchMove, false);
            thisObject3.addEventListener("touchend", MultiTouchEnd, false);
            //}
        }

        for (var thisSubKey in generalObject2.objectValues) {
            if (document.getElementById(thisSubKey)) {
                var thisObject2 = document.getElementById(thisSubKey);
                thisObject2.className = "mainProgram";
                //if(thisObject.developer) {
                thisObject2.addEventListener("touchstart", MultiTouchStart, false);
                thisObject2.addEventListener("touchmove", MultiTouchMove, false);
                thisObject2.addEventListener("touchend", MultiTouchEnd, false);
                //}
            }
        }
    }
    }


}

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function removeEventHandlers() {

    globalCanvas.canvas.removeEventListener("touchstart", MultiTouchCanvasStart, false);
    globalCanvas.canvas.removeEventListener("touchmove", MultiTouchCanvasMove, false);

    for (var thisKey in objectExp) {
        var generalObject2 = objectExp[thisKey];
         if(generalObject2.developer) {
        if (document.getElementById(thisKey)) {
            var thisObject3 = document.getElementById(thisKey);
            thisObject3.style.visibility = "hidden";
            thisObject3.className = "mainEditing";

            thisObject3.removeEventListener("touchstart", MultiTouchStart, false);
            thisObject3.removeEventListener("touchmove", MultiTouchMove, false);
            thisObject3.removeEventListener("touchend", MultiTouchEnd, false);
            //  }
        }

        for (var thisSubKey in generalObject2.objectValues) {
            if (document.getElementById(thisSubKey)) {
                var thisObject2 = document.getElementById(thisSubKey);
                thisObject2.className = "mainEditing";
                //    if(thisObject.developer) {
                thisObject2.removeEventListener("touchstart", MultiTouchStart, false);
                thisObject2.removeEventListener("touchmove", MultiTouchMove, false);
                thisObject2.removeEventListener("touchend", MultiTouchEnd, false);
                //  }
            }
        }

    }
    }
}