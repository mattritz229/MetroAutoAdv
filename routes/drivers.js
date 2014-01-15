
exports.drivers = function(req, res){

      //pass the key here
      var d = { mainBodyText: data, dataSave: '', 
      'firstName': '',
      'lastName': '',
      'streetAddr': '',
      'city': '',
      'state': '',
      'city': '',
      'zip': '',
      'phoneNbr': '',
      'email': '',
      'bikeEvent': '', 
      'agreement':   '',
      'overSixteen': '',
      'birthdate':   '',
      'signature':   '',
      'shirt': '',
      'sponsorship': '',
      'amount': '',
      'paymentType': '',
      'paymentStatus': '',
      'env': env
       };
      console.log('rendering bikes');
      res.render('bikes', d);

  };

