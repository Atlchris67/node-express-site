//Imports the express module
const express = require('express');

const path = require('path');
var port = process.env.PORT || 8080;

//A top-level function exported by the express module
//Adapted from: https://freshman.tech/learn-node/
const app = express();


app.use('/static', express.static('public'));


app.set('view engine', 'pug');

const mainRoutes = require('./routes');
app.use(mainRoutes);


app.use((req, res, next) => {
  console.log('No route for req: ' + req.originalUrl)
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use((err, req, res, next) => {
 
  res.locals.error = err;
  res.render('error', err);
});


app.listen(port, () => {
    console.log('The application is running on localhost:' + port)
});
