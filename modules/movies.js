'use strict';
const superagent = require('superagent');
const main = require('../server');
function moviesHandler(request, response) {
  const cityName = request.query.city;
  const key = process.env.MOVIES_API_KEY;
  superagent(
    `https://api.themoviedb.org/3/discover/movie?api_key=${key}&city=${cityName}`
  )
    .then(data => {
      const movieSummeries = data.body.results.map((database) => {
        return new Movies(database);
      });
      response.status(200).json(movieSummeries);
    })
    .catch((error) => main.errorHandler(error, request, response))
}
function Movies (database){
  this.title = database.title;
  this.overview = database.overview;
  this.average_vote = database.vote_average;
  this.total_votes = database.vote_count;
  this.image_url = database.poster_path;
  this.popularity = database.popularity;
  this.released_on = database.release_date;
}
module.exports = moviesHandler;