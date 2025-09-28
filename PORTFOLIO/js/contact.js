// Contact Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact section
    initContactSection();
    
    // Initialize map
    initMap();
    
    // Setup form handling
    setupContactForm();
    
    // Setup interactive elements
    setupInteractiveElements();
    
    // Setup animations
    setupContactAnimations();
});

// Initialize contact section
function initContactSection() {
    // Add floating elements
    createFloatingElements();
    
    // Initialize form validation
    initFormValidation();
    
    // Add intersection observer for animations
    setupIntersectionObserver();
}

// Initialize Mapbox map
function initMap() {
    // Check if Mapbox GL is available
    if (typeof mapboxgl === 'undefined') {
        console.warn('Mapbox GL not loaded. Using static map fallback.');
        createStaticMapFallback();
        return;
    }

    // Set your Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZS11c2VyIiwiYSI6ImNrandmOXA1eTAwY2cycG8ydnU2cDZ6a2oifQ.example-token';
    
    try {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [-0.6337, 35.6976], // Oran, Algeria coordinates
            zoom: 12,
            pitch: 45,
            bearing: -17.6,
            antialias: true
        });

        // Add 3D terrain (if available in your plan)
        map.on('load', () => {
            // Add navigation controls
            map.addControl(new mapboxgl.NavigationControl());
            
            // Add geolocate control
            map.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserLocation: true
            }));

            // Add marker for your location
            new mapboxgl.Marker({
                color: '#ff6b6b',
                scale: 1.2
            })
                .setLngLat([-0.6337, 35.6976])
                .setPopup(new mapboxgl.Popup().setHTML(`
                    <div style="padding: 1rem;">
                        <h3 style="margin: 0 0 0.5rem 0; color: #333;">Saadia Dahrane</h3>
                        <p style="margin: 0; color: #666;">Coopérative Djondi El Madjhoul<br>Bir El Djir, Oran</p>
                    </div>
                `))
                .addTo(map);

            // Add map overlay
            createMapOverlay();
            
            // Add smooth zoom animation
            setTimeout(() => {
                map.flyTo({
                    center: [-0.6337, 35.6976],
                    zoom: 14,
                    duration: 3000,
                    essential: true
                });
            }, 1000);
        });

        // Add error handling
        map.on('error', (e) => {
            console.error('Mapbox error:', e);
            createStaticMapFallback();
        });

    } catch (error) {
        console.error('Error initializing map:', error);
        createStaticMapFallback();
    }
}

// Create static map fallback
function createStaticMapFallback() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div style="width:100%;height:100%;background:linear-gradient(135deg,#1a2a6c,#b21f1f);display:flex;align-items:center;justify-content:center;color:white;font-size:1.2rem;">
                <div style="text-align:center;padding:2rem;">
                    <i class="fas fa-map-marker-alt" style="font-size:3rem;margin-bottom:1rem;"></i>
                    <h3>Oran, Algeria</h3>
                    <p>Coopérative Djondi El Madjhoul<br>Bir El Djir</p>
                </div>
            </div>
        `;
    }
}

// Create map overlay
function createMapOverlay() {
    const mapContainer = document.getElementById('map');
    const overlay = document.createElement('div');
    overlay.className = 'map-overlay';
    overlay.innerHTML = `
        <h3>📍 My Location</h3>
        <p>Coopérative Djondi El Madjhoul<br>Bir El Djir, Oran, Algeria</p>
    `;
    mapContainer.appendChild(overlay);
}

// Create floating elements
function createFloatingElements() {
    const contactSection = document.querySelector('.contact_us');
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-elements';
    
    for (let i = 0; i < 5; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        floatingContainer.appendChild(element);
    }
    
    contactSection.appendChild(floatingContainer);
    
    // Animate floating elements
    anime({
        targets: '.floating-element',
        translateY: function() {
            return anime.random(-50, 50);
        },
        translateX: function() {
            return anime.random(-30, 30);
        },
        rotate: function() {
            return anime.random(0, 360);
        },
        duration: function() {
            return anime.random(3000, 6000);
        },
        delay: function() {
            return anime.random(0, 2000);
        },
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
    });
}

// Setup contact form
function setupContactForm() {
    const form = document.querySelector('.contact_us form');
    const submitBtn = document.querySelector('.submit');
    
    if (!form) return;
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // Enter key submission
    form.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.target.type !== 'textarea') {
            e.preventDefault();
        }
    });
}

// Initialize form validation
function initFormValidation() {
    // Add validation styles to inputs
    const inputs = document.querySelectorAll('.contact_us input, .contact_us textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldContainer = field.closest('.inp_field') || field;
    
    // Remove previous validation states
    fieldContainer.classList.remove('valid', 'invalid');
    
    if (!value) {
        if (field.required) {
            fieldContainer.classList.add('invalid');
            return false;
        }
        return true;
    }
    
    let isValid = true;
    
    switch (field.type) {
        case 'email':
            isValid = isValidEmail(value);
            break;
        case 'tel':
            isValid = isValidPhone(value);
            break;
        case 'text':
            if (field.name === 'name') {
                isValid = value.length >= 2;
            }
            break;
    }
    
    if (field.tagName === 'TEXTAREA') {
        isValid = value.length >= 10;
    }
    
    fieldContainer.classList.add(isValid ? 'valid' : 'invalid');
    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit');
    const formData = new FormData(form);
    
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showMessage('Please fill all fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loading-spinner"></div> Sending...';
    
    try {
        // Simulate API call (replace with actual EmailJS or backend integration)
        await sendEmail(formData);
        
        showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
        
        // Reset validation states
        inputs.forEach(input => {
            const container = input.closest('.inp_field') || input;
            container.classList.remove('valid', 'invalid', 'focused');
        });
        
    } catch (error) {
        console.error('Error sending message:', error);
        showMessage('Failed to send message. Please try again or contact me directly.', 'error');
    } finally {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}

// Simulate email sending (replace with actual implementation)
async function sendEmail(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random success/failure for demo
            if (Math.random() > 0.2) { // 80% success rate for demo
                resolve({
                    success: true,
                    message: 'Email sent successfully'
                });
            } else {
                reject(new Error('Network error'));
            }
        }, 2000);
    });
}

// Show message to user
function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.textContent = text;
    
    document.body.appendChild(message);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.style.transform = 'translateX(150%)';
            setTimeout(() => message.remove(), 300);
        }
    }, 5000);
}

// Setup interactive elements
function setupInteractiveElements() {
    // Add click handlers for contact info
    const infoElements = document.querySelectorAll('.info');
    infoElements.forEach(info => {
        info.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) {
                // Add click animation
                anime({
                    targets: this,
                    scale: [1, 0.95, 1],
                    duration: 300,
                    easing: 'easeInOutQuad'
                });
                
                // Handle different types of links
                if (link.href.startsWith('tel:')) {
                    // Telephone link
                    window.open(link.href, '_self');
                } else if (link.href.startsWith('mailto:')) {
                    // Email link
                    window.open(link.href, '_self');
                } else {
                    // External link
                    window.open(link.href, '_blank');
                }
            }
        });
    });
    
    // Add social links
    createSocialLinks();
}

// Create social links
function createSocialLinks() {
    const form = document.querySelector('.contact_us form');
    if (!form) return;
    
    const socialContainer = document.createElement('div');
    socialContainer.className = 'contact-social';
    
    const socialLinks = [
        { icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/saadia-dahrane', color: '#0077b5' },
        { icon: 'fab fa-github', url: 'https://github.com/dahranesrh', color: '#333' },
        { icon: 'fab fa-facebook', url: 'https://facebook.com/dahrane.s', color: '#1877f2' },
        { icon: 'fab fa-whatsapp', url: 'tel:+213656529515', color: '#25d366' },
        { icon: 'fas fa-envelope', url: 'mailto:s.dahrane.s@gmail.com', color: '#ea4335' }
    ];
    
    socialLinks.forEach(link => {
        const socialLink = document.createElement('a');
        socialLink.href = link.url;
        socialLink.className = 'social-link';
        socialLink.target = '_blank';
        socialLink.rel = 'noopener noreferrer';
        socialLink.innerHTML = `<i class="${link.icon}"></i>`;
        socialLink.style.setProperty('--social-color', link.color);
        
        socialLink.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                backgroundColor: link.color,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        socialLink.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        socialContainer.appendChild(socialLink);
    });
    
    form.appendChild(socialContainer);
}

// Setup contact animations
// Remove the form submission handler since we're using native form submission
// Just keep validation
function setupContactForm() {
    const form = document.querySelector('.contact_us form');
    const submitBtn = document.querySelector('.submit');
    
    if (!form) return;
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // Form submission - just validate before sending
    form.addEventListener('submit', function(e) {
        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showMessage('Please fill all fields correctly.', 'error');
            return;
        }
        
        // Show success message
        showMessage('Opening email client... Please send the email.', 'success');
    });
}
function setupContactAnimations() {
    // Animate form elements on scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateContactElements();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const contactSection = document.querySelector('.contact_us');
    if (contactSection) {
        observer.observe(contactSection);
    }
}

// Animate contact elements
function animateContactElements() {
    // Animate info cards
    anime({
        targets: '.info',
        translateX: [50, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutCubic'
    });
    
    // Animate floating elements
    anime({
        targets: '.floating-element',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(300),
        easing: 'easeOutBack'
    });
}

// Setup intersection observer
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });
    
    // Observe animated elements
    document.querySelectorAll('.inp_field, .message, .submit').forEach(el => {
        observer.observe(el);
    });
}

// Export functions for global access
window.contactJS = {
    validateField,
    showMessage,
    initMap
};

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open messages
        const message = document.querySelector('.form-message');
        if (message) {
            message.remove();
        }
    }
});

// Add resize handler
window.addEventListener('resize', function() {
    // Recalculate any responsive elements if needed
    const mapOverlay = document.querySelector('.map-overlay');
    if (mapOverlay && window.innerWidth < 1200) {
        mapOverlay.style.right = '10px';
        mapOverlay.style.left = '10px';
        mapOverlay.style.width = 'auto';
    }
});