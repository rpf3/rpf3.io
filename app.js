/// <reference path="typings/node/node.d.ts"/>

var express = require('express');
var ghost = require('ghost');
var path = require('path');

var app = express();

// Set up the jade view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join( __dirname, 'styles')));

app.get('/', function(req, res) {
    res.render('index');
});

// Start Ghost.
ghost().then(function(ghostServer) {
    // Mount Ghost to the configured subdirectory.
    app.use(ghostServer.config.paths.subdir, ghostServer.rootApp);

    // Start Ghost using the parent express app.
    ghostServer.start(app);
});

var server = app.listen(3000);