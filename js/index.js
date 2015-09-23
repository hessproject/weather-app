//default variables
var latitude = 0;
var longitude = 0;
var tempK = 0;

//show loading screen
$(document).ready(function() {
  $('.jumbotron').hide();
  $('.spinner').show();

//find location and show weather
  navigator.geolocation.getCurrentPosition(function(pos) {
    getWeather(pos);
  }, error, {
    timeout: 10000
  });
  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  function getWeather(pos) {
    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude;
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude, function(data) {
      tempK = data.main.temp;
      $('#coordinates').text("Coordinates are: " + latitude + " " + longitude);
      $('#main').text(data.weather[0].main);
      $('#city').text(data.name);
      $('#temperature').text(Math.round(((tempK - 273.15) * 1.8) + 32) + "°F");
      changeBackground();
      $('.jumbotron').show().addClass('animated fadeInLeft');
      $('.spinner').hide();
    })
  }

  //change background depending on #main
  function changeBackground() {
    switch ($('#main').text()) {
      case 'Clouds':
        $('#icon').html('<img src="http://openweathermap.org/img/w/03d.png">');
        document.getElementById('app').style.background = 'url("https://static.pexels.com/photos/113/sky-clouds-cloudy-weather-large.jpg") no-repeat center center fixed';
        break;
      case 'Clear':
        $('#icon').html('<img src="http://openweathermap.org/img/w/01d.png">');
        document.getElementById('app').style.background = 'url("https://static.pexels.com/photos/180/wood-sea-landscape-nature-large.jpg") no-repeat center center fixed';
        break;
      case 'Rain':
        $('#icon').html('<img src="http://openweathermap.org/img/w/09d.png">');
        document.getElementById('app').style.background = 'url("https://static.pexels.com/photos/1553/glass-rainy-car-rain-large.jpg") no-repeat center center fixed';
        break;
      case 'Snow':
        $('#icon').html('<img src="http://openweathermap.org/img/w/13d.png">');
        document.getElementById('app').style.background = 'url("https://static.pexels.com/photos/6672/snow-forest-trees-winter-large.jpeg") no-repeat center center fixed';
        break;
      case 'Haze':
        $('#icon').html('<img src="http://openweathermap.org/img/w/50d.png">')
        document.getElementById('app').style.background = 'url("https://static.pexels.com/photos/4827/nature-forest-trees-fog-large.jpeg") no-repeat center center fixed';
        break;
    }
  }

  //to change from °C, °F, °K
    $('#tempSelect .btn').click(function() {
    $('#tempSelect .btn.active').removeClass('active');
    $(this).addClass('active')});
  
  $('#k').click(function() {
    $('#temperature').text(tempK + '°K');
  });
  $('#c').click(function() {
    $('#temperature').text(Math.round(tempK - 273.15) + '°C');
    $('#f').click(function() {
      $('#temperature').text(Math.round(((tempK - 273.15) * 1.8) + 32) + "°F");
    })

  });

})