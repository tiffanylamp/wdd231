import { attractions } from '../data/discover.mjs';

document.addEventListener('DOMContentLoaded', () => {
    // 1. LocalStorage Day Math Analytics
    const messageElt = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('lastChamberVisit');
    const now = Date.now();

    if (!lastVisit) {
        messageElt.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const msElapsed = now - parseInt(lastVisit);
        const daysElapsed = msElapsed / (1000 * 60 * 60 * 24);

        if (daysElapsed < 1) {
            messageElt.textContent = "Back so soon! Awesome!";
        } else {
            const wholeDays = Math.floor(daysElapsed);
            if (wholeDays === 1) {
                messageElt.textContent = "You last visited 1 day ago.";
            } else {
                messageElt.textContent = `You last visited ${wholeDays} days ago.`;
            }
        }
    }
    localStorage.setItem('lastChamberVisit', now.toString());

    // 2. Build and Append Cards with Named Grid Areas
    const container = document.getElementById('discover-grid-container');
    if (container) {
        container.innerHTML = "";
        attractions.forEach(item => {
            const card = document.createElement('section');
            
            // CRITICAL FIX: Assign BOTH the generic class AND the unique named grid area class
            card.className = `discover-card ${item.id}`;
            
            // Inline fallback assignment for safety
            card.style.gridArea = item.id;

            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure class="discover-figure">
                    <img src="${item.image}" alt="Scenic view of ${item.name}" width="300" height="200" loading="lazy">
                </figure>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <button class="learn-more-btn">Learn More</button>
            `;
            container.appendChild(card);
        });
    }

    // 3. Global Shared Navigation Menu Trigger
    const menuToggle = document.querySelector('#menu-toggle');
    const navMenu = document.querySelector('#nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    // 4. Global Footer Timestamp Updates
    const yearElt = document.getElementById('current-year');
    const modElt = document.getElementById('last-modified');
    if (yearElt) yearElt.textContent = new Date().getFullYear();
    if (modElt) modElt.textContent = document.lastModified;
});