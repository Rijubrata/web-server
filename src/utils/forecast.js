const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b6be4d1581da58fde26fa771875c81eb/' + latitude + ',' + longitude + '?units=si';
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) {
            callback("Invalid coordinates", undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + " % chance of rain.");
        }
    });
}
module.exports = forecast;