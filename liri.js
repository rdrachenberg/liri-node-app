// create a variable that requires the request package 
var request = require("request");

// require dotenv package 
require('dotenv').config();

// create variable params for twitter
var params = { rdrac23: 'nodejs' };

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

// create variable to access key information 
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// create variable with argv, variable for query reqeust from omdb
// then the actual request 
var nodeArgs = process.argv;

var movie = "";

    for (var i = 2; i < nodeArgs.length; i++) {

        if (i > 2 && i < nodeArgs.length) {

            movie = movie + "+" + nodeArgs[i];

        } else {

            movie += nodeArgs[i];

        }
    }

    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=7fc0d809"; 

    console.log(queryURL);
    
    request(queryURL, function (error, response, body) {

        // If I have a successful request, it will return a status code of 200 and then move forward with the function 
        if (!error && response.statusCode === 200) {

            // Parse and recover the rating from imdb
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        }
    });

// create a varable twitArg and pass the console input argument
var twitArg = process.argv[2];

if (twitArg === 'my-tweets') {
    
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(JSON.stringify(tweets[0].text))
            console.log(JSON.stringify(tweets[1].text))
            console.log(JSON.stringify(tweets[2].text))
        };
    });
       
} else {
    console.log("");
}

var spotArg = process.argv[2];
var spotArgSong = process.argv[3];

    if (spotArg === 'spotify-this-song') {
        spotify.search({ type: 'track', query: spotArgSong, limit: 1}, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            };
            var yourval = (JSON.stringify(data, null, 4));

            var artist = data.tracks.items[0];

            console.log("Artist Name: " + artist.artists[0].name);
            console.log("Song Name: " + spotArgSong);
            console.log("Preview Link: " + artist.artists[0].external_urls.spotify);
            console.log("Album: " + artist.name);
            
            // console.log(yourval);
            //     var songDetails = data.tracks.items[0];
            // console.log(songDetails.artists[0].name);

            // could also do this for the console:
            //     console.log("Artist: " + songDetails.artists[0].name);
        });
    };
