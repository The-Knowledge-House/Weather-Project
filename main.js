import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const getWeather = document.getElementById("getTemp");
const searchWeatherInput = document.getElementById("city");



//remember, make a .env file and save your key
getWeather.addEventListener('click', async (e) => { 
  e.preventDefault(); //this line helps make the input act like a button 
  let cityWeather = searchWeatherInput.value;
  const weatherUrl = `${process.env.API_BASE_URL}/data/2.5/weather?q=${cityWeather}&units=imperial&appid=${process.env.API_KEY}`;
  
  try {
    let response = await axios.get(weatherUrl)
    console.log(response);
  } catch { 
    console.log(e);
  }
})