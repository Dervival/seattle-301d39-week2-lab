'use strict';

const express = require('express');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.get('/location', (request,response) => {
  const locationData = searchLatLong(request.query.data);
  if(request.query.data === 'seattle'){
    loadData();
    response.send(locationData);
  }
  else{
    response.send(new APIError(500, 'Something went wrong'));
  }
});
// .then(console.log('before loadData'),console.log('failed at')).then(loadData());

function loadData(){
  app.get('/weather', (request,response)=>{
    // darksky.json only has one entry - no need for latitude or longitude at the moment
    // const weatherData = searchWeather(object.latitude, object.longitude);
    const weatherData = searchWeather();
    if(weatherData){
      response.send(weatherData);
    }
    else{
      response.send(new APIError(500, 'Sorry, something went wrong'));
    }
  })
}

//translate location query to latitude and longitude data
function searchLatLong(query){
  const geoData = require('./data/geo.json');
  const location = new Location(geoData.results[0])
  location.search_query = query;
  return location;
}

//function searchWeather(lat, long)
function searchWeather(){
  const weatherData = require('./data/darksky.json');
  let allDays = [];
  for(let i = 0; i < weatherData.daily.data.length; i++){
    allDays.push(new DayWeather(weatherData.daily.data[i]));
  }
  return allDays;
}

//Constructor function for Location objects
function Location(data){
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
}

//Constructor function for DayWeather Objects - returns a forecast and formatted date string
function DayWeather(data){
  this.forecast = data.summary;
  this.time = dateFormatter(data.time);
  //allDays.push(this);
}

//Constructor function for APIError objects - returns a status and response
function APIError(status, response){
  this.status = status;
  this.responseText = response;
}

//Assistant function to the DayWeather constructor
function dateFormatter(epochTime){
  let translateTime = new Date(0);
  translateTime.setUTCSeconds(epochTime);
  return translateTime.toDateString();
}

app.listen(PORT, () => console.log(`Application is up and listening on ${PORT}`));
