require('dotenv').load();


var  express       = require('express'),
    morgan        = require('morgan'),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    cors          = require('cors'),
    testdb        = require('./config/testdb'),
    route         = require('./server/routes');


var port = process.env.PORT || 3000;


/**
 * Connect to MongoDB.
 */
testdb.dbconnect();


/**
 * Create Express server.
 */
var app = express();

var formidable = require('formidable');
var fs = require('fs');



app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true})); //use bodyParser for request and parsing info
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public')); //use to serve static files like favicon, css, angular and the rest
app.use(express.static( __dirname + '/server/res')); //use to serve static files like favicon, css, angular and the rest

app.set('base url', process.env.URL ||"http://localhost");


/**
 * Routes Configuration
 */
route(app,formidable);

//configure any route whatsoever to redirect to angular
app.get('*', function(req, res) {
    /** frontend routes =========================================================
     * route to handle all angular requests
     * load the single view file (angular will handle the page changes on the front-end)
     **/
    res.sendFile(__dirname + '/public/index.html' );
});



app.listen( port,'0.0.0.0', function(){
    console.log("chatterbox Server Listening on port ", port );
});


/**
 * Created by TOBI ALAGBE on 9/4/2016.
 */
