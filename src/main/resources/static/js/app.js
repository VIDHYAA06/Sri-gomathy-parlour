/* ==========================================
   Sri Gomathy Beauty Parlour - JavaScript Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Navigation Scroll Effect
    const mainNavbar = document.getElementById('mainNavbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            mainNavbar.classList.add('scrolled');
        } else {
            mainNavbar.classList.remove('scrolled');
        }
    });

    // 2. Active Navigation Links Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
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

    // Close mobile navbar on nav-link click
    const navItems = document.querySelectorAll('.navbar-nav .nav-item:not(.ms-lg-3)');
    const navbarCollapse = document.getElementById('navbarNav');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });


    // Clean phone number helper
    function cleanPhone(num) {
        return num.replace(/\D/g, '');
    }

    const mobileInput = document.getElementById('mobileNumber');

    // 6. Appointment Booking Form Submission Flow
    const appointmentForm = document.getElementById('appointmentForm');
    
    appointmentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // BootStrap standard validations
        if (!appointmentForm.checkValidity()) {
            event.stopPropagation();
            appointmentForm.classList.add('was-validated');
            return;
        }

        // Gather Booking Info
        const name = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const service = document.getElementById('serviceRequired').value;
        const date = document.getElementById('appointmentDate').value;
        const time = document.getElementById('appointmentTime').value;
        const mobile = mobileInput.value;

        // Populate summary elements in success modal
        document.getElementById('sumName').innerText = name;
        document.getElementById('sumService').innerText = service;
        
        // Format readable date and time
        const formattedDate = new Date(date).toLocaleDateString('en-IN', {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
        });
        document.getElementById('sumDateTime').innerText = `${formattedDate} at ${time}`;

        // Get main admin numbers directly
        const cleanAdmin1 = "918925174955";
        const cleanAdmin2 = "919842474955";

        // Update Labels inside Success Modal
        document.getElementById('lblAdmin1Num').innerText = "+91 89251 74955";
        document.getElementById('lblAdmin2Num').innerText = "+91 98424 74955";

        // Format Message Text
        const messageText = `🌸 New Appointment - Sri Gomathy Beauty Parlour

Name: ${name}
Address: ${address}
Mobile: ${mobile}
Email: ${email}

Date: ${date}
Time: ${time}
Service: ${service}`;

        const encodedMessage = encodeURIComponent(messageText);

        // Construct simultaneous WhatsApp Dispatch links
        const waLink1 = `https://api.whatsapp.com/send?phone=${cleanAdmin1}&text=${encodedMessage}`;
        const waLink2 = `https://api.whatsapp.com/send?phone=${cleanAdmin2}&text=${encodedMessage}`;

        document.getElementById('btnSendAdmin1').setAttribute('href', waLink1);
        document.getElementById('btnSendAdmin2').setAttribute('href', waLink2);

        // Close Booking Modal
        const bookingModalEl = document.getElementById('bookingModal');
        const bookingModalInst = bootstrap.Modal.getInstance(bookingModalEl);
        if (bookingModalInst) bookingModalInst.hide();

        // Show Success Modal
        const successModalEl = document.getElementById('successModal');
        const successModalInst = new bootstrap.Modal(successModalEl);
        successModalInst.show();

        // Reset Booking Form for subsequent requests
        appointmentForm.reset();
        appointmentForm.classList.remove('was-validated');
    });

    // 9. Gallery Filter Feature Logic
    const filterButtons = document.querySelectorAll('.btn-gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-col');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active to current button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('d-none');
                    // Trigger fade-in animation
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.classList.add('d-none');
                }
            });
        });
    });

});

// 7. Lightbox Gallery Modal Handler
function openLightbox(imageSrc, captionText) {
    const lightboxModalEl = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    lightboxImg.src = imageSrc;
    lightboxCaption.innerText = captionText;
    
    const lightboxModalInst = new bootstrap.Modal(lightboxModalEl);
    lightboxModalInst.show();
}

// 8. Select service directly from card and launch booking modal
function selectServiceAndBook(serviceName) {
    const serviceSelect = document.getElementById('serviceRequired');
    if (serviceSelect) {
        serviceSelect.value = serviceName;
    }
    
    const bookingModalEl = document.getElementById('bookingModal');
    const bookingModalInst = new bootstrap.Modal(bookingModalEl);
    bookingModalInst.show();
}
