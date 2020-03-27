
var latlng = new google.maps.LatLng(19.9974533,73.7898023); //Set the default location of map
var map;
map = new GMaps({
    div: '#map',
    lat: -12.043333,
    lng: -77.028333
  });

  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title: 'Place the marker for your location!', //The title on hover to display
    draggable: true //this makes it drag and drop

});

GMaps.geolocate({
    success: function(position) {
    map.setCenter(position.coords.latitude, position.coords.longitude);
      latlng.
    
    google.maps.event.addListener(marker, 'dragend', function(a) {
        console.log(a);
        document.getElementById('loc').value = a.latLng.lat().toFixed(4) + ', ' + a.latLng.lng().toFixed(4); //Place the value in input box
    });
    
    },
    error: function(error) {
      alert('Geolocation failed: '+error.message);
    },
    not_supported: function() {
      alert("Your browser does not support geolocation");
    },
    always: function() {
    }
  });


  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems);
  });



  /**
   * Logica de stepper
   */

 
  window.addEventListener('load', function () {
    var apiNavDemo = new MStepper(document.getElementById('api_nav_demo'));
 });
