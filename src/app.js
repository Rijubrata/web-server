const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Defined paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handle bars location and views loaction
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Static directory path
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Riju'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Riju'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'This is Help text',
        title: 'Help',
        name: 'Riju'
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide search term"
        });
    }
    res.send({
        products: []
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        });
    }
    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'This page is not found',
        title: 'Help',
        name: 'Riju'
    });
});

app.listen(port, () => {
    console.log('Server is up on', +port);
});