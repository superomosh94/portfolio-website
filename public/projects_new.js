// projects_new.js - Fresh copy to bypass caching
// DEBUG: Confirm script execution
console.log('projects_new.js loaded');
const debugBanner = document.createElement('div');
debugBanner.style.cssText = 'position:fixed;top:0;left:0;width:100%;background:blue;color:white;text-align:center;z-index:9999;padding:10px;font-weight:bold;';
debugBanner.textContent = 'DEBUG: projects_new.js LOADED (BLUE BANNER)';
document.body.prepend(debugBanner);

const themeToggle = document.getElementById('themeToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

function toggleMobileNav() {
    if (navLinks) navLinks.classList.toggle('active');
    if (mobileNavOverlay) mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks && navLinks.classList.contains('active') ? 'hidden' : '';
}

if (mobileMenu) mobileMenu.addEventListener('click', toggleMobileNav);
if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', toggleMobileNav);

// Load Projects
function loadProjects() {
    console.log('loadProjects called');
    const dbgElem = document.getElementById('projectsGrid');
    if (dbgElem) {
        dbgElem.innerHTML = '<p>Loading projects from internal data...</p>';
        debugBanner.textContent += ' | Grid Found';
    } else {
        debugBanner.textContent += ' | Grid NOT Found';
    }

    try {
        console.log('Window data:', window.portfolioData);
        const data = window.portfolioData ? window.portfolioData.projects : null;

        if (!data || !Array.isArray(data)) {
            if (dbgElem) dbgElem.textContent = 'Error: Data not found in portfolioData';
            throw new Error('Projects data not found or invalid');
        }

        if (dbgElem) {
            dbgElem.innerHTML = data.map(project => `
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
            debugBanner.textContent += ' | Rendered ' + data.length + ' items';
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        debugBanner.textContent += ' | ERROR: ' + error.message;
        if (dbgElem) {
            dbgElem.innerHTML = `
                <div class="error-message">
                    <p>Failed to load projects.</p>
                    <p class="error-details" style="font-size: 0.8em; color: gray;">${error.message}</p>
                </div>
            `;
        }
    }
}

// Filter Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(project => {
            if (filter === 'all' || project.dataset.category === filter) {
                project.style.display = 'block';
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
