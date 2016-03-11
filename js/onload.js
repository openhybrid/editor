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
 ******************************************** onload content **********************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

window.onload = function () {
    globalMatrix = new GlobalMatrix();
    rotateX_ = [
        1, 0, 0, 0,
        0, -1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

    GUI();

    if (globalStates.platform !== 'iPad' && globalStates.platform !== 'iPhone' && globalStates.platform !== 'iPod') {
        globalStates.platform = false;
    }


    if (globalStates.platform === 'iPhone') {
        document.getElementById("logButtonDiv").style.visibility = "hidden";
        document.getElementById("reloadButtonDiv").style.visibility = "hidden";
        document.getElementById("preferencesButtonDiv").style.bottom = "36px";

        var editingInterface = document.getElementById("content2title");
        editingInterface.style.fontSize = "12px";
        editingInterface.style.left = "38%";
        editingInterface.style.right = "22%";

        editingInterface = document.getElementById("content1title");
        editingInterface.style.fontSize = "12px";
        editingInterface.style.left = "2%";
        editingInterface.style.right = "65%";


        editingInterface = document.getElementById("content2");
        editingInterface.style.fontSize = "9px";
        editingInterface.style.left = "38%";
        editingInterface.style.right = "22%";
        editingInterface.style.bottom = "14%";

         editingInterface = document.getElementById("content11");
        editingInterface.style.fontSize = "12px";
        editingInterface.style.width = "40%";

        editingInterface = document.getElementById("content12");
        editingInterface.style.fontSize = "12px";
        editingInterface.style.width = "60%";


        editingInterface = document.getElementById("content13");
        editingInterface.style.fontSize = "12px";
        editingInterface.style.width = "40%";

        editingInterface = document.getElementById("content14");
        editingInterface.style.fontSize = "12px";
        editingInterface.style.width = "60%";



        editingInterface = document.getElementById("content15");
        editingInterface.style.fontSize = "12px";
        editingInterface.style.width = "40%";
        editingInterface.innerHTML ='<b>External Interface</b><br>';

        editingInterface = document.getElementById("content16");
        editingInterface.style.fontSize = "12px";
        editingInterface.style.width = "60%";

        editingInterface = document.getElementById("content18");
        editingInterface.style.visibility ='hidden';


        editingInterface = document.getElementById("content1");
        editingInterface.style.fontSize = "12px";
        editingInterface.style.left = "2%";
        editingInterface.style.right = "65%";
        editingInterface.style.bottom = "14%";

    }else
    {
        editingInterface = document.getElementById("content15");
        editingInterface.style.paddingTop = "13px";



        editingInterface = document.getElementById("content20");
        editingInterface.innerHTML = '<input id="newURLText"'+

        "style='text-align: left; font-family: Helvetica Neue, Helvetica, Arial; font-size: large;   -webkit-user-select: text;'"+
        'type="text" name="newURL"  size="27" placeholder="http://..."'+ "oninput='newURLTextLoad()'><br>";
    }

    globalCanvas.canvas = document.getElementById('canvas');
    globalCanvas.canvas.width = globalStates.height;
    globalCanvas.canvas.height = globalStates.width;

    globalCanvas.context = canvas.getContext('2d');

    if (globalStates.platform) {
        window.location.href = "of://kickoff";
    }

    document.handjs_forcePreventDefault = true;
    globalCanvas.canvas.handjs_forcePreventDefault = true;

    globalCanvas.canvas.addEventListener("pointerdown", canvasPointerDown, false);

    document.addEventListener("pointermove", getPossition, false);
    document.addEventListener("pointerdown", getPossition, false);
    document.addEventListener("pointerup", documentPointerUp, false);
    window.addEventListener("message", postMessage, false);




};

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function postMessage(e) {
    console.log(e.data);
    var msgContent = JSON.parse(e.data);
    document.getElementById(msgContent.pos).style.width = msgContent.width;
    document.getElementById(msgContent.pos).style.height = msgContent.height;
    document.getElementById(msgContent.pos).style.top = ((globalStates.width - msgContent.height) / 2);
    document.getElementById(msgContent.pos).style.left = ((globalStates.height - msgContent.width) / 2);

    document.getElementById("iframe" + msgContent.pos).style.width = msgContent.width;
    document.getElementById("iframe" + msgContent.pos).style.height = msgContent.height;
    document.getElementById("iframe" + msgContent.pos).style.top = ((globalStates.width - msgContent.height) / 2);
    document.getElementById("iframe" + msgContent.pos).style.left = ((globalStates.height - msgContent.width) / 2);



    if (typeof objectExp[msgContent.obj] !== "undefined") {
        if (typeof msgContent.sendMatrix3d !== "undefined") {
            if(msgContent.sendMatrix3d === true) {
                objectExp[msgContent.obj].sendMatrix3d = true;
            }
        }

        if (typeof msgContent.sendAcl !== "undefined") {
            if(msgContent.sendAcl === true) {
                objectExp[msgContent.obj].sendAcl = true;
                window.location.href = "of://sendAccelerationData";
            }
        }
    }


};
