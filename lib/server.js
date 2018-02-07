var express = require('express'),
    bodyParser = require('body-parser'),
    buildResponses = require('./buildResponses'),
    config = require('../config');

var app = express();

app.use(bodyParser.json());

app.post('/sms/v2/smsoutbound', function(request, response){
//check if the message is ABCDGC or ABDCMC
   if (request.body.message.startsWith(config.GCMessage)){
       console.log('Received ABCDGC message')
       buildResponses.createGCResponseMessage(request, response)
   }
   else if (request.body.message.startsWith(config.MCMessage)){
       console.log('Received ABCDMC message')
       buildResponses.createContextBrokerNotification(request, response)
   }
   else {
       console.log('No valid message')
       response.send('Error, message not valid')
   }
});

app.listen(3000);