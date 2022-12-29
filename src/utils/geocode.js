const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGFudHN5dCIsImEiOiJjbGM1MGlyYnAwNXlrM3ZzYXFrOGkwc24xIn0.Wr9WPL5itpbE3bmfBmY6gg&limit=1`;
    request({ url, json: true }, (e, { body } = {}) => {
        if (e) {
            callback('Unable to connect to location services.', undefined);
        } else if (body.message) {
            callback(`${body.message}`, undefined);
        } else if (body.features.length === 0) {
            callback('No search results.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        };
    });
};

module.exports = geocode;