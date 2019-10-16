require("dotenv").config();

const axios = require("axios");
const fs = require("fs");
const keys = require("./keys.js");
const moment = require('moment');
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const appCommand = process.argv[2];
const userInput = process.argv.slice(3).join(" ");

function startLIRI() {
    switch (appCommand) {
        // help function to clarify commands used
        case "help":
            console.log("Type one of these commands\n" +
                "'concert-this': search your favorite artist concerts\n" +
                "'spotify-this-song': search your favorite song\n" +
                "'movie-this': search your favorite movie \n" +
                "'do-what-it-says': using command from random.txt \n"
            );
            break;
        case "concert-this":
            myConcert();
            break;
        case "spotify-this-song":
            mySpotify(userInput);
            break;
        case "movie-this":
            myMovies(userInput);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        //if anything else written
        default:
            console.log("LIRI doesn't understand that - Please type 'node liri.js help' for more information");
    };
};

function myConcert(artist) {
    var artist = userInput;
    var bandQueryURL = "https://rest.bandsintown.com/artist/" + artist + "/events?app_id=codingbootcamp";

    axios.get(bandQueryURL).then(
        function (response) {
            var response = response.data[0];
            console.log("=========================");
            console.log("Name of the venue: " + response.data[0].venue.name + "\r\n");
            console.log("Venue Location: " + response.data[0].venue.city + "\r\n");
            console.log("Date of event: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\r\n");
        });
};

function mySpotify(songName) {
    if (!songName) {
        songName = "The Sign";
    };

    spotify.search({ type: 'track', query: songName }, function (error, data) {
        if (error) {
            console.log("There was an error: " + error);
            return;
        }

        console.log("===============================");
        console.log("Artist(s) Name: " + data.tracks.items[0].album.artists[0].name + "\r\n");
        console.log("Song Name: " + data.tracks.items[0].name + "\r\n");
        console.log("Song Link: " + data.tracks.items[0].href + "\r\n");
        console.log("Album: " + data.tracks.items[0].album.name + "\r\n");
    });
};

function myMovies(movie) {
    if (!movie) {
        movie = "Mr.Nobody";
    }
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.request(movieQueryUrl).then(
        function (response) {
            console.log("==========================");
            console.log("Title: " + response.data.Title + "\r\n");
            console.log("Year Released: " + response.data.Year + "\r\n");
            console.log("IMDB Rating: " + response.data.imdbRating + "\r\n");
            console.log("Country(s) where produced: " + response.data.Country + "\r\n");
            console.log("Plot: " + response.data.Plot + "\r\n");
        }
    )
};

function doWhatItSays() {
    console.log("it worked");
};

startLIRI();