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
