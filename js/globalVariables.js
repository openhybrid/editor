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
 * TODO
 **

 **********************************************************************************************************************
 ******************************************** constant settings *******************************************************
 **********************************************************************************************************************/

var httpPort = 8080;
var timeForContentLoaded = 240; // temporary set to 1000x with the UI Recording mode for video recording

/**********************************************************************************************************************
 ******************************************** global variables  *******************************************************
 **********************************************************************************************************************/

var globalStates = {
    width: window.screen.width,
    height: window.screen.height,
    guiButtonState: true,
    UIOffMode: false,
    preferencesButtonState: false,
    extendedTracking: false,

    extendedTrackingState: false,
    developerState: false,
    clearSkyState: false,
    externalState:"",
    sendMatrix3d:false,
    sendAcl:false,
    feezeButtonState: false,
    logButtonState: false,
    editingMode: false,
    guiURL: "",
    newURLText:"",
    platform: navigator.platform,
    lastLoop: 0,
    notLoading: "yes",
    drawDotLine: false,
    drawDotLineX: 0,
    drawDotLineY: 0,
    pointerPosition: [0, 0],
    editingModeHaveObject: false,
    angX: 0,
    angY: 0,
    unconstrainedPositioning:false
};

var globalCanvas = {};

var globalObjects = "";

var globalProgram = {
    ObjectA: false,
    locationInA: false,
    ObjectB: false,
    locationInB: false
};

var objectExp = {};

var globalMatrix = {};


    var projectionMatrix = mat4.create();
var  modelViewMatrix = mat4.create();
var  rotateMatrixX = mat4.clone([
    1, 0, 0, 0,
    0, -1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]);
var  resultMatrix = mat4.create();
var resultMatrix2 = mat4.create();
var  projectionResultMatrix = mat4.create();
var  tempMatrix = mat4.create();
var  matrix2dTransform = mat4.create();
var  finalTransform = mat4.create();
var  temp = mat4.create();
var  temp2= mat4.create();
var  begin= mat4.create();
var  end = mat4.create();
var  visual = mat4.create();
    var matrixtouchOn = false;
    var copyStillFromMatrixSwitch = false;


var consoleText = "";


var testInterlink = {};

var mat4Result1 = mat4.create();
var mat4Result2 = mat4.create();
var mat4Result3 = mat4.create();
