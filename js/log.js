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

function objectLog(thisKey) {

    var consoleText_ = "";

    consoleText_ += "Object Name: <b>" + thisKey.slice(0, -12);

    if (objectExp[thisKey].loaded === true) {

        consoleText_ += "</b>; Unloading in <b>" + (objectExp[thisKey].visibleCounter / 60).toFixed(1) + " sec.";

    } else {
        consoleText_ += "</b>; Content <b>not</b> loaded<b>";

    }

    consoleText_ += "</b>;  Visible: <b>" + objectExp[thisKey].visible +
    "</b>; MAC: <b>" + thisKey.slice(-12) +
    "</b>; IP: <b>" + objectExp[thisKey].ip +
        // "</b><br>Z: "+objectExp[thisKey].screenZ ;
    "</b>";

    /* for (var key4 in objectExp[thisKey].objectValues) {
     consoleText_ += JSON.stringify(objectExp[thisKey].objectValues[key4]) + "<br>";
     }*/
    return consoleText_;
}

/**********************************************************************************************************************
 **********************************************************************************************************************/

/**
 * @desc
 * @param
 * @param
 * @return
 **/

function generalLog(tempConsoleText) {
    var thisLoop = new Date;
    var fps = 1000 / (thisLoop - globalStates.lastLoop);
    globalStates.lastLoop = thisLoop;


    var GUIElements = 0;

    for (var key3 in objectExp) {

        if (document.getElementById("iframe" + key3)) {
            GUIElements++;
        }

    }

    tempConsoleText += "<br>framerate: <b>" + parseInt(fps) + "</b><br><br>";
    tempConsoleText += "Currently loaded GUI elements: <b>" + GUIElements + "</b><br>";
    tempConsoleText += "Currently loaded Programming elements: <b>" + (document.getElementById("GUI").getElementsByTagName("iframe").length - GUIElements) + "</b><br><br>";
   // tempConsoleText += JSON.stringify(globalStates).replace(/,/gi, '<br>');
    document.getElementById("consolelog").style.visibility = "visible";
    document.getElementById("consolelog").innerHTML = tempConsoleText;
}
