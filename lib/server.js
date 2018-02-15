var express = require('express'),
    bodyParser = require('body-parser'),
    smsHandler = require('./smsHandler'),
    config = require('../config'),
    app = express();

app.use(bodyParser.json());

app.post('/sms/v2/smsoutbound', smsHandler.processMessage);

app.listen(config.server.listenPort);