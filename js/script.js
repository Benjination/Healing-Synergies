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
        galleryImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" loading="lazy">
            `;
            
            // Add click event for lightbox
            galleryItem.addEventListener('click', () => {
                openLightbox(index);
            });
            
            galleryGrid.appendChild(galleryItem);
        });
    }
}

// Enhanced lightbox functionality
let currentImageIndex = 0;
let lightboxModal = null;

function openLightbox(index) {
    currentImageIndex = index;
    
    // Create lightbox if it doesn't exist
    if (!lightboxModal) {
        createLightbox();
    }
    
    // Update the image and show lightbox
    updateLightboxImage();
    lightboxModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function createLightbox() {
    lightboxModal = document.createElement('div');
    lightboxModal.className = 'lightbox-modal';
    lightboxModal.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-nav lightbox-prev">
                <i class="fas fa-chevron-left"></i>
                <span style="display: none;">‹</span>
            </div>
            <div class="lightbox-nav lightbox-next">
                <i class="fas fa-chevron-right"></i>
                <span style="display: none;">›</span>
            </div>
            <div class="lightbox-image-container">
                <img src="" alt="" class="lightbox-image">
            </div>
            <div class="lightbox-caption"></div>
            <div class="lightbox-counter"></div>
        </div>
    `;
    
    // Add lightbox styles
    lightboxModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const lightboxContent = lightboxModal.querySelector('.lightbox-content');
    lightboxContent.style.cssText = `
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
    `;
    
    const lightboxImage = lightboxModal.querySelector('.lightbox-image');
    lightboxImage.style.cssText = `
        max-width: 90%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    `;
    
    const closeButton = lightboxModal.querySelector('.lightbox-close');
    closeButton.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        z-index: 2001;
        transition: color 0.3s ease;
    `;
    
    const navButtons = lightboxModal.querySelectorAll('.lightbox-nav');
    navButtons.forEach(btn => {
        btn.style.cssText = `
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.6);
            color: white;
            border: 2px solid rgba(255,255,255,0.3);
            padding: 15px;
            font-size: 28px;
            cursor: pointer;
            border-radius: 50%;
            transition: all 0.3s ease;
            z-index: 2001;
            width: 70px;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
    });
    
    const prevButton = lightboxModal.querySelector('.lightbox-prev');
    prevButton.style.left = '30px';
    
    const nextButton = lightboxModal.querySelector('.lightbox-next');
    nextButton.style.right = '30px';
    
    const caption = lightboxModal.querySelector('.lightbox-caption');
    caption.style.cssText = `
        color: white;
        font-size: 16px;
        margin-top: 20px;
        text-align: center;
        max-width: 90%;
    `;
    
    const counter = lightboxModal.querySelector('.lightbox-counter');
    counter.style.cssText = `
        color: white;
        font-size: 14px;
        margin-top: 10px;
        opacity: 0.8;
    `;
    
    // Add event listeners
    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);
    
    // Close on background click
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
    
    // Add hover effects
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.color = '#ff6b6b';
    });
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.color = 'white';
    });
    
    navButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.background = 'rgba(255,255,255,0.9)';
            btn.style.color = '#333';
            btn.style.transform = 'translateY(-50%) scale(1.1)';
            btn.style.borderColor = 'rgba(255,255,255,0.8)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'rgba(0,0,0,0.6)';
            btn.style.color = 'white';
            btn.style.transform = 'translateY(-50%) scale(1)';
            btn.style.borderColor = 'rgba(255,255,255,0.3)';
        });
    });
    
    document.body.appendChild(lightboxModal);
}

function updateLightboxImage() {
    if (!lightboxModal) return;
    
    const image = lightboxModal.querySelector('.lightbox-image');
    const caption = lightboxModal.querySelector('.lightbox-caption');
    const counter = lightboxModal.querySelector('.lightbox-counter');
    const prevButton = lightboxModal.querySelector('.lightbox-prev');
    const nextButton = lightboxModal.querySelector('.lightbox-next');
    
    const currentImage = galleryImages[currentImageIndex];
    
    image.src = currentImage.src;
    image.alt = currentImage.alt;
    caption.textContent = currentImage.alt;
    counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    
    // Always show navigation buttons (they will loop around)
    prevButton.style.display = 'flex';
    nextButton.style.display = 'flex';
    
    // Trigger fade in animation
    setTimeout(() => {
        lightboxModal.style.opacity = '1';
    }, 10);
}

function showPrevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
    } else {
        currentImageIndex = galleryImages.length - 1; // Loop to last image
    }
    updateLightboxImage();
}

function showNextImage() {
    if (currentImageIndex < galleryImages.length - 1) {
        currentImageIndex++;
    } else {
        currentImageIndex = 0; // Loop to first image
    }
    updateLightboxImage();
}

function closeLightbox() {
    if (lightboxModal) {
        lightboxModal.style.opacity = '0';
        setTimeout(() => {
            lightboxModal.style.display = 'none';
            document.body.style.overflow = ''; // Restore background scrolling
        }, 300);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightboxModal || lightboxModal.style.display === 'none') return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
});

// Simple image modal functionality (keeping for compatibility)
function openImageModal(src, alt) {
    // Find the index of the image and open lightbox
    const index = galleryImages.findIndex(img => img.src === src);
    if (index !== -1) {
        openLightbox(index);
    }
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
