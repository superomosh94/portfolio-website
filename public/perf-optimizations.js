/* Performance Optimization: Loading images efficiently */

// Implement Intersection Observer for better lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Load high-res version if available
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                
                // Remove placeholder class
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Defer non-critical JavaScript execution
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnimations);
} else {
    setTimeout(initializeAnimations, 0);
}

function initializeAnimations() {
    // Only run GSAP animations if the library is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not yet loaded, retrying...');
        setTimeout(initializeAnimations, 100);
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate hero content with reduced complexity for better performance
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
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        './resource/hero-background.webp',
        './resource/workspace.webp'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Run preloading as soon as possible
if (document.head) {
    preloadCriticalResources();
} else {
    document.addEventListener('DOMContentLoaded', preloadCriticalResources);
}

// Cache network requests for better offline performance
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            // Service worker registration failed, continue without it
        });
    });
}

console.log('Performance optimizations loaded');
