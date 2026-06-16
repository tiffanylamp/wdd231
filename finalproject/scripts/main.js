/**
 * Global Architecture Main Controller Module
 * Tracks state persistence rules across application templates
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigationFramework();
    initStateTracker();
});

/**
 * Initializes hamburger expanding effects and navigation links
 */
function initNavigationFramework() {
    const trigger = document.getElementById('menuBtn');
    const targetNav = document.getElementById('navBar');

    if (trigger && targetNav) {
        trigger.addEventListener('click', () => {
            targetNav.classList.toggle('open');
            // Toggle view state for accessibility mapping
            const isOpened = targetNav.classList.contains('open');
            trigger.setAttribute('aria-expanded', isOpened ? 'true' : 'false');
        });
    }
}

/**
 * Persists selected dashboard themes to Local Storage (Satisfies Criterion 9)
 */
function initStateTracker() {
    const panels = document.querySelectorAll('.pref-btn');
    const logs = document.getElementById('statusMessage');

    if (!logs) return; // Exit if layout component target isn't present on active page

    // Read existing value matrix configuration
    const cachedPreference = localStorage.getItem('xanderSportFocus');
    if (cachedPreference) {
        applyDashboardAdjustment(cachedPreference, logs);
        highlightActiveButton(panels, cachedPreference);
    }

    panels.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetedValue = e.target.getAttribute('data-sport');
            localStorage.setItem('xanderSportFocus', targetedValue);
            applyDashboardAdjustment(targetedValue, logs);
            highlightActiveButton(panels, targetedValue);
        });
    });
}

function applyDashboardAdjustment(sport, outputBox) {
    if (sport === 'all') {
        outputBox.textContent = "Display matrix reset. View channels unified across all club paths.";
    } else {
        outputBox.textContent = `Dashboard optimized. Your tracking parameter focus is set to: ${sport.toUpperCase()}.`;
    }
}

function highlightActiveButton(buttons, activeValue) {
    buttons.forEach(btn => {
        if (btn.getAttribute('data-sport') === activeValue) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}