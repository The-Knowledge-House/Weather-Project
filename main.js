// // const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
// // //remember, make a .env file and save your key
// // const api_key = 'Your key here';

import axios from 'axios';
import dotenv from 'dotenv';
import { async } from 'q';
dotenv.config();

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;
const cityName = document.getElementById('city')
const getTem = document.getElementById('getTemp')
const form = document.querySelector('form');

getTem.addEventListener("click",(e)=>{
    e.preventDefault();
    let city =cityName.value.toLowerCase()
    let url = `${BASE_URL}/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
    
    axios.get(url)
  .then( (response) =>{
       //console.log(response);

   
    
    
    let tem = document.querySelector('.tem');
   
    tem.innerHTML= `the weather now in ${city} ${response.data.sys.country} : ${Math.round(response.data.main.temp)} °C`
    // handle success
    let now = new Date();
    let date = document.querySelector('.date');
    date.innerHTML = dateToday(now);
    function dateToday(d){
      let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
      let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      
      let day =days[d.getDay()]
      let date = d.getDate();
      let month = months[d.getMonth()]
      let year = d.getFullYear();

      return `${day} ${month} ${date} ${ year }`

    }


    //console.log(response);


  

  })
  .catch( (error)=> {
    // handle error
    let tem = document.querySelector('.tem');
    tem.innerHTML= `something went wrong type your city `
    console.log(error);
  })
 

})







    

 
