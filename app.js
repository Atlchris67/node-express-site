//Imports the express module
const express = require('express');

//A top-level function exported by the express module
//Adapted from: https://freshman.tech/learn-node/
const app = express();

//Specifies where static files for my website are located, so that express
//can serve them correctly.
app.use('/static', express.static('public'));

//Designates pug as my template engine.
app.set('view engine', 'pug');

//Imports the routes folder, where my index.js file is located (this specifies
//the routes for the application). Then the app uses these routes.
const mainRoutes = require('./routes');
app.use(mainRoutes);

// This middleware is responsible for 1) creating an error object, 2) setting the
//error status to 404, and then handing it off to the error handler.
//Code adapted from the Team Treehouse Express Basics course (Handling 404 Errors
//video).
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//This Error Middleware creates a custom error handler to render a custom error
//template back to the client and format the error to be more readable.
//Code adapted from the Team Treehouse Express Basics course (Error Handling
//Middleware video).
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.render('error', err);
});

//Sets up the website to run on Port 3000 (You can choose a number of different
//ports).
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
