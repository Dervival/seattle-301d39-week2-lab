'use strict';

const express = require('express');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.get('/location', (request,response) => {
  const locationData = searchLatLong(request.query.data);
  response.send(locationData);
});

//translate location query to latitude and longitude data
function searchLatLong(query){
  const geoData = require('./data/geo.json');
  const location = new Location(geoData.results[0])
  location.search_query = query;
  return location;
}

//Constructor function for Location objects
function Location(data){
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
}

app.listen(PORT, () => console.log(`Application is up and listening on ${PORT}`));
