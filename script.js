// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            nom: document.getElementById('nom').value,
            email: document.getElementById('email').value,
            telephone: document.getElementById('telephone').value,
            restaurant: document.getElementById('restaurant').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Merci pour votre message! Nous vous contacterons bientôt.');

        // Reset form
        contactForm.reset();
    });
}

// Add active class to nav links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add scroll animation to feature cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card, .feature-row').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Mobile menu toggle (if you want to add a hamburger menu later)
const createMobileMenu = () => {
    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '☰';
    hamburger.style.display = 'none';

    // Add click event
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Insert hamburger before nav links
    nav.querySelector('.container').appendChild(hamburger);

    // Show hamburger on mobile
    const handleResize = () => {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
        } else {
            hamburger.style.display = 'none';
            navLinks.classList.remove('active');
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
};

// Initialize mobile menu
createMobileMenu();

// Form validation
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePhone = (phone) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone.replace(/\s/g, ''));
};

// Add real-time validation
document.getElementById('email')?.addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = 'red';
        showError(this, 'Veuillez entrer un email valide');
    } else {
        this.style.borderColor = '#e0e0e0';
        removeError(this);
    }
});

document.getElementById('telephone')?.addEventListener('blur', function() {
    if (this.value && !validatePhone(this.value)) {
        this.style.borderColor = 'red';
        showError(this, 'Veuillez entrer un numéro de téléphone valide');
    } else {
        this.style.borderColor = '#e0e0e0';
        removeError(this);
    }
});

function showError(element, message) {
    removeError(element);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    element.parentElement.appendChild(errorDiv);
}

function removeError(element) {
    const errorDiv = element.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}
