'use strict';

var config = require('../config'),
    constant = require('../constants'),
    responses = require('./buildResponses'),
    request = require('request'),
    logger = require('logops'),
    context = {
        op: 'smsHandler'
    };

function processMessage(req, res) {
//function that checks the received message: ABCDGC|ABCDGP|ABDCMC|ABCDMP
    var receivedMessage,
        message =null;

    if (req&&req.body&&req.body.message) {
        receivedMessage = req.body.message.substring(4, 6);
        logger.info(context, 'Received message: ' + receivedMessage);
        switch (receivedMessage) {
            case constant.GC_MESSAGE: // ABCDGC
                message = responses.createRCMessage();
                break;
            case constant.GP_MESSAGE: // ABCDGP
                message = responses.createRPMessage();
                break;
            case constant.MC_MESSAGE:  // ABCDMC
                message = responses.createContextBrokerNotification();
                break;
            case constant.MP_MESSAGE:  // ABCDMP
                message = responses.createContextBrokerNotification();
                break;
        }
    }

    if (message) {
        res.status(constant.HTTP_RESPONSE_OK).send('OK');
        invokeRequest(message);
    }
    else {
        logger.info(context, 'No valid message');
        res.status(constant.HTTP_RESPONSE_NOK);
        res.send('Error, message not valid');
    }
}

function invokeRequest(message) { // Generic function for sending response configurations

     var options = {
        url: config.dashboard.protocol + '://' + config.dashboard.ip + ':' + config.dashboard.port + config.dashboard.path,
        method: 'POST',
        json: true,
        body: message,
        headers: {
            'User-Agent': 'request',
            'content-type': constant.HEADER_APPJSON
        }
     };

    request(options, function (err, response) {
        if (err) {
            logger.error(context, 'Request error %s', err);
        }
        else if (response.statusCode === constant.HTTP_RESPONSE_OK) {
                logger.info(context, 'Request done  to url: %s with result:%j', options.url, response.statusCode);
        }
        logger.info(context, 'done %s to %s', options.method, options.url);
    });
}

exports.processMessage = processMessage;