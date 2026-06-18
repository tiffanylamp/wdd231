/**Automatically loops through and displays any incoming form variables */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Target the element where data should be displayed
    const displayContainer = document.getElementById('formSummary');
    
    // 2. Extract parameters from the active browser address string
    const currentUrl = new URL(window.location.href);
    const formData = currentUrl.searchParams;

    // 3. Safety check: Only run if the element exists and there is actual data
    if (displayContainer && formData.toString() !== "") {
        let displayBuffer = "";
        
        // 4. Automatically loop through every single form entry field submitted
        formData.forEach((value, key) => {
            // Converts input names like "membershipLevel" or "applicantEmail" 
            // into clean, beautifully spaced titles like "Membership Level"
            let formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
            formattedKey = formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
            
            // Build the layout string using clean template literals
            displayBuffer += `
                <div class="param-row">
                    <strong class="param-key">${formattedKey}:</strong>
                    <span class="param-value">${decodeURIComponent(value.replace(/\+/g, ' '))}</span>
                </div>
            `;
        });

        // 5. Inject the completed layout buffer directly into your page container
        displayContainer.innerHTML = displayBuffer;
    } else if (displayContainer) {
        displayContainer.innerHTML = "<p class='error-text'>No application submission parameters detected.</p>";
    }
});