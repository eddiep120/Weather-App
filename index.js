$(document).ready(function() {
   //Temp in farenheit
   function tempF(data) {
      var x = Math.round(data * 9 / 5 + 32);
      return x + " °F";
   }

   //Temp in celcius
   function tempC(data) {
      return Math.round(data) + " °C";
   }

   
   var url = "https://fcc-weather-api.glitch.me/api/current?";
   //GET function for current weather
   function getWeather(lat, lon) {
      var apiUrl = url + lat + "&" + lon;
      $.getJSON(
         apiUrl,
         function(weather) {
            var temp = weather.main.temp;
            $("#location").append(weather.name + ", " + weather.sys.country);
            $("#temp").append(
               "<div class = 'current-temp'>" + 
                  tempF(temp)  +
                  "</div>" +
                  "<div class = 'current-weather'>" +
                  weather.weather[0].main +
                  "</div>"
            );
            $(".weather-icon").attr("src", weather.weather[0].icon);
            $(".current-temp").click(function(){
               var f = tempF(temp);
               var c = tempC(temp);
               if ($(this).text() === f){
         $(this).text(c);
                  
               }
               else{
                  $(this).empty().text(f);
                  
         }
               
            });
         }); //end of JSON call within getWeather
   } //end of getWeather

   //function to append user location and run GET request.
   function currentWeather() {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position) {
            lat = "lat=" + position.coords.latitude;
            lon = "lon=" + position.coords.longitude;
            getWeather(lat, lon);
         });
      } else {
         $("#location").append("Geolocation access was denied.");
      }
   }

   currentWeather();
   
   
});