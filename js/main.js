import dotenv from 'dotenv';
import axios from 'axios';
import { async } from 'fast-glob';
dotenv.config();
import regeneratorRuntime from "regenerator-runtime";

const BASE_URL = process.env.BASE_URL
const API_KEY = process.env.API_KEY
const getTemp = document.getElementById("getTemp");
const searchWeatherInput = document.getElementById("city");
const form = document.querySelector("form");


//setting up the getTemp eventlistener
getTemp.addEventListener('click', async (e) => {
    let cityWeather = searchWeatherInput.value;
    let weatherURL = `${process.env.API_BASE_URL}/data/2.5/weather?q=${cityWeather}&units=imperial&appid=${process.env.API_KEY}`;
    
    try {
        let response = await axios.get(weatherURL);
        let weatherData = response.data;
        console.log(weatherData);
} catch {
    console.log(e)
}
})

