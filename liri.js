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

var fs = require("fs");

// create variable to access key information 
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// create variable with argv, variable for query reqeust from omdb
// then the actual request f

var nodeArgs = process.argv;

var movie = "";

    for (var i = 2; i < nodeArgs.length; i++) {

        if (i > 2 && i < nodeArgs.length) {

            movie = movie + "+" + nodeArgs[i];

        } else {

            movie += nodeArgs[i];

        }
    };

    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=7fc0d809"; 
    
    request(queryURL, function (error, response, body) {

        // If I have a successful request, it will return a status code of 200 and then move forward with the function 
        if (!error && response.statusCode === 200) {
            var rotten = "Rotten Tomatos"
            // Parse and recover the Title of the Movie
            console.log("Title: " + JSON.parse(body).Title);
            // Parsae and recover the Year the movie was made 
            console.log("Release Year: " + JSON.parse(body).Year);
            // Parse and recover the rating from imdb
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            // Parse and recover Rotton Tomatos value
            console.log("Rotten Tomatos: " + JSON.parse(body).Value);
            // Parse and recover Country where flim was produced 
            console.log("Country of Production Origin: " + JSON.parse(body).Country);
            // Parse and recover the Language of the file
            console.log("Language: " + JSON.parse(body).Language);
            // Parse and recover the Plot of the movie 
            console.log("Plot: " + JSON.parse(body).Plot);
            // Parse and recover the Actors
            console.log("Actors: " + JSON.parse(body).Actors);
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
            
        });
    };
var random = process.argv[2];

if (random === 'do-what-it-says') {
    // This block of code will read from the "random.txt" file.
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        // We will then print the contents of data
        console.log(data);
    });
};
