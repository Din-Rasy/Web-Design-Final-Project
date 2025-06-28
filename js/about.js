// Animate value cards and team members on load
function animateCards() {
    // Animate value cards
    document.querySelectorAll('.value-card').forEach((card, idx) => {
        card.classList.remove('animated');
        setTimeout(() => {
            card.classList.add('animated');
        }, 100 * idx);
    });
    // Animate team members
    document.querySelectorAll('.team-member').forEach((member, idx) => {
        member.classList.remove('animated');
        setTimeout(() => {
            member.classList.add('animated');
        }, 100 * idx);
    });
}
// Call animation on page load
window.addEventListener('DOMContentLoaded', () => {
    animateCards();
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