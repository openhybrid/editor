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
var editingButtonImage = [];

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
        'png/freeze.png', 'png/freezeOver.png', 'png/freezeSelect.png'
    );
    preload(guiButtonImage,
        'png/intOneOver.png', 'png/intOneSelect.png', 'png/intTwoOver.png', 'png/intTwoSelect.png'
    );
    preload(preferencesButtonImage,
        'png/pref.png', 'png/prefOver.png', 'png/prefSelect.png'
    );
    preload(reloadButtonImage,
        'png/reloadOver.png', 'png/reload.png'
    );
    preload(logButtonImage,
        'png/log.png', 'png/logOver.png', 'png/logSelect.png'
    );

    preload(editingButtonImage,
        'png/switchOff.png', 'png/switchOffOver.png', 'png/switchOn.png', 'png/switchOnOver.png'
    );


    document.getElementById("guiButtonImage1").addEventListener("touchstart", function () {
        document.getElementById('guiButtonImage').src = guiButtonImage[0].src;
        // kickoff();
    });

    document.getElementById("guiButtonImage1").addEventListener("touchend", function () {
        if (globalStates.guiButtonState === false) {
            document.getElementById('guiButtonImage').src = guiButtonImage[1].src;
            globalStates.guiButtonState = true;
        }
        else {
            document.getElementById('guiButtonImage').src = guiButtonImage[1].src;
        }

    });

    document.getElementById("guiButtonImage2").addEventListener("touchstart", function () {
        document.getElementById('guiButtonImage').src = guiButtonImage[2].src;
    });

    document.getElementById("guiButtonImage2").addEventListener("touchend", function () {
        if (globalStates.guiButtonState === true) {
            document.getElementById('guiButtonImage').src = guiButtonImage[3].src;
            globalStates.guiButtonState = false;
        }
        else {
            document.getElementById('guiButtonImage').src = guiButtonImage[3].src;
        }
    });

    document.getElementById("editingModeSwitch").addEventListener("touchstart", function () {
        if (globalStates.editingMode === true) {
            document.getElementById('editingModeSwitch').src = editingButtonImage[3].src;
        }
        else {
            document.getElementById('editingModeSwitch').src = editingButtonImage[1].src;
        }
    });

    document.getElementById("editingModeSwitch").addEventListener("touchend", function () {
        if (globalStates.editingMode === true) {
            removeEventHandlers();
            document.getElementById('editingModeSwitch').src = editingButtonImage[0].src;
            globalStates.editingMode = false;
        }
        else {
            addEventHandlers();
            document.getElementById('editingModeSwitch').src = editingButtonImage[2].src;
            globalStates.editingMode = true;
        }

    });


    document.getElementById("preferencesButton").addEventListener("touchstart", function () {
        document.getElementById('preferencesButton').src = preferencesButtonImage[1].src;
    });

    document.getElementById("preferencesButton").addEventListener("touchend", function () {
        if (globalStates.preferencesButtonState === true) {
            preferencesHide()
        }
        else {
            preferencesVisible();
            consoleHide();
        }

    });


    document.getElementById("feezeButton").addEventListener("touchstart", function () {
        document.getElementById('feezeButton').src = freezeButtonImage[1].src;
    });

    document.getElementById("feezeButton").addEventListener("touchend", function () {
        if (globalStates.feezeButtonState === true) {
            document.getElementById('feezeButton').src = freezeButtonImage[0].src;
            globalStates.feezeButtonState = false;
            window.location.href = "of://unfreeze";
        }
        else {
            document.getElementById('feezeButton').src = freezeButtonImage[2].src;
            globalStates.feezeButtonState = true;
            window.location.href = "of://freeze";
        }

    });


    document.getElementById("reloadButton").addEventListener("touchstart", function () {
        document.getElementById('reloadButton').src = reloadButtonImage[0].src;
        window.location.href = "of://reload";
    });

    document.getElementById("reloadButton").addEventListener("touchend", function () {
        // location.reload(true);

        window.open("index.html?v=" + Math.floor((Math.random() * 100) + 1));
    });


    document.getElementById("logButton").addEventListener("touchstart", function () {
        document.getElementById('logButton').src = logButtonImage[1].src;
    });

    document.getElementById("logButton").addEventListener("touchend", function () {
        if (globalStates.logButtonState === true) {
            consoleHide();
        }
        else {
            document.getElementById('logButton').src = logButtonImage[2].src;
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
    document.getElementById('logButton').src = logButtonImage[0].src;
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
    document.getElementById('preferencesButton').src = preferencesButtonImage[0].src;
    globalStates.preferencesButtonState = false;
    document.getElementById("preferences").style.visibility = "hidden";
}


/**
 * @desc
 * @param
 * @param
 * @return
 **/

function preferencesVisible() {
    document.getElementById('preferencesButton').src = preferencesButtonImage[2].src;
    globalStates.preferencesButtonState = true;
    document.getElementById("preferences").style.visibility = "visible";
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




