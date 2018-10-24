# seattle-301d39-week2-lab
Repository for Seattle-301d39's series of labs focusing on server and API usage
**Author**: Hannah Ingham and Blaise Clarke (Tuesday)
**Version**: 1.0.0 

## Overview
This application accepts a location from a user and provides relevant information to the location (currently just an embedded map and static weather data). This application helps tourists and local people plan their time in the city more effectively through a collection of relevant information.

## Getting Started
+ First, go to the application's front end at https://codefellows.github.io/city_explorer/
+ Ensure your versions of node, NPM, and nodemon are up to date
+ Next, fork or clone this repository in a folder locally
+ In that folder, initialize NPM with npm init. Modify the package.json created by this to include the below dependencies
+ Then, install dependencies express, dotenv, and cors in the same repository. 
+ Set your environmental variable for PORT to 3000.
+ To test the application, type 'nodemon' in the console while in the same directory as server.js
+ Then enter http://localhost:3000 into the field showing on the front end.
+ Type in a city, and infomation will populate below.

## Architecture
This application is written in Javascript. We are using AJAX calls to read in data (eventually from APIs) and send it to the front-end for showing templates.

## Change Log
10-23-2018 12:40pm - Application now has an express server that can read from dummy json files provided by the class. Turning in for today's lab.
10-23-2018 - Application can read from darksky.json.
10-23-2018 - Application has been published to Heroku in a partial state.
10-23-2018 - Application can read from geo.json.

## Credits and Collaborations
Thanks to Hannah Ingham for navigation and guiding throughout this process as well as fully building the package-lock.json file.
Thanks to 'user1030503' on https://stackoverflow.com/questions/4631928/convert-utc-epoch-to-local-date for assistance on formatting our Date object string results.
