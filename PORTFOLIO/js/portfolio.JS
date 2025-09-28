// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all Swiper sliders
    initSwipers();
    
    // Add project filtering functionality
    initProjectFilters();
    
    // Add project modal functionality
    initProjectModals();
    
    // Add scroll animations
    initScrollAnimations();
});

// Initialize Swiper sliders for each project
function initSwipers() {
    const projectIds = [
        'slider_poultry', 
        'slider_poultry_app', 
        'slider_incident', 
        'slider_education', 
        'slider_waste', 
        'slider_irrigation', 
        'slider_design'
    ];
    
    projectIds.forEach(id => {
        const sliderElement = document.getElementById(id);
        if (sliderElement) {
            new Swiper(`#${id}`, {
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: `.swiper-button-next`,
                    prevEl: `.swiper-button-prev`,
                },
                pagination: {
                    el: `.swiper-pagination`,
                    clickable: true,
                },
                effect: 'slide',
                speed: 600,
            });
        }
    });
}

// Initialize project filtering functionality
function initProjectFilters() {
    // Create filter buttons if they don't exist
    const portfolioSection = document.querySelector('.portfolio');
    const projectSlider = document.querySelector('.project-slider');
    
    if (!portfolioSection.querySelector('.portfolio-filters')) {
        const filters = document.createElement('div');
        filters.className = 'portfolio-filters';
        filters.innerHTML = `
            <button class="filter-btn active" data-filter="all">All Projects</button>
            <button class="filter-btn" data-filter="iot">IoT</button>
            <button class="filter-btn" data-filter="mobile">Mobile Apps</button>
            <button class="filter-btn" data-filter="web">Web</button>
            <button class="filter-btn" data-filter="desktop">Desktop</button>
        `;
        
        portfolioSection.insertBefore(filters, projectSlider);
        
        // Add event listeners to filter buttons
        const filterButtons = filters.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                const filterValue = this.getAttribute('data-filter');
                filterProjects(filterValue);
            });
        });
        
        // Add data-category attributes to projects
        const projects = document.querySelectorAll('.project');
        const categories = {
            'slider_poultry': 'iot',
            'slider_poultry_app': 'mobile',
            'slider_incident': 'web',
            'slider_education': 'mobile',
            'slider_waste': 'mobile',
            'slider_irrigation': 'iot',
            'slider_design': 'desktop'
        };
        
        projects.forEach(project => {
            const sliderId = project.querySelector('.swiper-container').id;
            project.setAttribute('data-category', categories[sliderId] || 'other');
        });
    }
}

// Filter projects based on category
function filterProjects(category) {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        if (category === 'all' || project.getAttribute('data-category') === category) {
            project.style.display = 'block';
            // Add animation when showing
            project.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            project.style.display = 'none';
        }
    });
    
    // Reinitialize Swipers for visible projects
    setTimeout(initSwipers, 600);
}

// Initialize project modal functionality
function initProjectModals() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        project.addEventListener('click', function(e) {
            // Don't open modal if user clicked on navigation or pagination
            if (e.target.closest('.swiper-button-next') || 
                e.target.closest('.swiper-button-prev') || 
                e.target.closest('.swiper-pagination')) {
                return;
            }
            
            openProjectModal(this);
        });
    });
    
    // Close modal when clicking exit button
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('exitButton')) {
            closeProjectModal();
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}

// Open project modal
function openProjectModal(project) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'project-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Clone project for modal
    const modalProject = project.cloneNode(true);
    modalProject.style.cssText = `
        background: #1a1a2e;
        border-radius: 20px;
        max-width: 90%;
        max-height: 90%;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    // Add close button to modal
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.className = 'modal-close';
    closeButton.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        font-size: 1.5rem;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    `;
    
    closeButton.addEventListener('click', closeProjectModal);
    
    modalProject.appendChild(closeButton);
    modalOverlay.appendChild(modalProject);
    document.body.appendChild(modalOverlay);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Animate modal in
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalProject.style.transform = 'scale(1)';
    }, 10);
    
    // Reinitialize Swiper in modal
    setTimeout(() => {
        const modalSwiper = modalProject.querySelector('.swiper-container');
        if (modalSwiper) {
            const swiperId = modalSwiper.id;
            new Swiper(`#${swiperId}`, {
                loop: true,
                navigation: {
                    nextEl: `.swiper-button-next`,
                    prevEl: `.swiper-button-prev`,
                },
                pagination: {
                    el: `.swiper-pagination`,
                    clickable: true,
                },
            });
        }
    }, 300);
}

// Close project modal
function closeProjectModal() {
    const modalOverlay = document.querySelector('.project-modal-overlay');
    if (modalOverlay) {
        modalOverlay.style.opacity = '0';
        const modalProject = modalOverlay.querySelector('.project');
        if (modalProject) {
            modalProject.style.transform = 'scale(0.8)';
        }
        
        setTimeout(() => {
            document.body.removeChild(modalOverlay);
            document.body.style.overflow = '';
        }, 300);
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    // Create Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all projects
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.style.animationPlayState = 'paused';
        observer.observe(project);
    });
}

// Export functions for use in other scripts (if needed)
window.portfolioJS = {
    initSwipers,
    filterProjects,
    openProjectModal,
    closeProjectModal
};