'use strict';

var config = require('../config'),
    constant = require('../constants'),
    logger = require('logops');


function callback(error, response, body) {
    logger.info('Im a callback!');
}


function invokeDashboard(request, options, callback) { // Generic function for sending response configurations
    request(options, function (err, response, body) {
        if (err) {
            logger.error('Request error %s', err);
            callback(err);
        } else {
            var respObj = {code: response.statusCode, body: body};
            logger.debug('%s to %s returns %j', options.method, options.url, respObj);

            if (response.statusCode = constant.HTTP_RESPONSE_OK) {
                logger.info('Request done  to url: %s with result:%j', options.url, response.statusCode);
            }
            logger.info('done %s to %s', options.method, options.url);
            callback(response);
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

function buildNotification() {
    var attrsBody = {};

    for (var attr in config.getConfig().contextBroker.attrs) {
        var attribute = config.getConfig().contextBroker.attrs[attr];
        //logger.debug('attr %s entity %j', attribute, entity);
        attrsBody[attribute] = {
            //metadata: {}, # TODO check if metadata exists
            value: entity[attribute].value,
            type: entity[attribute].type
        };
    }
}


function createRCMessage(callback) {
    var request;
    request = require('request');
    console.log('Generating RC Message');
    var RCMessage = constant.CONTROL_CODE + constant.RC_MESSAGE + config.tank.sapCode + constant.RC_TEMPLATE;
    var options = setHttpOptions(RCMessage);
    invokeDashboard(request, options, callback);
}


function createRPMessage(callback) {
    var request;
    request = require('request');
    console.log('Generating RP Message');
    var RPMessage = constant.CONTROL_CODE + constant.RP_MESSAGE + config.tank.sapCode + constant.RP_TEMPLATE;
    var options = setHttpOptions(RPMessage);
    invokeDashboard(request, options, callback);

}

function createContextBrokerNotification(callback) {
    var options = setHttpOptions(buildNotification());
    invokeDashboard(request, options, callback)
}

exports.createRCMessage = createRCMessage;
exports.createRPMessage = createRPMessage;
exports.createContextBrokerNotification = createContextBrokerNotification;