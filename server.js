'use strict';

const express = require('express');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.get('/location', (request,response) => {
  console.log('in get');
  const locationData = searchLatLong(request.query.data);
  loadData();
  response.send(locationData);
});
// .then(console.log('before loadData'),console.log('failed at')).then(loadData());

function loadData(){
    console.log('in loadData');
  app.get('/weather', (request,response)=>{
    // darksky.json only has one entry - no need for latitude or longitude at the moment
    // const weatherData = searchWeather(object.latitude, object.longitude);
    console.log('made it app.get for weather');
    const weatherData = searchWeather();
    response.send(weatherData);
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
    console.log(allDays);
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

//Assistant function to the DayWeather constructor
function dateFormatter(epochTime){
  let translateTime = new Date(0);
  translateTime.setUTCSeconds(epochTime);
  return translateTime;
}

app.listen(PORT, () => console.log(`Application is up and listening on ${PORT}`));
