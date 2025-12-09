// Structured Data / Schema.org JSON-LD
// This helps search engines understand your website better

const structuredData = {
    person: {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Martin Omondo",
        "jobTitle": "Full-Stack Web Developer",
        "url": "https://martinomondo.com",
        "image": "https://martinomondo.com/resource/workspace.png",
        "sameAs": [
            "https://github.com/superomosh94",
            "https://linkedin.com/in/martin-omondo",
            "https://twitter.com/martinomondo"
        ],
        "email": "omondo94@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "KE"
        },
        "knowsAbout": [
            "Node.js",
            "Express.js",
            "JavaScript",
            "MySQL",
            "MongoDB",
            "Full-Stack Development",
            "Web Development",
            "REST API Development",
            "Database Design",
            "Authentication Systems"
        ],
        "Description": "Full-Stack Web Developer with 5+ years of experience building secure, scalable web applications using Node.js, Express, and modern JavaScript frameworks."
    },

    website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Martin Omondo Portfolio",
        "alternateName": "Martin O - Full-Stack Developer",
        "url": "https://martinomondo.com",
        "description": "Professional portfolio showcasing web development projects and expertise in Node.js, Express, and full-stack development",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://martinomondo.com/projects.html?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    },

    professionalService: {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Martin Omondo Web Development Services",
        "image": "https://martinomondo.com/resource/workspace.png",
        "description": "Professional web development services including full-stack development, API development, database design, and technical consulting",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "KE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-1.2921",
            "longitude": "36.8219"
        },
        "url": "https://martinomondo.com",
        "telephone": "+254-XXX-XXXXXX",
        "email": "omondo94@gmail.com",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "09:00",
            "closes": "17:00"
        },
        "sameAs": [
            "https://github.com/superomosh94",
            "https://linkedin.com/in/martin-omondo"
        ]
    },

    breadcrumb: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://martinomondo.com/"
        }]
    },

    // For portfolio/creative work
    creativeWork: {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": "Martin Omondo Portfolio",
        "creator": {
            "@type": "Person",
            "name": "Martin Omondo"
        },
        "description": "Portfolio showcasing full-stack web development projects and expertise",
        "datePublished": "2023-01-01",
        "dateModified": "2025-12-09"
    }
};

// Function to inject structured data
function injectStructuredData(page) {
    const scripts = [];

    // Always add person and website
    scripts.push(createScript(structuredData.person));
    scripts.push(createScript(structuredData.website));

    // Page-specific structured data
    if (page === 'home') {
        scripts.push(createScript(structuredData.professionalService));
        scripts.push(createScript(structuredData.creativeWork));
    }

    if (page === 'services') {
        scripts.push(createScript(structuredData.professionalService));
    }

    // Add breadcrumb (update based on current page)
    const breadcrumbData = getBreadcrumb(page);
    scripts.push(createScript(breadcrumbData));

    // Inject all scripts
    scripts.forEach(script => {
        document.head.appendChild(script);
    });
}

function createScript(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    return script;
}

function getBreadcrumb(page) {
    const breadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://martinomondo.com/"
            }
        ]
    };

    const pageMap = {
        'about': { name: 'About', url: 'https://martinomondo.com/about.html' },
        'projects': { name: 'Projects', url: 'https://martinomondo.com/projects.html' },
        'services': { name: 'Services', url: 'https://martinomondo.com/services.html' },
        'contact': { name: 'Contact', url: 'https://martinomondo.com/contact.html' },
        'blog': { name: 'Blog', url: 'https://martinomondo.com/blog.html' }
    };

    if (pageMap[page]) {
        breadcrumbList.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": pageMap[page].name,
            "item": pageMap[page].url
        });
    }

    return breadcrumbList;
}

// Export for use in pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { injectStructuredData, structuredData };
}
