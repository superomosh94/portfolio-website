// Home Page JavaScript (Simplified)
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

// Initialize GSAP animations for hero
gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero-content > *', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    stagger: 0.15,
    ease: "power2.out",
    delay: 0.2
});

gsap.from('.hero-image', {
    duration: 1,
    scale: 0.8,
    opacity: 0,
    ease: "back.out(1.4)",
    delay: 0.4
});

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});
