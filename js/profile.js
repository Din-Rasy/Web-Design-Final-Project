// Animate profile card on load
function animateProfileCard() {
    const profileCard = document.querySelector('.profile-card');
    profileCard.classList.remove('animated');
    setTimeout(() => {
        profileCard.classList.add('animated');
    }, 100);
}
// Call animation on page load
window.addEventListener('DOMContentLoaded', () => {
    animateProfileCard();
});
// Form submission handling
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthdate: document.getElementById('birthdate').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zipCode: document.getElementById('zipCode').value,
        country: document.getElementById('country').value,
        currentPassword: document.getElementById('currentPassword').value,
        newPassword: document.getElementById('newPassword').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };
    // Simple validation
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        alert('New passwords do not match!');
        return;
    }
    // Here you would typically send the data to your server
    console.log('Profile data:', formData);
    alert('Profile updated successfully!');
});
// Password confirmation validation
document.getElementById('confirmPassword').addEventListener('input', function() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = this.value;
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
        this.style.borderColor = '#ff4040';
    } else {
        this.style.borderColor = '#eee';
    }
});
// Add scroll event listener to change navbar background
window.addEventListener('scroll', function() {
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