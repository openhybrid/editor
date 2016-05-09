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
                objectExp[thisKey].fullScreen = false;
                objectExp[thisKey].sendMatrix = false;
                objectExp[thisKey].IntegerVersion = parseInt(objectExp[thisKey].version.replace(/\./g, ""));

                cout(objectExp[thisKey]);
                addElementInPreferences();

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

function setDeviceName(deviceName) {
    globalStates.device = deviceName;
    console.log("we are dealing with a " + globalStates.device);
}

function setStates(developerState, extendedTrackingState, clearSkyState, externalState) {


    globalStates.extendedTrackingState = extendedTrackingState;
    globalStates.developerState = developerState;
    globalStates.clearSkyState = clearSkyState;
    globalStates.externalState = externalState;


    if (clearSkyState) {
        // globalStates.UIOffMode = true;
        //  timeForContentLoaded = 240000;
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


    if (globalStates.editingMode) {
        document.getElementById('resetButton').style.visibility = "visible";
        document.getElementById('unconstButton').style.visibility = "visible";
        document.getElementById('resetButtonDiv').style.display = "inline";
        document.getElementById('unconstButtonDiv').style.display = "inline";
    }


    // Once all the states are send the alternative checkbox is loaded
    // Its a bad hack to place it here, but it works

    if (typeof checkBoxElements === "undefined") {
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
            // cout(objectExp[thisKey]);
            cout("got links");
        });

    }

    if (thisAction.reloadObject) {
        getData('http://' + thisAction.reloadObject.ip + ':' + httpPort + '/object/' + thisAction.reloadObject.id, thisAction.reloadObject.id, function (req, thisKey) {
            objectExp[thisKey].x = req.x;
            objectExp[thisKey].y = req.y;
            objectExp[thisKey].scale = req.scale;
            objectExp[thisKey].objectValues = req.objectValues;

            // cout(objectExp[thisKey]);
            cout("got links");
        });
    }


    cout("found action: " + action);

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
                    cout("could not load content");
                }
            }
        };
        req.send();

    }
    catch (e) {
        cout("could not connect to" + url);
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

    var corX = 0;
    var corY = 0;
    var deviceClass = globalStates.device.split(',')[0];

    if (deviceClass === "iPhone6" || deviceClass === "iPhone5") {
        corX = -3;
        corY = -1;
    } else if (deviceClass === "iPhone7" || deviceClass === "iPhone8") {
        corX = -0.3;
        corY = -1.5;
    } else if (deviceClass === "iPad3" || deviceClass === "iPad2" || deviceClass === "iPad1") {
        corX = -5;
        corY = 17;
    } else if (deviceClass === "iPad4") {
        corX = -11;
        corY = 6.5;
    }

    var viewportScaling = [
        [globalStates.height, 0, 0, 0],
        [0, -globalStates.width, 0, 0],
        [0, 0, 1, 0],
        [corX, corY, 0, 1]
    ];

    globalStates.realProjectionMatrix = matrix;

    //   var thisTransform = multiplyMatrix(scaleZ, matrix);
    globalStates.projectionMatrix = multiplyMatrix(multiplyMatrix(scaleZ, matrix), viewportScaling);
    window.location.href = "of://gotProjectionMatrix";


    //   onceTransform();
}


/**********************************************************************************************************************
 ******************************************** update and draw the 3D Interface ****************************************
 **********************************************************************************************************************/
//var conalt = "";

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function updateReDraw() {
    timeCorrection(timeCorrection);
    disp = uiButtons.style.display;
    uiButtons.style.display = 'none';
    uiButtons.style.display = disp;
}

function update(objects) {
    timeSynchronizer(timeCorrection);
    //disp = uiButtons.style.display;
    //uiButtons.style.display = 'none';

    if (globalStates.feezeButtonState == false) {
        globalObjects = objects;
    }
    /* if (consoleText !== "") {
     consoleText = "";
     document.getElementById("consolelog").innerHTML = "";
     }
     conalt = "";*/

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
        if (globalObjects.hasOwnProperty(key)) {

            generalObject.visibleCounter = timeForContentLoaded;
            generalObject.ObjectVisible = true;

            var tempMatrix = multiplyMatrix(rotateX, multiplyMatrix(globalObjects[key], globalStates.projectionMatrix));


            //  var tempMatrix2 = multiplyMatrix(globalObjects[key], globalStates.projectionMatrix);


            //   document.getElementById("controls").innerHTML = (toAxisAngle(tempMatrix2)[0]).toFixed(1)+" "+(toAxisAngle(tempMatrix2)[1]).toFixed(1);


            if (globalStates.guiButtonState || Object.keys(generalObject.objectValues).length === 0) {
                drawTransformed(generalObject, key, tempMatrix, key);
                addElement(generalObject, key, "http://" + generalObject.ip + ":" + httpPort + "/obj/" + generalObject.name + "/");
            }
            else {
                hideTransformed(generalObject, key, key);
            }

            // do this for staying compatible with older versions but use new routing after some time.
            // dataPointInterfaces are clearly their own thing and should not be part of obj
            // once added, they will be associated with the object via the editor postMessages anyway.

            var destinationString;
            if(generalObject.IntegerVersion > 39){
                destinationString= "/dataPointInterfaces/";
            }else {
                destinationString= "/obj/dataPointInterfaces/";
            }

            for (var subKey in generalObject.objectValues) {
                // if (!generalObject.objectValues.hasOwnProperty(subKey)) { continue; }

                var tempValue = generalObject.objectValues[subKey];

                if (!globalStates.guiButtonState) {
                    drawTransformed(tempValue, subKey, tempMatrix, key);

                    addElement(tempValue, subKey, "http://" + generalObject.ip + ":" + httpPort + destinationString + tempValue.plugin + "/", key);

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
        //  cout("drawlines");
    }

    if (globalStates.logButtonState) {
        generalLog(consoleText);
    }
    //   window.location.href = "of://newframe";
    // cout("update");

    //  countEventHandlers()


    // uiButtons.style.display = disp;


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
            thisObject.visible = true;

            document.getElementById("thisObject" + thisKey).style.display = 'inline';

            var thisIframe = document.getElementById("iframe" + thisKey);
            thisIframe.style.visibility = 'visible';
            thisIframe.contentWindow.postMessage(
                JSON.stringify(
                    {
                        "visibility": "visible"
                    }), '*');


            if (generalKey !== thisKey) {
                document.getElementById(thisKey).style.visibility = 'visible';
                document.getElementById("text" + thisKey).style.visibility = 'visible';
                if (globalStates.editingMode) {
                    document.getElementById("canvas" + thisKey).style.display = 'inline';
                } else {
                    document.getElementById("canvas" + thisKey).style.display = 'none';
                }
            }


            if (generalKey === thisKey) {
                if (globalStates.editingMode) {
                    if (!thisObject.visibleEditing && thisObject.developer) {
                        thisObject.visibleEditing = true;
                        document.getElementById(thisKey).style.visibility = 'visible';
                        // showEditingStripes(thisKey, true);
                        document.getElementById("canvas" + thisKey).style.display = 'inline';

                        //document.getElementById(thisKey).className = "mainProgram";
                    }
                } else {
                    document.getElementById("canvas" + thisKey).style.display = 'none';
                }
            }

        }

        // this needs a better solution
        if (thisObject.fullScreen !== true) {

            var finalMatrixTransform2 = [
                [thisObject.scale, 0, 0, 0],
                [0, thisObject.scale, 0, 0],
                [0, 0, 1, 0],
                [thisObject.x, thisObject.y, 0, 1]
            ];

            var thisTransform = [];

            if (globalStates.editingMode) {
                if (globalMatrix.matrixtouchOn === thisKey) {
                    //if(globalStates.unconstrainedPositioning===true)
                    thisObject.temp = copyMatrix(thisTransform2);


                    if (globalMatrix.copyStillFromMatrixSwitch) {
                        globalMatrix.visual = copyMatrix(thisTransform2);
                        if (typeof thisObject.matrix === "object")
                            if (thisObject.matrix.length > 0)
                                thisObject.begin = copyMatrix(multiplyMatrix(thisObject.matrix, thisObject.temp));
                            else
                                thisObject.begin = copyMatrix(thisObject.temp);
                        else
                            thisObject.begin = copyMatrix(thisObject.temp);

                        if (globalStates.unconstrainedPositioning === true)
                            thisObject.matrix = copyMatrix(multiplyMatrix(thisObject.begin, invertMatrix(thisObject.temp)));

                        globalMatrix.copyStillFromMatrixSwitch = false;
                    }

                    if (globalStates.unconstrainedPositioning === true)
                        thisTransform2 = globalMatrix.visual;

                }


                if (typeof thisObject.matrix === "object") {
                    if (thisObject.matrix.length > 0) {
                        if (globalStates.unconstrainedPositioning === false) {
                            thisObject.begin = copyMatrix(multiplyMatrix(thisObject.matrix, thisObject.temp));
                        }
                        estimateIntersection(thisKey, multiplyMatrix(finalMatrixTransform2, multiplyMatrix(thisObject.begin, invertMatrix(thisObject.temp))));
                    } else {
                        estimateIntersection(thisKey, [
                            [1, 0, 0, 0],
                            [0, 1, 0, 0],
                            [0, 0, 1, 0],
                            [0, 0, 0, 1]
                        ]);
                    }

                } else {
                    estimateIntersection(thisKey, [
                        [1, 0, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 1]
                    ]);
                }
            }

            if (typeof thisObject.matrix === "object") {
                if (thisObject.matrix.length > 0) {
                    thisTransform = multiplyMatrix(finalMatrixTransform2, multiplyMatrix(thisObject.matrix, thisTransform2));
                } else {
                    thisTransform = multiplyMatrix(finalMatrixTransform2, thisTransform2);
                }
            }
            else {
                thisTransform = multiplyMatrix(finalMatrixTransform2, thisTransform2);
            }

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

        }

        if (thisObject.sendMatrix === true) {
            if (generalKey === thisKey) {
                document.getElementById("iframe" + thisKey).contentWindow.postMessage(
                    '{"modelViewMatrix":' + JSON.stringify(globalObjects[thisKey]) + "}", '*');
            }
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

        var thisIframe = document.getElementById("iframe" + thisKey);
        thisIframe.style.visibility = 'hidden';
        thisIframe.contentWindow.postMessage(
            JSON.stringify(
                {
                    "visibility": "hidden"
                }), '*');

        //document.getElementById("iframe" + thisKey).style.display = 'none';
        document.getElementById("text" + thisKey).style.visibility = 'hidden';
        //document.getElementById("text" + thisKey).style.display = 'none';
        thisObject.visible = false;
        thisObject.visibleEditing = false;
        document.getElementById(thisKey).style.visibility = 'hidden';
        document.getElementById("canvas" + thisKey).style.display = 'none';

        //document.getElementById(thisKey).style.display = 'none';
        cout("hideTransformed");
    }

    /*
     if (thisObject.visibleEditing === true) {
     //  cout(thisKey);
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
    console.log("addedObject");

    var htmlContent = "";


    htmlContent += "<div class='Interfaces'" +
        " style='position: relative;  float: left; height: 20px; width: 35%;  text-align: center;  line-height: 20px; vertical-align: middle;display: table-cell; font-family: Helvetica Neue, Helvetica, Arial;background-color: #a0a0a0; -webkit-transform-style: preserve-3d;'>" +
        "Name</div>";
    htmlContent += "<div class='Interfaces'" +
        " style='position: relative;  float: left; height: 20px; width: 30%;  text-align: center;  line-height: 20px; vertical-align: middle;display: table-cell;  font-family: Helvetica Neue, Helvetica, Arial;background-color: #a0a0a0; -webkit-transform-style: preserve-3d;'>" +
        "IP</div>";

    htmlContent += "<div class='Interfaces'" +
        " style='position: relative;  float: left; height: 20px; width: 16%;  text-align: center;  line-height: 20px; vertical-align: middle;display: table-cell;  font-family: Helvetica Neue, Helvetica, Arial;background-color: #a0a0a0; -webkit-transform-style: preserve-3d; '>" +
        "Version</div>";

    htmlContent += "<div class='Interfaces'" +
        " style='position: relative;  float: left; height: 20px; width: 7%;  text-align: center;  line-height: 20px; vertical-align: middle;display: table-cell;  font-family: Helvetica Neue, Helvetica, Arial; background-color: #a0a0a0;-webkit-transform-style: preserve-3d;'>" +
        "I/O</div>";

    htmlContent += "<div class='Interfaces'" +
        " style='position: relative;  float: left; height: 20px; width: 12%;  text-align: center;  line-height: 20px; vertical-align: middle;display: table-cell;  font-family: Helvetica Neue, Helvetica, Arial; background-color: #a0a0a0;-webkit-transform-style: preserve-3d;'>" +
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
            "' style='position: relative;  float: left; height: 20px; width: 35%; text-align: center;  line-height: 20px; vertical-align: middle;display: table-cell; font-family: Helvetica Neue, Helvetica, Arial;" + bgcolor + " -webkit-transform-style: preserve-3d; " +
            "'>" ;

        if(objectExp[keyPref].IntegerVersion > 40){
            htmlContent +=    objectExp[keyPref].name;
        }else{
            htmlContent +=     keyPref.slice(0, -12);
        }

        htmlContent += "</div><div class='Interfaces' id='" +
            "name" + keyPref +
            "' style='position: relative;  float: left; height: 20px; width: 30%;  text-align: center;  line-height: 20px; vertical-align: middle;display: table-cell;  font-family: Helvetica Neue, Helvetica, Arial;" + bgcolor + " -webkit-transform-style: preserve-3d; " +
            "'>" +
            objectExp[keyPref].ip
            + "</div>";

        htmlContent += "<div class='Interfaces' id='" +
            "version" + keyPref +
            "' style='position: relative;  float: left; height: 20px; width: 16%;  text-align: center;  line-height: 20px; vertical-align: middle;display: table-cell; font-family: Helvetica Neue, Helvetica, Arial; " + bgcolor + "-webkit-transform-style: preserve-3d;" +
            "'>" +
            objectExp[keyPref].version
            + "</div>";

        var anzahl = 0;

        for (var subkeyPref2 in objectExp[keyPref].objectValues) {
            anzahl++;
        }

        htmlContent += "<div class='Interfaces' id='" +
            "io" + keyPref +
            "' style='position: relative;  float: left; height: 20px; width: 7%;   text-align: center;  line-height: 20px; vertical-align: middle;display: table-cell;  font-family: Helvetica Neue, Helvetica, Arial;" + bgcolor + "-webkit-transform-style: preserve-3d;" +
            "'>" +
            anzahl
            + "</div>";


        anzahl = 0;

        for (var subkeyPref in objectExp[keyPref].objectLinks) {
            anzahl++;
        }

        htmlContent += "<div class='Interfaces' id='" +
            "links" + keyPref +
            "' style='position: relative;  float: left; height: 20px; width: 12%;  text-align: center;  line-height: 20px; vertical-align: middle;display: table-cell;  font-family: Helvetica Neue, Helvetica, Arial;" + bgcolor + "-webkit-transform-style: preserve-3d;" +
            "'>" +
            anzahl
            + "</div>";

    }

    document.getElementById("content2").innerHTML = htmlContent;

    cout("addElementInPreferences");
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


        if (typeof thisObject.begin !== "object") {
            thisObject.begin = [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ];

        }

        if (typeof thisObject.temp !== "object") {
            thisObject.temp = [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ];

        }

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
            "style='width:0px; height:0px;" +
            "top:" + ((globalStates.width - thisObject.frameSizeX) / 2) + "px; left:" +
            ((globalStates.height - thisObject.frameSizeY) / 2) + "px; visibility: hidden;' " +
            "src='" + thisUrl + "' class='main' sandbox='allow-forms allow-pointer-lock allow-same-origin allow-scripts'>" +
            "</iframe>";


        tempAddContent += "<div id='" + thisKey + "' frameBorder='0' style='width:" + thisObject.frameSizeX + "px; height:" + thisObject.frameSizeY + "px;" +
            "top:" + ((globalStates.width - thisObject.frameSizeX) / 2) + "px; left:" + ((globalStates.height - thisObject.frameSizeY) / 2) + "px; visibility: hidden;' class='mainEditing'>" +
            "<canvas id='canvas" + thisKey + "'style='width:100%; height:100%;' class='mainCanvas'></canvas>" +
            "</div>" +
            "";

        tempAddContent += "<div id='text" + thisKey + "' frameBorder='0' style='width:5px; height:5px;" +
            "top:" + ((globalStates.width) / 2 + thisObject.frameSizeX / 2) + "px; left:" + ((globalStates.height - thisObject.frameSizeY) / 2) + "px; visibility: hidden;' class='mainProgram'><font color='white'>" + thisObject.name + "</font></div>" +
            "";

        document.getElementById("thisObject" + thisKey).innerHTML = tempAddContent;
        var theObject = document.getElementById(thisKey);
        theObject.style["touch-action"] = "none";
        theObject["handjs_forcePreventDefault"] = true;
        theObject.addEventListener("pointerdown", touchDown, false);
        ec++;
        theObject.addEventListener("pointerup", trueTouchUp, false);
        ec++;
        theObject.addEventListener("pointerenter", function (e) {


            var contentForFeedback;

            if (globalProgram.locationInA === this.id || globalProgram.locationInA === false) {
                contentForFeedback = 3;
            } else {

                if (checkForNetworkLoop(globalProgram.ObjectA, globalProgram.locationInA, this.ObjectId, this.location))
                    contentForFeedback = 2; // overlayImg.src = overlayImage[2].src;
                else
                    contentForFeedback = 0; // overlayImg.src = overlayImage[0].src;
            }

            document.getElementById("iframe" + this.location).contentWindow.postMessage(
                JSON.stringify(
                    {
                        "uiActionFeedback": contentForFeedback
                    })
                , "*");

            document.getElementById('overlayImg').src = overlayImage[contentForFeedback].src;

        }, false);
        ec++;
        theObject.addEventListener("pointerleave", function () {
            document.getElementById('overlayImg').src = overlayImage[1].src;

            cout("leave");

            document.getElementById("iframe" + this.location).contentWindow.postMessage(
                JSON.stringify(
                    {
                        "uiActionFeedback": 1
                    })
                , "*");


        }, false);

        ec++;

        if (globalStates.editingMode) {
            if (objectExp[generalObject].developer) {
                theObject.addEventListener("touchstart", MultiTouchStart, false);
                ec++;
                theObject.addEventListener("touchmove", MultiTouchMove, false);
                ec++;
                theObject.addEventListener("touchend", MultiTouchEnd, false);
                ec++;
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
        cout("addElementInPreferences");
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
                cout("could not find any");
            }
            thisObject.objectValues[subKey].loaded = false;
        }
        cout("killObjects");
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

    // cout("posting Msg");
    var iFrameMessage_ = JSON.stringify({
        obj: generalObject,
        pos: thisKey,
        objectValues: objectExp[generalObject].objectValues
    });

    document.getElementById("iframe" + thisKey).contentWindow.postMessage(
        iFrameMessage_, '*');
    cout("on_load");
}

function fire(thisKey) {
    // globalStates.notLoading = false;
    window.location.href = "of://event_" + this.location;

}
