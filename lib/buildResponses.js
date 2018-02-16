'use strict';

var config = require('../config'),
    constant = require('../constants'),
    logger = require('logops'),
    context = {
        op: 'buildResponses'
    };


function createRCMessage() {
    logger.info(context, 'Generating RC Message');
    return constant.CONTROL_CODE + constant.RC_MESSAGE + config.tank.sapCode + constant.RC_TEMPLATE;
}

function createRPMessage() {
    logger.info(context, 'Generating RP Message');
    return constant.CONTROL_CODE + constant.RP_MESSAGE + config.tank.sapCode + constant.RP_TEMPLATE;
}

function createContextBrokerNotification() {
    // creates NGSI v1 notification body
    logger.info(context, 'Creating NGSI notification ...');
    return "PENDING MESSAGE";
}

exports.createRCMessage = createRCMessage;
exports.createRPMessage = createRPMessage;
exports.createContextBrokerNotification = createContextBrokerNotification;