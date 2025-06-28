// Animate form and info containers on load
function animateContactElements() {
    // Animate form container
    const formContainer = document.querySelector('.form-container');
    formContainer.classList.remove('animated');
    setTimeout(() => {
        formContainer.classList.add('animated');
    }, 100);
    // Animate info container
    const infoContainer = document.querySelector('.info-container');
    infoContainer.classList.remove('animated');
    setTimeout(() => {
        infoContainer.classList.add('animated');
    }, 200);
}
// Call animation on page load
window.addEventListener('DOMContentLoaded', () => {
    animateContactElements();
});
// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});
// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#faf8f8';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = '#faf8f8';
        navbar.style.boxShadow = 'none';
    }
});
// Highlight active nav link
window.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active-link');
        }
    });
}); 