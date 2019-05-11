const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname,'../public')));

app.get('',(req,res) => {
        res.render('index',{
            title : 'Weather',
            name : 'Gaurav'
        });
})

app.get('/about', (req,res) => {
    res.render('about',{
        title : 'About Me!',
        name : 'Gaurav'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText : 'This is some helpful text',
        title : 'Help',
        name : 'Gaurav'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please provide the address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error : 'Could not fetch location for the given address'
            })
        }

        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({
                    error : 'Could not fetch weather details for the provided address'
                })
            }

            res.send({
                forecast : forecastData,
                location : location,
                address : req.query.address
            })
        })

    })
    
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404error', {
        title : 'Help',
        error : 'Help article not found',
        name : 'Gaurav'
    })
})

app.get('*',(req,res) => {
    res.render('404error',{
        title : 'Error 404',
        error : 'Page not found',
        name : 'Gaurav'
    })
})


app.listen(port, () => {
    console.log('Server is up on port '+port);
});