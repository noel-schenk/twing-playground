"use strict";
exports.__esModule = true;
var path = require("path");
var utils;
(function (utils) {
    function getRootPath(pathJoin) {
        if (pathJoin !== undefined) {
            return path.join(path.resolve("."), pathJoin);
        }
        else {
            return path.resolve(".");
        }
    }
    utils.getRootPath = getRootPath;
    function roundDown(n) {
        return Math.floor(n * 100) / 100;
    }
    utils.roundDown = roundDown;
    function roundAdd(n, times) {
        return ((n * 100) * times) / 100;
    }
    utils.roundAdd = roundAdd;
    function map(a, f) {
        var aMod = a;
        for (var i = 0; i < a.length; i++) {
            aMod[i] = f(a[i], i, a);
        }
        return aMod;
    }
    utils.map = map;
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    utils.random = random;
})(utils = exports.utils || (exports.utils = {}));
