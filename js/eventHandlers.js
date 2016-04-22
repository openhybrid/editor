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

var touchDown = function (evt) {
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
    console.log("touchDown");
};

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var falseTouchUp = function () {
    if (!globalStates.guiButtonState) {
        globalProgram.ObjectA = false;
        globalProgram.locationInA = false;
    }
    globalCanvas.hasContent = true;
    console.log("falseTouchUp");
};

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var trueTouchUp = function () {
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

    console.log("trueTouchUp");
};



/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var canvasPointerDown = function (evt) {
    if (!globalStates.guiButtonState && !globalStates.editingMode) {
        if (!globalProgram.ObjectA) {
            globalStates.drawDotLine = true;
            globalStates.drawDotLineX = evt.clientX;
            globalStates.drawDotLineY = evt.clientY;

        }
    }

    console.log("canvasPointerDown");
};

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var getPossition = function (evt) {

    globalStates.pointerPosition = [evt.clientX, evt.clientY];

    overlayDiv.style.left =  evt.clientX-60;
    overlayDiv.style.top =   evt.clientY-60;

    console.log("getPossition");

};

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var documentPointerUp = function (evt) {

    if (!globalStates.guiButtonState) {
        falseTouchUp();
        if (!globalProgram.ObjectA && globalStates.drawDotLine) {
            deleteLines(globalStates.drawDotLineX, globalStates.drawDotLineY, evt.clientX, evt.clientY);
        }
        globalStates.drawDotLine = false;
    }
    globalCanvas.hasContent = true;

    overlayDiv.style.visibility = "hidden";

    console.log("documentPointerUp");
};


/**
 * @desc
 * @param
 * @param
 * @return
 **/

var documentPointerDown = function (evt) {

    globalStates.pointerPosition = [evt.clientX, evt.clientY];

    overlayDiv.style.visibility = "visible";
    overlayDiv.style.left =  evt.clientX-60;
    overlayDiv.style.top =  evt.clientY-60;

    console.log("documentPointerDown");
};



/**
 * @desc
 * @param
 * @param
 * @return
 **/

var MultiTouchStart = function (evt) {
    evt.preventDefault();
// generate action for all links to be reloaded after upload

    if (globalStates.editingMode && evt.targetTouches.length === 1) {
        globalStates.editingModeObject = this.ObjectId;
        globalStates.editingModeLocation = this.location;
        globalStates.editingModeHaveObject = true;
    }
    globalMatrix.matrixtouchOn = this.location;
    globalMatrix.copyStillFromMatrixSwitch = true;
    console.log("MultiTouchStart");
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var MultiTouchMove = function (evt) {
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
    }

    if (globalStates.editingModeHaveObject && globalStates.editingMode && evt.targetTouches.length === 2) {
        scaleEvent(evt.touches[1]);
    }
    console.log("MultiTouchMove");
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var MultiTouchEnd = function (evt) {
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
        }

if(typeof content.x === "number" && typeof content.y === "number" && typeof content.scale === "number") {
    postData('http://' + objectExp[globalStates.editingModeObject].ip + ':' + httpPort + '/object/' + globalStates.editingModeObject + "/size/" + globalStates.editingModeLocation, content);
}

    globalStates.editingModeHaveObject = false;
    globalCanvas.hasContent = true;
    globalMatrix.matrixtouchOn = "";
    }
    console.log("MultiTouchEnd");
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var MultiTouchCanvasStart = function (evt) {

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
    console.log("MultiTouchCanvasStart");
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var MultiTouchCanvasMove = function (evt) {
    evt.preventDefault();
// generate action for all links to be reloaded after upload
    if (globalStates.editingModeHaveObject && globalStates.editingMode && evt.targetTouches.length === 1) {
        var touch = evt.touches[1];

        //globalStates.editingModeObjectY
        //globalStates.editingScaleX
        scaleEvent(touch)

    }
    console.log("MultiTouchCanvasMove");
};


/**
 * @desc
 * @param
 * @param
 * @return
 **/

var scaleEvent = function (touch) {
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
    console.log("scaleEvent");
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var postData = function (url, body) {

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
    console.log("postData");
};


/**
 * @desc
 * @param
 * @param
 * @return
 **/

var deleteData = function (url) {

    var request = new XMLHttpRequest();
    request.open('DELETE', url, true);
    request.onreadystatechange = function () {
        if (request.readyState == 4) console.log("It deleted!");
    };
    request.setRequestHeader("Content-type", "application/json");
    //request.setRequestHeader("Content-length", params.length);
    // request.setRequestHeader("Connection", "close");
    request.send();
    console.log("deleteData");
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var uploadNewLink = function (ip, thisObjectKey, thisKey, content) {
// generate action for all links to be reloaded after upload
    console.log("sending Link");
    postData('http://' + ip + ':' + httpPort + '/object/' + thisObjectKey + "/link/" + thisKey, content);
    // postData('http://' +ip+ ':' + httpPort+"/", content);
    console.log("uploadNewLink");

};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var deleteLinkFromObject = function (ip, thisObjectKey, thisKey) {
// generate action for all links to be reloaded after upload
    console.log("I am deleting a link: " + ip);
    deleteData('http://' + ip + ':' + httpPort + '/object/' + thisObjectKey + "/link/" + thisKey);
    console.log("deleteLinkFromObject");
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var addEventHandlers = function () {

    globalCanvas.canvas.addEventListener("touchstart", MultiTouchCanvasStart, false);
    ec++;
    globalCanvas.canvas.addEventListener("touchmove", MultiTouchCanvasMove, false);
    ec++;


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
            ec++;
            thisObject3.addEventListener("touchmove", MultiTouchMove, false);
            ec++;
            thisObject3.addEventListener("touchend", MultiTouchEnd, false);
            ec++;
            //}
        }

        for (var thisSubKey in generalObject2.objectValues) {
            if (document.getElementById(thisSubKey)) {
                var thisObject2 = document.getElementById(thisSubKey);
                thisObject2.className = "mainProgram";
                //if(thisObject.developer) {
                thisObject2.addEventListener("touchstart", MultiTouchStart, false);
                ec++;
                thisObject2.addEventListener("touchmove", MultiTouchMove, false);
                ec++;
                thisObject2.addEventListener("touchend", MultiTouchEnd, false);
                ec++;
                //}
            }
        }
    }
    }

    console.log("addEventHandlers");
};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

var removeEventHandlers = function () {

    globalCanvas.canvas.removeEventListener("touchstart", MultiTouchCanvasStart, false);
    ec--;
    globalCanvas.canvas.removeEventListener("touchmove", MultiTouchCanvasMove, false);
    ec--;
    for (var thisKey in objectExp) {
        var generalObject2 = objectExp[thisKey];
         if(generalObject2.developer) {
        if (document.getElementById(thisKey)) {
            var thisObject3 = document.getElementById(thisKey);
            thisObject3.style.visibility = "hidden";
            thisObject3.className = "mainEdimainting";

            thisObject3.removeEventListener("touchstart", MultiTouchStart, false);
            thisObject3.removeEventListener("touchmove", MultiTouchMove, false);
            thisObject3.removeEventListener("touchend", MultiTouchEnd, false);
            ec--;
            ec--;
            ec--;
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
                ec--;
                ec--;
                ec--;
                //  }
            }
        }

    }
    }

    console.log("removeEventHandlers");
};