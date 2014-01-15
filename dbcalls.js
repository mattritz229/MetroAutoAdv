// var $ = require('jquery'),
//     modal = require('jquery').modal;

var mongoose = require('mongoose'),
    validate = require('mongoose-validator').validate;

var uri = process.env.DB_CONN_STR;
console.log('Connection String: ' + uri);
mongoose.connect(uri, function(err){
  if (err) console.log('Mongoose Connection Error: ' + err);
}); 


// require('mongoose-validator').extend('isAlphanumeric', function () {
//     console.log('matt' + this.str);
//     return this.str == validate('isAlphanumeric');
// }, 'Only characters and numbers are allowed');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
var objectId = new ObjectId();

var firstNameValidator  = [validate({message: "First Name length is to long"},'len', 1, 50)];   
var lastNameValidator   = [validate({message: "Last Name length is to long"},'len', 1, 50)];   
var streetAddrValidator = [validate({message: "Street Address length is to long"},'len', 1, 100)]; // validate('isAlphanumeric' || 'is(/^[ ]+$/)')];  
var cityValidator       = [validate({message: "City length is to long"},'len', 1, 50)];  
var stateValidator      = [validate({message: "State length is incorrect"},'len', 2, 50)];  
var zipValidator        = [validate({message: "Zip length is to long"},'len', 4, 10), validate('isNumeric')];
var phoneNbrValidator   = [validate({message: "Phone Number length is to long"},'len', 1, 20)];  //, validate('isAlphanumeric')];  
var emailValidator      = [validate({message: "Email Address length is not correct"},'len', 5, 64), validate({message: "Email Address is not correct"},'isEmail')];

var Drivers = new Schema({
      firstName     : {type: String,  required: true, validate: firstNameValidator}
    , lastName      : {type: String,  required: true, validate: lastNameValidator}
    , streetAddr    : {type: String,  required: true, validate: streetAddrValidator}
    , city          : {type: String,  required: true, validate: cityValidator}
    , state         : {type: String,  required: true, validate: stateValidator} 
    , zip           : {type: Number,  required: true, validate: zipValidator}
    , phoneNbr      : {type: String,  required: true, validate: phoneNbrValidator}
    , email         : {type: String,  required: true, validate: emailValidator}  
});

mongoose.model('Pledge', Pledge);
var Pledge = mongoose.model('Pledge');

Drivers.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

mongoose.model('Drivers', Drivers);
var Drivers = mongoose.model('Drivers');

dbCalls = function(req, res){};
//dbCallsBike = function(req, res){};
console.log('dbCalls')


//Create a new post
dbCalls.prototype.saveDrivers = function(params, callback) {
  var drivers = new Drivers({
        firstName:     params['firstName'], 
        lastName:      params['lastName'],
        streetAddr:    params['streetAddr'],
        city:          params['city'],
        state:         params['state'],
        zip:           params['zip'],
        email:         params['email'],
        phoneNbr:      params['phoneNbr']);
    rowId = drivers.save(function (err) {
      if (err) {
        console.log('error drivers save dbcalls');
        callback(err, 'failed', '');
      } else {
        console.log('Drivers Row Id: ' + drivers.id);
        callback(null, 'saved correctly', drivers.id);   
    }
  });
};


dbCalls.prototype.sendConfirmEmailDrivers = function(req){
  var emailParm   = req.param('email');
  var subject     = 'MetroAutoAdv'
  var body        = ''

  subject += ' - MetroAutoAdv Signup Confirmation'
  body = 'Thank you for signing up as a driver for MetroAutoAdv ' + '\n\n' +
        ' We will be contacting you with more details.' + '\n\n' +
        'Please email questions to: MetroAutoAdv.com' + '\n' +
        'or call 610-791-1067 and ask for Matt' + '\n' +
        '' + '\n\n' +
        ' Thank You' + '\n' +
        ' Matt Ritz'

  sendConfirmEmail(subject, body, emailParm);
};

function sendConfirmEmail(subject, body, emailParm) {
  console.log('sendConfirmEmail');
  var email = require("./node_modules/emailjs/email");
  var server  =    email.server.connect({
     user:    "bikeforbeds", 
     password: process.env.EMAIL_PSWD, 
     host:    "smtp.gmail.com", 
     ssl:     true
    });

    // send the message and get a callback with an error or details of the message that was sent
    server.send({
       text:    body, 
       from:    "MetroAutoAdv <bikeforbeds@gmail.com>", 
       to:      emailParm,
       cc:      "MetroAutoAdv <bikeforbeds@gmail.com>",
       subject: subject
    }, function(err, message) { console.log(err || message); });
};

exports.dbCalls = dbCalls;