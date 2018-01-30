// create a variable that requires the request package 
var request = require("request");

// require dotenv package 
require('dotenv').config();

// require keys.js file
var keys = require('./keys.js');

// creating a variable that requries 'dotenv' 
var dotenv = require('dotenv');

//dont know if i need the below variable with require 
// var enviro = require('./.env')

// requrie spotify package and creates a spotify variable 
var Spotify = require('node-spotify-api');

// create variable twitter that requires twitter npm package 
var Twitter = require('twitter');

// // creating the new object 
// var buf = new Buffer('BASIC=basic');

// returns the object
// var config = dotenv.parse(buf); 

//print the object to the console
// console.log(typeof config, config);

// create variable to access key information 
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// create reqeust from omdb

var movie = process.argv[2];

var apikey = '7fc0d809'

var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=7fc0d809"; 

request(queryURL, function (error, response, body) {

    // If I have a successful request, it will return a status code of 200 and then move forward with the function 
    if (!error && response.statusCode === 200) {

        // Parse and recover the rating from imdb
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    }
});