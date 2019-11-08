# liri-node-app

## Overview

This LIRI app (Language Interpretation and Recognition Interface) can access three different APIs based on user input. With certain input, it can read a separate file and use that data in its API calls. It also records the "search terms" in a separate file as an activity log. It requires the node-spotify-api, request, fs,moment, and chalk NPM packages.

## Starting LIRI
After entering in ```node liri.js``` because no command is entered by the user, the user is prompted to ask for 'help'. The command help displays the available commands for the user to utilize and what they do.

![Start LIRI Screenshot](/images/startLIRI.PNG)

## Spotify

After typing in "node liri.js", the next word determines which API is called. Typing ```node liri.js spotify-this-song``` accesses the Spotify API, utilizing the node-spotify-api NPM package and enabled by a client ID and client secret from Spotify, both of which are stored in a separate .env file and accessed through the keys.js file. Whatever follows "spotify-this-song" is the song title searched by the Spotify API (with or without quotation marks). If nothing is typed after "spotify-this-song", the default song becomes "The Sign Ace of Base" since typing the artist with the title further clarifies what song is desired.

As seen in the example screenshot below, typing "node liri spotify-this-song" prints to the console the artist, song name, its album, a 30 second preview link, and a link to listen to the song on Spotify (as long as you're signed in).

![Spotify Screenshot](/images/spotify-this-song.PNG)


## Bandsintown

Typing ```node liri concert-this``` in the command line accessed the Bandsintown API, inserting whatever words are typed afterward (with or without quotation marks) as the artist in the URL of the Bandsintown http call. If no error is returned, the artist's name is inserted into a title for the returned results and the venue, city, date (formatted with moment.js), and lineup of each concert are listed below. The city line also includes the state (region) and country. If nothing is typed after "concert-this", the default artist becomes 'nav'.

![BandsInTown Screenshot](/images/concert-this.PNG)

## OMDB

Typing ```node liri movie-this``` accesses the OMDB API, inserting whatever words are typed afterward (with or without quotation marks) into the URL of the OMDB http call. If nothing is typed after 'movie-this', the default movie becomes 'Mr.Nobody'.

![OMDB Screenshot](/images/movie-this.PNG)

Using the OMDB data, the console displays the movie's title, year, IMDB rating, Rotten Tomatoes rating (if applicable since OMDB also lists television; if there is no Rotten Tomatoes score, it shows "N/A"), country, language, plot summary, and a list of actors.

## Do-What-It-Says

Typing ```node liri do-what-it-says``` accesses the text in the separate random.txt file, using the fs.readFile function. The contents of that file are broken into an array, separated at the commas, and switch-case is used to see which command is called. This causes the appropriate API calls to fire one after the other, though not necessarily in order. The gif shows how the OMDB data is listed first, followed by Bandsintown and Spotify last.

To avoid confusion on new calls versus reading random.txt, the do-what-it-says option does not append anything to log.txt.

![3 in 1 Screenshot](/images/do-what-it-says.gif)
