// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    const navbar = document.querySelector('.navbar');
    const isScrolled = navbar.classList.contains('scrolled');
    const isMobile = window.innerWidth <= 768;
    
    // Allow hamburger toggle in these cases:
    // 1. When header is not scrolled (normal state)
    // 2. When on mobile and header is scrolled
    if (!isScrolled || (isScrolled && isMobile)) {
        navMenu.classList.toggle('active');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Calculate navbar height for offset
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20; // Extra 20px padding
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Gallery functionality
const galleryImages = [
    { src: 'images/Gallery/Child Smoothie.jpg', alt: 'Child enjoying a healthy smoothie' },
    { src: 'images/Gallery/Cindy 3 Week.jpg', alt: 'Cindy 3 Week transformation' },
    { src: 'images/Gallery/Garden.jpg', alt: 'Organic garden' },
    { src: 'images/Gallery/Hammock.jpg', alt: 'Relaxation in hammock' },
    { src: 'images/Gallery/Handstand.png', alt: 'Yoga handstand practice' },
    { src: 'images/Gallery/JoeStory.jpg', alt: 'Joe\'s transformation story' },
    { src: 'images/Gallery/Qigong.png', alt: 'Qigong practice' },
    { src: 'images/Gallery/Raw Food Retreat.jpg', alt: 'Raw food retreat' },
    { src: 'images/Gallery/Raw Sketti.jpg', alt: 'Raw spaghetti dish' },
    { src: 'images/Gallery/Raw Taco.jpg', alt: 'Raw taco creation' },
    { src: 'images/Gallery/Tomatos.jpg', alt: 'Fresh tomatoes from garden' },
    { src: 'images/Gallery/fullsizeoutput_2bf1.jpeg', alt: 'Food presentation' },
    { src: 'images/Gallery/Meal.jpg', alt: 'Healthy meal' },
    // Removed Meal.webp reference
    // Food Pics unique images
    { src: 'images/Gallery/Food Pics/AlmostQueso.JPG', alt: 'Almost Queso' },
    { src: 'images/Gallery/Food Pics/AvacadoSalad.JPG', alt: 'Avocado Salad' },
    { src: 'images/Gallery/Food Pics/Bean Soup.jpeg', alt: 'Bean Soup' },
    { src: 'images/Gallery/Food Pics/CarrotCake.JPG', alt: 'Carrot Cake' },
    { src: 'images/Gallery/Food Pics/ChocBanana.jpeg', alt: 'Chocolate Banana' },
    { src: 'images/Gallery/Food Pics/ChocMilk.jpeg', alt: 'Chocolate Milk' },
    { src: 'images/Gallery/Food Pics/Dessert.jpeg', alt: 'Dessert' },
    { src: 'images/Gallery/Food Pics/Gallery3.jpeg', alt: 'Joe at retreat' },
    { src: 'images/Gallery/Food Pics/Gallery5.jpeg', alt: 'Group at retreat' },
    { src: 'images/Gallery/Food Pics/GojiBanana.JPG', alt: 'Goji Banana' },
    { src: 'images/Gallery/Food Pics/GreenSmoothie.jpeg', alt: 'Green Smoothie' },
    { src: 'images/Gallery/Food Pics/Neatballs.JPG', alt: 'Neatballs' },
    { src: 'images/Gallery/Food Pics/NotFish.JPG', alt: 'Not Fish' },
    { src: 'images/Gallery/Food Pics/Rainbow Salad.JPG', alt: 'Rainbow Salad' },
    { src: 'images/Gallery/Food Pics/RawChocCake2.JPG', alt: 'Raw Chocolate Cake 2' },
    { src: 'images/Gallery/Food Pics/RawChocCake4.JPG', alt: 'Raw Chocolate Cake 4' },
    { src: 'images/Gallery/Food Pics/RawChoccake.JPG', alt: 'Raw Chocolate Cake' },
    { src: 'images/Gallery/Food Pics/RawPizza.jpeg', alt: 'Raw Pizza' },
    { src: 'images/Gallery/Food Pics/SmoothiePrep.jpeg', alt: 'Smoothie Prep' },
    { src: 'images/Gallery/Food Pics/TropSmooth.JPG', alt: 'Tropical Smoothie' },
    { src: 'images/Gallery/Food Pics/VegetableDip.jpeg', alt: 'Vegetable Dip' },
    { src: 'images/Gallery/Food Pics/WalnutSalad.jpeg', alt: 'Walnut Salad' },
    { src: 'images/Gallery/Food Pics/WalnutSalad2.jpeg', alt: 'Walnut Salad 2' }
];

// Load gallery images
function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        galleryImages.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" loading="lazy">
            `;
            
            // Add click event for image modal/lightbox (optional enhancement)
            galleryItem.addEventListener('click', () => {
                openImageModal(image.src, image.alt);
            });
            
            galleryGrid.appendChild(galleryItem);
        });
    }
}

// Simple image modal functionality
function openImageModal(src, alt) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${src}" alt="${alt}">
            <p>${alt}</p>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    `;
    
    const modalImage = modal.querySelector('img');
    modalImage.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
    `;
    
    const closeButton = modal.querySelector('.close-modal');
    closeButton.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
    `;
    
    const caption = modal.querySelector('p');
    caption.style.cssText = `
        color: white;
        margin-top: 10px;
        font-size: 14px;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal events
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Close on escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Contact form submission
function handleContactFormSubmission() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Let Formspree handle the submission
            // Show a temporary success message
            const button = e.target.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Re-enable button after a delay (Formspree will redirect)
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        });
    }
}

// Scroll animations (fade in on scroll)
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .recipe-category, .gallery-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Navigation background on scroll - DISABLED (conflicts with header shrinking)
/*
function setupNavigationScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    });
}
*/

// Active navigation link highlighting
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced scrolling header effect with smooth menu transitions
    const navbar = document.querySelector('.navbar');
    const navMenu = document.getElementById('nav-menu');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const isMobile = window.innerWidth <= 768;
            if (!isMobile) {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                    // Close desktop menu when scrolling down and header shrinks
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                } else {
                    navbar.classList.remove('scrolled');
                }
            } else {
                // On mobile, never expand/collapse menu on scroll
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Initialize other functionality
    loadGallery();
    handleContactFormSubmission();
    setupScrollAnimations();
});

// Add active navigation link styles
const activeNavStyles = `
    .nav-link.active {
        color: #D196E0;
        font-weight: 600;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = activeNavStyles;
document.head.appendChild(styleSheet);
