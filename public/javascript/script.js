var map;
var mapOptions;
// var currentDay = 1
var currentDay = 1;
var itineraries = [
    {
        hotel: [],
        restaurants: [],
        thingsToDo: [],
        markers: []
    }
];
var bounds = new google.maps.LatLngBounds();
var marker

var currentDayId;

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

    $.get('/', function(data) {
     
        $('')
    });

});

var buttonMaker = function (value, element) {

    var button = $('<button type="button" value="'+element+'" class="btn btn-default subtract">-</button>');
    var text = $('<div style="margin-top: 10px" class="subtract"> <div class="list-group-item-text itineraryListItem subtract">' + value[0] + '</div>' + '</div>');

    if (element.slice(1,2) === 'h') {
        element = 'hotel'
    }
    else if (element.slice(1,2) === 'r') {
        element = 'restaurants'
    }
    else if (element.slice(1,2) === 't') {
        element = 'thingsToDo'
    }
    $.ajax({
    type: 'POST',
    url: '/days/' + currentDayId + '/' + element,
    data: { element: value[0],
        _id: currentDayId
    },
    success: function(responseData) {
        }

    });

// delete item click event
    $(element).append(text).append(button);
    button.on('click', function () {

        var items = itineraries[currentDay-1][element];

        for (var i = 0; i < items.length; i++) {
             if (items[i][0] === value[0]) {
                items.splice(i, 1);
                text.remove()
                button.remove()
                for (var j = 0; j < itineraries[currentDay-1].markers.length; j++) {
                     if (itineraries[currentDay-1].markers[j] === marker) {
                            itineraries[currentDay-1].markers[j].setMap(null);
                            itineraries[currentDay-1].markers.splice(j,1);
                     }
                }  
                
                for (var j = 0; j < itineraries[currentDay-1].markers.length; j++) {
                    bounds.extend(itineraries[currentDay-1].markers[j].position);
                    map.fitBounds(bounds);
                }
                return;
            }
        }
    })
}

var markerMaker = function (value, element) {
    var location = new google.maps.LatLng(value[1],value[2]);
    if (element === '#rList') {
        var icon = {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 5
        }
    }

    else if (element === '#tList') {
        var icon = {
            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
            scale: 5
        }
    }

    marker = new google.maps.Marker({
        position: location,
        icon: icon
    });

    marker.setMap(map);
    itineraries[currentDay-1].markers.push(marker); // store marker in day

    bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < itineraries[currentDay-1].markers.length; i++) {
        bounds.extend(itineraries[currentDay-1].markers[i].position);
        map.fitBounds(bounds);
    }

    bounds.extend(marker.position);
}

$('#hotelButton').on('click', function () {
    var hotelInfo = $('#hotelSelect :selected').val().split(',')
    buttonMaker(hotelInfo, '#hList')
    markerMaker(hotelInfo, '#hList')
    itineraries[currentDay-1].hotel.push(hotelInfo);
});

$('#restButton').click(function() {
    var restaurantInfo = $('#restaurantSelect :selected').val().split(',')
    buttonMaker(restaurantInfo, '#rList')
    markerMaker(restaurantInfo, '#rList')
    itineraries[currentDay-1].restaurants.push(restaurantInfo);
});

$('#thingButton').click(function() {
    thingsInfo = $('#thingsToDoSelect :selected').val().split(',');
    buttonMaker(thingsInfo, '#tList')
    markerMaker(thingsInfo, '#tList')
    itineraries[currentDay-1].thingsToDo.push(thingsInfo);
});

// create object that stores an iternary for each day


$('#firstDay').on('click', function() {

        $('.subtract').remove();
        for (var i = 0; i < itineraries[currentDay -1].markers.length; i++) {
            itineraries[currentDay -1].markers[i].setMap(null);
        }
        currentDay = this.value
        $('#day').text("Day " + currentDay);

        itineraries[currentDay - 1].hotel.forEach(function(hotel) {
            buttonMaker(hotel, '#hList'); 
        })
        itineraries[currentDay - 1].restaurants.forEach(function(restaurant) {
            buttonMaker(restaurant, '#rList')
        })
        itineraries[currentDay - 1].thingsToDo.forEach(function(thing) {
            buttonMaker(thing, '#tList')
        })
    })

// give functionality to our + button 

$('#addDay').on('click', function() { // click on + button
     // create a new day in our object
    for (var i = 0; i < itineraries[currentDay -1].markers.length; i++) {
            itineraries[currentDay -1].markers[i].setMap(null);
    }
     currentDay = itineraries.length + 1;

     $('#day').text("Day " + currentDay);

     var newDay = {
        hotel: [],
        restaurants: [],
        thingsToDo: [],
        markers: []
     };
    itineraries.push(newDay);

    // if (currentDay === 1) {
    //    currentDay = currentDay
    // } else {
          // currentDay++;
    // }
  

    $.ajax({
        type: 'POST',
        url: '/days',
        data: { day: currentDay
                 },
        success: function(responseData) {
            currentDayId = responseData._id;
        }
    });

    $('.subtract').remove();
    var newDayButton = $('<button value="' + currentDay + '"type="button" class="btn btn-default">' + currentDay + '</button>');
    // $('#dayButtons').append(newDayButton)
    $(this).before(newDayButton);
    newDayButton.on('click', function() {   // SWITCH DAY EVENT
        $('.subtract').remove();
        for (var i = 0; i < itineraries[currentDay -1].markers.length; i++) {
            itineraries[currentDay -1].markers[i].setMap(null);
        }

        currentDay = this.value;
        $('#day').text("Day " + currentDay);
        $.ajax({
            type: 'GET',
            url: '/days/' + currentDayId,
            data: { day: currentDayId },
            success: function(responseData) {
                console.log("responseData: ", responseData);
            }
        })
    })
        itineraries[currentDay - 1].hotel.forEach(function(hotel) {
            buttonMaker(hotel, '#hList'); 
            markerMaker(hotel, '#hList')
        })
        itineraries[currentDay - 1].restaurants.forEach(function(restaurant) {
            buttonMaker(restaurant, '#rList')
            markerMaker(restaurant, '#rList')
        })
        itineraries[currentDay - 1].thingsToDo.forEach(function(thing) {
            buttonMaker(thing, '#tList')
            markerMaker(thing, '#tList')
        })
});

$('#subtractDay').on('click', function() {
     $('.subtract').remove();

     $('button[value=' + currentDay + ']').remove();
     currentDay -= 1
     itineraries.splice(currentDay, 1);
     for (var i = currentDay; i < itineraries.length + 1; i++) {
        $('button[value=' + Number(i + 1) + ']').text(i).val(i);
     }

    itineraries[currentDay].hotel.forEach(function(hotel) {
        buttonMaker(hotel, '#hList'); 
        markerMaker(hotel, '#hList')
    })
    itineraries[currentDay].restaurants.forEach(function(restaurant) {
        buttonMaker(restaurant, '#rList')
        markerMaker(restaurant, '#rList')
    })
    itineraries[currentDay].thingsToDo.forEach(function(thing) {
        buttonMaker(thing, '#tList')
        markerMaker(thing, '#tList')
    })

});









