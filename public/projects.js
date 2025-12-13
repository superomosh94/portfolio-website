// Projects Page JavaScript
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
        if (window.innerWidth <= 768) toggleMobileNav();
    });
});

// DEBUG: Confirm script execution
console.log('projects.js loaded');
const debugBanner = document.createElement('div');
debugBanner.style.cssText = 'position:fixed;top:0;left:0;width:100%;background:red;color:white;text-align:center;z-index:9999;padding:10px;font-weight:bold;';
debugBanner.textContent = 'DEBUG: projects.js LOADED and RUNNING';
document.body.prepend(debugBanner);

// Load Projects
function loadProjects() {
    console.log('loadProjects called');
    const dbgElem = document.getElementById('projectsGrid');
    if (dbgElem) {
        dbgElem.innerHTML = '<p>Loading...</p>';
        debugBanner.textContent += ' | Found Grid';
    } else {
        debugBanner.textContent += ' | Grid NOT Found';
    }

    try {
        console.log('Loading projects from local data...');
        const data = window.portfolioData ? window.portfolioData.projects : null;
        console.log('Projects data:', data);

        if (!data || !Array.isArray(data)) {
            throw new Error('Projects data not found or invalid');
        }

        document.getElementById('projectsGrid').innerHTML = data.map(project => `
            <div class="project-card" data-category="${project.category}">
                <div class="project-img">
                    <img src="${project.image}" alt="${project.title} - ${project.description}" onerror="this.src='https://via.placeholder.com/400x300?text=Project+Image'">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.github ? `<a href="${project.github}" class="btn btn-secondary" target="_blank"><i class="fab fa-github"></i> Code</a>` : ''}
                        ${project.demo ? `<a href="${project.demo}" class="btn" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        // GSAP Animation
        // GSAP Animation removed to ensure visibility
        // Content will render immediately
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projectsGrid').innerHTML = `
            <div class="error-message">
                <p>Failed to load projects.</p>
                <p class="error-details" style="font-size: 0.8em; color: gray;">${error.message}</p>
            </div>
        `;
    }
}

// Project Filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(project => {
            if (filter === 'all' || project.dataset.category === filter) {
                project.style.display = 'block';
                gsap.from(project, { opacity: 0, y: 20, duration: 0.4 });
            } else {
                project.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadProjects();
});
