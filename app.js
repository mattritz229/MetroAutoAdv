
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var driver = require('./routes/drivers');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/drivers', driver.drivers);

//-----------------
app.post('/drivers', function(req, res){
  dbCalls.saveDrivers(populateDrivers(req), getRenderDriversView(req, res));
  //var biker = populateBiker(req);
  //dbCalls.saveBike(bike, getRenderBikeView(req, res));

});

function populateDrivers(req){
  return {
  firstName:     req.param('firstName'),
  lastName:      req.param('lastName'),
  streetAddr:    req.param('streetAddr'),
  city:          req.param('city'),
  state:         req.param('state'),
  zip:           req.param('zip'),
  email:         req.param('email'),
  phoneNbr:      req.param('phoneNbr')
  };
}

var getRenderDriversView = function(req, res) {
  return function (err, docs, rowId){
     console.log('getRenderDriversView rowId: ' + rowId);
     if (err){
        resJsonErrDrivers(req, res, err);
      } else {
      	dbCalls.sendConfirmEmailDrivers(req); 
      	resJsonDrivers(req, res);
      }  
    }
  };

//Send back cleared columns if there is not an error
function resJsonDrivers(req, res){
        console.log('Send back blank driversList');
        res.json({'dataSave':  '', 'error': '', 
              'firstName':     '',
              'lastName':      '',
              'streetAddr':    '',
              'city':          '',
              'state':         '',
              'zip':           '',
              'phoneNbr':      '',
              'email':         '',
              'env':           req.param(process.env.NODE_ENV)
            });
};

//Send back columns filled if an error is detected
function resJsonErrDrivers(req, res, err){
      console.log('Error: Send back driversList');
      console.log('Error: ' + err);
      console.log(err);
      res.json( {'dataSave': 'err', 'error': err, 
              'firstName':     req.param('firstName'),
              'lastName':      req.param('lastName'),
              'streetAddr':    req.param('streetAddr'),
              'city':          req.param('city'),
              'state':         req.param('state'),
              'zip':           req.param('zip'),
              'phoneNbr':      req.param('phoneNbr'),
              'email':         req.param('email'),
              'env':           req.param(process.env.NODE_ENV)
            });
  };

//-----------------
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
