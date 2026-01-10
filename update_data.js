const fs = require('fs');
const data = `// Info: Generated Static Data
window.portfolioData = {
    "projects": [

        

        {
            "id": 4,
            "title": "Fin-Mate",
            "category": "fullstack",
            "description": "Finance management system for tracking assets.",
            "image": "https://via.placeholder.com/400x300?text=FinMate",
            "tech": ["Node.js", "Express", "MySQL"],
            "github": "https://github.com/superomosh94/FinMateV2",
            "demo": "https://fin-mate-three.vercel.app"
        },
        {
            "id": 5,
            "title": "EduLMS",
            "category": "fullstack",
            "description": "Learning Management System for education tracking.",
            "image": "https://via.placeholder.com/400x300?text=EduLMS",
            "tech": ["Node.js", "Express", "MySQL"],
            "github": "https://github.com/superomosh94/EduLMS",
            "demo": "https://edulms-iota.vercel.app"
        },
        {
            "id": 6,
            "title": "CRUD Dashboard",
            "category": "fullstack",
            "description": "Admin dashboard with CRUD operations.",
            "image": "https://via.placeholder.com/400x300?text=CRUD+Dashboard",
            "tech": ["React", "Node.js"],
            "github": "https://github.com/superomosh94/crud-dashboard",
            "demo": "https://crud-dashboard-nine.vercel.app"
        },
        {
            "id": 7,
            "title": "Logins System",
            "category": "backend",
            "description": "Secure authentication and login system.",
            "image": "https://via.placeholder.com/400x300?text=Login+System",
            "tech": ["Node.js", "Express"],
            "github": "https://github.com/superomosh94/login-system",
            "demo": "https://logins-system.vercel.app"
        },
        {
            "id": 8,
            "title": "NRB Tech Solutions",
            "category": "web",
            "description": "Business landing page for tech solutions.",
            "image": "https://via.placeholder.com/400x300?text=NRB+Tech",
            "tech": ["HTML", "CSS", "JavaScript"],
            "github": "https://github.com/superomosh94/project1-business-landing",
            "demo": "https://nrbitechsolutions.vercel.app"
        },
        {
            "id": 10,
            "title": "KE Devoxxa",
            "category": "web",
            "description": "Event platform for technical conferences.",
            "image": "https://via.placeholder.com/400x300?text=KE+Devoxxa",
            "tech": ["HTML", "CSS"],
            "github": "https://github.com/superomosh94/keDevoxxa",
            "demo": "https://ke-devoxxa.vercel.app"
        },
        {
            "id": 11,
            "title": "Voxa Dev HQ",
            "category": "web",
            "description": "Developer headquarters and resource portal.",
            "image": "https://via.placeholder.com/400x300?text=Voxa+Dev",
            "tech": ["HTML", "CSS"],
            "github": "https://github.com/superomosh94/VoxaDevHQ",
            "demo": "https://voxa-dev-hq.vercel.app"
        },
        {
            "id": 12,
            "title": "Martin Coffee Paystack",
            "category": "fullstack",
            "description": "Coffee shop with Paystack payment integration.",
            "image": "https://via.placeholder.com/400x300?text=Coffee+Paystack",
            "tech": ["Node.js", "Paystack API"],
            "github": "https://github.com/superomosh94/martin-coffee-paystack",
            "demo": "https://martin-coffee-paystack.vercel.app"
        },
        {
            "id": 13,
            "title": "Lilbee Logics",
            "category": "frontend",
            "description": "A second version or separate platform for logic puzzles.",
            "image": "https://via.placeholder.com/400x300?text=Lilbee+Logics",
            "tech": ["HTML", "CSS", "JS"],
            "github": "https://github.com/superomosh94/LILBEE-LOGICS",
            "demo": "https://lilbee-logics.vercel.app"
        },
        {
            "id": 14,
            "title": "Devvoxa",
            "category": "web",
            "description": "Professional web development brand site.",
            "image": "https://via.placeholder.com/400x300?text=Devvoxa",
            "tech": ["HTML", "CSS"],
            "github": "https://github.com/superomosh94/Devvoxa",
            "demo": "https://devvoxa.vercel.app"
        },
        {
            "id": 15,
            "title": "Pamadoro Timer",
            "category": "frontend",
            "description": "Time management tool using Pomodoro technique.",
            "image": "https://via.placeholder.com/400x300?text=Pomodoro",
            "tech": ["HTML", "CSS", "JS"],
            "github": "https://github.com/superomosh94/Pamadoro-timer",
            "demo": "https://pamadoro-timer.vercel.app"
        },
        {
            "id": 16,
            "title": "Data",
            "category": "web",
            "description": "Data bundles and minutes showcase platform.",
            "image": "https://via.placeholder.com/400x300?text=Data+Site",
            "tech": ["HTML", "CSS"],
            "github": "https://github.com/superomosh94/Data",
            "demo": "https://data-green-nine.vercel.app"
        },

        {
            "id": 18,
            "title": "Ticket Selling App",
            "category": "fullstack",
            "description": "Event ticket purchase and management tool.",
            "image": "https://via.placeholder.com/400x300?text=Tickets",
            "tech": ["Node.js", "Express"],
            "github": "https://github.com/superomosh94/ticket-selling-app",
            "demo": "https://ticket-selling-app-gamma.vercel.app"
        },
        {
            "id": 19,
            "title": "Agriweal",
            "category": "web",
            "description": "Agricultural solutions and information hub.",
            "image": "https://via.placeholder.com/400x300?text=Agriweal",
            "tech": ["HTML", "CSS"],
            "github": "https://github.com/superomosh94/Agriweal",
            "demo": "https://agriweal.vercel.app"
        },
        {
            "id": 20,
            "title": "Ecommerce Product Page",
            "category": "frontend",
            "description": "Detailed product page for e-commerce sites.",
            "image": "https://via.placeholder.com/400x300?text=Product+Page",
            "tech": ["HTML", "CSS", "JS"],
            "github": "https://github.com/superomosh94/ecommerce-product-page-main",
            "demo": "https://ecommerce-product-page-main-rouge-ten.vercel.app"
        },
       
        {
            "id": 22,
            "title": "Spotify Clone",
            "category": "frontend",
            "description": "Clone of the popular music streaming service.",
            "image": "https://via.placeholder.com/400x300?text=Spotify",
            "tech": ["React"],
            "github": "https://github.com/superomosh94/spotify-clone",
            "demo": "https://spotify-clone-mu-ten.vercel.app"
        },
   

    ],
    "services": [
        {
            "icon": "fas fa-code",
            "title": "Full-Stack Web Development",
            "description": "End-to-end web application development using modern technologies."
        },
        {
            "icon": "fas fa-server",
            "title": "Backend & API Architecture",
            "description": "Designing robust RESTful APIs and server-side logic."
        },
        {
            "icon": "fas fa-mobile-alt",
            "title": "Responsive UI/UX Design",
            "description": "Creating engaging, mobile-first interfaces."
        },
        {
            "icon": "fas fa-chart-line",
            "title": "Technical Consulting & SEO",
            "description": "Guidance on software architecture and performance."
        }
    ],
    "about": {
        "name": "Martin O",
        "role": "Full-Stack Developer",
        "heroDescription": "Professional web developer building scalable, secure web applications.",
        "profileImage": "./resource/profile/image.png",
        "bio": "I am a passionate full-stack developer with experience in Node.js, Express, and MySQL."
    },
    "skillsDetailed": [
        {
            "icon": "fab fa-node-js",
            "title": "Backend",
            "description": "Node.js & Express"
        },
        {
            "icon": "fas fa-database",
            "title": "Database",
            "description": "MySQL & MongoDB"
        }
    ]
};
`;
fs.writeFileSync('c:/Users/ADMIN/Documents/prooooojects/portfolio-website/public/data/data.js', data, 'utf8');
