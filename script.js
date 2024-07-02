document.addEventListener('DOMContentLoaded', () => {
    fetchCountries();
});

async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        displayCountries(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

function displayCountries(countries) {
    const countryContainer = document.getElementById('country-container');
    countries.forEach(country => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-4 col-md-6 col-sm-12 mb-4';

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card h-100 text-center';
        cardDiv.style.backgroundColor = '#1c2c37';
        cardDiv.style.borderColor = 'white';

        const cardHeaderDiv = document.createElement('div');
        cardHeaderDiv.className = 'card-header text-white';
        cardHeaderDiv.style.backgroundColor = 'black';
        cardHeaderDiv.innerText = country.name.common;

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';

        const flagImg = document.createElement('img');
        flagImg.src = country.flags.svg;
        flagImg.alt = `${country.name.common} flag`;
        flagImg.className = 'card-img-top';
        flagImg.style.width = '100%';
        flagImg.style.maxHeight = '200px';
        flagImg.style.objectFit = 'cover';
        flagImg.style.marginBottom = '15px';

        const regionP = document.createElement('p');
        regionP.className = 'text-white';
        regionP.innerHTML = `<strong>Region:</strong> ${country.region}`;

        const capitalP = document.createElement('p');
        capitalP.className = 'text-white';
        capitalP.innerHTML = `<strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}`;

        const countryCodeP = document.createElement('p');
        countryCodeP.className = 'text-white';
        countryCodeP.innerHTML = `<strong>Country Code:</strong> ${country.cca2}`;

        const weatherButton = document.createElement('button');
        weatherButton.className = 'btn btn-primary';
        weatherButton.innerText = 'Click for weather';
        weatherButton.addEventListener('click', () => fetchWeather(country.capital ? country.capital[0] : '', country.latlng));

        cardBodyDiv.append(flagImg, regionP, capitalP, countryCodeP, weatherButton);
        cardDiv.append(cardHeaderDiv, cardBodyDiv);
        colDiv.appendChild(cardDiv);
        countryContainer.appendChild(colDiv);
    });
}

async function fetchWeather(capital, latlng) {
    if (!capital || latlng.length === 0) {
        alert('Weather data not available for this location.');
        return;
    }

    const apiKey = '9ffb80031b142175f1ea0efdb135543c'; // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();
        const tempCelsius = weatherData.main.temp - 273.15;
        alert(`Current weather in ${capital}: ${weatherData.weather[0].description}, Temperature: ${tempCelsius.toFixed(2)}°C`);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}