var express = require('express');
var router = express.Router();
var Hotel = require('../models/index.js').Hotel;
var Restaurant = require('../models/index.js').Restaurant;
var ThingToDo = require('../models/index.js').ThingToDo;

/* GET home page. */

//method 1: callback hell
router.get('/', function(req, res, next) {	//can test the speed by adding route
	Hotel.find(function(err, hotels) {
		Restaurant.find(function(err, restaurants) {
			ThingToDo.find(function(err, things) {
				res.render('index', { title: 'Trip Planner', hotels: hotels, restaurants: restaurants, things: things });
			});
		});
	});
});

module.exports = router;
