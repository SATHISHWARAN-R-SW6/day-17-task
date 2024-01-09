document.addEventListener('DOMContentLoaded', function () {
    const cardContainer = document.getElementById('cardContainer');

    // Function to create Bootstrap card element
    function createCard(countryData) {
        const card = document.createElement('div');
        card.classList.add('card', 'col-lg-4', 'col-sm-12');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        cardHeader.innerText = countryData.name;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Populate card body with country information
        const cardContent = `
        <p><strong>Capital:</strong> ${countryData.capital}</p>
        <p><strong>Region:</strong> ${countryData.region}</p>
        <p><strong>Country Code:</strong> ${countryData.alpha2Code}</p>
        <button class="btn btn-primary" onclick="getWeather('${countryData.capital}', '${countryData.alpha2Code}')">Click for Weather</button>
      `;

        cardBody.innerHTML = cardContent;

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        return card;
    }

    // Function to fetch rest countries data and create cards
    function fetchCountries() {
        fetch('https://restcountries.com/v2/all')
            .then(response => response.json())
            .then(data => {
                data.forEach(country => {
                    const card = createCard(country);
                    cardContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error fetching countries:', error));
    }

    // Function to fetch weather data from OpenWeatherMap API
    function getWeather(capital, countryCode) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital},${countryCode}&appid=YOUR_OPENWEATHERMAP_API_KEY`)
            .then(response => response.json())
            .then(weatherData => {
                alert(`Weather in ${capital}, ${countryCode}:\n${JSON.stringify(weatherData.weather[0].description)}`);
            })
            .catch(error => console.error('Error fetching weather:', error));
    }

    // Call the function to fetch countries when the DOM is loaded
    fetchCountries();
});
