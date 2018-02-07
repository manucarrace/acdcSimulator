/**
 * Created by macs on 7/2/18.
 */

function createGCResponseMessage(request, response, callback) {
    response.send(request.body.message);
}

function createContextBrokerNotification(request, response, callback) {
    response.send(request.body.message);
}

exports.createGCResponseMessage = createGCResponseMessage;
exports.createContextBrokerNotification = createContextBrokerNotification;