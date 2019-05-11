const request = require('request');

const forecast = (latitude, longitude,callback) => {
    const url = "https://api.darksky.net/forecast/bc41678dffb88ec43e90c1859b3e2e8a/"+latitude+","+longitude+"?units=si";
    request({url:url, json:true},(error,response) => {
        if(error){
            callback('Unable to connect to weather service!',undefined);
        }
        else if(response.body.error){
            callback('Unable to find weather information!',undefined);
        }
        else{
            callback(undefined,
                response.body.daily.data[0].summary+" It is currently "+response.body.currently.temperature+" degrees out with "+response.body.currently.precipProbability+"% chance of rain");
            
        }
    })
}

module.exports = forecast;