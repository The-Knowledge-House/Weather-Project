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
getTemp.addEventListener('click', (e) => {
    e.preventDefault();
    let cityWeather = searchWeatherInput.value.toLowerCase();
    let weatherURL = `${process.env.API_BASE_URL}/data/2.5/weather?q=${cityWeather}&units=imperial&appid=${process.env.API_KEY}`;
    
    axios.get(weatherURL)
        .then( (response) => {
         //console.log(response);
         let tempOutput = document.querySelector('.tem')   ;
         tempOutput.innerHTML= `The temperature in ${city}, ${response.data.sys.country} is ${Math.round(response.data.main.temp)} °F`
        })

    .catch( (error) => {
        let tempOutputError = document.querySelector('.tem');
        tempOutputError.innerHTML= 'Please retype your city'
    }) 

})

