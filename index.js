var botBuilder = require('claudia-bot-builder');
var greeting = require('greeting');
var fetch = require('node-fetch');

var bot = botBuilder(function(message) {
  if (message.text.match(/quote/i)) {
    return fetch('http://api.forismatic.com/api/1.0/?method=getQuote&format=text&lang=en').then(function(res) {
      return res.text();
    });
  } else {
    return greeting.random();
  }
});

app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'testbot_verify_token') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});
module.exports = bot;
