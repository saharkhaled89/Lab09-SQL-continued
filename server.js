
  
'use strict';
const main = {};
require('dotenv').config();
const pg = require('pg');
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const PORT = process.env.PORT;
const app = express();
app.use(cors());
//Creating a new client using the PG constructor function from the pg library
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => {
    throw new Error(err);
});

const locationHandler = require('./modules/location');
const weatherHandler = require('./modules/weather');
const trailsHandler = require('./modules/trails');
const movieHandler= require('./modules/movies');
const yelpHandler=require('./modules/yelp');

// Route Definitions
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/trails', trailsHandler);
app.get('/movies', movieHandler);
app.get('/yelp', yelpHandler);
app.use('*', notFoundHandler);
app.use(errorHandler);

app.get('/', (request, response) => {
  response.send('Home Page!');
});
function notFoundHandler(request, response) {
  response.status(404).send('huh?');
}

function errorHandler(error, request, response) {
  response.status(500).send(error);
}
client
  .connect()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`my server is up and running on port ${PORT}`)
    );
  })
  .catch((err) => {
    throw new Error(`startup error ${err}`);
  });
  module.exports = main;
// Route Handlers


// Route Handlers

// function locationHandler(request, response) {
  // try {
  //   const geoData = require('./data/geo.json');
  //   const city = request.query.city;
  //   const locationData = new Location(city, geoData);
  //   console.log(locationData);
  //   response.status(200).send(locationData);
  // } catch (error) {
  //   errorHandler(
  //     'an error happened while fetching your data!\n' + error,
  //     request,
  //     response
  //   );
  // }
//   const city = request.query.city;
//   console.log(city);
//   const dataBaseCityQuery = 'SELECT search_query, formatted_query, latitude, longitude FROM thelocations WHERE search_query LIKE $1'
//   client.query(dataBaseCityQuery, [city]).then((result) => {
//     if (result.rows.length !== 0) {
        
//           response.status(200).json(result.rows[0]);
//       }
//   else {
//     superagent(
//       `https://eu1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`
//     )
//       .then((res) => {
//         const geoData = res.body;
//         const locationData = new Location(city, geoData);
//         const SQL = 'INSERT INTO thelocations(search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4)';
//         const safeValues = [locationData.search_query, locationData.formatted_query, locationData.latitude, locationData.longitude];
//         client.query(SQL, safeValues).then(result => {
//             response.status(200).json(locationData);
  
//           })
//           .catch(err => {
//               response.status(500).send(err);
//           })
//   })
//   .catch((err) => {
//       errorHandler(err, request, response);
//   });
//   }
// });}



// function Location(city, geoData) {
//   this.search_query = city;
//   this.formatted_query = geoData[0].display_name;
//   this.latitude = geoData[0].lat;
//   this.longitude = geoData[0].lon;
// }

// function weatherHandler(request, response) {
  // try {
  //   const weatherRes = require('./data/darksky.json');
  //   const weatherSummaries = weatherRes.data.map((day) => {
  //     return new Weather(day);
  //   });
  //   response.status(200).json(weatherSummaries);
  // } catch (error) {
  //   errorHandler(
  //     'So sorry, something went wrong with weather.',
  //     request,
  //     response
  //   );
  // }
//   superagent(
//     `https://api.weatherbit.io/v2.0/forecast/daily?city=${request.query.search_query}&key=${process.env.WEATHER_API_KEY}`
//   )
//     .then((weatherRes) => {
//       console.log(weatherRes);
//       const weatherSummaries = weatherRes.body.data.map((day) => {
//         return new Weather(day);
//       });
//       response.status(200).json(weatherSummaries);
//     })
//     .catch((err) => errorHandler(err, request, response));
// }

// function Weather(day) {
//   this.forecast = day.weather.description;
//   this.time = new Date(day.valid_date).toString().slice(0, 15);
// }






// function trailsHandler(request, response) {
//   const latitude = request.query.latitude;
//   const longitude = request.query.longitude;
  // console.log(latitude, longitude)
//   superagent(
//     `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=400&key=${process.env.TRAILS_API_TOKEN}`
//   )
//     .then((trailRes) => {
//       // console.log(trailRes.body.trails);     
//       // let trailsDataArray = [];
//       const trailInfo = trailRes.body.trails.map(trailData => {
//         return new Trailslocations(trailData);
       
//       });
//       // console.log(trailsDataArray[0])
//       response.status(200).json(trailInfo);
//     })
//     .catch((err) => {
//       errorHandler(err, request, response);
//     });
// }


// function Trailslocations(trailData) {
//   this.name = trailData.name;
//   this.location = trailData.location;
//   this.length = trailData.length;
//   this.stars = trailData.stars;
//   this.star_votes = trailData.star_votes;
//   this.summary = trailData.summary;
//   this.trail_url = trailData.trail_url;
//   this.conditions = trailData.conditions;
//   this.condition_date = trailData.condition_date;
//   this.condition_time = trailData.condition_time;
//   // console.log(this)
// }




// function movieHandler(request, response) {
//   gettheMovie(request.query)
//     .then(movieData => response.status(200).send(movieData));

// } 


// function gettheMovie(query) {
  
//   const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${query.search_query}`;

//   return superagent.get(url)
//     .then(database => {
      
//       return database.body.results.map(movie => {
//         return new Movies(movie);
//       })
//     })
//     .catch(error => {
//       errorHandler(error,request,response);
//     })

// }

// function Movies(database) {
//   this.title = database.title;
//   this.overview = database.overview;
//   this.average_votes = database.vote_average;
//   this.popularity = database.popularity;
//   this.released_date = database.release_date;
//   this.image_url = `https://image.tmdb.org/t/p/w500${database.poster_path}`;

// } 

// function yelpHandler(request, response) {
//   const cityName = request.query.city;
//   const key = process.env.YELP_API_KEY;
//   superagent(
//     `https://api.yelp.com/v3/businesses/search?location=${cityName}`
//   )
//   .set('Authorization', `Bearer ${key}`)
//     .then((trialData) => {
//       const YelpData = trialData.body.businesses.map((database) => {
//         return new Yelp(database);
//       });
//       response.status(200).json(YelpData);
//     })
//     .catch((error) => errorHandler(error, request, response))
// }
// function Yelp(database) {
//   this.name = database.name;
//   this.image_url = database.image_url;
//   this.price = database.price;
//   this.rating = database.rating;
//   this.url = database.url;
// }



// function yelpHandler(request, response) {
//   getYelp(request.query)
//     .then(theyelpData => response.status(200).send(theyelpData));

// } // End of Yelp handler function 

// function getYelp(data) {
//   const url = `https://api.yelp.com/v3/businesses/search?location=${data.search_query}`


//   return superagent.get(url)
//     .set('Authorization', `sahar ${process.env.YELP_API_KEY}`)
//     .then(data => {
//       console.log('data : ', data);
//       let yelpPath = data.body.businesses;
//       return yelpPath.map(yelp => {
//         return new Yelp(yelp)
//       })
//     })
//     .catch(error => {
//       errorHandler(error,req,res);
//     })
// } 





// function Yelp(data) {
//     this.title = data.title;
//     this.image_url = data.image_url;
//     this.price = data.price;
//     this.rating = data.rating;
//     this.url = data.url;
//   }






// function notFoundHandler(request, response) {
//   response.status(404).send('huh?');
// }

// function errorHandler(error, request, response) {
//   response.status(500).send(error);
// }

// Make sure the server is listening for requests
// app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
//To get the sever listening to a certain port and go live

// client
//   .connect()
//   .then(() => {
//     app.listen(PORT, () =>
//       console.log(`my server is up and running on port ${PORT}`)
//     );
//   })
//   .catch((err) => {
//     throw new Error(`startup error ${err}`);
//   });
//   module.exports = main;
