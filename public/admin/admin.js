// Admin Panel JavaScript

// Default admin password (change this to something secure!)
const ADMIN_PASSWORD = 'admin123'; // Change this in production!

class AdminPanel {
    constructor() {
        this.isAuthenticated = false;
        this.editingId = null;
        this.editingType = null;
        this.init();
    }

    init() {
        this.setupAuthenticationModal();
        this.setupTabNavigation();
        this.setupFormListeners();
        this.checkAuthentication();
    }

    checkAuthentication() {
        const token = sessionStorage.getItem('adminToken');
        if (token === 'authenticated') {
            this.isAuthenticated = true;
            this.showAdminPanel();
            this.loadAllData();
        } else {
            this.isAuthenticated = false;
            this.showAuthModal();
        }
    }

    setupAuthenticationModal() {
        const authForm = document.getElementById('authForm');
        const authModal = document.getElementById('authModal');
        const authError = document.getElementById('authError');

        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('adminPassword').value;

            if (password === ADMIN_PASSWORD) {
                sessionStorage.setItem('adminToken', 'authenticated');
                this.isAuthenticated = true;
                authError.textContent = '';
                this.showAdminPanel();
                this.loadAllData();
                authForm.reset();
            } else {
                authError.textContent = 'Invalid password. Please try again.';
                authError.style.display = 'block';
            }
        });

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                sessionStorage.removeItem('adminToken');
                this.isAuthenticated = false;
                this.showAuthModal();
                document.getElementById('adminPanel').style.display = 'none';
            });
        }
    }

    showAuthModal() {
        document.getElementById('authModal').classList.remove('hidden');
        document.getElementById('adminPanel').style.display = 'none';
    }

    showAdminPanel() {
        document.getElementById('authModal').classList.add('hidden');
        document.getElementById('adminPanel').style.display = 'block';
    }

    setupTabNavigation() {
        const tabBtns = document.querySelectorAll('.admin-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;
                this.switchTab(tabName);
            });
        });
    }

    switchTab(tabName) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.admin-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.admin-tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Add active class to selected tab and content
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}Tab`).classList.add('active');
    }

    setupFormListeners() {
        // About Form
        const aboutForm = document.getElementById('aboutForm');
        if (aboutForm) {
            aboutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateAbout(aboutForm);
            });
        }

        // Project Form
        const projectForm = document.getElementById('projectForm');
        if (projectForm) {
            projectForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addOrUpdateProject(projectForm);
            });
        }

        // Service Form
        const serviceForm = document.getElementById('serviceForm');
        if (serviceForm) {
            serviceForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addOrUpdateService(serviceForm);
            });
        }

        // Skill Form
        const skillForm = document.getElementById('skillForm');
        if (skillForm) {
            skillForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addOrUpdateSkill(skillForm);
            });
        }
    }

    loadAllData() {
        this.loadAboutData();
        this.loadProjectsData();
        this.loadServicesData();
        this.loadSkillsData();
    }

    loadAboutData() {
        const about = window.portfolioData.about;
        document.getElementById('name').value = about.name || '';
        document.getElementById('role').value = about.role || '';
        document.getElementById('profileImage').value = about.profileImage || '';
        document.getElementById('heroDescription').value = about.heroDescription || '';
        document.getElementById('bio').value = about.bio || '';
        document.getElementById('email').value = about.email || '';
        document.getElementById('location').value = about.location || '';
    }

    updateAbout(form) {
        const formData = new FormData(form);
        window.portfolioData.about = {
            name: formData.get('name'),
            role: formData.get('role'),
            profileImage: formData.get('profileImage'),
            heroDescription: formData.get('heroDescription'),
            bio: formData.get('bio'),
            email: formData.get('email'),
            location: formData.get('location')
        };

        this.saveData();
        this.showMessage('Profile updated successfully!', 'success');
        form.reset();
        this.loadAboutData();
    }

    loadProjectsData() {
        const projectsList = document.getElementById('projectsList');
        projectsList.innerHTML = '';

        window.portfolioData.projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <div class="item-info">
                    <h4>${project.title}</h4>
                    <p>${project.description.substring(0, 100)}...</p>
                    <p style="margin-top: 5px;"><small>Category: ${project.category} | Tech: ${project.tech.join(', ')}</small></p>
                </div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="admin.editProject(${index})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete" onclick="admin.deleteProject(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            projectsList.appendChild(card);
        });
    }

    addOrUpdateProject(form) {
        const formData = new FormData(form);
        const techArray = formData.get('tech').split(',').map(t => t.trim());

        const project = {
            id: this.editingId || window.portfolioData.projects.length + 1,
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            image: formData.get('image'),
            tech: techArray,
            github: formData.get('github'),
            demo: formData.get('demo')
        };

        if (this.editingId !== null) {
            const index = window.portfolioData.projects.findIndex(p => p.id === this.editingId);
            window.portfolioData.projects[index] = project;
            this.showMessage('Project updated successfully!', 'success');
            this.editingId = null;
        } else {
            window.portfolioData.projects.push(project);
            this.showMessage('Project added successfully!', 'success');
        }

        this.saveData();
        form.reset();
        this.loadProjectsData();
    }

    editProject(index) {
        const project = window.portfolioData.projects[index];
        this.editingId = project.id;

        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectCategory').value = project.category;
        document.getElementById('projectImage').value = project.image;
        document.getElementById('projectGithub').value = project.github || '';
        document.getElementById('projectDemo').value = project.demo || '';
        document.getElementById('projectTech').value = project.tech.join(', ');

        document.querySelector('#projectForm button[type="submit"]').innerHTML = '<i class="fas fa-save"></i> Update Project';
        this.switchTab('projects');
        document.getElementById('projectTitle').focus();
    }

    deleteProject(index) {
        if (confirm('Are you sure you want to delete this project?')) {
            window.portfolioData.projects.splice(index, 1);
            this.saveData();
            this.showMessage('Project deleted successfully!', 'success');
            this.loadProjectsData();
        }
    }

    loadServicesData() {
        const servicesList = document.getElementById('servicesList');
        servicesList.innerHTML = '';

        window.portfolioData.services.forEach((service, index) => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <div class="item-info">
                    <h4><i class="${service.icon}"></i> ${service.title}</h4>
                    <p>${service.description.substring(0, 100)}...</p>
                </div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="admin.editService(${index})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete" onclick="admin.deleteService(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            servicesList.appendChild(card);
        });
    }

    addOrUpdateService(form) {
        const formData = new FormData(form);

        const service = {
            icon: formData.get('icon'),
            title: formData.get('title'),
            description: formData.get('description')
        };

        if (this.editingId !== null) {
            const index = window.portfolioData.services.findIndex((s, i) => i === this.editingId);
            window.portfolioData.services[index] = service;
            this.showMessage('Service updated successfully!', 'success');
            this.editingId = null;
        } else {
            window.portfolioData.services.push(service);
            this.showMessage('Service added successfully!', 'success');
        }

        this.saveData();
        form.reset();
        this.loadServicesData();
        document.querySelector('#serviceForm button[type="submit"]').innerHTML = '<i class="fas fa-plus"></i> Add Service';
    }

    editService(index) {
        const service = window.portfolioData.services[index];
        this.editingId = index;

        document.getElementById('serviceTitle').value = service.title;
        document.getElementById('serviceDescription').value = service.description;
        document.getElementById('serviceIcon').value = service.icon;

        document.querySelector('#serviceForm button[type="submit"]').innerHTML = '<i class="fas fa-save"></i> Update Service';
        this.switchTab('services');
        document.getElementById('serviceTitle').focus();
    }

    deleteService(index) {
        if (confirm('Are you sure you want to delete this service?')) {
            window.portfolioData.services.splice(index, 1);
            this.saveData();
            this.showMessage('Service deleted successfully!', 'success');
            this.loadServicesData();
        }
    }

    loadSkillsData() {
        const skillsList = document.getElementById('skillsList');
        skillsList.innerHTML = '';

        window.portfolioData.skillsDetailed.forEach((skill, index) => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <div class="item-info">
                    <h4><i class="${skill.icon}"></i> ${skill.title}</h4>
                    <p>${skill.description}</p>
                </div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="admin.editSkill(${index})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete" onclick="admin.deleteSkill(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            skillsList.appendChild(card);
        });
    }

    addOrUpdateSkill(form) {
        const formData = new FormData(form);

        const skill = {
            icon: formData.get('icon'),
            title: formData.get('title'),
            description: formData.get('description')
        };

        if (this.editingId !== null) {
            const index = window.portfolioData.skillsDetailed.findIndex((s, i) => i === this.editingId);
            window.portfolioData.skillsDetailed[index] = skill;
            this.showMessage('Skill updated successfully!', 'success');
            this.editingId = null;
        } else {
            window.portfolioData.skillsDetailed.push(skill);
            this.showMessage('Skill added successfully!', 'success');
        }

        this.saveData();
        form.reset();
        this.loadSkillsData();
        document.querySelector('#skillForm button[type="submit"]').innerHTML = '<i class="fas fa-plus"></i> Add Skill';
    }

    editSkill(index) {
        const skill = window.portfolioData.skillsDetailed[index];
        this.editingId = index;

        document.getElementById('skillTitle').value = skill.title;
        document.getElementById('skillDescription').value = skill.description;
        document.getElementById('skillIcon').value = skill.icon;

        document.querySelector('#skillForm button[type="submit"]').innerHTML = '<i class="fas fa-save"></i> Update Skill';
        this.switchTab('skills');
        document.getElementById('skillTitle').focus();
    }

    deleteSkill(index) {
        if (confirm('Are you sure you want to delete this skill?')) {
            window.portfolioData.skillsDetailed.splice(index, 1);
            this.saveData();
            this.showMessage('Skill deleted successfully!', 'success');
            this.loadSkillsData();
        }
    }

    saveData() {
        localStorage.setItem('portfolioData', JSON.stringify(window.portfolioData));
    }

    showMessage(message, type = 'info') {
        let messageEl;
        if (type === 'success') {
            messageEl = document.getElementById('successMessage');
        } else if (type === 'error') {
            messageEl = document.getElementById('errorMessage');
        } else {
            messageEl = document.getElementById('successMessage');
        }

        messageEl.textContent = message;
        messageEl.classList.add('show', type);
        messageEl.classList.remove(type === 'success' ? 'error' : 'success');

        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 5000);
    }
}

// Initialize admin panel
let admin;
document.addEventListener('DOMContentLoaded', () => {
    admin = new AdminPanel();
});
