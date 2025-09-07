var express = require('express');
var path = require('path');
var axios = require('axios');
var mongoose = require('mongoose');
var credential = require('./credential.js');
var config = require('./config');
/**
 * daily-brief-server
 * Sould provide the following pages:
 * /api, return a page listing all the apis and their usage
 * /app, return the daily brief application page
 * 
 * Should provide the following APIs:
 * /api/weather, return a JSON containing the weather info from
 * 
 */

var app = express();

mongoose.connect('mongodb://localhost:27017/daily-brief', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => {
  console.log('MongoDB connection error:', err.message);
});

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'static')));

app.get('/app', function (req, res) {
  res.type('.html');
  res.sendFile(__dirname + '/static/index.html');
});

app.get('/api', function (req, res) {
  res.send('Currently under development');
});

app.get('/api/weather', function (req, res) {

  axios({
    method: 'get',
    url: 'https://api.seniverse.com/v3/weather/now.json',
    params: {
      key: credential.weatherAPISecret,
      location: config.userLocation,
      language: config.userLanguage,
      unit: 'c'
    }
  }).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    console.log(error);
  });
});

// provide fallback for the routes
app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Page Not Found');
});

app.listen(app.get('port'), function () {
  console.log('The daily-brief server has been started');
});
