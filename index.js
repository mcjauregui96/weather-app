//Weather App - Fetching Weather Data

const weatherForm= document.querySelector('#weather-form');
const cityInput = document.querySelector('#city-input');
const card= document.querySelector('#weather-card');

// Event listener for form submission
weatherForm.addEventListener('submit', async event =>{
    event.preventDefault(); // Prevent the form from refreshing the page
   // card.textContent = ''; // Clear previous weather data
    
    const city = cityInput.value;// Get the city input value
    cityInput.value = ''; // Clear the input field after submission
    
    if (city) {
        try{
            const weatherData = await getWeatherData(city);
            displayWeather(weatherData);
        }
        catch (error) {
            console.error('Error fetching weather data:', error);
            displayError(error);
        }
    } else {
        displayError = 'Please enter a city.';
    }
});
// Function to fetch weather data from OpenWeatherMap API
async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ad1612c5986e1f8a9bef03be33d78cf4&units=imperial`;
    const response = await fetch(url);
    console.log(response);
    
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    return await response.json();

}
// Function to display weather data on the page
function displayWeather(data) {
    
    const { name : city,
        main: {temp, humidity},
        weather: [{description, id}]} = data;

    card.textContent= ''; // Clear previous weather data
    card.style.display = 'flex';

// Create elements to display weather data
    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descriptionDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');

// Set the content of the elements
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${Math.round(temp)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descriptionDisplay.textContent= description;
    weatherEmoji.textContent = getweatherEmoji(id);

// Add classes for styling
    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('temperature');
    humidityDisplay.classList.add('humidity');
    descriptionDisplay.classList.add('description');
    weatherEmoji.classList.add('weatherEmoji');

// Append elements to the card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descriptionDisplay);
    card.appendChild(weatherEmoji);

}

// Function to get weather emoji based on weather ID
function getweatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return '🌩️'; // Thunderstorm
        case (weatherId >= 300 && weatherId < 400):
            return '🌧️'; // Drizzle
        case (weatherId >= 500 && weatherId < 600):
            return '🌧️'; // Rain
        case (weatherId >= 600 && weatherId < 700):
            return '❄️'; // Snow
        case (weatherId >= 700 && weatherId < 800):
            return '🌫️'; // fog
        case (weatherId === 800):
            return '☀️'; // Clear
        case (weatherId >= 801 && weatherId < 810):
            return '☁️'; // Clouds
        default:
            return '❓'; // Unknown
    }

}
// Function to display error messages
function displayError(message){
    const errorDisplay= document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');

    card.textContent = '';
    card.style.display= 'flex';
    card.appendChild(errorDisplay);
}

