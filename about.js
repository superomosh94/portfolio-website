// About Page JavaScript
// Theme Management
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

// Mobile Navigation
function toggleMobileNav() {
    navLinks.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

mobileMenu.addEventListener('click', toggleMobileNav);
mobileNavOverlay.addEventListener('click', toggleMobileNav);

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMobileNav();
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMobileNav();
    }
});

// Load About Data
function loadAbout() {
    try {
        console.log('Loading about data from local data...');
        const data = window.portfolioData ? window.portfolioData.about : null;

        if (!data) throw new Error('About data not found');

        document.getElementById('aboutBio').textContent = data.bio;
        document.getElementById('aboutContent').innerHTML = data.skills.map(skill => `
            <div class="skill-item">
                <i class="${skill.icon}"></i>
                <h4>${skill.title}</h4>
                <p>${skill.description}</p>
            </div>
        `).join('');

        // GSAP Animation removed to ensure visibility
    } catch (error) {
        console.error('Error loading about data:', error);
        document.getElementById('aboutContent').innerHTML = '<p>Failed to load about information.</p>';
    }
}

function loadSkills() {
    try {
        console.log('Loading skills from local data...');
        const data = window.portfolioData ? window.portfolioData.skillsDetailed : null;

        if (!data) throw new Error('Skills data not found');

        document.getElementById('skillsContainer').innerHTML = data.map(skill => `
            <div class="skill-item">
                <i class="${skill.icon}"></i>
                <h4>${skill.title}</h4>
                <p>${skill.description}</p>
            </div>
        `).join('');

        // GSAP Animation removed to ensure visibility
    } catch (error) {
        console.error('Error loading skills:', error);
        document.getElementById('skillsContainer').innerHTML = '<p>Failed to load skills.</p>';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadAbout();
    loadSkills();
});
