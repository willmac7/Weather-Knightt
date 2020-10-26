// add your API key inside the quotes on line 3
function weatherBalloon() {
  // Add your API key from Open Weather
  var key = 'f1f522e6cc17068601599aecc5069a99';
  // Add your lat/lon position from https://www.latlong.net/
  var lat = '40.712776';
  var lon = '-74.005974';
  // Do not edit below this line
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    console.log(data);
    drawWeather(data);
  })
  .catch(function() {
    // catch any errors
  });
}



function drawWeather( d ) {

  //Variables to store basic weather details (current, high and low)
  var current = Math.round(((parseFloat(d.current.temp)-273.15)*1.8)+32); 
  var high = Math.round(((parseFloat(d.daily[0].temp.max)-273.15)*1.8)+32); 
  var low = Math.round(((parseFloat(d.daily[0].temp.min)-273.15)*1.8)+32);  

  //current day
  $('.current .weather').html(current);
  $('.current .high').html(high);
  $('.current .low').html(low);
  $('.current .description').html(printGraphic(d.current.weather[0].description));

 // day 1
  $('.day1 .day').html( displayDay(1) );
  $('.day1 .high').html(convertTemp(d.daily[1].temp.max));
  $('.day1 .low').html(convertTemp(d.daily[1].temp.min));
  $('.day1 .desc').html(printGraphic(d.daily[1].weather[0].description));

  $('.day2 .day').html( displayDay(2) );
  $('.day2 .high').html(convertTemp(d.daily[2].temp.max));
  $('.day2 .low').html(convertTemp(d.daily[2].temp.min));
  $('.day2 .desc').html(printGraphic(d.daily[2].weather[0].description));

  $('.day3 .day').html( displayDay(3) );
  $('.day3 .high').html(convertTemp(d.daily[3].temp.max));
  $('.day3 .low').html(convertTemp(d.daily[3].temp.min));
  $('.day3 .desc').html(printGraphic(d.daily[3].weather[0].description));

  $('.day4 .day').html( displayDay(4) );
  $('.day4 .high').html(convertTemp(d.daily[4].temp.max));
  $('.day4 .low').html(convertTemp(d.daily[4].temp.min));
  $('.day4 .desc').html(printGraphic(d.daily[4].weather[0].description));

  $('.day5 .day').html( displayDay(5) );
  $('.day5 .high').html(convertTemp(d.daily[5].temp.max));
  $('.day5 .low').html(convertTemp(d.daily[5].temp.min));
  $('.day5 .desc').html(printGraphic(d.daily[5].weather[0].description));

  $('.day6 .day').html( displayDay(6) );
  $('.day6 .high').html(convertTemp(d.daily[6].temp.max));
  $('.day6 .low').html(convertTemp(d.daily[6].temp.min));
  $('.day6 .desc').html(printGraphic(d.daily[6].weather[0].description));
}

// Function for button transition

 $('button').click(function(){
   $('.cover-screen').addClass('open');
 })
/* -------------------------------------------------------
   Function for printing weather-specific class on body
   ------------------------------------------------------- */

function changeTheme(d){
  // if the description includes the word "rain"
  if( d.indexOf('rain') > 0 ) {
    $('body').addClass('rainy');
  // if the description includes the word "cloud"
  } else if( d.indexOf('cloud') > 0 ) {
    $('body').addClass('cloudy');
  // if the description includes the word "sunny"
  } else if( d.indexOf('sunny') > 0 ) {
    $('body').addClass('sunny');
  // if none of those cases are true, assume it's clear
  } else {
    $('body').addClass('clear');
  }
}


/* -----------------------------------------------
   Function for printing weather-specific graphic
   ----------------------------------------------- */

function printGraphic(d){
  // if the description includes the word "rain"
  if( d.indexOf('rain') > 0 ) {
    return '<img src="img/svg/Cloud.svg" alt="Cloud icon">';
  // if the description includes the word "cloud"
  } else if( d.indexOf('cloud') > 0 ) {
    return '<img src="img/svg/Cloud-Rain.svg" alt="Cloud icon">';
  // if the description includes the word "sunny"
  } else if( d.indexOf('sunny') > 0 ) {
    return '<img src="img/svg/Sun.svg" alt="Cloud icon">';
  // if none of those cases are true, assume it's clear
  } else {
    return '<img src="img/svg/Sun.svg" alt="Cloud icon">';
  }
}


/* -----------------------------------------------
   Function for converting time to hours/minutes
   DO NOT EDIT
   ----------------------------------------------- */

function convertTime(t){

  var unixTimestamp = t;
  // since javascript works in milliseconds, you should convert 
  // the time into milliseconds by multiplying it by 1000.
  var date = new Date(unixTimestamp * 1000);
  // hours part from the timestamp (extra code needed to convert from military)
  var hours = (date.getHours() + 24) % 12 || 12;;
  // minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  // will display time in 11:10 format
  var formatTime = hours + ':' + minutes.substr(-2);
  // send formatted date back
  return formatTime;

}


/* -----------------------------------------------
   Function for converting temp to fahrenheit
   DO NOT EDIT
   ----------------------------------------------- */

function convertTemp(t){

  return Math.round(((parseFloat(t)-273.15)*1.8)+32);

}


/* -----------------------------------------------
   Function for creating day of the week
   EDIT FORMAT OF DAY NAMES ONLY ("Monday", etc)
   ----------------------------------------------- */

// based on a system where 0 = today, 1 = tomorrow, etc.
// note: the number system below does not immediately correlate
// for example, 0 for today does not line up with 0 for Sunday below
// how this works – in the return statement, d.getDay() gets today's date
// as a number (if today is Thursday, d.getDay() will be 4)
// adding "n" to this number gives you how many days from today.
// n is passed as an argument to the displayDay() function
// in the main body of the code above.
// if today is Thursday, the 4th day of the week,
// and the number 2 is passed as an argument, 
// the function will return the number 6. 6 maps to Saturday in the 
// weekday array below.

function displayDay(n){

  var d = new Date();
  var weekday = new Array();

  weekday[0] = "S";
  weekday[1] = "M";
  weekday[2] = "T";
  weekday[3] = "W";
  weekday[4] = "Th";
  weekday[5] = "F";
  weekday[6] = "S";

  var dispDay = d.getDay() + n;

  // adjust number system for numbers over 6
  // subtract 7 from totals higher than 6
  // to keep the day numbers in the array range above
  if(dispDay > 6){
    dispDay = dispDay - 7;
  }

  return weekday[ dispDay ];

}

/* --------------------------------------------------
   Event to get weather information when page loads
   -------------------------------------------------- */

window.onload = function() {
  weatherBalloon();
}