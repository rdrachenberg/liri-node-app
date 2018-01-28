// require dotenv package 
require("dotenv").config();

// require keys.js file
var keys = require('./keys.js');

// creating a variable that requries 'dotenv' 
var dotenv = require('dotenv')

//dont know if i need the below variable with require 
var enviro = require('./.env')

// creating the new object 
var buf = new Buffer('BASIC=basic')

// returns the object
var config = dotenv.parse(buf) 

//print the object to the console
console.log(typeof config, config)

// create variable to access key information 
var spotify = new Spotify(keys.spotify)
var client = new Twitter(keys.twitter)

console.log(spotify)