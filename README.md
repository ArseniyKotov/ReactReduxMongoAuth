# React Redux Mongo Auth Boiler Plate

> Specs
 - This is a token based auth boilerplate using React, Redux, Redux Form, Passport, MongoDB and Express
 
> Use
 - npm install
 - Make sure you have mongodb installed
 - Make sure you have mongod running
 - Dont forget to create a config.js file in the server directory that exports your secret for passport
 - Also, in the server/models.dbConfig file, the "/auth" in the mongoose connection line will create a database called auth. Make sure to change it if you want a different name