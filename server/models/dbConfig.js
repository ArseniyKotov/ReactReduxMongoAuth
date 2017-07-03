var mongoose = require('mongoose');
var path = require('path');
var ip = process.env.IP || 'localhost';
var port = process.env.PORT || 27017;
var dburl = 'mongodb://' + ip + ':' + port + '/auth';

mongoose.connect(dburl);

var gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function () {
  gracefulShutdown('App termination (SIGINT)', function () {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function () {
  gracefulShutdown('App termination (SIGTERM)', function () {
    process.exit(0);
  });
});

const db = mongoose.connection;
module.exports = db;
