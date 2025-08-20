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
    
    // Check if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // On mobile, try to open Venmo app
        const venmoUrl = `venmo://paycharge?txn=pay&recipients=MSuzanne-Edmonson&amount=${amount}&note=${note}`;
        window.location.href = venmoUrl;
        
        // Fallback to web version if app doesn't open
        setTimeout(() => {
            window.open(`https://venmo.com/MSuzanne-Edmonson`, '_blank');
        }, 2000);
        closePaymentModal();
    } else {
        // On desktop, show custom modal with options
        showVenmoInstructions(serviceName, duration, amount);
    }
}

function showVenmoInstructions(serviceName, duration, amount) {
    // Close the payment modal first
    closePaymentModal();
    
    // Create Venmo instructions modal
    const venmoModal = document.createElement('div');
    venmoModal.id = 'venmoInstructionsModal';
    venmoModal.className = 'modal';
    venmoModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Venmo Payment Instructions</h3>
                <span class="close" onclick="closeVenmoInstructions()">&times;</span>
            </div>
            <div class="modal-body">
                <div style="text-align: center; margin-bottom: 20px;">
                    <i class="fab fa-venmo" style="font-size: 3rem; color: #3D95CE;"></i>
                </div>
                <p><strong>Payment Amount:</strong> $${amount}</p>
                <p><strong>Send to:</strong> @MSuzanne-Edmonson</p>
                <p><strong>Memo:</strong> ${serviceName} ${duration}min - Healing Synergies</p>
                
                <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <p style="margin: 0; color: #666; text-align: center;">
                        <strong>Instructions:</strong> Use the Venmo mobile app to send this payment
                    </p>
                </div>
                
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button onclick="openVenmoWeb()" class="btn btn-primary" style="background: #3D95CE;">
                        <i class="fas fa-external-link-alt"></i> Open Venmo.com
                    </button>
                    <button onclick="closeVenmoInstructions()" class="btn btn-secondary">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(venmoModal);
    venmoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openVenmoWeb() {
    window.open(`https://venmo.com/MSuzanne-Edmonson`, '_blank');
    closeVenmoInstructions();
}

function closeVenmoInstructions() {
    const venmoModal = document.getElementById('venmoInstructionsModal');
    if (venmoModal) {
        venmoModal.style.display = 'none';
        document.body.removeChild(venmoModal);
        document.body.style.overflow = 'auto';
    }
}

function payWithCashApp() {
    const { amount } = currentPaymentData;
    const cashAppUrl = `https://cash.app/$SuzyEdmonson/${amount}`;
    
    window.open(cashAppUrl, '_blank');
    closePaymentModal();
}

// Close payment modal when clicking outside or pressing Escape
window.addEventListener('click', function(event) {
    const paymentModal = document.getElementById('paymentModal');
    const bookingModal = document.getElementById('bookingModal');
    const venmoModal = document.getElementById('venmoInstructionsModal');
    
    if (event.target === paymentModal) {
        closePaymentModal();
    }
    if (event.target === bookingModal) {
        closeBookingModal();
    }
    if (event.target === venmoModal) {
        closeVenmoInstructions();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePaymentModal();
        closeBookingModal();
        closeVenmoInstructions();
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
