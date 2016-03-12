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
 * TODO -
 **

 **********************************************************************************************************************
 ******************************************** GUI content *********************+++*************************************
 **********************************************************************************************************************/


var freezeButtonImage = [];
var guiButtonImage = [];
var preferencesButtonImage = [];
var reloadButtonImage = [];
var logButtonImage = [];
var resetButtonImage = [];
var unconstButtonImage = [];
var editingButtonImage = [];
var loadNewUiImage = [];

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function GUI() {

    preload(freezeButtonImage,
        'png/freeze.png', 'png/freezeOver.png', 'png/freezeSelect.png','png/freezeEmpty.png'
    );
    preload(guiButtonImage,
        'png/intOneOver.png', 'png/intOneSelect.png', 'png/intTwoOver.png', 'png/intTwoSelect.png', 'png/intEmpty.png'
    );
    preload(preferencesButtonImage,
        'png/pref.png', 'png/prefOver.png', 'png/prefSelect.png', 'png/prefEmpty.png'
    );
    preload(reloadButtonImage,
        'png/reloadOver.png', 'png/reload.png', 'png/reloadEmpty.png'
    );
    preload(logButtonImage,
        'png/log.png', 'png/logOver.png', 'png/logSelect.png','png/logEmpty.png'
    );

    preload(resetButtonImage,
        'png/reset.png', 'png/resetOver.png', 'png/resetSelect.png','png/resetEmpty.png'
    );

    preload(unconstButtonImage,
        'png/unconst.png', 'png/unconstOver.png', 'png/unconstSelect.png','png/unconstEmpty.png'
    );

    preload(loadNewUiImage,
        'png/load.png', 'png/loadOver.png'
    );




    document.getElementById("guiButtonImage1").addEventListener("touchstart", function () {
        if(!globalStates.UIOffMode)     document.getElementById('guiButtonImage').src = guiButtonImage[0].src;
        // kickoff();
    });

    document.getElementById("guiButtonImage1").addEventListener("touchend", function () {
        if (globalStates.guiButtonState === false) {
            if(!globalStates.UIOffMode)      document.getElementById('guiButtonImage').src = guiButtonImage[1].src;
            globalStates.guiButtonState = true;
        }
        else {
            if(!globalStates.UIOffMode)     document.getElementById('guiButtonImage').src = guiButtonImage[1].src;
        }

    });

    document.getElementById("guiButtonImage2").addEventListener("touchstart", function () {
        if(!globalStates.UIOffMode)     document.getElementById('guiButtonImage').src = guiButtonImage[2].src;
    });

    document.getElementById("guiButtonImage2").addEventListener("touchend", function () {
        if (globalStates.guiButtonState === true) {
            if(!globalStates.UIOffMode)     document.getElementById('guiButtonImage').src = guiButtonImage[3].src;
            globalStates.guiButtonState = false;
        }
        else {
            if(!globalStates.UIOffMode)    document.getElementById('guiButtonImage').src = guiButtonImage[3].src;
        }
    });

    document.getElementById("extendedTrackingSwitch").addEventListener("change", function () {
        if(document.getElementById("extendedTrackingSwitch").checked){
            globalStates.extendedTracking = true;
            window.location.href = "of://extendedTrackingOn";
        }else{
            globalStates.extendedTracking = false;
            window.location.href = "of://extendedTrackingOff";
        }
    });

    document.getElementById("editingModeSwitch").addEventListener("change", function () {

        if(document.getElementById("editingModeSwitch").checked){
            addEventHandlers();
            globalStates.editingMode = true;
            window.location.href = "of://developerOn";
            globalMatrix.matrixtouchOn = "";
        }else{
            removeEventHandlers();
            globalStates.editingMode = false;
            window.location.href = "of://developerOff";
        }
    });

    document.getElementById("turnOffUISwitch").addEventListener("change", function () {
        if(document.getElementById("turnOffUISwitch").checked){
            globalStates.UIOffMode = true;
             timeForContentLoaded = 240000;
            window.location.href = "of://clearSkyOn";

            /*
            document.getElementById('guiButtonImage').style.visibility = "hidden";
            document.getElementById('feezeButton').style.visibility = "hidden";
            document.getElementById('guiButtonImage1').style.visibility = "hidden";
            document.getElementById('guiButtonImage2').style.visibility = "hidden";
            document.getElementById('reloadButton').style.visibility = "hidden";
            document.getElementById('logButton').style.visibility = "hidden";
            document.getElementById('preferencesButton').style.visibility = "hidden";
*/


        }else{
            globalStates.UIOffMode = false;
            window.location.href = "of://clearSkyOff";
/*
            document.getElementById('guiButtonImage').style.visibility = "visible";
            document.getElementById('feezeButton').style.visibility = "visible";
            document.getElementById('guiButtonImage1').style.visibility = "visible";
            document.getElementById('guiButtonImage2').style.visibility = "visible";
            document.getElementById('reloadButton').style.visibility = "visible";
            document.getElementById('logButton').style.visibility = "visible";
            document.getElementById('preferencesButton').style.visibility = "visible";
*/
        }
    });


    document.getElementById("resetButton").addEventListener("touchstart", function () {
            if(!globalStates.UIOffMode)    document.getElementById('resetButton').src = resetButtonImage[1].src;

    });

    document.getElementById("resetButton").addEventListener("touchend", function () {

        if(!globalStates.UIOffMode)    document.getElementById('resetButton').src = resetButtonImage[0].src;
      //  window.location.href = "of://loadNewUI"+globalStates.newURLText;


        for (var key in objectExp) {
            if (!globalObjects.obj.hasOwnProperty(key)) {
                continue;
            }


            var tempResetObject = objectExp[key];

            if(globalStates.guiButtonState) {
                tempResetObject.matrix = [];

                tempResetObject.x = 0;
                tempResetObject.y = 0;
                tempResetObject.scale = 1;

                sendResetContent(key, key);
            }

            for (var subKey in tempResetObject.objectValues) {
                var tempResetValue = tempResetObject.objectValues[subKey];

                if(!globalStates.guiButtonState) {

                    tempResetValue.matrix = [];

                    tempResetValue.x = randomIntInc(0, 200) - 100;
                    tempResetValue.y = randomIntInc(0, 200) - 100;
                    tempResetValue.scale = 1;

                    sendResetContent(key, subKey);
                }

            }



        }


    });




    function sendResetContent(object, location) {
// generate action for all links to be reloaded after upload

            var tempThisObject = {};
            if (object != location) {
                tempThisObject = objectExp[object].objectValues[location];
            } else {
                tempThisObject = objectExp[object];
            }

            var content = {};
            content.x = tempThisObject.x;
            content.y = tempThisObject.y;
            content.scale = tempThisObject.scale;

        if(typeof tempThisObject.matrix === "object"){
                content.matrix = tempThisObject.matrix;
            }

            if(typeof content.x === "number" && typeof content.y === "number" && typeof content.scale === "number") {
                postData('http://' + objectExp[object].ip + ':' + httpPort + '/object/' + object + "/size/" + location, content);
            }

    }


    document.getElementById("unconstButton").addEventListener("touchstart", function () {
        if(!globalStates.UIOffMode) document.getElementById('unconstButton').src = unconstButtonImage[1].src;
    });

    document.getElementById("unconstButton").addEventListener("touchend", function () {
        if (globalStates.unconstrainedPositioning === true) {
            if(!globalStates.UIOffMode)    document.getElementById('unconstButton').src = unconstButtonImage[0].src;
            globalStates.unconstrainedPositioning = false;

        }
        else {
            if(!globalStates.UIOffMode)    document.getElementById('unconstButton').src = unconstButtonImage[2].src;
            globalStates.unconstrainedPositioning = true;

        }

    });




    document.getElementById("loadNewUI").addEventListener("touchstart", function () {
        if (globalStates.extendedTracking === true) {
            if(!globalStates.UIOffMode)    document.getElementById('loadNewUI').src = loadNewUiImage[3].src;
        }
        else {
            if(!globalStates.UIOffMode)    document.getElementById('loadNewUI').src = loadNewUiImage[1].src;
        }
    });

    document.getElementById("loadNewUI").addEventListener("touchend", function () {

        if(!globalStates.UIOffMode)    document.getElementById('loadNewUI').src = loadNewUiImage[0].src;
            window.location.href = "of://loadNewUI"+globalStates.newURLText;

    });


    document.getElementById("preferencesButton").addEventListener("touchstart", function () {
        if(!globalStates.UIOffMode)    document.getElementById('preferencesButton').src = preferencesButtonImage[1].src;
    });

    document.getElementById("preferencesButton").addEventListener("touchend", function () {
        if (globalStates.preferencesButtonState === true) {
            preferencesHide()

            if(globalStates.editingMode) {
                document.getElementById('resetButton').style.visibility = "visible";
                document.getElementById('unconstButton').style.visibility = "visible";
                document.getElementById('resetButtonDiv').style.display = "inline";
                document.getElementById('unconstButtonDiv').style.display = "inline";
            }

            if(globalStates.UIOffMode){
                document.getElementById('preferencesButton').src = preferencesButtonImage[3].src;
                document.getElementById('feezeButton').src = freezeButtonImage[3].src;
                document.getElementById('reloadButton').src = reloadButtonImage[2].src;
                document.getElementById('logButton').src = logButtonImage[3].src;
                document.getElementById('guiButtonImage').src = guiButtonImage[4].src;
                document.getElementById('resetButton').src = resetButtonImage[3].src;
                document.getElementById('unconstButton').src = unconstButtonImage[3].src;
            }

        }
        else {


                document.getElementById('resetButton').style.visibility = "hidden";
                document.getElementById('unconstButton').style.visibility = "hidden";
                document.getElementById('resetButtonDiv').style.display = "none";
                document.getElementById('unconstButtonDiv').style.display = "none";


                addElementInPreferences();


            preferencesVisible();
            consoleHide();


            if(globalStates.UIOffMode){
                document.getElementById('preferencesButton').src = preferencesButtonImage[0].src;
                document.getElementById('feezeButton').src = freezeButtonImage[0].src;
                document.getElementById('reloadButton').src = reloadButtonImage[0].src;
                document.getElementById('logButton').src = logButtonImage[0].src;
                document.getElementById('guiButtonImage').src = guiButtonImage[1].src;
                document.getElementById('resetButton').src = resetButtonImage[0].src;
                document.getElementById('unconstButton').src = unconstButtonImage[0].src;
            }

        }

    });


    document.getElementById("feezeButton").addEventListener("touchstart", function () {
        if(!globalStates.UIOffMode) document.getElementById('feezeButton').src = freezeButtonImage[1].src;
    });

    document.getElementById("feezeButton").addEventListener("touchend", function () {
        if (globalStates.feezeButtonState === true) {
            if(!globalStates.UIOffMode)    document.getElementById('feezeButton').src = freezeButtonImage[0].src;
            globalStates.feezeButtonState = false;
            window.location.href = "of://unfreeze";
        }
        else {
            if(!globalStates.UIOffMode)    document.getElementById('feezeButton').src = freezeButtonImage[2].src;
            globalStates.feezeButtonState = true;
            window.location.href = "of://freeze";
        }

    });


    document.getElementById("reloadButton").addEventListener("touchstart", function () {
        if(!globalStates.UIOffMode)    document.getElementById('reloadButton').src = reloadButtonImage[0].src;
        window.location.href = "of://reload";
    });

    document.getElementById("reloadButton").addEventListener("touchend", function () {
        // location.reload(true);

        window.open("index.html?v=" + Math.floor((Math.random() * 100) + 1));
    });


    document.getElementById("logButton").addEventListener("touchstart", function () {
        if(!globalStates.UIOffMode)    document.getElementById('logButton').src = logButtonImage[1].src;
    });

    document.getElementById("logButton").addEventListener("touchend", function () {
        if (globalStates.logButtonState === true) {
            consoleHide();
        }
        else {
            if(!globalStates.UIOffMode)    document.getElementById('logButton').src = logButtonImage[2].src;
            globalStates.logButtonState = true;

            // set pref. button to off
            preferencesHide();

        }

    });


}


/**
 * @desc
 * @param
 * @param
 * @return
 **/

function consoleHide() {
    if(!globalStates.UIOffMode)    document.getElementById('logButton').src = logButtonImage[0].src;
    globalStates.logButtonState = false;
    document.getElementById("consolelog").style.visibility = "hidden";
    document.getElementById("consolelog").innerText = "";
}

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function preferencesHide() {
    if(!globalStates.UIOffMode)    document.getElementById('preferencesButton').src = preferencesButtonImage[0].src;
    globalStates.preferencesButtonState = false;
    document.getElementById("preferences").style.visibility = "hidden" ; //= "hidden";
    document.getElementById("preferences").style.dispaly = "none" ; //= "hidden";
}


/**
 * @desc
 * @param
 * @param
 * @return
 **/

function preferencesVisible() {
    if(!globalStates.UIOffMode)    document.getElementById('preferencesButton').src = preferencesButtonImage[2].src;
    globalStates.preferencesButtonState = true;
    document.getElementById("preferences").style.visibility = "visible" ; //
    document.getElementById("preferences").style.display = "inline" ; //= "hidden";
}


/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function preload(array) {
    for (var i = 0; i < preload.arguments.length - 1; i++) {
        array[i] = new Image();
        array[i].src = preload.arguments[i + 1];
    }

}




