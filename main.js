// const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
//remember, make a .env file and save your key
// const api_key = 'Your key here';


//dotenv.config();
const BASE_URL = process.env.BASE_URL
const API_KEY = process.env.API_KEY
const button = document.getElementById("submit");


function weather(cityName) {

  $(document).ready(function () {
    $.ajax({
      method: "GET",
      crossDomain: true,
      dataType: 'json',
      ContentType: "application/json",
      url: BASE_URL + "/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + API_KEY,


      success: function (response) {
        let weather1 = document.querySelector('#result-api');
        const data = response;
        console.log(data);
        console.log(weather1);
        weather1.innerHTML = '<p>' + 'City: ' + '<span>' + data.name + '</span>' + '</p>' +
          '<p>' + 'Current Temperature: ' + '<span>' + data.main.temp + '&#8457;' + '</span>' + '</p>' +
          '<p>' + 'Maximum Temperature: ' + '<span>' + data.main.temp_max + '&#8457;' + '</span>' + '</p>' +
          '<p>' + 'Minimum Temperature: ' + '<span>' + data.main.temp_min + '&#8457;' + '</span>' + '</p>' +
          '<p>' + 'Weather Description: ' + '<span>' + data.weather[0].description
      }
      ,
      error: function (jqXHR, textStatus, errorThrown) {
        document.getElementById('result-api').innerHTML = "error!"
      }
    })

  });
}

var submit = document.getElementById("submit");
submit.onclick = function () {
  const cityInput = document.getElementById("cityInput");
  console.log(cityInput.value)
  weather(cityInput.value);

}