const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

const port = process.env.PORT || 3000

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sunny Leone'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sunny Leone'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sunny Leone'
    })
})

app.get('/weather', (req, res) => {
    const {address} = req.query;
    
    if(!address){
        return res.send({
            error : 'You must provide address term in url'
        })
    }
    
        geocode(address, (error, { latitude, longitude, location }={}) => {
            if (error) {
                // return console.log(error)
                return res.send({
                    error
                });
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    // return console.log(error)
                    return res.send({
                        error
                    })
                }

                res.send({
                    forecast : forecastData,
                    location : location
                })
                // console.log(location)
                // console.log(forecastData)
            })
        })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : 'You must provide search term in url'
        })
    }

        console.log(req.query.search);
        
        res.send({
            products : []
        })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sunny Leone',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sunny Leone',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port.', port)
})