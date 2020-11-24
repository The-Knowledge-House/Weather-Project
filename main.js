import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;



const input = document.querySelector('#city-search');
const searchBtn = document.querySelector('#search');
const cityName = document.querySelector('#city-name');
const temperature = document.querySelector('#temperature');
const description = document.querySelector('#desc');
const icon = document.querySelector('#icon');
const darkDiv = document.querySelector('.dark');

window.addEventListener('load', (event) => {
    document.querySelector('html').classList.add('trans');
});

darkDiv.classList.remove("dark");
searchBtn.addEventListener('click', async (url) => {
    try {
        if (input.value) {
            let tempUnit = `\u00B0 F`;
            url = await axios.get(`${BASE_URL}/data/2.5/weather?q=${input.value}&appid=${API_KEY}`);
            cityName.innerText = `${url.data.name}, ${url.data.sys.country}`;
            temperature.innerText = `${kelvinToFahrenheit(url.data.main.temp)} ${tempUnit}`;
            let weatherMain = url.data.weather[0].main;
            let weatherDescription = url.data.weather[0].description;
            description.innerText = weatherDescription;
            const hr = (new Date()).getHours();
            darkDiv.classList.add('dark');
            switch (weatherMain) {
                case 'Thunderstorm':
                    icon.classList.add('wi', 'wi-day-lightning');
                    break;
                case 'Drizzle':
                    icon.classList.add('wi', 'wi-showers');
                    break;
                case 'Rain':
                    icon.classList.add('wi', 'wi-rain');
                    break;
                case 'Snow':
                    icon.classList.add('wi', 'wi-snow-wind');
                    break;
                case ('Mist' || 'Haze' || 'Fog' || 'Smoke'):
                    icon.classList.add('wi', 'wi-fog');
                    break;
                case ('Sand' || 'Dust'):
                    icon.classList.add('wi', 'wi-sandstorm');
                    break;
                case 'Tornado':
                    icon.classList.add('wi', 'wi-tornado');
                    break;
                case 'Clear':
                    if (hr > 6 && hr < 18) {
                        icon.classList.add('wi', 'wi-horizon-alt');
                    } else {
                        icon.classList.add('wi', 'wi-night-clear');
                    }
                    break;
                case 'Clouds':
                    icon.classList.add('wi', 'wi-cloudy');
                    break;
                default:
                    icon.classList.add('wi', 'wi-na');
                    break;
            }
            temperature.addEventListener('click', () => {
                if (tempUnit === `\u00B0 F`) {
                    tempUnit = `\u00B0 C`;
                    temperature.innerText = `${kelvinToCelsius(url.data.main.temp)} ${tempUnit}`;
                } else {
                    tempUnit = `\u00B0 F`;
                    temperature.innerText = `${kelvinToFahrenheit(url.data.main.temp)} ${tempUnit}`;
                }
            });
        }
        input.value = '';
    }
    catch (e) {
        console.log('Invalid city', e);
        cityName.innerText = "Not a valid city";
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