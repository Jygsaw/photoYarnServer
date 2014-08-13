var express = require('express');
var mongoose = require('mongoose');
var api = require('./db/api.js');
<<<<<<< HEAD
var isAuthorized = require('./lib/auth.js');
=======
var request = require('request');
>>>>>>> trying to implement friends

// bodyParser on its own has been deprecated
// use bodyParser.urlencoded() or
// use bodyParser.json() as needed
var bodyParser = require('body-parser');
var mongoLabUrl = process.env.mongoLab || 'mongodb://localhost/photoYarn';

var app = express();

// takes data the client sends to server
// and sets them as keys on the body property
// on the request
app.use(bodyParser.urlencoded({
    extended: true
}));

// need this to server up html/css/js
app.use(express.static(__dirname + '/public'));

// api.removeAllYarns();
// api.removeAllPhotos();

console.log('===============================================================')

// connect to mongodb
mongoose.connect(mongoLabUrl);

// enable CORS
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

app.post('/users', function(req, res) {
<<<<<<< HEAD
    api.loginUser(req, res);
=======
    api.findUser(req, function(err, user) {
        if (err) {
            res.send({err: err, msg: 'error in finding user'});
        } else if (user) {
            // probably have to query db to find and
            // send all relevant user data at this point
            res.status(200).send({user: user, msg: 'user already exists'});
        } else {
            api.createUser(req, function(err, user, numAffected) {
                if (err) {
                    res.send({err: err, msg: 'error in creating new user'});
                } else {
                    // make request to fb to get list of user's friends
                    var fbFriendsUrl = "https://graph.facebook.com/me/friends?access_token=" + req.body.token;

                    request({
                        method: "GET",
                        uri: fbFriendsUrl
                    }, function(error, response, body) {
                        if (error) {
                            res.send({err: error, msg: 'err in accessing users friends'})
                        } else {
                            var friendInfo = JSON.parse(body).data;
                            console.log(friendInfo)
                            res.status(200).send({user: friendInfo, msg: 'new user successfully created'});
                        }
                    });

                }
            });
        }
    });
>>>>>>> trying to implement friends
});


// client will call as soon as app loads to
// load up a view of all the yarns
app.get('/getAllYarns/:id', isAuthorized, function(req, res) {
    api.getAllYarns(req, res);    
});

// gets most popular yarns globally
app.get('/getPopularYarns', isAuthorized, function(req, res) {
    api.getPopularYarns(req, res);
});

// gets newest yarns globally
app.get('/getNewYarns', isAuthorized, function(req, res) {
    api.getNewYarns(req, res);
});

// route for working on browser
app.get('/getYarnsBrowser', function(req, res) {

    api.getYarnsBrowser(req, res);
    
});

// route for working on browser
app.get('/getYarnsBrowser/', function(req, res) {

    api.getYarnsBrowser(req, res);
    
});

// called when creating a new yarn
app.post('/createNewYarn', isAuthorized, function(req, res) {

    api.createYarn(req, res);

});

// client will call this, providing a yarn id
// in order to add a photo to a specific yarn
app.post('/addToYarn', isAuthorized, function(req, res) {

    api.addPhoto(req, res);
    
});

app.get('*', function(req, res) {
    res.status(404).send('Page not found');
});

module.exports = app;
