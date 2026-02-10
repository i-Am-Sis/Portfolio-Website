// Main JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Mobile Navigation Toggle ==========
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    // Show Menu
    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
    }

    // Hide Menu
    if(navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // ========== Animate Skill Bars on Scroll ==========
    const skillCards = document.querySelectorAll('.skill-card');

    function animateSkillBars() {
        skillCards.forEach(card => {
            const skillProgress = card.querySelector('.skill-progress');
            const skillPercent = card.querySelector('.skill-percent');
            const targetWidth = skillProgress.getAttribute('data-width');
            const targetPercent = skillPercent.getAttribute('data-target');

            // Check if element is in viewport
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if(cardPosition < screenPosition && !card.classList.contains('animated')) {
                card.classList.add('animated');
                
                // Animate the progress bar width
                skillProgress.style.width = targetWidth + '%';
                
                // Animate the percentage counter
                let current = 0;
                const increment = targetPercent / 50; // Adjust speed
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetPercent) {
                        current = targetPercent;
                        clearInterval(timer);
                    }
                    skillPercent.textContent = Math.round(current) + '%';
                }, 20);
            }
        });
    }

    // Initial check and listener for scroll
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Check on load

    // ========== Active Link on Scroll ==========
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight && correspondingLink) {
                correspondingLink.classList.add('active');
            } else if(correspondingLink) {
                correspondingLink.classList.remove('active');
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    // ========== Simple Contact Form Handling ==========
    const contactForm = document.getElementById('form');
    const formMessage = document.getElementById('form-message');

    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Simple validation
            if(!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }

            // In a real application, you would send the data to a server here
            // For this demo, we'll simulate a successful submission
            showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                formMessage.style.display = 'none';
            }, 4000);
        });
    }

    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';

        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // ========== Update Copyright Year ==========
    const currentYearSpan = document.getElementById('current-year');
    if(currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // ========== Smooth Scrolling for Anchor Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if(targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Header Background on Scroll ==========
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if(window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });
});