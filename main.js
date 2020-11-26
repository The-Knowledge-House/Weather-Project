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
    newparaElement.textContent = `${nameCity}, ${weatherData.sys.country}`;
    
    //Weather icon
    let weatherIcon = weatherData.weather[0].icon
    let weatherSrc = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    let newImageElement = document.createElement('img');
    newImageElement.setAttribute('src', weatherSrc);
    newImageElement.setAttribute('id', 'first-image')
    
    //Temperature in Farenheit
    let temperature = weatherData.main.temp;
    let newpElement = document.createElement('p')
    newpElement.setAttribute('id', 'temp')
    newpElement.textContent = `${Math.floor(temperature)} °F`;

    //Max & Min Temperature
    let maxTemp = Math.floor(weatherData.main.temp_max);
    let minTemp = Math.floor(weatherData.main.temp_min);
    let newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'max-min-temp');

    let newp3Element = document.createElement('p');
    newp3Element.textContent = `Max: ${Math.floor(maxTemp)} °F`;
    let newp4Element = document.createElement('p');
    newp4Element.textContent = `Min: ${Math.floor(minTemp)} °F`;

    //Weather description
    let feels = Math.floor(weatherData.main.feels_like);
    let descrip = weatherData.weather[0].description;
    let newp5Element = document.createElement('p');
    newp5Element.textContent = `Feels like ${feels} °F. ${descrip}`;

    //Sunset and sunrise
    let sunrise = weatherData.sys.sunrise;
    let sunset = weatherData.sys.sunset;

    let date1 = new Date(sunrise * 1000);
    let date2 = new Date(sunset * 1000);
    
    let tzDifference1 = timeZoneValue * 60 + date1.getTimezoneOffset();
    let tzDifference2 = timeZoneValue * 60 + date2.getTimezoneOffset();
    let offSetTime1 = new Date(date1.getTime() + tzDifference1 * 60 * 1000);
    let offSetTime2 = new Date(date2.getTime() + tzDifference2 * 60 * 1000);

    let timeSunrise = offSetTime1.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let timeSunset = offSetTime2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let newp6Element = document.createElement('p');
    let newp7Element = document.createElement('p');
    newp6Element.textContent = `${timeSunrise}`;
    newp7Element.textContent = `${timeSunset}`;

    let newDiv1 = document.createElement('div');
    let newDiv2 = document.createElement('div');
    newDiv1.setAttribute('class', 'sun-rise-set');
    newDiv2.setAttribute('class', 'sun-rise-set');
    newDiv1.setAttribute('id', 'sunrise');
    newDiv2.setAttribute('id', 'sunset');
    let sunsetSrc = `https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-09-512.png`;
    let sunriseSrc = `https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-07-512.png`;
    let newImageElement1 = document.createElement('img');
    let newImageElement2 = document.createElement('img');
    newImageElement1.setAttribute('src', sunriseSrc);
    newImageElement2.setAttribute('src', sunsetSrc);



    //******


    
    document.querySelector('div').innerHTML = '';
    document.querySelector('div').appendChild(newp2Element);
    document.querySelector('div').appendChild(newparaElement);
    document.querySelector('div').appendChild(newImageElement);
    document.querySelector('div').appendChild(newpElement);
    document.querySelector('div').appendChild(newDiv);
    document.getElementById('max-min-temp').appendChild(newp3Element);
    document.getElementById('max-min-temp').appendChild(newp4Element);
    document.querySelector('div').appendChild(newp5Element);

    document.querySelector('div').appendChild(newDiv1);
    document.querySelector('div').appendChild(newDiv2);
    
    document.getElementById('sunrise').appendChild(newImageElement1);
    document.getElementById('sunrise').appendChild(newp6Element);

    document.getElementById('sunset').appendChild(newImageElement2);
    document.getElementById('sunset').appendChild(newp7Element);
    
    form.reset();
    
  } catch { 
    console.log(e);
  }
})