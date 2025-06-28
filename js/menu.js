// Sidebar filter functionality
const sidebarBtns = document.querySelectorAll('.sidebar-btn');
const menuSections = document.querySelectorAll('.category');
sidebarBtns.forEach(button => {
    button.addEventListener('click', () => {
        sidebarBtns.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;
        menuSections.forEach(section => {
            if (section.id === filter) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
        // Animate menu items after filtering
        setTimeout(animateMenuItems, 100);
    });
});
// Animate menu items on load
function animateMenuItems() {
    document.querySelectorAll('.category:not([style*="display: none"]) .menu-item').forEach((item, idx) => {
        item.classList.remove('animated');
        setTimeout(() => {
            item.classList.add('animated');
        }, 80 * idx);
    });
}
animateMenuItems();
// Shadow disappears when hovering image or text
document.querySelectorAll('.menu-item').forEach(menuItem => {
    const img = menuItem.querySelector('img');
    const title = menuItem.querySelector('.item-title');
    const desc = menuItem.querySelector('.item-description');
    [img, title, desc].forEach(el => {
        if (el) {
            el.addEventListener('mouseenter', () => menuItem.classList.add('no-shadow'));
            el.addEventListener('mouseleave', () => menuItem.classList.remove('no-shadow'));
        }
    });
});
// Filter state
let selectedPrice = 'all';
let selectedDiet = 'all';
// Price filter
document.querySelectorAll('.filter-btn-option[data-price]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn-option[data-price]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedPrice = btn.getAttribute('data-price');
        filterMenuItems();
    });
});
// Dietary filter
document.querySelectorAll('.filter-btn-option[data-diet]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn-option[data-diet]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedDiet = btn.getAttribute('data-diet');
        filterMenuItems();
    });
});
function filterMenuItems() {
    // Only filter visible section
    document.querySelectorAll('.category:not([style*="display: none"]) .menu-item').forEach(item => {
        let show = true;
        // Price
        const price = parseFloat(item.getAttribute('data-price'));
        if (selectedPrice === 'lt10' && price >= 10) show = false;
        if (selectedPrice === '10-20' && (price < 10 || price > 20)) show = false;
        if (selectedPrice === 'gt20' && price <= 20) show = false;
        // Diet
        const diet = item.getAttribute('data-diet') || '';
        if (selectedDiet !== 'all' && diet !== selectedDiet) show = false;
        item.style.display = show ? 'block' : 'none';
    });
}
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