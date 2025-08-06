// ===== GLOBAL VARIABLES =====
let particlesCanvas, particlesCtx;
let particles = [];
let mouseX = 0, mouseY = 0;
let isScrolling = false;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeNavigation();
    initializeSkillsAnimation();
    initializeStatsCounter();
    initializeBackToTop();
    initializeSmoothScrolling();
    
    // Add loading class removal
    setTimeout(() => {
        document.body.classList.add('loading');
    }, 100);
});

// ===== PARTICLE SYSTEM =====
function initializeParticles() {
    particlesCanvas = document.getElementById('particles-canvas');
    if (!particlesCanvas) return;
    
    particlesCtx = particlesCanvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    createParticles();
    
    // Mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Start animation
    animateParticles();
}

function resizeCanvas() {
    if (!particlesCanvas) return;
    
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    const numberOfParticles = Math.min(50, Math.floor(window.innerWidth / 20));
    
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            hue: Math.random() * 60 + 330 // Red to pink range
        });
    }
}

function animateParticles() {
    if (!particlesCtx || !particlesCanvas) return;
    
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.x += dx * force * 0.01;
            particle.y += dy * force * 0.01;
        }
        
        // Boundary check
        if (particle.x < 0 || particle.x > particlesCanvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > particlesCanvas.height) particle.speedY *= -1;
        
        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(particlesCanvas.width, particle.x));
        particle.y = Math.max(0, Math.min(particlesCanvas.height, particle.y));
        
        // Draw particle
        particlesCtx.save();
        particlesCtx.globalAlpha = particle.opacity;
        particlesCtx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;
        particlesCtx.beginPath();
        particlesCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        particlesCtx.fill();
        particlesCtx.restore();
        
        // Connect nearby particles
        for (let j = index + 1; j < particles.length; j++) {
            const other = particles[j];
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particlesCtx.save();
                particlesCtx.globalAlpha = (100 - distance) / 100 * 0.2;
                particlesCtx.strokeStyle = `hsl(${particle.hue}, 70%, 60%)`;
                particlesCtx.lineWidth = 1;
                particlesCtx.beginPath();
                particlesCtx.moveTo(particle.x, particle.y);
                particlesCtx.lineTo(other.x, other.y);
                particlesCtx.stroke();
                particlesCtx.restore();
            }
        }
    });
    
    requestAnimationFrame(animateParticles);
}

// ===== TYPING EFFECT =====
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const texts = [
        'Aspiring Web Developer',
        'React Enthusiast', 
        'Node.js Explorer',
        'Problem Solver',
        'Coffee Lover ☕'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing after a delay
    setTimeout(typeText, 1000);
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Add animation class to elements
    const animateElements = document.querySelectorAll('.about-card, .skill-category, .project-card, .contact-item, .social-link');
    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Scroll effect on navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// ===== SKILLS ANIMATION =====
function initializeSkillsAnimation() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 300);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skill-item').forEach(item => {
        skillObserver.observe(item);
    });
}

// ===== STATS COUNTER =====
function initializeStatsCounter() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const stepTime = Math.abs(Math.floor(duration / target));
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += Math.ceil(target / 50);
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        
                        counter.textContent = current;
                        
                        // Add special formatting for certain stats
                        if (target === 24) {
                            counter.textContent = current + '/7';
                        } else if (target === 100) {
                            counter.textContent = current + '+';
                        }
                    }, stepTime);
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PROJECT INTERACTIONS =====
function initializeProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
}

// ===== CONTACT FORM INTERACTIONS =====
function initializeContactInteractions() {
    const contactItems = document.querySelectorAll('.contact-item');
    const socialLinks = document.querySelectorAll('.social-link');
    
    // Contact items hover effect
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(5px) scale(1)';
        });
    });
    
    // Social links click tracking (for analytics)
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.querySelector('.social-text').textContent;
            console.log(`Social link clicked: ${platform}`);
            // Add analytics tracking here if needed
        });
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    isScrolling = false;
}, 100);

window.addEventListener('scroll', () => {
    isScrolling = true;
    debouncedScrollHandler();
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initializeAccessibility() {
    // Focus management for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('click', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        border-radius: 4px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Handle errors gracefully without breaking the user experience
});

// ===== ADDITIONAL ANIMATIONS =====
function initializeAdvancedAnimations() {
    // Code editor typing animation
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.5s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, 2000 + (index * 200));
    });
    
    // Floating icons animation
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        icon.style.animation = `float 6s ease-in-out infinite ${index * 1.5}s`;
    });
}

// ===== THEME MANAGEMENT =====
function initializeThemeManager() {
    // Detect system theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Listen for theme changes
    prefersDark.addEventListener('change', (e) => {
        if (e.matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });
    
    // Set initial theme
    if (prefersDark.matches) {
        document.body.classList.add('dark-theme');
    }
}

// ===== LOADING PERFORMANCE =====
function optimizeLoading() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    const criticalImages = [
        'images/portfolio/resume-kajian.jpg',
        'images/portfolio/portfolio-02.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// ===== INITIALIZE ALL FEATURES =====
document.addEventListener('DOMContentLoaded', () => {
    initializeProjectInteractions();
    initializeContactInteractions();
    initializeAccessibility();
    initializeAdvancedAnimations();
    initializeThemeManager();
    optimizeLoading();
});

// ===== WINDOW LOAD OPTIMIZATIONS =====
window.addEventListener('load', () => {
    // Remove loading states
    document.body.classList.add('loaded');
    
    // Initialize performance-intensive features after load
    setTimeout(() => {
        initializeAdvancedAnimations();
    }, 500);
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', debounce(() => {
    resizeCanvas();
    createParticles();
}, 250));

// ===== EXPORT FOR POTENTIAL MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeParticles,
        initializeTypingEffect,
        initializeScrollAnimations,
        initializeNavigation,
        initializeSkillsAnimation,
        initializeStatsCounter,
        initializeBackToTop,
        initializeSmoothScrolling
    };
}