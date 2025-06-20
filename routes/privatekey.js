var jwt = require('jsonwebtoken');
var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res){
    var privateKEY  = fs.readFileSync('./keys/private.key', 'utf8');
    const secondsSinceEpoch = Math.round(Date.now()/ 1000);
    const oneHour = 60*60;

    var signOptions = {
      algorithm: 	"RS256"
    };

    var jwtPayload = {
        "sub": "66cb446f-5e43-ea11-a812-000d3a24c087", //contactid in Dynamics
        "preferred_username": "kaul.vineet@microsoft.com",
        "phone_number": "",
        "given_name": "Vineet",
        "family_name": "Kaul",
        "email": "vineetkaul@microsoft.com",
        "iat": secondsSinceEpoch,
        "exp": secondsSinceEpoch + oneHour,
        "iss": "omnichannel-custom-portal.azurewebsites.net"
    };

    var token = jwt.sign(jwtPayload, privateKEY, signOptions);

    res.charset = 'utf-8'
    res.set({
        'content-type': 'application/jwt'
    }).send(token);

  });

module.exports = router;