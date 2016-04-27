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
 * @param x21 possition x 1
 * @param y21 possition y 1
 * @param x22 possition x 2
 * @param y22 possition y 2
 * @return
 **/

function deleteLines(x21, y21, x22, y22) {
    // window.location.href = "of://gotsome";
    for (var keysome in objectExp) {
        if (!objectExp.hasOwnProperty(keysome)) {
            continue;
        }

        var thisObject = objectExp[keysome];
        for (var subKeysome in thisObject.objectLinks) {
            if (!thisObject.objectLinks.hasOwnProperty(subKeysome)) {
                continue;
            }
            var l = thisObject.objectLinks[subKeysome];
            var oA = thisObject;
            var oB = objectExp[l.ObjectB];
            var bA = oA.objectValues[l.locationInA];
            var bB = oB.objectValues[l.locationInB];

            if (bA === undefined || bB === undefined || oA === undefined || oB === undefined) {
                continue; //should not be undefined
            }
            if (checkLineCross(bA.screenX, bA.screenY, bB.screenX, bB.screenY, x21, y21, x22, y22, globalCanvas.canvas.width, globalCanvas.canvas.height)) {
                delete thisObject.objectLinks[subKeysome];
                cout("iam executing link deletion");
                deleteLinkFromObject(thisObject.ip,keysome, subKeysome);
            }
        }
    }

}
/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param thisObject is a reference to an Hybrid Object
 * @param context is a reference to a html5 canvas object
 * @return
 **/

function drawAllLines(thisObject, context) {
    for (var subKey in thisObject.objectLinks) {
        if (!thisObject.objectLinks.hasOwnProperty(subKey)) {
            continue;
        }
        var l = thisObject.objectLinks[subKey];
        var oA = thisObject;

        if(isNaN(l.ballAnimationCount))
            l.ballAnimationCount = 0;

        if (!objectExp.hasOwnProperty(l.ObjectB)) {
            continue;
        }
        var oB = objectExp[l.ObjectB];
        if (!oA.objectValues.hasOwnProperty(l.locationInA)) {
            continue;
        }
        if (!oB.objectValues.hasOwnProperty(l.locationInB)) {
            continue;
        }
        var bA = oA.objectValues[l.locationInA];
        var bB = oB.objectValues[l.locationInB];

        if (bA === undefined || bB === undefined || oA === undefined || oB === undefined) {
            continue; //should not be undefined
        }

        if (!oB.ObjectVisible) {
                bB.screenX = bA.screenX;
                bB.screenY = -10;
                bB.screenZ = bA.screenZ;
            }

            if (!oA.ObjectVisible) {
                bA.screenX = bB.screenX;
                bA.screenY = -10;
                bA.screenZ = bB.screenZ;
            }

        // linearize a non linear zBuffer
        var bAScreenZ = (((10001 - (20000 / bA.screenZ)) / 9999)+ 1) /2;
        var bBScreenZ = (((10001 - (20000 / bB.screenZ)) / 9999)+ 1) /2;

        // map the linearized zBuffer to the final ball size
         bAScreenZ =  map(bAScreenZ,0.9971 , 1, 25, 1);
         bBScreenZ =  map(bBScreenZ,0.9971 , 1, 25, 1);

        drawLine(context, [bA.screenX, bA.screenY], [bB.screenX, bB.screenY], bAScreenZ, bBScreenZ, l);
    }
    globalCanvas.hasContent = true;
}

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @return
 **/

function drawInteractionLines() {

    // this function here needs to be more precise

    if (globalProgram.ObjectA) {

        var oA = objectExp[globalProgram.ObjectA];

        var tempStart = objectExp[globalProgram.ObjectA].objectValues[globalProgram.locationInA];


        // this is for making sure that the line is drawn out of the screen... Don't know why this got lost somewhere down the road.
        // linearize a non linear zBuffer
        tempStart.screenZ = (((10001 - (20000 /  tempStart.screenZ)) / 9999)+ 1) /2;
        // map the linearized zBuffer to the final ball size
        tempStart.screenZ = map( tempStart.screenZ,0.9971 , 1, 25, 1);

        if (!oA.ObjectVisible) {
            tempStart.screenX = globalStates.pointerPosition[0];
            tempStart.screenY = -10;
            tempStart.screenZ = 6;
        }

        drawLine(globalCanvas.context, [tempStart.screenX, tempStart.screenY], [globalStates.pointerPosition[0], globalStates.pointerPosition[1]], tempStart.screenZ, tempStart.screenZ, globalStates);
    }

    if (globalStates.drawDotLine) {
        drawDotLine(globalCanvas.context, [globalStates.drawDotLineX, globalStates.drawDotLineY], [globalStates.pointerPosition[0], globalStates.pointerPosition[1]], 1, 1);
    }

    globalCanvas.hasContent = true;
}

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param context is html5 canvas object
 * @param lineStartPoint is an array of two numbers indicating the start for a line
 * @param lineEndPoint is an array of two numbers indicating the end for a line
 * @param lineStartWeight is a number indicating the weight of a line at start
 * @param lineEndWeight is a number indicating the weight of a line at end
 * @param linkObject that contains ballAnimationCount
 * @return
 **/


function drawLine(context, lineStartPoint, lineEndPoint, lineStartWeight, lineEndWeight, linkObject) {

    var angle = Math.atan2((lineStartPoint[1] - lineEndPoint[1]),(lineStartPoint[0] - lineEndPoint[0]));
    var distanceCount = 0;
    var thisCount = 0;
    var length1 = lineEndPoint[0]-lineStartPoint[0];
    var length2 = lineEndPoint[1]-lineStartPoint[1];
    var lineVectorLength = Math.sqrt(length1*length1 + length2*length2);
    var keepColor = lineVectorLength/6;
    var color;
    var ballSize;

    if(linkObject.ballAnimationCount >= (lineStartWeight+lineStartWeight+2))  linkObject.ballAnimationCount = 0;

    while(distanceCount+linkObject.ballAnimationCount< lineVectorLength){
        thisCount = distanceCount+linkObject.ballAnimationCount;
        color = map(thisCount, keepColor, lineVectorLength-keepColor, 180, 59);
        ballSize = map(thisCount, 0, lineVectorLength, lineStartWeight, lineEndWeight);
        context.beginPath();
        context.arc(lineStartPoint[0] - Math.cos(angle) * thisCount, lineStartPoint[1] - Math.sin(angle) * thisCount, ballSize, 0, 6.2832);
        context.fillStyle=  "hsl(" + color + ", 100%, 50%)";
        context.fill();
        distanceCount +=ballSize*2.3;

    }
    linkObject.ballAnimationCount+=(((lineStartWeight+lineEndWeight)/2)/4);
}


/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 **/

function drawDotLine(context, lineStartPoint, lineEndPoint, b1, b2) {
    context.beginPath();
    context.moveTo(lineStartPoint[0], lineStartPoint[1]);
    context.lineTo(lineEndPoint[0], lineEndPoint[1]);
    context.setLineDash([7]);
    context.lineWidth = 2;
    context.strokeStyle = "#ff019f";//"#00fdff";
    context.stroke();
    context.closePath();
}

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function drawGreen(context, lineStartPoint, lineEndPoint, radius) {
    context.beginPath();
    context.arc(lineStartPoint[0], lineStartPoint[1], radius, 0, Math.PI * 2);
    context.strokeStyle = "#7bff08";
    context.lineWidth = 2;
    context.setLineDash([7]);
    context.stroke();
    context.closePath();

}

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function drawRed(context, lineStartPoint, lineEndPoint, radius) {
    context.beginPath();
    context.arc(lineStartPoint[0], lineStartPoint[1], radius, 0, Math.PI * 2);
    context.strokeStyle = "#ff036a";
    context.lineWidth = 2;
    context.setLineDash([7]);
    context.stroke();
    context.closePath();
}

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function drawBlue(context, lineStartPoint, lineEndPoint, radius) {
    context.beginPath();
    context.arc(lineStartPoint[0], lineStartPoint[1], radius, 0, Math.PI * 2);
    context.strokeStyle = "#01fffd";
    context.lineWidth = 2;
    context.setLineDash([7]);
    context.stroke();
    context.closePath();
}

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function drawYellow(context, lineStartPoint, lineEndPoint, radius) {
    context.beginPath();
    context.arc(lineStartPoint[0], lineStartPoint[1], radius, 0, Math.PI * 2);
    context.strokeStyle = "#FFFF00";
    context.lineWidth = 2;
    context.setLineDash([7]);
    context.stroke();
    context.closePath();
}

