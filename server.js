var express = require('express');
var app = express();
var async = require('async');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var http = require('http');
var fs = require('fs');
var url = require('url');
var catamaran = require('./catamaran/catamaran.node');
var events = require('events');
var multer = require('multer');

app.use(express.static('catamaran'));

var upload = multer({ dest: './tmp/' });

app.use(session({
    name: 'session-id',
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
}));

catamaran_js = {}

catamaran_js.event_listener = new events.EventEmitter();

catamaran_js.extract_from_file = function (filename, schema, callback) {
    var table = catamaran.extract_from_file(filename, schema);
    console.log('extraction:', table);
    callback(table);
};

catamaran_js.select_schema = function (filename, schema_list, callback) {
    var val = catamaran.select_schema(filename, schema_list);
    console.log('select_schema:', val);
    callback(val.schema);
};

catamaran_js.candidate_gen = function (filename, callback) {
    var val = catamaran.candidate_gen(filename);
    console.log('candidate_gen:', val);
    callback(val.schema_list);
};

catamaran_js.extract_struct_from_file = function (filename, callback) {
    process.nextTick(function() {
        catamaran_js.candidate_gen(filename, function (schema_list) {
            process.nextTick(function() {
                catamaran_js.select_schema(filename, schema_list, function (schema) {
                    process.nextTick(function() {
                        if (schema != 'nullptr')
                            catamaran_js.extract_from_file(filename, schema, callback);
                        else
                            callback('Not Found!');
                    });
                });
            });
        });
    });
};

catamaran_js.extract_struct_from_string = function (doc, callback) {
};

app.post('/extract-from-string', function (req, res) {
    catamaran_js.extract_struct_from_string(req.string, function(table) {
        res.end( JSON.stringify(table) );
    });
});

app.post('/extract-from-file', upload.single('uploaded'), function (req, res) {
    var filepath = req.file.path;
    var listener = function(callback) {
        catamaran_js.extract_struct_from_file(filepath, callback);
    };
    catamaran_js.event_listener.on(filepath, listener);
    req.session.file_id = filepath;
    setTimeout( function() {
        fs.unlinkSync(filepath);
        catamaran_js.event_listener.removeListener(filepath, listener);
    }, 3600000);
    res.redirect('/demo.html')
});

app.get('/get-table', function (req, res) {
    if (typeof req.session.file_id != 'undefined') {
        catamaran_js.event_listener.emit(req.session.file_id, function(table) {
            if (table === 'Not Found!')
                res.end(JSON.stringify([['No Table Found']]));
            else 
                res.end( JSON.stringify(table) );
        });
    } else {
        res.end(JSON.stringify([['No Table Found']]));
    }
});

var server = app.listen(8081, function() {
    console.log('Server running at http://ygao34.web.engr.illinois.edu:8081');
});
