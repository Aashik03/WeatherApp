const apiKey=config.apiKey;
const getWeatherBtn=document.getElementById("getWeatherBtn");//from html id
const weatherInfo=document.getElementById("weatherInfo");//from html id
const cityInput=document.getElementById("cityInput");//from html id
const getLocationWeatherBtn=document.getElementById("getLocationWeather");//from html id
const unitToggleBtn=document.createElement("button");//creates a button
const hourlyForecast = document.getElementById("hourlyForecast"); // New section for hourly data

let isMetric = true; // Track unit (true = Celsius, false = Fahrenheit)

getWeatherBtn.addEventListener("click",async()=>{

    const city=cityInput.value.trim();
    if(!city) return alert("Please enter a city name.");
    try{
        //show loading message
        weatherInfo.innerHTML="<p>Fetching weather data.......</p>";

        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data=await response.json();

        if(data.cod=="404"){
            weatherInfo.innerHTML="<p class='error'>City not found, please try again.</p>";
            return;
        }
        //get weather icons
        const iconCode=data.weather[0].icon;
        const iconUrl=`https://openweathermap.org/img/wn/${iconCode}@2x.png`

        weatherInfo.innerHTML=`
        <h2>${data.name},${data.sys.country}</h2>
        <img src="${iconUrl}" alt="weathericon">
        <p>Temperature:${data.main.temp}°C</p>
        <p>Weather:${data.weather[0].description}</p>
        `;
       }catch(error){
        weatherInfo.innerHTML="<p class='error'>Something went wrong.Please check your internet connection!</p>";
       }
});


getLocationWeatherBtn.addEventListener("click", () => {
    if ("geolocation" in navigator) {
        weatherInfo.innerHTML = "<p class='loading'>Getting your location...</p>";

        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            await fetchWeather(lat, lon);
        }, () => {
            weatherInfo.innerHTML = "<p class='error'>Location access denied. Enter a city manually.</p>";
        });
    } else {
        weatherInfo.innerHTML = "<p class='error'>Your browser does not support geolocation.</p>";
    }
});

async function fetchWeather(lat, lon) {
    try {
        weatherInfo.innerHTML = "<p class='loading'>Fetching weather data...</p>";
        const unit = isMetric ? "metric" : "imperial";
        const unitSymbol = isMetric ? "°C" : "°F";

        // Fetch current weather
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`);
        const data = await response.json();

        if (!data.name) {
            weatherInfo.innerHTML = "<p class='error'>Could not fetch weather data. Try again!</p>";
            return;
        }

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="${iconUrl}" alt="Weather Icon" class="fade-in">
            <p>Temperature: <span class="temp">${data.main.temp}${unitSymbol}</span></p>
            <p>Weather: ${data.weather[0].description}</p>
        `;

        await fetchHourlyForecast(lat, lon); // Fetch and display hourly forecast
        addUnitToggle(lat, lon);
    } catch (error) {
        weatherInfo.innerHTML = "<p class='error'>Something went wrong. Please try again!</p>";
    }
}

async function fetchHourlyForecast(lat, lon) {
    try {
        const unit = isMetric ? "metric" : "imperial";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        let hourlyHtml = `<h3>Next 5 Hours</h3><div class="hourly-container">`;

        for (let i = 0; i < 5; i++) {
            const hourData = data.list[i];
            const time = new Date(hourData.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const temp = hourData.main.temp;
            const icon = hourData.weather[0].icon;
            hourlyHtml += `
                <div class="hour fade-in">
                    <p>${time}</p>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather">
                    <p>${temp}°C</p>
                </div>
            `;
        }

        hourlyHtml += `</div>`;
        hourlyForecast.innerHTML = hourlyHtml;
    } catch (error) {
        hourlyForecast.innerHTML = "<p class='error'>Could not load hourly forecast.</p>";
    }
}

function addUnitToggle(lat, lon) {
    unitToggleBtn.textContent = isMetric ? "Switch to Fahrenheit" : "Switch to Celsius";
    unitToggleBtn.classList.add("unit-toggle", "fade-in");
    weatherInfo.appendChild(unitToggleBtn);

    unitToggleBtn.addEventListener("click", () => {
        isMetric = !isMetric;
        fetchWeather(lat, lon);
    });
}
