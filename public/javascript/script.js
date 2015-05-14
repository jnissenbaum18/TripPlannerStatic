var map;
var mapOptions;
var currentDay = 1
var itineraries = [
    {
        hotels: [],
        restaurants: [],
        thingsToDo: []
    }
];

function initialize_gmaps() {
    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
    // set the map options hash
    mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("map-canvas");
    // initialize a new Google Map with the options
    map = new google.maps.Map(map_canvas_obj, mapOptions);
    // Add the marker to the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });
    // Add the marker to the map by calling setMap()
}

$(document).ready(function() {
    initialize_gmaps();
});

var hotelPut = function(selected) {
    // var selected = $('#hotelSelect :selected').val().split(',');

    var hotelButton = $('<button type="button" class="btn btn-default subtract">-</button>');
    var hotelText = $('<div style="margin-top: 10px" class="subtract"> <div class="list-group-item-text itineraryListItem subtract">' + selected[0] + '</div>' + '</div>');
    var location = new google.maps.LatLng(selected[1],selected[2]);

    var marker = new google.maps.Marker({
        position: location
    });

    marker.setMap(map);

    itineraries[currentDay-1].hotels.push([selected[0],'','']);


    $('#hotelList').append(hotelText).append(hotelButton);
    hotelButton.on('click', function () {
        hotelText.remove()
        hotelButton.remove()
        marker.setMap(null);
    })
}

$('#hotelButton').on('click', function () {
    hotelPut($('#hotelSelect :selected').val().split(','))
});

var restaurantPut = function (selected) {
    var restButton = $('<button type="button" class="btn btn-default subtract">-</button>')
    var restText = $('<div style="margin-top: 10px" class="subtract"><div class="list-group-item-text itineraryListItem subtract">' + selected[0] + '</div>' + '</div>');

    var location = new google.maps.LatLng(selected[1],selected[2]) 
    var marker = new google.maps.Marker({
        position: location,
        icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 5
        }
    });

    marker.setMap(map);
    itineraries[currentDay-1].restaurants.push([selected[0],'','']);

    $('#restaurantList').append(restText).append(restButton);
    restButton.on('click', function () {
        restText.remove();
        restButton.remove();
        marker.setMap(null);
    })
}
$('#restButton').click(function() {
    restaurantPut($('#restaurantSelect :selected').val().split(','))
});

var thingsPut = function (selected) {
    var thingsButton = $('<button type="button" class="btn btn-default subtract">-</button>')
    var thingsText = $('<div style="margin-top: 10px" class="subtract"><div class="list-group-item-text itineraryListItem subtract">' + selected[0] + '</div>' + '</div>');
    var location = new google.maps.LatLng(selected[1],selected[2]);
    var marker = new google.maps.Marker({
        position: location,
        icon: {
            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
            scale: 5
        }
    });

    marker.setMap(map);
    itineraries[currentDay-1].thingsToDo.push([selected[0],'','']);

    $('#thingsToDoList').append(thingsText).append(thingsButton);
    thingsButton.on('click', function () {
        thingsText.remove();
        thingsButton.remove();
        marker.setMap(null);
    })
}

$('#thingButton').click(function() {
    thingsPut(selected = $('#thingsToDoSelect :selected').val().split(','));
});


// create object that stores an iternary for each day



// give functionality to our + button 

$('#addDay').on('click', function() {
     // create a new day in our object
     currentDay = itineraries.length + 1;
     var newDay = {
        hotels: [],
        restaurants: [],
        thingsToDo: []
     };
    itineraries.push(newDay);

    $('.subtract').remove();
    var newDayButton = $('<button value="' + currentDay + '"type="button" class="btn btn-default">' + currentDay + '</button>');
    // $('#dayButtons').append(newDayButton)
    $(this).before(newDayButton);
    newDayButton.on('click', function() {
        $('.subtract').remove();
        currentDay = this.value
        itineraries[currentDay - 1].hotels.forEach(function(hotel) {
            console.log(hotel)
           hotelPut(hotel); 
        })
        itineraries[currentDay - 1].restaurants.forEach(function(restaurant) {
            restaurantPut(restaurant)
        })
        itineraries[currentDay - 1].thingsToDo.forEach(function(thing) {
            thingsPut(thing)
        })
    })
});

   

        // each day will have 3 keys that store arrays

    // take all the data and store it in appropriate day

    // wipe the itinearry clean 

    // create a new button for each day

        // wipe the itinerary and retrieve the appropriate itinerary

        // repopulate the itinerary as well as map 



// $('.selectorButton').click(function() {
//     console.log($(this).siblings('select').val());
//     // var selected = $(this).siblings('select').val());
//     console.log(selected);

//     var divToAppendTo = $(this).siblings('select').attr("name");
    
//     // console.log($('#hotelValue').val());
//     $('th').append('<p class="list-group-item-text inline">' + selected + '</p>' + '<button type="button" class="btn btn-default">-</button>');
// });


// add click event handlers to the add buttons 

// add click event handlers to the subtract buttons 

// Add a day

// Days should switch

// Remove a day

// add new markers to the map

// when an empty day is clicked, it zooms out

// when you add a new hotel/restaurant/things/, map zooms out to encompass all new listings








