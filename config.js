var config = {};

config ={
    server: {
        host : '0.0.0.0',
        listenPort : '4330'
    },
    dashboard: {
        protocol : 'http',
        ip : '127.0.0.1',
        port : '8086',
        path : '/configEntry'
    },
    tank: {
        sapCode : '50035212'
    }
};

module.exports = config;
