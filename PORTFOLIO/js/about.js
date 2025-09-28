// About Section JavaScript
class AboutSection {
    constructor() {
        this.currentSection = 'skills';
        this.init();
    }

    init() {
        // Wait for DOM to be fully ready
        setTimeout(() => {
            this.setupNavigation();
            this.setupAnimations();
            this.setupInteractiveElements();
            this.setupScrollAnimations();
            
            // Force show skills section by default
            this.showSection('skills');
            
            // Debug: Check if elements exist
            console.log('Skills section:', document.querySelector('.skills'));
            console.log('About container:', document.querySelector('.about_container'));
        }, 100);
    }

   setupNavigation() {
    const navLinks = document.querySelectorAll('.about_nav a[data-text]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            const sectionType = link.getAttribute('data-text');
            this.showSection(this.getSectionName(sectionType));
        });
    });

    // Setup download buttons with animation
    const downloadBtns = document.querySelectorAll('.download[data-animate="true"]');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Only prevent default if we want to handle it specially
            if (!btn.hasAttribute('href')) {
                e.preventDefault();
                this.handleDownload();
            } else {
                // For actual download links, just animate and let the download happen
                this.animateDownloadButton(btn);
                // Don't prevent default - let the download proceed naturally
            }
        });
    });

    // Setup hire button
    const hireBtn = document.querySelector('.hire');
    if (hireBtn) {
        hireBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleHire();
        });
    }
}

animateDownloadButton(button) {
    anime({
        targets: button,
        scale: [1, 0.9, 1],
        duration: 300,
        easing: 'easeInOutQuad'
    });

    this.showNotification('Starting download...', 'success');
}
    getSectionName(sectionType) {
        const sections = {
            'one': 'skills',
            'two': 'experience',
            'three': 'education'
        };
        return sections[sectionType] || 'skills';
    }

    showSection(sectionName) {
        console.log('Showing section:', sectionName);
        this.currentSection = sectionName;
        
        // Hide all sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });
        
        // Show selected section
        const targetSection = document.querySelector(`.${sectionName}`);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'block';
            
            // Force reflow to ensure display change takes effect
            targetSection.offsetHeight;
            
            // Trigger section-specific animations
            this.animateSection(sectionName);
        }
    }

    // ... rest of your JavaScript methods remain the same


// Initialize with error handling

    animateSection(sectionName) {
        switch(sectionName) {
            case 'skills':
                this.animateSkills();
                break;
            case 'experience':
            case 'education':
                this.animateTimeline();
                break;
        }
    }

    animateSkills() {
        const skills = document.querySelectorAll('.skill');
        
        skills.forEach((skill, index) => {
            const progress = skill.querySelector('.progress');
            const value = skill.querySelector('.value');
            
            if (progress && value) {
                const targetWidth = progress.getAttribute('data-width') || progress.style.width;
                
                // Reset for animation
                progress.style.width = '0%';
                value.textContent = '0%';
                
                setTimeout(() => {
                    // Animate progress bar
                    anime({
                        targets: progress,
                        width: targetWidth,
                        duration: 1500,
                        delay: index * 200,
                        easing: 'easeOutQuart'
                    });
                    
                    // Animate percentage counter
                    const targetValue = parseInt(targetWidth);
                    this.animateCounter(value, 0, targetValue, 1500);
                }, 300);
            }
        });
    }

    animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + '%';
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    animateTimeline() {
        const covers = document.querySelectorAll('.cover');
        
        anime({
            targets: covers,
            translateX: [-50, 0],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(200),
            easing: 'easeOutCubic'
        });

        // Setup cover interactions
        covers.forEach(cover => {
            cover.addEventListener('click', () => {
                cover.classList.toggle('active');
                
                anime({
                    targets: cover.querySelector('.text_hidden'),
                    maxHeight: cover.classList.contains('active') ? '500px' : '0',
                    duration: 500,
                    easing: 'easeInOutQuart'
                });
            });
        });
    }

    setupAnimations() {
        // Animate geometric shapes
        anime({
            targets: '.box, .circle, .triangle',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 1500,
            delay: anime.stagger(200),
            easing: 'easeOutElastic(1, .8)'
        });
        
        // Animate dots
        anime({
            targets: '.dot',
            scale: [0, 1],
            opacity: [0, 1],
            duration: 1000,
            delay: anime.stagger(50),
            easing: 'easeOutBack'
        });
        
        // Animate face content
        anime({
            targets: '.face1 .content > *',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: anime.stagger(200),
            easing: 'easeOutCubic'
        });

        // Animate waves
        anime({
            targets: '.wave',
            translateX: ['0%', '-100%'],
            duration: 15000,
            loop: true,
            easing: 'linear'
        });
        
        anime({
            targets: '.wave.opposite',
            translateX: ['-100%', '0%'],
            duration: 12000,
            loop: true,
            easing: 'linear'
        });
    }

    setupInteractiveElements() {
        // 3D flip effect on face2 hover
        const face2 = document.querySelector('.face2');
        const wrapper = document.querySelector('.wrapper');
        
        if (face2 && wrapper) {
            face2.addEventListener('mouseenter', () => {
                anime({
                    targets: wrapper,
                    rotateY: 10,
                    duration: 800,
                    easing: 'easeOutCubic'
                });
            });
            
            face2.addEventListener('mouseleave', () => {
                anime({
                    targets: wrapper,
                    rotateY: 0,
                    duration: 800,
                    easing: 'easeOutCubic'
                });
            });
        }

        // Text reveal animation
        this.animateText();
    }

    animateText() {
        const text = document.querySelector('.text');
        if (text) {
            // Save original text
            const originalText = text.textContent;
            text.innerHTML = '';
            
            // Create animated text
            const words = originalText.split(' ');
            words.forEach((word, index) => {
                const wordSpan = document.createElement('span');
                wordSpan.textContent = word + ' ';
                wordSpan.style.opacity = '0';
                wordSpan.style.display = 'inline-block';
                text.appendChild(wordSpan);
                
                anime({
                    targets: wordSpan,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    delay: index * 50,
                    easing: 'easeOutCubic'
                });
            });
        }
    }

    setupScrollAnimations() {
        // Parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const aboutSection = document.querySelector('.about');
            
            if (aboutSection && this.isElementInViewport(aboutSection)) {
                const rate = scrolled * -0.5;
                
                const box = aboutSection.querySelector('.box');
                const circle = aboutSection.querySelector('.circle');
                const triangle = aboutSection.querySelector('.triangle');
                
                if (box) box.style.transform = `translateY(${rate * 0.3}px) rotate(45deg)`;
                if (circle) circle.style.transform = `translateY(${rate * 0.5}px)`;
                if (triangle) triangle.style.transform = `translateY(${rate * 0.2}px) rotate(${scrolled * 0.1}deg)`;
            }
        });

        // Intersection observer for animations
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.3 });

        // Observe elements that should animate on scroll
        const animatableElements = document.querySelectorAll('.skill, .cover, .section-title');
        animatableElements.forEach(el => observer.observe(el));
    }

    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    handleDownload() {
        const downloadBtn = document.querySelector('.download');
        
        anime({
            targets: downloadBtn,
            scale: [1, 0.9, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });

        // Simulate download process
        this.showNotification('Downloading CV...', 'success');
        
        setTimeout(() => {
            this.showNotification('CV downloaded successfully!', 'success');
        }, 1000);
    }

    handleHire() {
        const hireBtn = document.querySelector('.hire');
        
        anime({
            targets: hireBtn,
            scale: [1, 0.9, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });

        // Redirect to contact section
        if (typeof contact === 'function') {
            contact();
        } else {
            this.showNotification('Redirecting to contact section...', 'info');
        }
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
        `;

        // Style based on type
        const styles = {
            success: 'background: linear-gradient(135deg, #4ecdc4, #44a08d);',
            error: 'background: linear-gradient(135deg, #ff6b6b, #c44d4d);',
            info: 'background: linear-gradient(135deg, #667eea, #764ba2);'
        };

        notification.style.cssText += styles[type] || styles.info;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    try {
        window.aboutSection = new AboutSection();
        
        // Force display skills section on load
        setTimeout(() => {
            const skillsSection = document.querySelector('.skills');
            if (skillsSection) {
                skillsSection.classList.add('active');
                skillsSection.style.display = 'block';
            }
        }, 200);
        
    } catch (error) {
        console.error('Error initializing AboutSection:', error);
    }
});

// Export for global access
window.AboutSection = AboutSection;