const mongoose = require('mongoose');
const path = require('path');

const ip = process.env.IP || 'localhost';
const port = process.env.PORT || 27017;
const dburl = `mongodb://${ip}:${port}/auth`;

mongoose.connect(dburl);

const gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('App termination (SIGINT)', () => {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('App termination (SIGTERM)', () => {
    process.exit(0);
  });
});

const db = mongoose.connection;
module.exports = db;
