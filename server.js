/*
GRUNT:
* use command "grunt test" to run unit test for angular app.

 */

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    ejs = require('ejs'),
    passport = require('passport'),
    flash = require('connect-flash'),
    mongoose = require('mongoose');

if(process.env.NODE_ENV == 'development'){
    mongoose.connect('mongodb://localhost/zionconnect');
}

// pass passport for configuration
require('./config/passport')(passport);

app.configure(function(){

    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.methodOverride()); // for full REST ... if we need it
    app.use(express.cookieParser());
    app.use(express.session({
        secret: '91044062-5A2B-444F-8E49-ED77388D89C8'
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use('/', express.static(__dirname + '/public'));
    app.use('/portal', express.static(__dirname + '/app'));

});

console.log('*** Environment is ' + process.env.NODE_ENV + '***');

//only in development
app.configure('development', function(){
    app.use(logErrors);
});

app.configure(function(){
    app.use(errorHandler);
});

// Bootstrap Routes
var routes_path = __dirname + '/routes';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath)(app, passport);
            }
            // We skip the app/routes/middlewares directory as it is meant to be
            // used and shared by routes as further middlewares and is not a
            // route by itself
        } else if (stat.isDirectory() && file !== 'middlewares') {
            walk(newPath);
        }
    });
};
walk(routes_path);


//===================================================================
// Routes For ZC Church Portal ======================================
//===================================================================
app.get('/api/zionconnect/churchs0.0.1', function(req, res, next){
    res.json({'success': 'Successfully Retrieved Authenticated Church Account.'});
});

app.post('/api/zionconnect/churchs0.0.1', function(req, res, next){
    console.log(req.body);
    res.json({'success': 'Successfully Created Church Account.'});
});

app.put('/api/zionconnect/churchs0.0.1', function(req, res, next){
    res.json({'success': 'Successfully Updated Church Account.'});
});

app.delete('/api/zionconnect/churchs0.0.1', function(req, res, next){
    res.json({'success': 'Successfully Deactivated Church Account.'});
});
//===================================================================
// Routes End for ZC Church Portal ==================================
//===================================================================

app.listen(app.get('port'));

console.log('\nListening on port 3000');

/* Our fall through error logger and errorHandler  */

function logErrors(err, req, res, next) {
    var status = err.statusCode || 500;
    console.error(status + ' ' + (err.message ? err.message : err));
    if(err.stack) { console.error(err.stack); }
    next(err);
}

function errorHandler(err, req, res, next) {
    var status = err.statusCode || 500;
    if (err.message) {
        res.send(status, err.message);
    } else {
        res.send(status, err);
    }
}
