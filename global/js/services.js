// Services Page JavaScript

// Function to open booking modal
function openBookingModal(serviceName) {
    const modal = document.getElementById('bookingModal');
    const selectedServiceElement = document.getElementById('selectedService');
    const serviceInput = document.getElementById('serviceInput');
    
    selectedServiceElement.textContent = `Selected Service: ${serviceName}`;
    serviceInput.value = serviceName;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close booking modal
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeBookingModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeBookingModal();
    }
});

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            // Form will be handled by Formspree
            // You can add additional validation or success handling here if needed
            setTimeout(() => {
                closeBookingModal();
                alert('Thank you! Your booking request has been sent. We will contact you shortly to confirm your appointment.');
            }, 100);
        });
    }
});

// Payment Modal Functions
let currentPaymentData = {};

function openPaymentModal(serviceName, duration, amount) {
    currentPaymentData = {
        serviceName: serviceName,
        duration: duration,
        amount: amount
    };
    
    const modal = document.getElementById('paymentModal');
    const titleElement = document.getElementById('paymentModalTitle');
    const descriptionElement = document.getElementById('paymentModalDescription');
    
    titleElement.textContent = `Pay for ${serviceName}`;
    descriptionElement.textContent = `${serviceName} - ${duration} minutes - $${amount}`;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function payWithPayPal() {
    const { serviceName, duration, amount } = currentPaymentData;
    
    // Create PayPal form dynamically
    const form = document.createElement('form');
    form.action = 'https://www.paypal.com/cgi-bin/webscr';
    form.method = 'post';
    form.target = '_top';
    form.style.display = 'none';
    
    const fields = {
        'cmd': '_xclick',
        'business': 'Jonsuzedmonson@att.net',
        'item_name': `${serviceName} - ${duration} Minutes`,
        'item_number': `${serviceName.replace(/\s+/g, '')}-${duration}-${amount}`,
        'note': `Payment for ${duration}-minute ${serviceName} session - Healing Synergies`,
        'currency_code': 'USD',
        'amount': amount.toString()
    };
    
    Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
    });
    
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    closePaymentModal();
}

function payWithVenmo() {
    const { serviceName, duration, amount } = currentPaymentData;
    const note = encodeURIComponent(`${serviceName} ${duration}min - Healing Synergies`);
    const venmoUrl = `venmo://paycharge?txn=pay&recipients=SuzEd&amount=${amount}&note=${note}`;
    
    window.open(venmoUrl, '_blank');
    closePaymentModal();
}

function payWithCashApp() {
    const { amount } = currentPaymentData;
    const cashAppUrl = `https://cash.app/$SuzEd/${amount}`;
    
    window.open(cashAppUrl, '_blank');
    closePaymentModal();
}

// Close payment modal when clicking outside or pressing Escape
window.addEventListener('click', function(event) {
    const paymentModal = document.getElementById('paymentModal');
    const bookingModal = document.getElementById('bookingModal');
    
    if (event.target === paymentModal) {
        closePaymentModal();
    }
    if (event.target === bookingModal) {
        closeBookingModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePaymentModal();
        closeBookingModal();
    }
});

// Check if Venmo icon loaded properly and show fallback if needed
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const venmoIcon = document.querySelector('.fa-venmo');
        const venmoFallback = document.querySelector('.venmo-fallback');
        
        if (venmoIcon && venmoFallback) {
            // Check if the icon has proper dimensions (indicates it loaded)
            const iconStyle = window.getComputedStyle(venmoIcon);
            if (iconStyle.width === '0px' || iconStyle.height === '0px' || venmoIcon.offsetWidth === 0) {
                venmoIcon.style.display = 'none';
                venmoFallback.style.display = 'flex';
            }
        }
    }, 1000); // Give Font Awesome time to load
});
