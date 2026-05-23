// ==========================================
// 1. DATA CONFIGURATION & INITIALIZATION
// ==========================================
const membersUrl = 'data/members.json'; 
const container = document.querySelector('#directory-container');

async function getMembers() {
    try {
        const response = await fetch(membersUrl); 
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

// ==========================================
// 2. DYNAMIC CARD GENERATION
// ==========================================
function displayMembers(members) {
    container.innerHTML = ""; 
    
    members.forEach((member) => {
        let card = document.createElement('section');
        card.className = "member-card";
        
        let membershipTier = "Member";
        if (member.membership === 2) membershipTier = "Silver";
        if (member.membership === 3) membershipTier = "Gold";

        // CRITICAL PERFORMANCE FIX: Added explicit dimensions and lazy handling updates
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
        container.appendChild(card);
    });
}

// ==========================================
// 3. LAYOUT TOGGLES (GRID VS LIST)
// ==========================================
const gridBtn = document.querySelector('#grid-view');
const listBtn = document.querySelector('#list-view');

if (gridBtn && listBtn) {
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
}

// ==========================================
// 4. MOBILE NAVIGATION TOGGLE
// ==========================================
const menuToggle = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('#nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });
}

// ==========================================
// 5. FOOTER AUTO TIMESTAMP INJECTIONS
// ==========================================
const currentYearElt = document.getElementById('current-year');
const lastModifiedElt = document.getElementById('last-modified');

if (currentYearElt) currentYearElt.textContent = new Date().getFullYear();
if (lastModifiedElt) lastModifiedElt.textContent = document.lastModified;

// Init Execution
getMembers();