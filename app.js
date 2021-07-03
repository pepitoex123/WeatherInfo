
/*
Project: WeatherInfo
Author: Uriel Cabrera
Date Of Creation: June-July of 2021
*/


class Ciudad{
  constructor(nombre,pais,temperatura,descripcionTemperatura,iconID,calidadDeAire,pm25,pm10,no2,co,so2,o3,moreInfoAirQuality,soilMoisture,soilTemperature){
    this.nombre = nombre;
    this.pais = pais;
    this.temperatura = temperatura;
    this.calidadDeAire = calidadDeAire;
    this.descripcionTemperatura = descripcionTemperatura;
    this.iconID = iconID;
    this.pm25 = pm25;
    this.pm10 = pm10;
    this.no2 = no2;
    this.co = co;
    this.so2 = so2;
    this.o3 = o3;
    this.moreInfoAirQuality = moreInfoAirQuality;
    this.soilMoisture = soilMoisture;
    this.soilTemperature = soilTemperature;
  }

  setNombre(nombre){
    this.nombre = nombre;
  }

  getNombre(){
    return this.nombre;
  }

  setPais(pais){
    this.pais = pais;
  }

  getPais(){
    return this.pais;
  }

  setTemperatura(temperatura){
    this.temperatura = temperatura;
  }

  getTemperatura(){
    return this.temperatura;
  }

  setDescripcionTemperatura(descripcionTemperatura){
    this.descripcionTemperatura = descripcionTemperatura;
  }

  getDescripcionTemperatura(){
    return this.descripcionTemperatura;
  }

  setIconID(iconID){
    this.iconID = iconID;
  }

  getIconID(){
    return this.iconID;
  }

  setCalidadDeAire(calidadDeAire){
    this.calidadDeAire = calidadDeAire;
  }

  getCalidadDeAire(){
    return this.calidadDeAire;
  }

  setpm25(pm25){
    this.pm25 = pm25;
  }

  getpm25(){
    return this.pm25;
  }

  setpm10(pm10){
    this.pm10 = pm10;
  }

  getpm10(pm10){
    return this.pm10;
  }

  setno2(no2){
    this.no2 = no2;
  }

  getno2(){
    return this.no2;
  }

  setco(co){
    this.co = co;
  }

  getco(){
    return this.co;
  }

  setso2(so2){
    this.so2 = so2;
  }

  getso2(){
    return this.so2;
  }

  seto3(o3){
    this.o3 = o3;
  }

  geto3(){
    return this.o3;
  }

  setMoreInfoAirQuality(moreInfoAirQuality){
    this.moreInfoAirQuality = moreInfoAirQuality;
  }

  getMoreInfoAirQuality(){
    return this.moreInfoAirQuality;
  }

  setSoilMoisture(soilMoisture){
    this.soilMoisture = soilMoisture;
  }
  getSoilMoisture(){
    return this.soilMoisture;
  }

  setSoilTemperature(soilTemperature){
    this.soilTemperature = soilTemperature;
  }

  getSoilTemperature(){
    return this.soilTemperature;
  }
}



/*

  --------------------- Lógica del proyecto -----------------------------------------------



  Las APIs a utilizar son:

  https://aqicn.org/api/es/
  https://openweathermap.org/
  https://www.getambee.com/api/soil


  --------------------- Logic behind the project -----------------------------------------------

  The Application Programming Interfaces that I am going to use are going to be:
  https://aqicn.org/api/es/
  https://openweathermap.org/
  https://www.getambee.com/api/soil


  The idea behind this project is to be able to integrate the different APIs in
  an efficient way, aswell as to take advantage of some ways in which we can avoid making
  new requests that we have previously made in the past

  This will be achieved thanks to the use of:

  -sessionStorage
  -localStorage


  For now, it only saves the local City through the use of the home icon, but in the future I'll make sure to add new features
  (such as being able to store all the previous cities that have requested during the session, and thus, avoiding to make unnecessary requests to the APIs)

*/


/* Utilizado para la animación de la navbar */


window.addEventListener("scroll", function(){
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0)
})

/* This event listener needs to be added in order for the navbar animation to work :) */








/* Elementos del DOM declarados como constantes*/

const iconElement = document.querySelector(".weather-icon");
const locationIcon = document.querySelector(".location-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".temperature-location p");
const notificationElement = document.querySelector(".notification");
const airQualityValueElement = document.querySelector(".airquality-value p:first-child");
const airQualityValueDescriptionElement = document.querySelector(".airquality-value p:last-child");
const airQualityDescriptionpm25Element = document.querySelector(".airquality-description p:nth-child(1)");
const airQualityDescriptionpm10Element = document.querySelector(".airquality-description p:nth-child(2)");
const airQualityDescriptionno2Element = document.querySelector(".airquality-description p:nth-child(3)");
const airQualityDescriptioncoElement = document.querySelector(".airquality-description p:nth-child(4)");
const airQualityDescriptionso2Element = document.querySelector(".airquality-description p:nth-child(5)");
const airQualityDescriptiono3Element = document.querySelector(".airquality-description p:nth-child(6)");
const airQualityDescriptionMoreInfoElement = document.querySelector(".airquality-description p:last-child");
const soilQualityDescriptionMoisture = document.querySelector(".soilquality-description p:first-child");
const soilQualityDescriptionTemperature = document.querySelector(".soilquality-description p:last-child");

/* DOM Elements that were declared as constants */


/* Variables y Objetos declarados */

let input = document.getElementById("search");
let city = "";
let latitude = 0.0;
let longitude = 0.0;
let isLocalCitySaved = new Boolean(false);
let currentCity = new Ciudad("","",0,0,0,0,0,0,0,0,0,0,0,0);

/* Variables and objects declared */



/* Useful constant values (Kelvin´s initial value aswell as API keys needed for this project) */
const kelvin = 273;
const key = "5395a0670ef5d4697a6e596e4b480ca8";
const key2 = "9d41a33a3d77f8cd86fe7c64415b4833b0f17485";
const key3 = "5deed5536326565250bcf59ca8bcf2bbd2ee6b57f2c7c6fe5ecd23d8ab6e4ced";
/* Valores constantes que son útiles :D */



input.addEventListener("keyup", function(event){
  if(event.keyCode === 13){
    event.preventDefault();
    city = input.value;
    getSearchWeather(city);
    getAndDisplayAirQuality(key2,city);
    console.log(city);
  }
})

const weather = {};
weather.temperature = {
  unit: "celsius"
};




if("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p> Browser doesn't support geolocation </p>"
}

function setPosition(position){
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  getWeather(latitude,longitude);
  getAndDisplayAirQuality(key2,weather.city);
}

locationIcon.addEventListener("click",function(event){
  console.log("Hey");
  if(isLocalCitySaved === true && sessionStorage.getItem("myLocalCity")){
    currentCity = JSON.parse(sessionStorage.getItem("myLocalCity"));
    iconElement.innerHTML = `<img src="media/${currentCity.getIconID()}.png">`;
    tempElement.innerHTML = `${currentCity.getTemperatura()} *<span>C</span>`;
    descElement.innerHTML = `${currentCity.getDescripcionTemperatura()}`;
    locationElement.innerHTML = `<p>${currentCity.getNombre()}, ${currentCity.getPais()}</p>`;
    airQualityValueElement.innerHTML = `<p> The location has a rating of <span>${currentCity.getCalidadDeAire()}</span></p>`;
    airQualityDescriptionpm25Element.innerHTML = `<p>PM 2.5 Concentration: <span>${currentCity.getpm25()}</span></p>`;
    airQualityDescriptionpm10Element.innerHTML = `<p>PM 1.0 Concentration: <span>${currentCity.getpm10()}</span></p>`;
    airQualityDescriptionno2Element.innerHTML = `<p>NO2 Concentration: <span>${currentCity.getno2()}</span></p>`;
    airQualityDescriptioncoElement.innerHTML = `<p>CO Concentration: <span>${currentCity.getco()}</span></p>`;
    airQualityDescriptionso2Element.innerHTML = `<p>SO2 Concentration: <span>${currentCity.getso2()}</span></p>`;
    airQualityDescriptiono3Element.innerHTML = `<p>O3 Concentration: <span>${currentCity.geto3()}</span></p>`;
    airQualityDescriptionMoreInfoElement.innerHTML = `<p>For more information visit: <span>${currentCity.getMoreInfoAirQuality()}</span> </p>`;
    soilQualityDescriptionMoisture.innerHTML = `<p>Soil Moisture: <span>${currentCity.getSoilMoisture()}</span></p>`;
    soilQualityDescriptionTemperature.innerHTML = `<p>Soil Temperature: <span>${currentCity.getSoilTemperature()}</span></p>`;
  }
  getWeather(latitude,longitude);
  getAndDisplayAirQuality(key,weather.city);
})

function showError(error){
  notificationElement.style.display="block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getSearchWeather(city){
  let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  fetch(api)
  .then(function(response){
    let data = response.json();
    return data;
  })
  .then(function(data){
    weather.temperature.value = Math.floor(data.main.temp - kelvin);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
    if(isLocalCitySaved === false){
      currentCity.setNombre(data.name);
      currentCity.setPais(data.sys.country);
      currentCity.setTemperatura(Math.floor(data.main.temp - kelvin));
      currentCity.setDescripcionTemperatura(data.weather[0].description);
      currentCity.setIconID(data.weather[0].icon);
    }
    else{
      currentCity.setNombre(data.name);
      currentCity.setPais(data.sys.country);
      currentCity.setTemperatura(Math.floor(data.main.temp - kelvin));
      currentCity.setDescripcionTemperatura(data.weather[0].description);
      currentCity.setIconID(data.weather[0].icon);
    }
  })
  .then(function(){
    displayWeather();
  })
}

function getWeather(latitude,longitude){
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api)
  .then(function(response){
    let data = response.json();
    return data;
  })
  .then(function(data){
    weather.temperature.value = Math.floor(data.main.temp - kelvin);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
    getAndDisplaySoilQuality(key3,data.coord.lat, data.coord.lon);
  })
  .then(function(){
    displayWeather();
  })
}


function displayWeather(){
  iconElement.innerHTML = `<img src="media/${weather.iconId}.png">`;
  tempElement.innerHTML = `${weather.temperature.value} *<span>C</span>`;
  descElement.innerHTML = `${weather.description}`;
  locationElement.innerHTML = `<p>${weather.city}, ${weather.country}</p>`;
}

function getAndDisplayAirQuality(key,city){
  let api = `https://api.waqi.info/feed/${city}/?token=${key}`;
  fetch(api)
  .then(function(response){
    let data = response.json();
    return data
  })
  .then(function(data){
    let valueElement = data.data.aqi;
    if(valueElement === undefined){
      airQualityValueElement.innerHTML = `<p> The location has a rating of <span>unknown</span></p>`;
    }
    else{
      airQualityValueElement.innerHTML = `<p> The location has a rating of <span> ${valueElement}</span></p>`;
    }
    if(valueElement > 80){
      airQualityValueDescriptionElement.innerHTML = `<p>This is considered as <span>bad</span></p>`;
    }
    else if(valueElement < 80 && valueElement > 50){
      airQualityValueDescriptionElement.innerHTML = `<p>This is considered as <span>average</span></p>`;
    }
    else if(valueElement === undefined){
      airQualityValueDescriptionElement.innerHTML = `<p>Sorry, there's no information for this city</p>`;
    }
    else{
      airQualityValueDescriptionElement.innerHTML = `<p>This is considered as <span>good</span></p>`;
    }

    if(data.data.iaqi.pm25.v != undefined && data.data.iaqi.pm25.v > 0){
      airQualityDescriptionpm25Element.innerHTML = `<p>PM 2.5 Concentration: <span>${data.data.iaqi.pm25.v}</span></p>`;
    }
    else{
      airQualityDescriptionpm25Element.innerHTML = `<p>PM 2.5 Concentration: <span>unknown</span></p>`;
    }
    if(data.data.iaqi.pm10.v != undefined && data.data.iaqi.pm10.v > 0){
      airQualityDescriptionpm10Element.innerHTML = `<p>PM 1.0 Concentration: <span>${data.data.iaqi.pm10.v}</span></p>`;
    }
    else{
      airQualityDescriptionpm10Element.innerHTML = `<p>PM 1.0 Concentration: <span>unknown</span></p>`;
    }
    if(data.data.iaqi.no2.v != undefined && data.data.iaqi.no2.v > 0){
      airQualityDescriptionno2Element.innerHTML = `<p>NO2 Concentration: <span>${data.data.iaqi.no2.v}</span></p>`;
    }
    else{
      airQualityDescriptionno2Element.innerHTML = `<p>NO2 Concentration: <span>unknown</span></p>`;
    }
    if(data.data.iaqi.co.v != undefined && data.data.iaqi.co.v > 0){
      airQualityDescriptioncoElement.innerHTML = `<p>CO Concentration: <span>${data.data.iaqi.co.v}</span></p>`;
    }
    else{
      airQualityDescriptioncoElement.innerHTML = `<p>CO Concentration: <span>unknown</span></p>`;
    }
    if(data.data.iaqi.so2.v != undefined && data.data.iaqi.so2.v > 0){
      airQualityDescriptionso2Element.innerHTML = `<p>SO2 Concentration: <span>${data.data.iaqi.so2.v}</span></p>`;
    }
    else{
      airQualityDescriptionso2Element.innerHTML = `<p>SO2 Concentration: <span>unknown</span></p>`;
    }
    if(data.data.iaqi.o3.v != undefined && data.data.iaqi.o3.v > 0){
      airQualityDescriptiono3Element.innerHTML = `<p>Ozone Concentration: <span>${data.data.iaqi.o3.v}</span></p>`;
    }
    else{
      airQualityDescriptiono3Element.innerHTML = `<p>Ozone Concentration: <span>unknown</span></p>`;
    }
    if(data.data.city.url != undefined){
      airQualityDescriptionMoreInfoElement.innerHTML = `<p>For more information visit: <span>${data.data.city.url}</span> </p>`;
    }
    else{
      airQualityDescriptionMoreInfoElement.innerHTML = `<p>There's sadly not more information for this city</p>`;
    }
    if(isLocalCitySaved === false){
      currentCity.setCalidadDeAire(data.data.aqi);
      currentCity.setpm25(data.data.iaqi.pm25.v);
      currentCity.setpm10(data.data.iaqi.pm10.v);
      currentCity.setno2(data.data.iaqi.no2.v);
      currentCity.setco(data.data.iaqi.co.v);
      currentCity.setso2(data.data.iaqi.so2.v);
      currentCity.seto3(data.data.iaqi.o3.v);
      currentCity.setMoreInfoAirQuality(data.data.city.url);
      sessionStorage.setItem("myLocalCity", JSON.stringify(currentCity));
      isLocalCitySaved = true;
    }
    else{
      currentCity.setCalidadDeAire(data.data.aqi);
      currentCity.setpm25(data.data.iaqi.pm25.v);
      currentCity.setpm10(data.data.iaqi.pm10.v);
      currentCity.setno2(data.data.iaqi.no2.v);
      currentCity.setco(data.data.iaqi.co.v);
      currentCity.setso2(data.data.iaqi.so2.v);
      currentCity.seto3(data.data.iaqi.o3.v);
      currentCity.setMoreInfoAirQuality(data.data.city.url);
    }
  })
}

function getAndDisplaySoilQuality(key,lat,long){
  const options = {
	   "method": "GET",
	   "hostname": "api.ambeedata.com",
	   "port": null,
	   "path": `/soil/latest/by-lat-lng?lat=${lat}&lng=${long}`,
	   "headers":{
		     "x-api-key": key,
		     "Content-type": "application/json"
	      }
  };

  fetch(options)
  .then(function(response){
    let data = response.json();
    return data;
  })
  .then(function(data){
    soilQualityDescriptionMoisture.innerHTML = `<p>Soil Moisture: <span>${data.data.soil_moisture}</span></p>`;
    soilQualityDescriptionTemperature.innerHTML = `<p>Soil Temperature: <span>${data.data.soil_temperature}</span></p>`;
    if(isLocalCitySaved === false){
      currentCity.setSoilMoisture(data.data.soil_moisture);
      currentCity.setSoilTemperature(data.data.soil_temperature);
    }
    else{
      currentCity.setSoilMoisture(data.data.soil_moisture);
      currentCity.setSoilTemperature(data.data.soil_temperature);
    }
  })
}
