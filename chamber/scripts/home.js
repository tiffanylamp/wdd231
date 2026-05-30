/**
 * WDD231 - Chamber Home Page Script
 * Author: Tiffany Lalampaa
 */

// --- CONFIGURATION CONSTANTS ---
const apiKey = '6a835692eec48ead46703b666c855aa2'; 
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=-1.2921&lon=36.8219&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=-1.2921&lon=36.8219&units=metric&appid=${apiKey}`;
const membersUrl = 'data/members.json'; 

// --- DOM ELEMENTS ---
const currentWeatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('weather-forecast');
const spotlightWrapper = document.getElementById('spotlight-cards-wrapper');

// ==========================================
// 1. SHARED GLOBAL UTILITIES (Nav & Footer)
// ==========================================
const menuToggle = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('#nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });
}

const currentYearElt = document.getElementById('current-year');
const lastModifiedElt = document.getElementById('last-modified');

if (currentYearElt) currentYearElt.textContent = new Date().getFullYear();
if (lastModifiedElt) lastModifiedElt.textContent = document.lastModified;

// ==========================================
// 2. WEATHER INTEGRATION (OpenWeatherMap API)
// ==========================================

async function fetchWeatherData() {
    try {
        // Fetch Current Weather and Forecast simultaneously
        const [currentRes, forecastRes] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        if (!currentRes.ok || !forecastRes.ok) {
            throw new Error(`Weather fetch status error. Current: ${currentRes.status}, Forecast: ${forecastRes.status}`);
        }

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        // Process and display the data
        displayCurrentWeather(currentData);
        displayWeatherForecast(forecastData);
    } catch (error) {
        console.error('Weather Data Fetch Exception:', error);
        currentWeatherContainer.innerHTML = `<p class="error-msg">Failed to load current weather conditions.</p>`;
        forecastContainer.innerHTML = `<p class="error-msg">Forecast unavailable.</p>`;
    }
}

function displayCurrentWeather(data) {
    // Round temperature to a whole number
    const temp = Math.round(data.main.temp);
    
    // Capitalize the first letter of each word in the description
    const desc = data.weather[0].description.replace(/\b\w/g, char => char.toUpperCase());
    
    // Get the weather icon from OpenWeatherMap
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Inject matching your #current-weather container
    currentWeatherContainer.innerHTML = `
        <div class="weather-current-layout">
            <img src="${iconUrl}" alt="${desc}" width="75" height="75">
            <div class="weather-info">
                <p class="current-temp"><strong>${temp}°C</strong></p>
                <p class="weather-desc">${desc}</p>
            </div>
        </div>
    `;
}

function displayWeatherForecast(data) {
    // Clear out any old content
    forecastContainer.innerHTML = '<h3>3-Day Forecast</h3>';
    
    const ul = document.createElement('ul');
    ul.className = 'forecast-list';

    // OpenWeatherMap returns forecasts in 3-hour increments (8 chunks per day).
    // We will loop through the list and grab chunks at 24-hour intervals (indices 4, 12, 20) 
    // to get a consistent mid-day temperature reading for the next 3 days.
    const forecastIndices = [4, 12, 20];

    forecastIndices.forEach(index => {
        const dayData = data.list[index];
        if (dayData) {
            // Convert UNIX timestamp to a readable day name (e.g., "Monday")
            const date = new Date(dayData.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const dayTemp = Math.round(dayData.main.temp);
            const dayDesc = dayData.weather[0].description;
            const dayIcon = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;

            const li = document.createElement('li');
            li.className = 'forecast-item';
            li.innerHTML = `
                <span class="forecast-day"><strong>${dayName}</strong></span>
                <img src="${dayIcon}" alt="${dayDesc}" width="35" height="35" loading="lazy">
                <span class="forecast-temp">${dayTemp}°C</span>
            `;
            ul.appendChild(li);
        }
    });

    forecastContainer.appendChild(ul);
}

// ==========================================
// 3. RANDOM MEMBER SPOTLIGHTS (Matching your JSON data)
// ==========================================
async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error('Failed to fetch members.');
        const data = await response.json();

        // Filter: 2 = Silver, 3 = Gold
        const premiumMembers = data.filter(member => member.membership === 2 || member.membership === 3);

        // Shuffle & slice 2 or 3 random members
        const selectedSpotlights = shuffleArray(premiumMembers).slice(0, 3);

        displaySpotlights(selectedSpotlights);
    } catch (error) {
        console.error('Spotlight Error:', error);
        spotlightWrapper.innerHTML = `<p>Unable to load spotlights.</p>`;
    }
}

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function displaySpotlights(spotlights) {
    spotlightWrapper.innerHTML = "";

    spotlights.forEach(member => {
        let card = document.createElement('section');
        card.className = "member-card spotlight-card"; // Reuses your directory card styling!
        
        let membershipTier = member.membership === 2 ? "Silver" : "Gold";

        card.innerHTML = `
            <img src="${member.image}" alt="Logo of ${member.name}" width="130" height="130" loading="lazy">
            <div class="member-details">
                <h3>${member.name}</h3>
                <p class="tagline"><em>"${member.tagline}"</em></p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website.replace('https://', '')}</a></p>
                <span class="badge tier-${membershipTier.toLowerCase()}">${membershipTier} Partner</span>
            </div>
        `;
        spotlightWrapper.appendChild(card);
    });
}

// Init Execution
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();
    getSpotlights();
});