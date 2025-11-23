// javascript for our website

let searchTerm = document.getElementById('search');

// function toggleSuggestionContainer(){
//     const searchSuggestionContainer = document.getElementById('search-suggestion');
//     let current = searchSuggestionContainer.style.display;
//     current = current ? 'block' : 'none';
//     if(current === 'none') current = 'block'
//     else current = 'none';
// }
async function updateSearch() {
    const term = searchTerm.value;
    const searchSuggestion = await getCities(term);
    if (term.length > 2 && searchSuggestion) {
        const searchSuggestionContainer = document.getElementById('search-suggestion');
        const suggestionListElement = document.getElementById('suggestion-items');
        suggestionListElement.innerHTML = '';
        for (let i = 0; i < searchSuggestion.length; i++) {

            const suggestionListItem = document.createElement('div');
            suggestionListItem.className = 'suggestion-item';
            const cityName = document.createElement('p');
            cityName.className = 'city-name';
            cityName.innerText = searchSuggestion[i].name;
            suggestionListItem.appendChild(cityName);
            const countryName = document.createElement('p');
            countryName.classList = 'country-name';
            countryName.innerText = `${searchSuggestion[i].country}/${searchSuggestion[i].admin1 || searchSuggestion[i].name}`;
            suggestionListItem.appendChild(countryName);
            suggestionListElement.appendChild(suggestionListItem);
        }
        searchSuggestionContainer.style.display = 'block';
        // toggleSuggestionContainer();
    }

}
function fillSearch() {
    const searchItems = document.getElementsByClassName('suggestion-item');
    const city = document.getElementsByClassName('city-name');
    if (searchItems) {
        for (let i = 0; i < searchItems.length; i++) {
            const id = `suggestion-${i}`;
            const cityId = `city-${i}`;
            searchItems[i].id = id;
            city[i].id = cityId;
            const city1 = document.getElementById(`city-${i}`);
            const item = document.getElementById(`suggestion-${i}`);
            item.addEventListener('click', (e) => {
                searchTerm.value = city1.innerText;
                const searchSuggestionContainer = document.getElementById('search-suggestion');
                searchSuggestionContainer.style.display = 'none';
            })
        }


    }
}

searchTerm.addEventListener('input', async (e) => {
    await updateSearch();
    fillSearch();
})
searchTerm.addEventListener('focusin', async (e) => {
    await updateSearch();
    fillSearch();
})
searchTerm.addEventListener('change', (e) => {
    const searchSuggestionContainer = document.getElementById('search-suggestion');
    searchSuggestionContainer.style.display = 'none';
})


async function getCities(term) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${term}&count=5&language=en&format=json`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }

        const result = await response.json();
        return result.results;
    } catch (error) {
        console.log(error.message);
    }
}

//
//
//
//
let temperatureUnit = 'celsius';
let windSpeedUnit = 'kmh';
let percipitationUnit = 'mm';

const units = ['temperature', 'wind-speed', 'precipitation'];
units.forEach(unit => {
    const tickElement = document.createElement('img');
    tickElement.src = './assets/images/tick-svgrepo-com.svg'
    tickElement.style.width = '20px';
    const unitElement = document.getElementById(unit);
    const options = unitElement.querySelectorAll('[data-unit]');
    Array.from(options).forEach((option, index) => {
        const uniqueId = `${unit}-${index}`;
        option.id = uniqueId;
        const optionElement = document.getElementById(uniqueId);
        if (optionElement.dataset.unit === 'celsius' || optionElement.dataset.unit === 'kmh' || optionElement.dataset.unit === 'mm') {
            optionElement.classList.add('unit-value-selected');
            optionElement.appendChild(tickElement);
        }
        optionElement.addEventListener('click', (e) => {
            if (optionElement.classList.contains('unit-value-selected')) return;
            if (unit === 'temperature') {
                temperatureUnit = optionElement.dataset.unit;
            } else if (unit === 'wind-speed') {
                windSpeedUnit = optionElement.dataset.unit;
            } else if (unit === 'percipitation') {
                percipitationUnit = optionElement.dataset.unit;
            }
            const childs = unitElement.children;
            const desiredChild = Array.from(childs).forEach(child => {
                if (child.dataset.unit !== optionElement.dataset.unit) {
                    child.classList.remove('unit-value-selected');
                }
            })

            optionElement.classList.add('unit-value-selected');
            optionElement.appendChild(tickElement);

        })
    })



})

const unitToggler = document.getElementById('unit-toggle-btn');
const unitContainer = document.getElementById('unit-values');
unitToggler.addEventListener('click', (e) => {
    if (unitContainer.style.display === 'block') {
        unitContainer.style.display = 'none';
        return;
    }
    unitContainer.style.display = 'block';
})

//
//
//
//
//
//


const mainContainer = document.getElementById('container-main');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(updateWeatherFromNavigator, error);
} else {
    const locationError = document.getElementById('error-geolocation');
    const locationErrorMessage = document.getElementById('geo-error-message');

    locationErrorMessage.innerText = 'your browser does not support GPS, please do a manual search to find weather forecast.';
    mainContainer.innerText = '';
    locationError.style.display = 'flex';
}

function error(e) {
    const locationError = document.getElementById('error-geolocation');
    const locationErrorMessage = document.getElementById('geo-error-message');

    locationErrorMessage.innerText = `${e.message}, please do a manual search to find weather forecast.`;
    mainContainer.innerText = '';
    locationError.style.display = 'flex';
}

async function getLocation(lat, lng) {
    const cityName = 'new delhi';
    const countryName = 'india';
    try{
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
    const result = await response.json();
    const cityName = result.address.city || 'new delhi';
    const countryName = result.address.country || 'india';
    return [cityName, countryName];
    } catch(e){
        console.log(e);
    }
    return [cityName, countryName];
}
async function getWeatherForecast(lat, lng, time, zone) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,weather_code,precipitation&timezone=${time}%2F${zone}&forecast_hours=18&temporal_resolution=hourly_3`);
    const result = await response.json();
    return result;
}

function getCurrentDay() {
    let currentDate = new Date();
    let currentWeekDay = currentDate.getDay();
    const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const weekDayName = weekDays[currentDate.getDay()];

    const dateValue = currentDate.getDate();
    const year = currentDate.getFullYear();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = months[currentDate.getMonth()];
    return [year, monthName, weekDayName, dateValue];
}


async function updateWeatherFromNavigator(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const [time, zone] = timeZone.split('/');
    const [city, country] = await getLocation(lat, lng);
    const forecast = await getWeatherForecast(lat, lng, time, zone);
    console.log(forecast);
    const currentPlace = document.getElementById('current-place');
    currentPlace.innerText = `${city}, ${country}`;
    const [currentYear, currentMonth, currentDay, currentDate] = getCurrentDay();

    const currentDD = document.getElementById('current-dd');
    currentDD.innerText = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
    const currentTemp = document.getElementById('current-temp');
    currentTemp.innerText = `${forecast.current.temperature_2m}\u00B0`;

    const feelsLike = document.getElementById('feels-like');
    feelsLike.innerText = `${forecast.current.apparent_temperature}\u00B0`;

    const humidity = document.getElementById('humidity');
    humidity.innerText = `${forecast.current.relative_humidity_2m}%`;
    const windUnit = windSpeedUnit === 'kmh' ? 'km/h' : 'mph';
    const wind = document.getElementById('wind');
    wind.innerText = `${forecast.current.wind_speed_10m} ${windUnit}`;

    const perUnit = percipitationUnit === 'mm' ? 'mm' : 'inches';
    const percipitation = document.getElementById('percipitation');
    percipitation.innerText = `${forecast.current.precipitation} ${perUnit}`;


    const maxTempArrray = forecast.daily.temperature_2m_max;
    const minTempArray = forecast.daily.temperature_2m_min;
    const wmoCodeArray = forecast.daily.weather_code;
    const dateArray = forecast.daily.time;
    
    const forecastArray = await dailyForecast(maxTempArrray, minTempArray, wmoCodeArray, dateArray);

    const forecastsEelment = document.getElementById('forecasts');  
    const clone = forecastsEelment.firstElementChild.cloneNode(true);
    forecastsEelment.innerText = '';

    forecastArray.forEach((item, index) =>{
        const  clonev2 = clone.cloneNode(true);
        const clonev3 = updateDailyForecast(item.day, item.minTemp, item.maxTemp, item.wmo, clonev2);
        clonev3.id = `${index}-clone`;
        forecastsEelment.append(clonev3);
    })


    //updating hourly services



}

function dateToDay( dt ){
    const customDate = new Date(dt);
    const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const weekDayName = weekDays[customDate.getDay()];
    return weekDayName;
}

async function getSrcImg( wmoCode ){
    const srcImgData = await fetch('./src/data/wmo.json');
    const imgData = await srcImgData.json();
    return imgData[wmoCode].day.image;
}


async function dailyForecast(maxTempArray, minTempArray, wmoArray, dayArray){
    
    let forecastArray =[];

    for(let i = 0; i < 7; i++){
        const maxTemp = maxTempArray[i];
        const minTemp = minTempArray[i];
        const wmo = await getSrcImg(wmoArray[i]);
        const day = dateToDay(dayArray[i]);
        let forecast = {};
        forecast.minTemp = minTemp;
        forecast.maxTemp = maxTemp;
        forecast.wmo = wmo;
        forecast.day = day;
        forecastArray.push(forecast);

    }

    return forecastArray;

}

function updateDailyForecast(day, min, max, code, clone){
    const p = clone.querySelector('.day');
    p.innerText = day;

    const maxTemp = clone.querySelector('.max-temp');
    maxTemp.innerText = `${max}\u00B0`;

    const minTemp = clone.querySelector('.min-temp');
    minTemp.innerText = `${min}\u00B0`;

    const img = clone.querySelector('img');
    img.src = code;

    return clone;
}

function formatTime(){
    
}
function hourlyForecast(tempArray, timeArray, wmoArray){
    let forecastArray =[];

    for(let i =0; i < 6; i++){
        const forecast = {};
        const temp = tempArray[i];
        const wmo = getSrcImg(wmoArray[i]);
        const time = 
    }
}
const th = new Date("2025-11-23T22:00");
console.log(th.getHours());
