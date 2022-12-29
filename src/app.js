const express = require('express');
const path = require('node:path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Paths
const publicPath = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Handlebars engine and views setup
app.set('view engine', 'hbs');
app.set('views', templatesPath);
hbs.registerPartials(partialsPath);

// Static directory setup
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index', {
        icon: 'img/icon.png',
        title: 'Weather',
        name: 'dantsyt'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        icon: 'img/icon.png',
        title: 'About',
        name: 'dantsyt'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        icon: '../img/icon.png',
        title: 'Help',
        message: 'Help articles',
        name: 'dantsyt'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    };

    geocode(req.query.address, (error, geoData) => {
        if (error) {
            return res.send({ error });
        };
        forecast(geoData.latitude, geoData.longitude, (error, weatherData) => {
            if (error) {
                return res.send({ error });
            };
            res.send({
                address: req.query.address,
                geoData,
                weatherData
            });
        });
    });
});

app.get('/products', (req, res) => {

    if (!req.query.q) {
        return res.send({
            error: 'You must provide a search term.'
        });
    };

    console.log(req.query.q)
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        icon: 'img/icon.png',
        css: '../css/styles.css',
        title: '404',
        message: 'Help article not found.',
        name: 'dantsyt'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        icon: 'img/icon.png',
        css: 'css/styles.css',
        title: '404',
        message: 'Page not found :(',
        name: 'dantsyt'
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000.')
});