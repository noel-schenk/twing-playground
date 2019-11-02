"use strict";
exports.__esModule = true;
var express = require("express");
var utils_1 = require("./utils");
var app = express();
app.listen(4000, function () { return console.log("App listening on port 4000!"); });
app.get('*', function (req, res) {
    switch (req.url) {
        case '/':
            res.sendFile(utils_1.utils.getRootPath('/index.html'));
            break;
        case '/dist/main.js':
            res.sendFile(utils_1.utils.getRootPath('/dist/main.js'));
            break;
    }
});
