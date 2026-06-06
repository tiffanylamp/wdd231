/**
 * WDD231 - Chamber Join Page Script
 * Author: Tiffany Lalampaa
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Form Hidden Timestamp on load
    const timestampField = document.getElementById('form-timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. Navigation Toggle & Footer Injections (Copied from directory.js)
    const menuToggle = document.querySelector('#menu-toggle');
    const navMenu = document.querySelector('#nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    // 3. Modal Opening and Closing Operations
    const infoButtons = document.querySelectorAll('.info-btn');
    const closeButtons = document.querySelectorAll('.close-modal');

    infoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.showModal(); // Opens as accessible backdrop container overlay
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const openModal = e.target.closest('dialog');
            if (openModal) {
                openModal.close();
            }
        });
    });
});