require("dotenv").config();

const axios = require("axios");
const fs = require("fs");
const keys = require("./keys.js");
const moment = require('moment');
const chalk = require("chalk");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const appCommand = process.argv[2];
const userInput = process.argv.slice(3).join(" ");
let log = [''];

function startLIRI() {
    switch (appCommand) {
        // help function to clarify commands used
        case "help":
            console.log(chalk.blue("Type one of these commands\n" +
                chalk.red("'concert-this'") + ": search your favorite artist concerts\n" +
                chalk.red("'spotify-this-song'") + ": search your favorite song\n" +
                chalk.red("'movie-this'") + ": search your favorite movie \n" +
                chalk.red("'do-what-it-says'") + ": using command from random.txt \n"
            ));
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
            console.log(chalk.red("LIRI doesn't understand that - Please type 'node liri.js help' for more information"));
    };
};



function myConcert(artist) {

    if (process.argv[3]) {
        artist = userInput;
    } else if (artist == undefined) {
        artist = "nav";
    };

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    var a = 1;
    axios.get(queryURL).then(
        function (response) {
            var concert = response.data[0];
            console.log(chalk.red("\r\n↓----------------BandsInTown API-----------------↓"));
            for (i = 0; i < 3; i++) {
                var concert = response.data[i];
                console.log(chalk.red("↓------------------------" + a + "-----------------------↓\r\n"));
                console.log(chalk.blue("Artist: ") + chalk.green(concert.lineup + "\r\n"));
                console.log(chalk.blue("Name of the venue: ") + chalk.green(concert.venue.name + "\r\n"));
                console.log(chalk.blue("Venue Location: ") + chalk.green(concert.venue.country + "(" + concert.venue.region + "," + concert.venue.city + ")\r\n"));
                console.log(chalk.blue("Date of event: ") + chalk.green(moment(concert.datetime).format("MM-DD-YYYY") + "\r\n"));
                var date = moment(response.data[0].datetime).format('MM/DD/YYYY');
                log = `${appCommand} ${userInput}\r\nConcert: ${artist}\r\nVenue Name: ${response.data[0].venue.name}\r\nVenue Location: ${response.data[0].venue.city}, ${response.data[0].venue.country}\r\nVenue Date: ${date}\r\n`;
                logThis();
                a++;
            };
        }).catch(
            function(error) {
                console.log(chalk.blue("========================="));
                console.log(chalk.red('There was an error: ' + error));
                console.log(chalk.blue("========================="));

            }
        )

};

function mySpotify(songName) {
    if (!songName) {
        songName = "The Sign Ace of Base";
    };

    spotify.search({ type: 'track', query: songName, limit: 1 }, function (error, data) {
        if (error) {
            console.log(chalk.blue("========================="));
            console.log(chalk.red('There was an error: ' + error));
            console.log(chalk.blue("========================="));
            return;
        }
        console.log(chalk.red("\r\n↓-------------------Spotify API------------------↓\r\n"));
        console.log(chalk.blue("Artist(s) Name: ") + chalk.green(data.tracks.items[0].artists[0].name + "\r\n"));
        console.log(chalk.blue("Song Name: ") + chalk.green(data.tracks.items[0].name + "\r\n"));
        console.log(chalk.blue("Album: ") + chalk.green(data.tracks.items[0].album.name + "\r\n"));
        console.log(chalk.blue("Song Preview: ") + chalk.green(data.tracks.items[0].preview_url + "\r\n"));
        console.log(chalk.blue("Spotify link: ") + chalk.green(data.tracks.items[0].external_urls.spotify));
        log = `${appCommand} ${userInput}\r\nSong: ${songName}\r\nArtist: ${data.tracks.items[0].artists[0].name}\r\nSong: ${data.tracks.items[0].name}\r\nAlbum: ${data.tracks.items[0].album.name}\r\nPreview URL: ${data.tracks.items[0].external_urls.spotify}\r\n`;
        logThis();
    });
};

function myMovies(movie) {
    if (!movie) {
        movie = "Mr.Nobody";
    }
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.request(movieQueryUrl).then(
        function (response) {
            console.log(chalk.red("\r\n====================OMDB API======================"));
            console.log(chalk.blue("Title: ") + chalk.green(response.data.Title + "\r\n"));
            console.log(chalk.blue("Year Released: ") + chalk.green(response.data.Year + "\r\n"));
            console.log(chalk.blue("IMDB Rating: ") + chalk.green(response.data.imdbRating + "\r\n"));
            console.log(chalk.blue("Rotten Tomatoes Rating: ") + chalk.green(response.data.Ratings[1].Value + "\r\n"));
            console.log(chalk.blue("Country(s) where produced: ") + chalk.green(response.data.Country + "\r\n"));
            console.log(chalk.blue("Language(s): ") + chalk.green(response.data.Language + "\r\n"));
            console.log(chalk.blue("Plot: ") + chalk.green(response.data.Plot + "\r\n"));
            console.log(chalk.blue("Actors: ") + chalk.green(response.data.Actors));
            log = `${appCommand} ${userInput}\r\nMovie: ${movie}\r\nTitle: ${response.data.Title}\r\nYear: ${response.data.Year}\r\nIMDB Rating: ${response.data.Ratings[0].Value}\r\nRotten Tomatoes: ${response.data.Ratings[1].Value}\r\nCountry of Production: ${response.data.Country}\r\nLanguage: ${response.data.Language}\r\nPlot: ${response.data.Plot}\r\nActors: ${response.data.Actors}\r\n`;
            logThis();
        }
    ).catch(
        function(error) {
            console.log(chalk.blue("========================="));
            console.log(chalk.red('There was an error: ' + error));
            console.log(chalk.blue("========================="));

        }
    )
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf-8", (err, data) => {
        if (err) { console.log(err) } else {
            var dataArray = data.split(",");
            dataArray.forEach(command => {
                var a = dataArray.indexOf(command);
                switch (command) {
                    case ('spotify-this-song'):
                        a = a + 1;
                        var song = dataArray[a];
                        mySpotify(song);
                        a++;

                    case ('movie-this'):
                        a = a + 1;
                        var movie = dataArray[a];
                        myMovies(movie);
                        a++;

                    case ('concert-this'):
                        a = a + 1;
                        var artist = dataArray[a];
                        myConcert(artist);
                        a++;
                }
            });
        }
    })
};

function logThis() {
    fs.appendFile('log.txt', log, function (err) {
        if (err) {
            console.log(err);
        }

    });
};

startLIRI();