const apiKey = "cb31366bb886a3e1075796c3e89344a5"; // Replace with your own API key

// DOM Elements
const cityInput = document.getElementById('city');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherInfo = document.getElementById('weatherInfo');

// Event Listener for Button Click
getWeatherBtn.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        weatherInfo.innerHTML = "Please enter a valid city name.";
    }
});

// Fetch Weather Data from OpenWeatherMap API
function fetchWeather(city) {
    // Encode the city name to handle spaces and special characters
    const encodedCity = encodeURIComponent(city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=metric`;

    console.log(`Fetching weather for: ${city}`);
    console.log(`API URL: ${url}`);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response Data:", data); // Log the API response data

            // Check if the city exists in the response
            if (data.cod === 200) {
                const { name, weather, main } = data;
                displayWeather(name, weather[0].description, main.temp);
            } else {
                weatherInfo.innerHTML = "City not found. Please try another city.";
            }
        })
        .catch(error => {
            weatherInfo.innerHTML = `Error: ${error.message}`;
        });
}

// Display Weather Information
function displayWeather(city, description, temperature) {
    weatherInfo.innerHTML = `
        <h3>Weather in ${city}</h3>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
    `;
}
