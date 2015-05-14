function initialize_gmaps() {
    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
    // set the map options hash
    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("map-canvas");
    // initialize a new Google Map with the options
    var map = new google.maps.Map(map_canvas_obj, mapOptions);
    // Add the marker to the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });
    // Add the marker to the map by calling setMap()
    marker.setMap(map);
}

$(document).ready(function() {
    initialize_gmaps();
});

$('#hotelButton').click(function() {
    var selected = $('#hotelSelect :selected').val();

    // console.log($('#hotelValue').val());
    $('#hotelList').append('<p class="list-group-item-text inline">' + selected + '</p>' + '<button type="button" class="btn btn-default">-</button>');
});



$('.selectorButton').click(function() {
    console.log($(this).siblings('select').val());
    // var selected = $(this).siblings('select').val());
    console.log(selected);

    var divToAppendTo = $(this).siblings('select').attr("name");
    
    // console.log($('#hotelValue').val());
    $('th').append('<p class="list-group-item-text inline">' + selected + '</p>' + '<button type="button" class="btn btn-default">-</button>');
});


// add click event handlers to the add buttons 

// add click event handlers to the subtract buttons 

// Add a day

// Days should switch

// Remove a day

// add new markers to the map

// when an empty day is clicked, it zooms out

// when you add a new hotel/restaurant/things/, map zooms out to encompass all new listings








