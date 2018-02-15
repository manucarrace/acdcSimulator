'use strict';

var config = require('../config'),
    constant = require('../constants'),
    responses = require('./buildResponses'),
    logger = require('logops');

function processMessage(req, res) {
//function that checks the received message: ABCDGC|ABCDGP|ABDCMC|ABCDMP

    var receivedMessage = req.body.message.substring(4, 6);
    logger.info('Received message: ' + receivedMessage);

    // ABCDGC
    if (receivedMessage = constant.GC_MESSAGE) {
        res.status(constant.HTTP_RESPONSE_OK).send('OK');
        responses.createRCMessage();
    }
    // ABCDGP
    else if (receivedMessage = constant.GP_MESSAGE) {
        res.status(constant.HTTP_RESPONSE_OK).send('OK');
        responses.createRPMessage();
    }
    // ABCDMC
    else if (receivedMessage = constant.MC_MESSAGE) {
        res.status(constant.HTTP_RESPONSE_OK).send('OK');
        responses.createContextBrokerNotification();
    }
    // ABCDMP
    else if (receivedMessage = constant.MP_MESSAGE) {
        res.status(constant.HTTP_RESPONSE_OK).send('OK');
        responses.createContextBrokerNotification();
    }
    else {
        logger.info('No valid message');
        res.status(constant.HTTP_RESPONSE_NOK);
        res.send('Error, message not valid');
    }

}

exports.processMessage = processMessage;
