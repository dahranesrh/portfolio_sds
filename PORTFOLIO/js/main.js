// main.js - Updated for separate section navigation

// Function to show a specific section
function showSection(sectionName) {
    // Hide all layers
    const layers = document.querySelectorAll('.layer');
    layers.forEach(layer => {
        layer.classList.remove('active');
    });
    
    // Show the selected layer
    const targetLayer = document.querySelector(`.layer${getLayerNumber(sectionName)}`);
    if (targetLayer) {
        targetLayer.classList.add('active');
    }
    
    // Update URL hash for bookmarking
    window.location.hash = sectionName;
}

// Function to get layer number based on section name
function getLayerNumber(sectionName) {
    const sectionMap = {
        'home': 1,
        'about': 2,
        'services': 3,
        'portfolio': 4,
        'blog': 5,
        'contact': 6
    };
    return sectionMap[sectionName] || 1;
}

// Navigation functions
function home() {
    showSection('home');
    // Add any home-specific animations here
}

function about() {
    showSection('about');
    // Trigger about section animations
    if (typeof animate3 !== 'undefined') animate3.play();
    if (typeof animate4 !== 'undefined') animate4.play();
}

function services() {
    showSection('services');
    // Trigger services animations
    if (typeof animate6 !== 'undefined') animate6.play();
}

function portfolio() {
    showSection('portfolio');
    // Initialize portfolio if needed
    if (typeof initPortfolio !== 'undefined') initPortfolio();
}

function blog() {
    showSection('blog');
    // Initialize blog if needed
}

function contact() {
    showSection('contact');
    // Trigger contact animations
    if (typeof animate5 !== 'undefined') animate5.play();
    // Initialize map if needed
    if (typeof initMap !== 'undefined') initMap();
}

// Handle browser back/forward buttons
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1); // Remove the # symbol
    if (hash) {
        showSection(hash);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a hash in the URL
    const hash = window.location.hash.substring(1);
    if (hash && ['home', 'about', 'services', 'portfolio', 'blog', 'contact'].includes(hash)) {
        showSection(hash);
    } else {
        // Default to home
        showSection('home');
    }
    
    // Initialize hamburger menu
    initHamburgerMenu();
});

// Hamburger menu functionality
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navigation = document.querySelector('.navigation');
    
    if (hamburger && navigation) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navigation.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navigation.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navigation.classList.remove('active');
            });
        });
    }
}