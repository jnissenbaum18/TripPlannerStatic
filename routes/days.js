var express = require('express');
var dayRouter = express.Router();
var attractionRouter = express.Router();
var model = require('../models/index.js');

// GET /days
dayRouter.get('/', function (req, res, next) {
    console.log("days");
    model.Day.find(function(err, data) {
        res.send(data);
    });

    // serves up all days as json

});
// POST /days
dayRouter.post('/', function (req, res, next) {

    var newDay = new model.Day({day: req.body.day});

    newDay.save(function(err, day) {
        if (err) console.log(err);
        res.send(day);
    });
    
    // creates a new day and serves it as json
});
// GET /days/:id
dayRouter.get('/:id', function (req, res, next) {
    // serves a particular day as json
    console.log("ID: ", req.params.id);
    model.Day.findOne({ _id: req.params.id}, function(err, foundDay) {
        console.log("FOUND DAY:", foundDay);
        res.send(foundDay);
    });

});

// DELETE /days/:id
dayRouter.delete('/:id', function (req, res, next) {
    // deletes a particular day
});

dayRouter.use('/:id', attractionRouter);

// POST /days/:id/hotel
attractionRouter.post('/hotel', function (req, res, next) {
    // creates a reference to the hotel
    
    model.Hotel.findOne({ name: req.body.ele}, function(err, foundHotel) {
        model.Day.findOne({ _id: req.body._id}, function(err, foundDay) {
            foundDay.hotel =  foundHotel._id;
            foundDay.save(function(err, savedDay) {
                res.send(savedDay);
            });
        });
    });
});

// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
    // deletes the reference of the hotel
});
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function (req, res, next) {
    // creates a reference to a restaurant
     model.Restaurant.findOne({ name: req.body.ele}, function(err, foundRest) {
        model.Day.findOne({ _id: req.body._id}, function(err, foundDay) {
            foundDay.restaurants.push(foundRest._id);
            foundDay.save(function(err, savedDay) {
                res.send(savedDay);
            });
        });
    });
});


// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurant/:id', function (req, res, next) {
    // deletes a reference to a restaurant
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function (req, res, next) {
  
    model.ThingToDo.findOne({ name: req.body.ele}, function(err, foundThing) {
        model.Day.findOne({ _id: req.body._id}, function(err, foundDay) {
            foundDay.thingsToDo.push(foundThing._id);
            foundDay.save(function(err, savedDay) {
                res.send(savedDay);
            });
        });
    });

    // creates a reference to a thing to do
});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
    // deletes a reference to a thing to do
});

module.exports = dayRouter;
