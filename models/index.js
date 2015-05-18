var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/tripPlanner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var placeSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  phone: String,
  location: [Number],
});

var hotelSchema = new mongoose.Schema({
  name: String,
  place: [placeSchema], // can't directly put schema as avalue, have to be as an array
  num_stars: Number,
  amenities: String,
});

var thingToDoSchema = new mongoose.Schema({
  name: String,
  place: [placeSchema],
  age_range: String,
});

var restaurantSchema = new mongoose.Schema({
  name: String,
  place: [placeSchema],
  cuisine: String,
  price: { type: Number, min: 1, max: 5 }
});

var daySchema = new mongoose.Schema({
  day: Number,
  hotel: {type: mongoose.Schema.Types.ObjectId, ref: 'Hotel'},
  restaurants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}],
  thingsToDo: [{type: mongoose.Schema.Types.ObjectId, ref: 'ThingToDo'}]
})

var Place = mongoose.model('Place', placeSchema);
var Hotel = mongoose.model('Hotel', hotelSchema);
var ThingToDo = mongoose.model('ThingToDo', thingToDoSchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
  Place: Place,
  Hotel: Hotel,
  ThingToDo: ThingToDo,
  Restaurant: Restaurant
};
