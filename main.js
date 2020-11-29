// const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
//remember, make a .env file and save your key
// const api_key = 'Your key here';


import axios from "axios"
import dotenv from "dotenv"
dotenv.config();
const BASE_URL = process.env.BASE_URL
const API_KEY = process.env.API_KEY
const button = document.getElementById("getTemp");
const cityInput = document.getElementById("city");

function weather(cityName) {
  const url = `${BASE_URL}/data/2.5/weather?q=${cityName}&units=imperial&appid=${API_KEY}`;

  axios.get(url)
    .then(function (response) {
      let div = document.createElement('div');
      let weather1 = document.querySelector('#result-api');
      weather1.innerHTML = '';
      div.innerHTML = '<p>' + 'City: ' + '<span>' + data.name + '</span>' + '</p>' +
        '<p>' + 'Current Temperature: ' + '<span>' + data.main.temp + '&#8457;' + '</span>' + '</p>' +
        '<p>' + 'Maximum Temperature: ' + '<span>' + data.main.temp_max + '&#8457;' + '</span>' + '</p>' +
        '<p>' + 'Minimum Temperature: ' + '<span>' + data.main.temp_min + '&#8457;' + '</span>' + '</p>' +
        '<p>' + 'Weather Description: ' + '<span>' + data.weather[0].descr


      console.log(response);
    })
    .catch(err => document.getElementById('result-api').innerHTML = "error!")

})
   
}

