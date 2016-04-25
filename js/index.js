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
 * TODO + Data is loaded from the Object
 * TODO + Generate and delete link
 * TODO + DRAw interface based on Object
 * TODO + Check the coordinates of targets. Incoperate the target size
 * TODO - Check if object is in the right range
 * TODO - add reset button on every target
 * TODO - Documentation before I leave
 * TODO - Arduino Library
 **

 /**********************************************************************************************************************
 ******************************************** Data IO *******************************************
 **********************************************************************************************************************/

// Functions to fill the data of the object

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function addHeartbeatObject(beat) {
    /*
     if (globalStates.platform) {
     window.location.href = "of://gotbeat_" + beat.id;
     }
     */
    if (beat.id) {
        if (!objectExp[beat.id]) {
            getData('http://' + beat.ip + ':' + httpPort + '/object/' + beat.id, beat.id, function (req, thisKey) {
                objectExp[thisKey] = req;

                // this is a work around to set the state of an objects to not being visible.
                objectExp[thisKey].ObjectVisible = false;
                objectExp[thisKey].screenZ = 1000;

                console.log(objectExp[thisKey]);
            });
        }
    }
}

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function setStates(developerState, extendedTrackingState, clearSkyState, externalState) {


    globalStates.extendedTrackingState = extendedTrackingState;
    globalStates.developerState = developerState;
    globalStates.clearSkyState = clearSkyState;
    globalStates.externalState = externalState;


    if (clearSkyState) {
        // globalStates.UIOffMode = true;
        timeForContentLoaded = 240000;
        // document.getElementById("turnOffUISwitch").checked = true;
    }

    if (developerState) {
        addEventHandlers();
        globalStates.editingMode = true;
        document.getElementById("editingModeSwitch").checked = true;
    }

    if (extendedTrackingState) {
        globalStates.extendedTracking = true;
        document.getElementById("extendedTrackingSwitch").checked = true;
    }


    if (globalStates.externalState !== "") {
        document.getElementById("newURLText").value = globalStates.externalState;
    }


    if(globalStates.editingMode) {
        document.getElementById('resetButton').style.visibility = "visible";
        document.getElementById('unconstButton').style.visibility = "visible";
        document.getElementById('resetButtonDiv').style.display = "inline";
        document.getElementById('unconstButtonDiv').style.display = "inline";
    }




    // Once all the states are send the alternative checkbox is loaded
    // Its a bad hack to place it here, but it works

    if(typeof checkBoxElements === "undefined") {
        var checkBoxElements = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

        checkBoxElements.forEach(function (html) {
            var switchery = new Switchery(html, {size: 'large', speed: '0.2s', color: '#1ee71e'});

        });
    }
}


/**
 * @desc
 * @param
 * @param
 * @return
 **/

function action(action) {
    var thisAction = JSON.parse(action);

    if (thisAction.reloadLink) {
        getData('http://' + thisAction.reloadLink.ip + ':' + httpPort + '/object/' + thisAction.reloadLink.id, thisAction.reloadLink.id, function (req, thisKey) {
            objectExp[thisKey].objectLinks = req.objectLinks;
            // console.log(objectExp[thisKey]);
            console.log("got links");
        });

    }

    if (thisAction.reloadObject) {
        getData('http://' + thisAction.reloadObject.ip + ':' + httpPort + '/object/' + thisAction.reloadObject.id, thisAction.reloadObject.id, function (req, thisKey) {
            objectExp[thisKey].x = req.x;
            objectExp[thisKey].y = req.y;
            objectExp[thisKey].scale = req.scale;
            objectExp[thisKey].objectValues = req.objectValues;

            // console.log(objectExp[thisKey]);
            console.log("got links");
        });
    }


    console.log("found action: " + action);

}

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function getData(url, thisKey, callback) {
    var req = new XMLHttpRequest();
    try {
        req.open('GET', url, true);
        // Just like regular ol' XHR
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status >= 200 && req.status < 400) {
                    // JSON.parse(req.responseText) etc.
                    callback(JSON.parse(req.responseText), thisKey)
                } else {
                    // Handle error case
                    console.log("could not load content");
                }
            }
        };
        req.send();

    }
    catch (e) {
        console.log("could not connect to" + url);
    }
}


/**********************************************************************************************************************
 **********************************************************************************************************************/
// set projection matrix

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function setProjectionMatrix(matrix) {
    // globalStates.projectionMatrix = matrix;


    //  generate all transformations for the object that needs to be done ASAP
    var scaleZ = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 2, 0],
        [0, 0, 0, 1]
    ];

    var viewportScaling = [
        [globalStates.height, 0, 0, 0],
        [0, -globalStates.width, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    //   var thisTransform = multiplyMatrix(scaleZ, matrix);
    globalStates.projectionMatrix = multiplyMatrix(multiplyMatrix(scaleZ, matrix), viewportScaling);
    window.location.href = "of://gotProjectionMatrix";


    //   onceTransform();
}


/**********************************************************************************************************************
 ******************************************** update and draw the 3D Interface ****************************************
 **********************************************************************************************************************/
var conalt = "";

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function update(objects) {
    if (globalStates.feezeButtonState == false) {
        globalObjects = objects;
    }
    if (consoleText !== "") {
        consoleText = "";
        document.getElementById("consolelog").innerHTML = "";
    }
    conalt = "";

    if (globalCanvas.hasContent === true) {
        globalCanvas.context.clearRect(0, 0, globalCanvas.canvas.width, globalCanvas.canvas.height);
        globalCanvas.hasContent = false;
    }

    for (var key in objectExp) {
        if (!objectExp.hasOwnProperty(key)) {
            continue;
        }

        var generalObject = objectExp[key];

        // I changed this to has property.
        if (globalObjects.obj.hasOwnProperty(key)) {

            generalObject.visibleCounter = timeForContentLoaded;
            generalObject.ObjectVisible = true;

            var tempMatrix = multiplyMatrix(rotateX, multiplyMatrix(globalObjects.obj[key], globalStates.projectionMatrix));


            //  var tempMatrix2 = multiplyMatrix(globalObjects[key], globalStates.projectionMatrix);


            //   document.getElementById("controls").innerHTML = (toAxisAngle(tempMatrix2)[0]).toFixed(1)+" "+(toAxisAngle(tempMatrix2)[1]).toFixed(1);


            if (globalStates.guiButtonState || Object.keys(generalObject.objectValues).length === 0) {
                drawTransformed(generalObject, key, tempMatrix, key);
                addElement(generalObject, key, "http://" + generalObject.ip + ":" + httpPort + "/obj/" + key.slice(0, -12) + "/");
            }
            else {
                hideTransformed(generalObject, key, key);
            }


            for (var subKey in generalObject.objectValues) {
                // if (!generalObject.objectValues.hasOwnProperty(subKey)) { continue; }

                var tempValue = generalObject.objectValues[subKey];


                if (!globalStates.guiButtonState) {
                    drawTransformed(tempValue, subKey, tempMatrix, key);
                    addElement(tempValue, subKey, "http://" + generalObject.ip + ":" + httpPort + "/obj/dataPointInterfaces/" + tempValue.plugin + "/", key);
                } else {
                    hideTransformed(tempValue, subKey, key);
                }
            }
        }

        else {
            generalObject.ObjectVisible = false;

            hideTransformed(generalObject, key, key);

            for (var subKey in generalObject.objectValues) {
                // if (!generalObject.objectValues.hasOwnProperty(subKey)) {  continue;  }
                hideTransformed(generalObject.objectValues[subKey], subKey, key);
            }

            killObjects(generalObject, key);
        }

        if (globalStates.logButtonState) {
            consoleText += JSON.stringify(generalObject.objectLinks);
            consoleText += objectLog(key);
        }


    }

    // draw all lines
    if (!globalStates.guiButtonState && !globalStates.editingMode) {
        for (var keyT in objectExp) {
            drawAllLines(objectExp[keyT], globalCanvas.context);

        }
        drawInteractionLines();
    }

    if (globalStates.logButtonState) {
        generalLog(consoleText);
    }


}

/*
TEMPORARY CODE FOR MARKER PLANE INTERSECTION
*/

function drawMarkerIntersection(objectID, matrix) {

    var theObject = document.getElementById(objectID);
    var newMatrix = copyMatrix(multiplyMatrix(globalMatrix.begin, invertMatrix(matrix)));

    console.log("drawMarkerIntersection (new): ", theObject, newMatrix);
    // return;

    console.log("canvas"+theObject.id);
    var canv = document.getElementById("canvas"+theObject.id); //theObject.querySelector(".mainCanvas");
    // console.log(theObject, thisCanvas);
    var ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, canv.width, canv.height);
    // ctx.fillStyle = 'red';

    var mCanvas = mat4.clone(mat1x16From4x4(matrix));

    var spacing = Math.min(canv.width/30, canv.height/30);
    var edges = getEdgesClockwise(canvas, spacing);
    var firstEdge = null;
    var lastEdge = null;
    var wasLastFilled = false;
    var filledCorners = [];

    // console.log("length: ", edges.length);

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

    if (filledCorners.length > 0) {

        console.log(filledCorners);

        filledCorners.sort(function(a,b) {
            return a[1] - b[1];
        });

        console.log(filledCorners);

        ctx.beginPath();
        ctx.moveTo(filledCorners[0][0][0], filledCorners[0][0][1]);
        filledCorners.forEach(function(edge, index) {
            // if (index > 2) return;
            ctx.lineTo(edge[0][0], edge[0][1]);
        });
        ctx.closePath();
        ctx.fill();

    }

}

var mat1x16From4x4 = function(matrix) {
    return [matrix[0][0], matrix[0][1], matrix[0][2], matrix[0][3],
            matrix[1][0], matrix[1][1], matrix[1][2], matrix[1][3],
            matrix[2][0], matrix[2][1], matrix[2][2], matrix[2][3],
            matrix[3][0], matrix[3][1], matrix[3][2], matrix[3][3]];
}

var getEdgesClockwise = function (canvas, spacing) {
    var edges = [];
    for (var x = 0; x < canvas.width; x += spacing) {
        var isCorner = (x == 0);
        edges.push([x, 0, isCorner]);
    }
    for (var y = 0; y < canvas.height; y += spacing) {
        var isCorner = (y == 0);
        edges.push([canvas.width, y, isCorner]);
    }
    for (var x = canvas.width; x >= 0; x -= spacing) {
        var isCorner = (x == canvas.width);
        edges.push([x, canvas.height, isCorner]);
    }
    for (var y = canvas.height; y >= 0; y -= spacing) {
        var isCorner = (y == canvas.height);
        edges.push([0, y, isCorner]);
    }
    return edges;
}

/**********************************************************************************************************************
 ******************************************** 3D Transforms & Utilities ***********************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function drawTransformed(thisObject, thisKey, thisTransform2, generalKey) {
    if (globalStates.notLoading !== thisKey && thisObject.loaded === true) {
        if (!thisObject.visible) {
            document.getElementById("thisObject" + thisKey).style.display = 'initial';

            document.getElementById("iframe" + thisKey).style.visibility = 'visible';

            thisObject.visible = true;

            if (generalKey !== thisKey) {
                document.getElementById(thisKey).style.visibility = 'visible';
                // showEditingStripes(thisKey, true);
                document.getElementById("text" + thisKey).style.visibility = 'visible';
            }


        }
        if (generalKey === thisKey) {
            if (globalStates.editingMode) {
                if (!thisObject.visibleEditing && thisObject.developer) {
                    thisObject.visibleEditing = true;
                    console.log(thisKey + " is the lines");
                    document.getElementById(thisKey).style.visibility = 'visible';
                    showEditingStripes(thisKey, true);

                    document.getElementById(thisKey).className = "mainProgram";

                }
            }
        }

        if(globalMatrix.matrixtouchOn === thisKey && globalStates.editingMode) {
        //if(globalStates.unconstrainedPositioning===true)
            globalMatrix.temp = copyMatrix(thisTransform2);


            if(globalMatrix.copyStillFromMatrixSwitch){
                globalMatrix.visual =  copyMatrix(globalMatrix.temp);
               if(typeof thisObject.matrix === "object")
                   globalMatrix.begin = copyMatrix(multiplyMatrix(thisObject.matrix, globalMatrix.temp));
               else
                   globalMatrix.begin =copyMatrix(globalMatrix.temp);

                globalMatrix.copyStillFromMatrixSwitch = false;
            }

            if(globalStates.unconstrainedPositioning===true)
                thisTransform2 = globalMatrix.visual;

        }

        var finalMatrixTransform2 = [
            [thisObject.scale, 0, 0, 0],
            [0, thisObject.scale, 0, 0],
            [0, 0, 1, 0],
            [thisObject.x, thisObject.y, 0, 1]
        ];

        var thisTransform = [];
        if(typeof thisObject.matrix === "object"){
            var thisTransform3 = multiplyMatrix(thisObject.matrix, thisTransform2);
            thisTransform = multiplyMatrix(finalMatrixTransform2, thisTransform3);

            if(globalMatrix.matrixtouchOn === thisKey && globalStates.editingMode) {
                // console.log("drawMarkerIntersection", thisKey, thisTransform, thisObject);
                // drawMarkerIntersection(thisKey, thisTransform); // TODO: uncomment to draw correctly!

                var newMatrix = copyMatrix(multiplyMatrix(globalMatrix.begin, invertMatrix(globalMatrix.temp)));
                var theObject = document.getElementById(thisKey);
                // console.log("update", newMatrix, thisObject, thisKey, theObject);
                // console.log("existing matrices", thisObject.matrix, thisTransform2, thisTransform3, finalMatrixTransform2, thisTransform);

                var oscale = thisObject.scale;
                var odx = thisObject.x;
                var ody = thisObject.y;
                console.log(odx, ody, oscale);

                var adjustedWithScale = [
                    [newMatrix[0][0] * oscale, newMatrix[0][1], newMatrix[0][2], newMatrix[0][3]],
                    [newMatrix[1][0], newMatrix[1][1] * oscale, newMatrix[1][2], newMatrix[1][3]],
                    [newMatrix[2][0], newMatrix[2][1], newMatrix[2][2], newMatrix[2][3]],
                    [newMatrix[3][0] + odx, newMatrix[3][1] + ody, newMatrix[3][2], newMatrix[3][3]]
                ];

                // console.log("adjusted matrix", adjustedWithScale);

                estimateIntersection(theObject, adjustedWithScale);
            }   
        }
        else
            thisTransform = multiplyMatrix(finalMatrixTransform2, thisTransform2);

        document.getElementById("thisObject" + thisKey).style.webkitTransform = 'matrix3d(' +
            thisTransform[0][0] + ',' + thisTransform[0][1] + ',' + thisTransform[0][2] + ',' + thisTransform[0][3] + ',' +
            thisTransform[1][0] + ',' + thisTransform[1][1] + ',' + thisTransform[1][2] + ',' + thisTransform[1][3] + ',' +
            thisTransform[2][0] + ',' + thisTransform[2][1] + ',' + thisTransform[2][2] + ',' + thisTransform[2][3] + ',' +
            thisTransform[3][0] + ',' + thisTransform[3][1] + ',' + thisTransform[3][2] + ',' + thisTransform[3][3] + ')';

        // this is for later
        // The matrix has been changed from Vuforia 3 to 4 and 5. Instead of  thisTransform[3][2] it is now thisTransform[3][3]
        thisObject.screenX = thisTransform[3][0] / thisTransform[3][3] + (globalStates.height / 2);
        thisObject.screenY = thisTransform[3][1] / thisTransform[3][3] + (globalStates.width / 2);
        thisObject.screenZ = thisTransform[3][2];

        var iFrameMsgContent = "";
        if (typeof thisObject.sendMatrix3d !== "undefined") {
            if (thisObject.sendMatrix3d === true) {
                iFrameMsgContent = '{"matrix3d":';
                iFrameMsgContent += JSON.stringify(thisTransform);
            }

        }

        if (typeof globalObjects.acl !== "undefined") {
            if (typeof thisObject.sendAcl !== "undefined") {
                if (thisObject.sendAcl === true) {
                    if (iFrameMsgContent !== "")  iFrameMsgContent += ","; else  iFrameMsgContent += "{";
                    iFrameMsgContent += '"acl":';
                    iFrameMsgContent += JSON.stringify(globalObjects.acl);
                }
            }
        }



        if (iFrameMsgContent !== "")
        {   iFrameMsgContent += '}';
        document.getElementById("iframe" + thisKey).contentWindow.postMessage(
            iFrameMsgContent, '*');
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

function hideTransformed(thisObject, thisKey, generalKey) {
    if (thisObject.visible === true) {
        document.getElementById("thisObject" + thisKey).style.display = 'none';
        document.getElementById("iframe" + thisKey).style.visibility = 'hidden';
        //document.getElementById("iframe" + thisKey).style.display = 'none';
        document.getElementById("text" + thisKey).style.visibility = 'hidden';
        //document.getElementById("text" + thisKey).style.display = 'none';
        thisObject.visible = false;
        thisObject.visibleEditing = false;
        document.getElementById(thisKey).style.visibility = 'hidden';
        showEditingStripes(thisKey, false);
        //document.getElementById(thisKey).style.display = 'none';

    }

    /*
     if (thisObject.visibleEditing === true) {
     //  console.log(thisKey);
     thisObject.visibleEditing = false;
     document.getElementById(thisKey).style.visibility = 'hidden';
     }*/
}

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function addElementInPreferences() {

    var htmlContent = "";


    htmlContent += "<div class='Interfaces'" +
        " style='position: relative;  float: left; height: 20px; width: 35%; text-align: center; font-family: Helvetica Neue, Helvetica, Arial;background-color: #a0a0a0; -webkit-transform-style: preserve-3d;'>" +
        "Name</div>";
    htmlContent += "<div class='Interfaces'" +
        " style='position: relative;  float: left; height: 20px; width: 30%; text-align: center; font-family: Helvetica Neue, Helvetica, Arial;background-color: #a0a0a0; -webkit-transform-style: preserve-3d;'>" +
        "IP</div>";

    htmlContent += "<div class='Interfaces'" +
        " style='position: relative;  float: left; height: 20px; width: 16%; text-align: center; font-family: Helvetica Neue, Helvetica, Arial;background-color: #a0a0a0; -webkit-transform-style: preserve-3d; '>" +
        "Version</div>";

    htmlContent += "<div class='Interfaces'" +
        " style='position: relative;  float: left; height: 20px; width: 7%; text-align: center; font-family: Helvetica Neue, Helvetica, Arial; background-color: #a0a0a0;-webkit-transform-style: preserve-3d;'>" +
        "I/O</div>";

    htmlContent += "<div class='Interfaces'" +
        " style='position: relative;  float: left; height: 20px; width: 12%; text-align: center; font-family: Helvetica Neue, Helvetica, Arial; background-color: #a0a0a0;-webkit-transform-style: preserve-3d;'>" +
        "Links</div>";

    var bgSwitch = false;
    var bgcolor = "";
    for (var keyPref in objectExp) {

        if (bgSwitch) {
            bgcolor = "background-color: #a0a0a0;";
            bgSwitch = false;
        } else {
            bgcolor = "background-color: #aaaaaa;";
            bgSwitch = true;
        }

        htmlContent += "<div class='Interfaces' id='" +
            "name" + keyPref +
            "' style='position: relative;  float: left; height: 20px; width: 35%; text-align: center; font-family: Helvetica Neue, Helvetica, Arial;" + bgcolor + " -webkit-transform-style: preserve-3d; " +
            "'>" +
            keyPref.slice(0, -12)
            + "</div>";

        htmlContent += "<div class='Interfaces' id='" +
            "name" + keyPref +
            "' style='position: relative;  float: left; height: 20px; width: 30%; text-align: center; font-family: Helvetica Neue, Helvetica, Arial;" + bgcolor + " -webkit-transform-style: preserve-3d; " +
            "'>" +
            objectExp[keyPref].ip
            + "</div>";

        htmlContent += "<div class='Interfaces' id='" +
            "version" + keyPref +
            "' style='position: relative;  float: left; height: 20px; width: 16%; text-align: center; font-family: Helvetica Neue, Helvetica, Arial; " + bgcolor + "-webkit-transform-style: preserve-3d;" +
            "'>" +
            objectExp[keyPref].version
            + "</div>";

        var anzahl = 0;

        for (var subkeyPref2 in objectExp[keyPref].objectValues) {
            anzahl++;
        }

        htmlContent += "<div class='Interfaces' id='" +
            "io" + keyPref +
            "' style='position: relative;  float: left; height: 20px; width: 7%;  text-align: center; font-family: Helvetica Neue, Helvetica, Arial;" + bgcolor + "-webkit-transform-style: preserve-3d;" +
            "'>" +
            anzahl
            + "</div>";


        anzahl = 0;

        for (var subkeyPref in objectExp[keyPref].objectLinks) {
            anzahl++;
        }

        htmlContent += "<div class='Interfaces' id='" +
            "links" + keyPref +
            "' style='position: relative;  float: left; height: 20px; width: 12%; text-align: center;  font-family: Helvetica Neue, Helvetica, Arial;" + bgcolor + "-webkit-transform-style: preserve-3d;" +
            "'>" +
            anzahl
            + "</div>";

    }

    document.getElementById("content2").innerHTML = htmlContent;

}
/*
 <div class='Interfaces'
 style="position: relative; float: left; height: 30px; width: 25%; -webkit-transform-style: preserve-3d;  visibility: visible;
 background-color: #ff3fd4;"></div>
 */

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function addElement(thisObject, thisKey, thisUrl, generalObject) {
    if (globalStates.notLoading !== true && globalStates.notLoading !== thisKey && thisObject.loaded !== true) {

        if (typeof generalObject === 'undefined') {
            generalObject = thisKey;
        }

        thisObject.loaded = true;
        thisObject.visibleEditing = false;
        globalStates.notLoading = thisKey;
        //  window.location.href = "of://objectloaded_" + globalStates.notLoading;

        var addDoc = document.createElement('div');
        addDoc.id = "thisObject" + thisKey;
        addDoc.style.width = globalStates.height + "px";
        addDoc.style.height = globalStates.width + "px";
        addDoc.style.display = "none";
        addDoc.style.border = 0;
        addDoc.className = "main";
        document.getElementById("GUI").appendChild(addDoc);


        var tempAddContent =
            "<iframe id='iframe" + thisKey + "' onload='on_load(\"" +
            generalObject + "\",\"" + thisKey + "\")' frameBorder='0' " +
            "style='width:" + thisObject.frameSizeX + "px; height:" + thisObject.frameSizeY + "px;" +
            "top:" + ((globalStates.width - thisObject.frameSizeX) / 2) + "px; left:" +
            ((globalStates.height - thisObject.frameSizeY) / 2) + "px; visibility: hidden;' " +
            "src='" + thisUrl + "' class='main' sandbox='allow-forms allow-pointer-lock allow-same-origin allow-scripts'>" +
            "</iframe>";

        tempAddContent += "<div id='" + thisKey + "' frameBorder='0' style='width:" + thisObject.frameSizeX + "px; height:" + thisObject.frameSizeY + "px;" +
            "top:" + ((globalStates.width - thisObject.frameSizeX) / 2) + "px; left:" + ((globalStates.height - thisObject.frameSizeY) / 2) + "px; visibility: hidden;' class='mainEditing'></div>" +
            "";

        // tempAddContent += "<canvas id='contentCanvas" + thisKey + "' frameBorder='0' style='width:" + thisObject.frameSizeX + "px; height:" + thisObject.frameSizeY + "px;" +
        //     "top:" + ((globalStates.width - thisObject.frameSizeX) / 2) + "px; left:" + ((globalStates.height - thisObject.frameSizeY) / 2) + "px; visibility: visible;' class='mainCanvas'></canvas>" +
        //     "";

        // tempAddContent += "<canvas id='contentCanvas" + thisKey + "' frameBorder='0' style='width:" + thisObject.frameSizeX + "px; height:" + thisObject.frameSizeY + "px; top: 0px; left: 0px; visibility: visible;' class='mainCanvas'></canvas>";

        // console.log(thisObject.frameSizeX, thisObject.frameSizeY);

        tempAddContent += "<canvas id='canvas" + thisKey + "'style='width:5px; height:5px; visibility:visible;' class='mainCanvas'></canvas>";

            /// TODO: modify to add canvas object, not just background CSS
        tempAddContent += "<div id='text" + thisKey + "' frameBorder='0' style='width:5px; height:5px;" +
            "top:" + ((globalStates.width) / 2 + thisObject.frameSizeX / 2) + "px; left:" + ((globalStates.height - thisObject.frameSizeY) / 2) + "px; visibility: hidden;' class='mainProgram'><font color='white'>" + thisObject.name + "</font></div>" +
            "";

        document.getElementById("thisObject" + thisKey).innerHTML = tempAddContent;
        var theObject = document.getElementById(thisKey);

        theObject.style["touch-action"] = "none";
        theObject["handjs_forcePreventDefault"] = true;
        theObject.addEventListener("pointerdown", touchDown, false);
        theObject.addEventListener("pointerup", trueTouchUp, false);
        if (globalStates.editingMode) {
            if (objectExp[generalObject].developer) {
                theObject.addEventListener("touchstart", MultiTouchStart, false);
                theObject.addEventListener("touchmove", MultiTouchMove, false);
                theObject.addEventListener("touchend", MultiTouchEnd, false);
                theObject.className = "mainProgram";
            }
        }
        theObject.ObjectId = generalObject;
        theObject.location = thisKey;

        if (thisKey !== generalObject) {
            theObject.style.visibility = "visible";
            // theObject.style.display = "initial";
        }
        else {
            theObject.style.visibility = "hidden";
            //theObject.style.display = "none";
        }

        var iframe = document.getElementById("iframe"+thisKey);

        // var canvas = document.getElementById("canvas"+thisKey); //theObject.querySelector("#canvas");

        // // var thisCanvas = document.createElement("canvas");
        // // thisCanvas.id = "canvastarget"+thisKey;
        // // thisCanvas.className = "mainCanvas";
        // // console.log(thisObject.width, theObject.height);
        // // theObject.width = iframe.width;
        // // theObject.height = iframe.height;
        // console.log("canvas"+thisKey);
        // console.log(thisCanvas);
        // var ctx = thisCanvas.getContext("2d");
        // ctx.clearRect(0, 0, thisCanvas.width, thisCanvas.height);
        // ctx.fillRect(0,0,thisCanvas.width,thisCanvas.height);

        // // theObject.appendChild(thisCanvas);

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

function killObjects(thisObject, thisKey) {

    if (thisObject.visibleCounter > 0) {
        thisObject.visibleCounter--;
    } else if (thisObject.loaded) {
        thisObject.loaded = false;

        var tempElementDiv = document.getElementById("thisObject" + thisKey);
        tempElementDiv.parentNode.removeChild(tempElementDiv);

        for (var subKey in thisObject.objectValues) {
            try {
                tempElementDiv = document.getElementById("thisObject" + subKey);
                tempElementDiv.parentNode.removeChild(tempElementDiv);
            } catch (err) {
                console.log("could not find any");
            }
            thisObject.objectValues[subKey].loaded = false;
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

function on_load(generalObject, thisKey) {
    globalStates.notLoading = false;
    // window.location.href = "of://event_test_"+thisKey;

    // console.log("posting Msg");
    var iFrameMessage_ = JSON.stringify({
        obj: generalObject,
        pos: thisKey,
        objectValues: objectExp[generalObject].objectValues
    });
    document.getElementById("iframe" + thisKey).contentWindow.postMessage(
        iFrameMessage_, '*');
}

function fire(thisKey) {
    // globalStates.notLoading = false;
    window.location.href = "of://event_" + this.location;

}



/*****
******
******
*****/

var cssTransformToMatrix = function(cssTransformString) {
    return mat4.clone(cssTransformString.replace(/^.*\((.*)\)$/g, "$1").split(/, +/).map(Number));
}

var getTransformMatrixForDiv = function(div) {
    console.log(div);
    console.log(div.style);
    console.log(div.style.transform);
    return cssTransformToMatrix(div.style.transform);
}

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

var estimateIntersection = function (theObject, matrix) {

    var thisCanvas = document.getElementById("canvas"+theObject.id);
    var theDiv = document.getElementById("thisObject"+theObject.id);

    // var newMatrix = copyMatrix(multiplyMatrix(globalMatrix.begin, invertMatrix(globalMatrix.temp)));

    var mCanvas = mat4.clone(mat1x16From4x4(matrix));
    // var mCanvas = getTransformMatrixForDiv(theDiv);

    // console.log("mCanvas: ", mCanvas);
    // console.log("newMatrix: ", newMatrix);

    // console.log("estimate");
    ////////////////////////////////////////

    var corners = getCornersClockwise(thisCanvas);
    // console.log(corners);
    var out = vec4.create();
    corners.forEach(function(corner, index) {
        var x = corner[0] - thisCanvas.width/2;
        var y = corner[1] - thisCanvas.height/2;
        var input = vec4.clone([x,y,0,1]); // assumes z-position of corner is always 0
        // console.log(out, input, mCanvas);
        vec4.transformMat4(out, input, mCanvas);
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

    ////////////////////////////////////////

    // fills it in darker
    // var ctx=canvas.getContext("2d");
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    //
    // if (sortedPoints.length > 2) {
    //     ctx.beginPath();
    //     ctx.moveTo(sortedPoints[0][0], sortedPoints[0][1]);
    //     sortedPoints.forEach(function(point) {
    //         ctx.lineTo(point[0], point[1]);
    //     });
    //     ctx.closePath();
    //     ctx.fill();
    // }

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

var showEditingStripes = function(thisKey, shouldShow) {
    var thisCanvas = document.getElementById("canvas"+thisKey);
    var ctx=thisCanvas.getContext("2d");
    ctx.clearRect(0, 0, thisCanvas.width, thisCanvas.height);
    if (shouldShow) {
        var diagonalLineWidth = 22;
        ctx.lineWidth = diagonalLineWidth;
        ctx.strokeStyle = '#01FFFC';
        for (var i=-thisCanvas.height; i<thisCanvas.width; i+=2.5*diagonalLineWidth) {
            ctx.beginPath();
            ctx.moveTo(i, -diagonalLineWidth/2);
            ctx.lineTo(i + thisCanvas.height+diagonalLineWidth/2, thisCanvas.height+diagonalLineWidth/2);
            ctx.stroke();
        }
    }
}
