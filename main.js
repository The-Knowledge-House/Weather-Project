import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const getWeather = document.getElementById("getTemp");
const searchWeatherInput = document.getElementById("city");
const form = document.querySelector('form');



//remember, make a .env file and save your key
getWeather.addEventListener('click', async (e) => { 
  e.preventDefault(); //this line helps make the input act like a button 
  let cityWeather = searchWeatherInput.value;
  const weatherUrl = `${process.env.API_BASE_URL}/data/2.5/weather?q=${cityWeather}&units=imperial&appid=${process.env.API_KEY}`;
  
  try {
    let response = await axios.get(weatherUrl)
    let weatherData = response.data
    console.log(weatherData)

    //Time-Date 
    let currentTime = new Date();
    let timeZoneValue = weatherData.timezone / 3600; //[timezone value convert it to hours]
    let tzDifference = timeZoneValue * 60 + currentTime.getTimezoneOffset();
    let offSetTime = new Date(currentTime.getTime() + tzDifference * 60 * 1000);


    let time = offSetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let date = offSetTime.toLocaleDateString();
    let newp2Element = document.createElement('p');
    newp2Element.setAttribute('id', "time-data");
    newp2Element.textContent = `${time}, ${date}`;



    //Name City
    let nameCity = weatherData.name
    let newparaElement = document.createElement('p')
    newparaElement.setAttribute('id', 'cityname');
    newparaElement.textContent = nameCity;
    
    //Weather icon
    let weatherIcon = weatherData.weather[0].icon
    let weatherSrc = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    let newImageElement = document.createElement('img')
    newImageElement.setAttribute('src', weatherSrc);
    
    //Temperature in Farenheit
    let temperature = weatherData.main.temp;
    let newpElement = document.createElement('p')
    newpElement.textContent = `${Math.floor(temperature)} °F`;


    
    document.querySelector('div').innerHTML = '';
    document.querySelector('div').appendChild(newp2Element);
    document.querySelector('div').appendChild(newparaElement);
    document.querySelector('div').appendChild(newImageElement);
    document.querySelector('div').appendChild(newpElement);
    
    form.reset();
    
  } catch { 
    console.log(e);
  }
})