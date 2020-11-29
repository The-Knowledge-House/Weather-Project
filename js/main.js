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
      let cityName = response.data.name
      let temp = response.data.main.temp.toFixed()
      let max = response.data.main.temp_max.toFixed()
      let min = response.data.main.temp_min.toFixed()
      let feels = response.data.main.feels_like.toFixed()
      document.getElementById("message-name").innerText = `${cityName}`
      document.getElementById("message-temp").innerText = `The temp is ${temp}℉`
      document.getElementById("message-feel").innerText = `The temp feels like ${feels}℉`
      document.getElementById("message-max").innerText = `max-temp ${max}℉`
      document.getElementById("message-min").innerText = `min-temp ${min}℉`

      let des = response.data.weather
      for (let i = 0; i < des.length; i+= 2) {
        let desObj = des[i].description;
        document.getElementById("message-des").innerText = `Weather Description: ${desObj}`
      }
      
    
      console.log(response);
    })
    .catch(function (error) {
      const messageElement = document.getElementById("error1");
      messageElement.innerText = error;
      messageElement.style.color = "red";
   
    })
   
}
window.onload = function () {
  document.getElementById("getTemp").onclick = function () {
    const cityName = document.getElementById("city").value;
    weather(cityName);
  }
}

















