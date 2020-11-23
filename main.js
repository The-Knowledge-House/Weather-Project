import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

/*

axios.get(`${BASE_URL}/data/2.5/weather?q={city name}&appid={API_KEY}`)

*/
const body = document.querySelector('body');
const input = document.querySelector('#city-search');
const searchBtn = document.querySelector('#search');
const cityName = document.querySelector('#city-name');
const temperature = document.querySelector('#temperature');


searchBtn.addEventListener('click', async (url) => {
    try {

        let tempUnit = `\u00B0 F`;

        // getting weather data
        url = await axios.get(`${BASE_URL}/data/2.5/weather?q=${input.value}&appid=${API_KEY}`);
        console.log(url);
        // display temperature
        cityName.innerText = url.data.name;

        temperature.innerText = `${kelvinToFahrenheit(url.data.main.temp)} ${tempUnit}`;
        temperature.addEventListener('click', () => {
            if (tempUnit === `\u00B0 F`) {
                tempUnit = `\u00B0 C`;
                temperature.innerText = `${kelvinToCelsius(url.data.main.temp)} ${tempUnit}`;
            } else {
                tempUnit = `\u00B0 F`;
                temperature.innerText = `${kelvinToFahrenheit(url.data.main.temp)} ${tempUnit}`;
            }
        });
        input.value = '';
    }
    catch (e) {
        console.log('Invalid city', e);
    }
});

function kelvinToFahrenheit(kelvin) {
    kelvin = parseFloat(kelvin);
    let F = ((kelvin - 273.15) * 1.8) + 32;
    return F.toFixed(2);
}

function kelvinToCelsius(kelvin) {
    kelvin = parseFloat(kelvin);
    let C = kelvin - 273.15;
    return C.toFixed(2);
}