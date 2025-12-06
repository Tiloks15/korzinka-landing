// КОРЗИНКА - LANDING PAGE SCRIPTS
// Оптимизировано для всех устройств

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
    initScrollAnimations();
    initStatsCounter();
    initTouchOptimizations();
});

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (isOpen) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
                body.style.overflow = '';
            }
        });
        
        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !menuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let ticking = false;
    
    function updateNavbar() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(0, 53, 46, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '0.75rem 0';
        } else {
            navbar.style.background = 'rgba(0, 53, 46, 0.95)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1rem 0';
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
}

// Scroll Animations
function initScrollAnimations() {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .animate-item:nth-child(1) { transition-delay: 0.05s; }
        .animate-item:nth-child(2) { transition-delay: 0.1s; }
        .animate-item:nth-child(3) { transition-delay: 0.15s; }
        .animate-item:nth-child(4) { transition-delay: 0.2s; }
        .animate-item:nth-child(5) { transition-delay: 0.25s; }
        .animate-item:nth-child(6) { transition-delay: 0.3s; }
        .animate-item:nth-child(7) { transition-delay: 0.35s; }
        .animate-item:nth-child(8) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.feature-card, .product-category, .testimonial, .step');
    animateElements.forEach(el => {
        el.classList.add('animate-item');
        observer.observe(el);
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasK = text.includes('K');
    let target = parseInt(text.replace(/[^0-9]/g, ''));
    
    let current = 0;
    const increment = target / 40;
    const stepTime = 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let display = Math.floor(current);
        if (hasK) display = display + 'K';
        if (hasPlus) display = display + '+';
        
        element.textContent = display;
    }, stepTime);
}

// Touch Optimizations
function initTouchOptimizations() {
    // Detect touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // Add active state styles for touch
        const style = document.createElement('style');
        style.textContent = `
            .touch-device .btn:active,
            .touch-device .store-btn:active,
            .touch-device .feature-card:active,
            .touch-device .product-category:active {
                transform: scale(0.98);
                opacity: 0.9;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Prevent double-tap zoom on buttons
    document.querySelectorAll('.btn, .store-btn, .mobile-menu-btn').forEach(btn => {
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            btn.click();
        }, { passive: false });
    });
}

// Parallax Effect (disabled on mobile for performance)
function initParallax() {
    if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const heroDecoration = document.querySelector('.hero-bg-decoration');
                    
                    if (heroDecoration && scrolled < window.innerHeight) {
                        heroDecoration.style.transform = 'translate(' + (scrolled * 0.05) + 'px, ' + (scrolled * 0.03) + 'px)';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
}

// Initialize parallax after DOM is ready
initParallax();

// Store Buttons
document.querySelectorAll('.store-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const storeName = btn.querySelector('.store-name').textContent;
        
        if (storeName === 'App Store') {
            alert('Приложение скоро появится в App Store!');
        } else if (storeName === 'Google Play') {
            alert('Приложение скоро появится в Google Play!');
        }
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }, 250);
}, { passive: true });

// Lazy load images (if you add real images later)
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}
