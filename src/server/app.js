const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const playerRouter = require('./routes/player.js');
const countryRouter = require('./routes/country.js');

const app = express();

// app setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../dist')));

// add routes
app.use('/api', playerRouter);
app.use('/api', countryRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('broke');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on ${port}`));

module.exports = app;
