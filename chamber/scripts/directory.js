// 1. Fetch JSON Member Data
const url = 'data/members.json';
const container = document.querySelector('#directory-container');

async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error("Data fetch error:", response.statusText);
        }
    } catch (error) {
        console.error("Network Fetch Exception:", error);
    }
}

function displayMembers(members) {
    container.innerHTML = ""; // Clear existing layout placeholders
    
    members.forEach((member) => {
        let card = document.createElement('section');
        card.className = "member-card";
        
        // Map Membership Integer Tiers to Labels
        let membershipTier = "Member";
        if (member.membership === 2) membershipTier = "Silver";
        if (member.membership === 3) membershipTier = "Gold";

        card.innerHTML = `
            <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy">
            <div class="member-details">
                <h3>${member.name}</h3>
                <p class="tagline"><em>"${member.tagline}"</em></p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website.replace('https://', '')}</a></p>
                <span class="badge tier-${membershipTier.toLowerCase()}">${membershipTier} Partner</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// 2. Grid vs List Views Layout Toggles
const gridBtn = document.querySelector('#grid-view');
const listBtn = document.querySelector('#list-view');

gridBtn.addEventListener('click', () => {
    container.classList.add('grid-layout');
    container.classList.remove('list-layout');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list-layout');
    container.classList.remove('grid-layout');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

// 3. Mobile Navigation Menu Toggle 
const menuToggle = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('#nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// 4. Footer Date Injections
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Init Execution
getMembers();