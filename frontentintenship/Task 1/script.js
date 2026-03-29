/**
 * Simple Portfolio Website - Interactive Features
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. SMOOTH SCROLLING ==========
    // When you click on any link that starts with "#"
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Stop default jump
            
            // Get the target element ID from the link
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // If target exists, scroll smoothly to it
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== 2. ACTIVE LINK HIGHLIGHTING ==========
    // Changes active link color when scrolling
    
    // Get all sections and nav links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Function to update active link based on scroll position
    function updateActiveLink() {
        let current = '';
        
        // Check which section is currently visible
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // If we're in this section
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Run once on load
    
    // ========== 3. CONTACT FORM HANDLING ==========
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page refresh
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name === '' || email === '' || message === '') {
                showMessage('Please fill in all fields', 'red');
                return;
            }
            
            // Check if email contains @ and .
            if (!email.includes('@') || !email.includes('.')) {
                showMessage('Please enter a valid email address', 'red');
                return;
            }
            
            // If everything is fine
            showMessage(`Thanks ${name}! Your message has been sent.`, 'green');
            
            // Clear the form
            form.reset();
        });
    }
    
    // Helper function to show messages
    function showMessage(text, color) {
        formMessage.innerHTML = text;
        formMessage.style.color = color;
        
        // Hide message after 3 seconds
        setTimeout(() => {
            formMessage.innerHTML = '';
        }, 3000);
    }
    
    // ========== 4. ADD HOVER EFFECT TO CARDS (OPTIONAL) ==========
    // This adds a cool effect when you hover over skill and project cards
    
    const cards = document.querySelectorAll('.skill-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ========== 5. SIMPLE SCROLL REVEAL (FADE IN) ==========
    // Makes elements fade in when scrolling
    
    // Create observer to detect when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Apply to skill cards and project cards
    const hiddenElements = document.querySelectorAll('.skill-card, .project-card');
    hiddenElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
    
}); 