const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
//remember, make a .env file and save your key
const api_key = '30980c7da4d8d22a89ed72ffa3b24226';

let input = document.querySelector('.input_text');
let main = document.querySelector('#name');
let temp = document.querySelector('.temp');
let desc = document.querySelector('.desc');
let clouds = document.querySelector('.clouds');
let button= document.querySelector('.submit');
let tempMin = document.querySelector('.minTemp');
let tempMax = document.querySelector('.maxTemp');

button.addEventListener('click', function(name){
fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=30980c7da4d8d22a89ed72ffa3b24226')
.then(response => response.json())
.then(data => {
  let tempValue = data['main']['temp'];
  let nameValue = data['name'];
  let descValue = data['weather'][0]['description'];
  let minTempValue = data['main']['temp_min'];
  let tempMaxValue = data['main']['temp_max'];

  main.innerHTML = nameValue;
  desc.innerHTML = "Description - "+descValue;
  temp.innerHTML = "Temperature - "+tempValue;
  tempMin.innerHTML = "Temp Min - "+minTempValue;
  tempMax.innerHTML = "Temp Max - "+tempMaxValue;
  input.value ="";

})

.catch(err => alert("Wrong city name!"));
})


// let input = document.querySelector('.input_text');
// let main = document.querySelector('#name');
// let temp = document.querySelector('.temp');
// let desc = document.querySelector('.desc');
// let clouds = document.querySelector('.clouds');
// //let tempMin = document.querySelector('.minTemp');
// //let tempMax = document.querySelector('.maxTemp');

// button.addEventListener('click', function(name){
// fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=30980c7da4d8d22a89ed72ffa3b24226')
// .then(response => response.json())
// .then(data => {
//   let tempValue = data['main']['temp'];
//   let nameValue = data['name'];
//   let descValue = data['weather'][0]['description'];
//   //let minTempValue = data['main']['temp_min'];
//   //let tempMax = data['main']['temp_max'];

//   main.innerHTML = nameValue;
//   desc.innerHTML = "Desc - "+descValue;
//   temp.innerHTML = "Temp - "+tempValue;
//   //tempMin.innerHTML = "Temp - "+minTempValue;
//   //tempMax.innerHTML = "Temp - "+tempValtempMaxue;

//   input.value ="";

// })

// .catch(err => alert("Error, please type a city name."));
// })

