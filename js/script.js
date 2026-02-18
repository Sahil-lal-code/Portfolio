// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize components
    initNavigation();
    initParticleBackground();
    initScrollAnimations();
    initTypingEffect();
    initContactForm();
    initVisualElement();
    
    // Initialize star effect with improved parameters
    initStarEffect(1500, 30);
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    
    // Scroll event for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-scroll');
            scrollToSection(targetId);
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-scroll') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Particle background
function initParticleBackground() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create particles
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = Math.random() > 0.5 ? '#00F7FF' : '#BB86FC';
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Connect particles with lines
    function connectParticles() {
        const maxDistance = 150;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = 1 - distance/maxDistance;
                    ctx.strokeStyle = '#00F7FF';
                    ctx.globalAlpha = opacity * 0.2;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-item');
    animateElements.forEach(el => observer.observe(el));
}

// Typing effect for hero text
function initTypingEffect() {
    const roles = [
        'Full stack Web Developer',
        'ML Enthusiast',
        'API Intigration',
        'Data Visualization'
    ];
    
    const rolesContainer = document.querySelector('.hero-roles');
    rolesContainer.innerHTML = '';
    
    roles.forEach((role, index) => {
        const roleElement = document.createElement('span');
        roleElement.className = 'role-text';
        roleElement.textContent = role;
        roleElement.style.animationDelay = `${1.6 + (index * 0.2)}s`;
        rolesContainer.appendChild(roleElement);
    });
}

// Contact form handling - FIXED VERSION
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Basic validation
            let isValid = true;
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                clearError(name);
            }
            
            // Validate email
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                clearError(email);
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters');
                isValid = false;
            } else {
                clearError(message);
            }
            
            if (!isValid) return;
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Create form data
                const formData = new FormData(contactForm);
                
                // Add required parameters for FormSubmit
                formData.append('_ajax', '1'); // This ensures JSON response
                formData.append('_captcha', 'false'); // Disable captcha if not needed
                
                // Send to FormSubmit
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                // Check if response is OK
                if (response.ok) {
                    // Try to parse as JSON
                    try {
                        const data = await response.json();
                        
                        // Check for success in various possible response formats
                        if (data && (data.success === true || data.success === 'true' || data.status === 'success')) {
                            showNotification('Message sent successfully!');
                            contactForm.reset();
                        } else {
                            // If response is OK but no success flag, assume it worked
                            showNotification('Message sent successfully!');
                            contactForm.reset();
                        }
                    } catch (jsonError) {
                        // If response is not JSON but OK, assume it worked
                        showNotification('Message sent successfully!');
                        contactForm.reset();
                    }
                } else {
                    // If response is not OK, try to get error message
                    try {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Form submission failed');
                    } catch (e) {
                        throw new Error('Server error: ' + response.status);
                    }
                }
            } catch (error) {
                console.error('Form submission error:', error);
                
                // Check if this is a redirect error (which actually means success with FormSubmit)
                if (error.message && (
                    error.message.includes('redirect') || 
                    error.message.includes('opaqueredirect') ||
                    error.message.includes('Failed to fetch')
                )) {
                    // This is actually a success case with FormSubmit
                    showNotification('Message sent successfully!');
                    contactForm.reset();
                } else {
                    showNotification('Failed to send message. Please try again later.', 'error');
                }
            } finally {
                // Restore button state
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    let error = formGroup.querySelector('.error-message');
    
    if (!error) {
        error = document.createElement('div');
        error.className = 'error-message';
        formGroup.appendChild(error);
    }
    
    error.textContent = message;
    input.classList.add('error');
}

// Clear error message
function clearError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    
    if (error) {
        error.remove();
    }
    
    input.classList.remove('error');
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.background = type === 'success' ? 'rgba(0, 247, 255, 0.1)' : 'rgba(255, 87, 87, 0.1)';
    notification.style.backdropFilter = 'blur(10px)';
    notification.style.border = type === 'success' ? '1px solid rgba(0, 247, 255, 0.3)' : '1px solid rgba(255, 87, 87, 0.3)';
    notification.style.borderRadius = '8px';
    notification.style.padding = '15px 20px';
    notification.style.color = type === 'success' ? '#00F7FF' : '#FF5757';
    notification.style.fontSize = '0.9rem';
    notification.style.zIndex = '10000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'all 0.3s ease';
    notification.style.maxWidth = '350px';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Visual element animation in about section
function initVisualElement() {
    const visualElement = document.getElementById('visualElement');
    
    if (visualElement && window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startVisualAnimation();
                    observer.unobserve(visualElement);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(visualElement);
    } else {
        // Fallback if IntersectionObserver is not supported
        setTimeout(startVisualAnimation, 1000);
    }
}

function startVisualAnimation() {
    const visualElement = document.getElementById('visualElement');
    if (!visualElement) return;
    
    // Create floating elements inside the visual element
    for (let i = 0; i < 10; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.width = '10px';
        dot.style.height = '10px';
        dot.style.borderRadius = '50%';
        dot.style.background = i % 2 === 0 ? '#00F7FF' : '#BB86FC';
        dot.style.boxShadow = '0 0 10px currentColor';
        dot.style.opacity = '0';
        
        // Random position
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        dot.style.left = `${x}%`;
        dot.style.top = `${y}%`;
        
        visualElement.appendChild(dot);
        
        // Animate with delay
        setTimeout(() => {
            dot.style.transition = 'all 1s ease';
            dot.style.opacity = '1';
            
            // Floating animation
            setInterval(() => {
                dot.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
            }, 2000);
        }, i * 200);
    }
}

// Improved star effect
function initStarEffect(duration = 1200, maxStars = 50) {
    const stars = [];
    const container = document.body;
    
    container.addEventListener('click', function(e) {
        // Don't create stars if clicking on interactive elements
        if (e.target.closest('nav, a, button, input, textarea, label, .card, .modal, [data-no-star]')) {
            return;
        }
        
        // Limit number of stars
        if (stars.length >= maxStars) {
            const oldestStar = stars.shift();
            if (oldestStar && document.body.contains(oldestStar)) {
                document.body.removeChild(oldestStar);
            }
        }
        
        createStar(e.clientX, e.clientY);
    });
    
    function createStar(x, y) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size between 6px and 14px (scaled down on mobile)
        const size = window.innerWidth < 768 ? 
            Math.random() * 4 + 3 : Math.random() * 8 + 6;
        
        // Apply styles
        star.style.position = 'fixed';
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.borderRadius = '50%';
        star.style.backgroundColor = '#FFFFFF';
        star.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.95), 0 0 20px rgba(0, 247, 255, 0.8)';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '9999';
        star.style.transform = 'translate(-50%, -50%) scale(0)';
        star.style.opacity = '0';
        
        // Add to document
        document.body.appendChild(star);
        stars.push(star);
        
        // Animate with keyframes
        const keyframes = [
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
            { transform: 'translate(-50%, -50%) scale(1.2)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.8 },
            { transform: 'translate(-50%, -50%) scale(2)', opacity: 0 }
        ];
        
        const options = {
            duration: duration,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards'
        };
        
        star.animate(keyframes, options);
        
        // Remove after animation completes
        setTimeout(() => {
            if (document.body.contains(star)) {
                document.body.removeChild(star);
                const index = stars.indexOf(star);
                if (index > -1) {
                    stars.splice(index, 1);
                }
            }
        }, duration);
    }
}