const currentUrl = new URL(window.location.href);
const formData = currentUrl.searchParams;

const displayContainer = document.getElementById('formSummary');

if (displayContainer && formData.toString() !== "") {
    displayContainer.innerHTML = `
        <p><strong>Name:</strong> ${formData.get('firstName')} ${formData.get('lastName')}</p>
        <p><strong>Email:</strong> ${formData.get('email')}</p>
        <p><strong>Membership Tier:</strong> ${formData.get('membershipLevel')}</p>
    `;
}