const API_KEY = '4c30f26362df4d0fb27123708252004';
const weatherContainer = document.querySelector('.container');
const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('button');

// Function to show greeting message
function showGreeting() {
    const greetingHTML = `
        <div class="greeting-message">
            <p>Hello! 👋</p>
            <p>Thank you for using our weather app!</p>
            <p>Please enter a location to get started.</p>
        </div>
    `;
    
    // Remove existing greeting if any
    const existingGreeting = weatherContainer.querySelector('.greeting-message');
    if (existingGreeting) {
        existingGreeting.remove();
    }
    
    // Remove existing weather info if any
    const existingWeather = weatherContainer.querySelector('.weather-info');
    if (existingWeather) {
        existingWeather.remove();
    }
    
    // Insert greeting after the search elements
    const searchElements = weatherContainer.querySelector('input, button');
    searchElements.insertAdjacentHTML('afterend', greetingHTML);
}

// Function to fetch weather data
async function getWeatherData(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`);
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}

// Function to display weather data
function displayWeather(data) {
    const weatherHTML = `
        <div class="weather-info">
            <h2>${data.location.name}, ${data.location.country}</h2>
            <div class="temperature">${data.current.temp_c}°C</div>
            <div class="weather-description">
                <img src="${data.current.condition.icon}" alt="weather icon">
                ${data.current.condition.text}
            </div>
            <div class="details">
                <div>Humidity: ${data.current.humidity}%</div>
                <div>Wind: ${data.current.wind_kph} km/h</div>
                <div>Feels like: ${data.current.feelslike_c}°C</div>
            </div>
        </div>
    `;
    
    // Remove existing weather info if any
    const existingWeather = weatherContainer.querySelector('.weather-info');
    if (existingWeather) {
        existingWeather.remove();
    }
    
    // Remove greeting message if any
    const existingGreeting = weatherContainer.querySelector('.greeting-message');
    if (existingGreeting) {
        existingGreeting.remove();
    }
    
    // Insert new weather info after the search elements
    const searchElements = weatherContainer.querySelector('input, button');
    searchElements.insertAdjacentHTML('afterend', weatherHTML);
}

// Event listener for input typing
searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() === '') {
        showGreeting();
    }
});

// Event listener for search button
searchButton.addEventListener('click', async () => {
    const location = searchInput.value.trim();
    if (!location) {
        alert('Please enter a location');
        return;
    }
    
    try {
        const weatherData = await getWeatherData(location);
        displayWeather(weatherData);
    } catch (error) {
        alert(error.message);
    }
});

// Event listener for Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// Show initial greeting when page loads
showGreeting();
