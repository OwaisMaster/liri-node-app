const chalk = require("chalk");
console.log(chalk.red('Loading information...'));

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
    id: process.env.OMDB_ID,
    secret: process.env.OMDB_SECRET
};

exports.bands = {
    id: process.env.Bands_ID,
    secret: process.env.Bands_SECRET
};