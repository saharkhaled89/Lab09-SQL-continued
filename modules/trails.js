'use strict';
const superagent = require('superagent');
const main = require('../server');
function trailsHandler(request, response) {
    const latitude = request.query.latitude;
    const longitude = request.query.longitude;
     console.log(latitude, longitude)
    superagent(
        `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=400&key=${process.env.TRAILS_API_TOKEN}`
      )
        .then((trailRes) => {
          // console.log(trailRes.body.trails);     
          // let trailsDataArray = [];
          const trailInfo = trailRes.body.trails.map(trailData => {
            return new Trailslocations(trailData);
           
          });
          // console.log(trailsDataArray[0])
          response.status(200).json(trailInfo);
        })
        .catch((err) => {
          errorHandler(err, request, response);
        });
    }
    
    
    function Trailslocations(trailData) {
      this.name = trailData.name;
      this.location = trailData.location;
      this.length = trailData.length;
      this.stars = trailData.stars;
      this.star_votes = trailData.star_votes;
      this.summary = trailData.summary;
      this.trail_url = trailData.trail_url;
      this.conditions = trailData.conditions;
      this.condition_date = trailData.condition_date;
      this.condition_time = trailData.condition_time;
      // console.log(this)
    }
    module.exports = trailsHandler;