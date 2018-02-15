'use strict';

var config = require('../config'),
    constant = require('../constants'),
    logger = require('logops');


function invokeDashboard(request, options) { // Generic function for sending response configurations
    request(options, function (err, response, body) {
        if (err) {
            logger.error('Request error %s', err);
        } else {
            if (response.statusCode = constant.HTTP_RESPONSE_OK) {
                logger.info('Request done  to url: %s with result:%j', options.url, response.statusCode);
            }
            logger.info('done %s to %s', options.method, options.url);
        }
    });
}

function setHttpOptions(message) { // Set http options
    return {
        url: config.dashboard.protocol + '://' + config.dashboard.ip + ':' + config.dashboard.port + config.dashboard.path,
        method: 'POST',
        json: true,
        body: message,
        headers: {
            'User-Agent': 'request',
            'content-type': constant.JSON_HEADER
        }
    };
}

function buildNotification() { // creates NGSI v1 notification body
    logger.info('Creating NGSI notification ...')
}


function createRCMessage() {
    var request;
    request = require('request');
    console.log('Generating RC Message');
    var RCMessage = constant.CONTROL_CODE + constant.RC_MESSAGE + config.tank.sapCode + constant.RC_TEMPLATE;
    var options = setHttpOptions(RCMessage);
    invokeDashboard(request, options);
}


function createRPMessage() {
    var request;
    request = require('request');
    console.log('Generating RP Message');
    var RPMessage = constant.CONTROL_CODE + constant.RP_MESSAGE + config.tank.sapCode + constant.RP_TEMPLATE;
    var options = setHttpOptions(RPMessage);
    invokeDashboard(request, options);

}

function createContextBrokerNotification() {
    var options = setHttpOptions(buildNotification());
    invokeDashboard(request, options)
}

exports.createRCMessage = createRCMessage;
exports.createRPMessage = createRPMessage;
exports.createContextBrokerNotification = createContextBrokerNotification;