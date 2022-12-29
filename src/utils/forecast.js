const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=273d7c89f0c65f9e82ecff068cb2387b&query=${latitude},${longitude}`;
    request({ url, json: true }, (e, { body } = {}) => {
        if (e) {
            callback('Unable to connect!', undefined);
        } else if (body.success === false) {
            callback(body.error.info, undefined);
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions[0],
                location_name: body.location.name,
                location_country: body.location.country
            });
        };
    });
};

module.exports = forecast;