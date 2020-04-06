const path = require('path')
const express = require('express')
const hbs = require('hbs');

const gocode = require('./utils/gocode');
const forecast = require('./utils/forecast');


const app = express()

const port = process.env.PORT || 3000;
//Define paths to Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../src/templates/views');
const partialsPath = path.join(__dirname, '../src/templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Asaf Naory'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Asaf Naory'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Asaf Naory',
        message: `Your help message has been sent. We are on the way!`
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    gocode(req.query.address, (error, {
        latitude,
        longittude,
        location
    }={}) => {
        if (error) {
            return res.send({
                error
            })
        }
        
        forecast(latitude, longittude, (error, forcastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                location,
                forcastData
            })
        })
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404 about',
        message: `Oops... we don't have this about page :(`
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        message: `Oops... we don't have this help page :(`
    })
})

app.get('/weather/*', (req, res) => {
    res.render('404', {
        title: '404 weather',
        message: `Oops... we don't have this weather page :(`
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: `Oops... we don't have this page :(`
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})