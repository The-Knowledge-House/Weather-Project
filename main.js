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
const mainBody = document.querySelector('body');

let weatherBG = {
    thunder: 'https://images.unsplash.com/photo-1576290134419-915a21939122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    drizzle: 'https://images.unsplash.com/photo-1464014449614-e470468e3ec1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    rain: 'https://images.unsplash.com/photo-1527202825319-408f2a7df85b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    snow: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    clear: 'https://images.unsplash.com/photo-1518288728473-d7f60e815c24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1957&q=80',
    cloudy: 'https://images.unsplash.com/photo-1484551490578-850cc7d6d04d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1416&q=80',
    foggy: 'https://images.unsplash.com/photo-1525094271412-7feebef3ac1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    default: 'https://images.unsplash.com/photo-1576269567911-e2b32418dd34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
};

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
                    mainBody.style.backgroundImage = `url('${weatherBG.thunder}')`;
                    break;
                case 'Drizzle':
                    icon.classList.add('wi', 'wi-showers');
                    mainBody.style.backgroundImage = `url('${weatherBG.drizzle}')`;
                    break;
                case 'Rain':
                    icon.classList.add('wi', 'wi-rain');
                    mainBody.style.backgroundImage = `url('${weatherBG.rain}')`;
                    break;
                case 'Snow':
                    icon.classList.add('wi', 'wi-snow-wind');
                    mainBody.style.backgroundImage = `url('${weatherBG.snow}')`;
                    break;
                case ('Mist' || 'Haze' || 'Fog' || 'Smoke'):
                    mainBody.style.backgroundImage = `url('${weatherBG.foggy}')`;
                    icon.classList.add('wi', 'wi-fog');
                    break;
                case ('Sand' || 'Dust'):
                    icon.classList.add('wi', 'wi-sandstorm');
                    mainBody.style.backgroundImage = `url('${weatherBG.default}')`;
                    break;
                case 'Tornado':
                    icon.classList.add('wi', 'wi-tornado');
                    mainBody.style.backgroundImage = `url('${weatherBG.default}')`;
                    break;
                case 'Clear':
                    if (hr > 6 && hr < 18) {
                        icon.classList.add('wi', 'wi-horizon-alt');
                    } else {
                        icon.classList.add('wi', 'wi-night-clear');
                    }
                    mainBody.style.backgroundImage = `url('${weatherBG.clear}')`;
                    break;
                case 'Clouds':
                    icon.classList.add('wi', 'wi-cloudy');
                    mainBody.style.backgroundImage = `url('${weatherBG.cloudy}')`;
                    break;
                default:
                    icon.classList.add('wi', 'wi-na');
                    mainBody.style.backgroundImage = `url('${weatherBG.default}')`;
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