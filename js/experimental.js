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

var context;
var plainCanvas;
var log;
var pointerDown = {};
var lastPositions = {};
var colors = ["rgb(100, 255, 100)", "rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)", "rgb(0, 255, 100)", "rgb(10, 255, 255)", "rgb(255, 0, 100)"];

var onPointerMove = function(event) {
    if (pointerDown[event.pointerId]) {

        var color = colors[event.pointerId % colors.length];

        context.strokeStyle = color;

        context.beginPath();
        context.lineWidth = 2;
        context.moveTo(lastPositions[event.pointerId].x, lastPositions[event.pointerId].y);
        context.lineTo(event.clientX, event.clientY);
        context.closePath();
        context.stroke();

        lastPositions[event.pointerId] = { x: event.clientX, y: event.clientY };
    }
};

var pointerLog = function (event) {
    var pre = document.querySelector("pre");

    pre.innerHTML = event.type + "\t\t(" + event.clientX + ", " + event.clientY + ")\n" + pre.innerHTML;
};

var onPointerUp = function (event) {
    pointerDown[event.pointerId] = false;
    pointerLog(event);
};

var onPointerDown = function (event) {
    pointerDown[event.pointerId] = true;

    lastPositions[event.pointerId] = { x: event.clientX, y: event.clientY };
    pointerLog(event);
};

var onPointerEnter = function (event) {
    pointerLog(event);
};

var onPointerLeave = function (event) {
    pointerLog(event);
};

var onPointerOver = function (event) {
    pointerLog(event);
};

var onload = function() {
    plainCanvas = document.getElementById("plainCanvas");
    log = document.getElementById("log");

    plainCanvas.width = plainCanvas.clientWidth;
    plainCanvas.height = plainCanvas.clientHeight;

    context = plainCanvas.getContext("2d");

    context.fillStyle = "rgba(50, 50, 50, 1)";
    context.fillRect(0, 0, plainCanvas.width, plainCanvas.height);

    plainCanvas.addEventListener("pointerdown", onPointerDown, false);
    plainCanvas.addEventListener("pointermove", onPointerMove, false);
    plainCanvas.addEventListener("pointerup", onPointerUp, false);
    plainCanvas.addEventListener("pointerout", onPointerUp, false);
    plainCanvas.addEventListener("pointerenter", onPointerEnter, false);
    plainCanvas.addEventListener("pointerleave", onPointerLeave, false);
    plainCanvas.addEventListener("PointerOver", onPointerOver, false);
};

if (document.addEventListener !== undefined) {
    document.addEventListener("DOMContentLoaded", onload, false);
}
;