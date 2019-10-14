require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var omdb = new omdb(keys.omdb);
var bands = new bands(keys.bands);

switch (userCommand) {
    // help function to clarify commands used
    case "help":
        console.log("Type one of these commands\n"+
                    "'concert-this': to search your favorite artist concerts\n"+
                    "'spotify-this-song': to search your favorite song\n"+
                    "'movie-this': to search your favorite movie \n"+
                    "'do-what-it-says': using command from random.txt \n"
                    );
        break;
    case "concert-this":
        myConcert(userInput);
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