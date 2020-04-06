const request = require ('request'); 

const forecast = (latitude, longitude, cb) => { 
    const url = `https://api.darksky.net/forecast/4ae5665026ccf9bb417c6e72938878f5/${latitude},${longitude}`
    request({url, json: true}, (error ,{body} )=>{
        if(error){
            cb('Unable to connect to location services' ,undefined);

        }else if (body.error ){
            cb('Unable to find location. Try another sreach' ,undefined);
        }
        else{
            cb(undefined ,
                body.daily.data[0].summary + ' it is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + ' % chance of rain'
            );

        }
    });
}

module.exports = forecast;


