// Services Page JavaScript
const themeToggle = document.getElementById('themeToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

function toggleMobileNav() {
    navLinks.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

mobileMenu.addEventListener('click', toggleMobileNav);
mobileNavOverlay.addEventListener('click', toggleMobileNav);

// Load Services
function loadServices() {
    try {
        console.log('Loading services from local data...');
        const data = window.portfolioData ? window.portfolioData.services : null;

        if (!data || !Array.isArray(data)) {
            throw new Error('Services data not found or invalid');
        }

        document.getElementById('servicesGrid').innerHTML = data.map(service => `
            <div class="service-card">
                <div class="service-icon"><i class="${service.icon}"></i></div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            </div>
        `).join('');

        // GSAP Animation removed to ensure visibility
    } catch (error) {
        console.error('Error loading services:', error);
        document.getElementById('servicesGrid').innerHTML = `
            <div class="error-message">
                <p>Failed to load services.</p>
                <p class="error-details" style="font-size: 0.8em; color: gray;">${error.message}</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadServices();
});
