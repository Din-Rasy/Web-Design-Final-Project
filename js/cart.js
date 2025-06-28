// --- CART FUNCTIONALITY ---

// Load cart from localStorage and display items
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartStatus = document.getElementById('cart-status');
    const emptyCart = document.getElementById('empty-cart');
    const cartItems = document.getElementById('cart-items');
    const cartItemsContainer = document.querySelector('.cart-items-container');
    
    if (cart.length === 0) {
        // Show empty cart message
        cartStatus.textContent = 'Your cart is empty';
        emptyCart.style.display = 'block';
        cartItems.style.display = 'none';
        updateSummary(0);
        return;
    }
    
    // Show cart items
    cartStatus.textContent = `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`;
    emptyCart.style.display = 'none';
    cartItems.style.display = 'block';
    
    // Clear existing items
    cartItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach((item, idx) => {
        const total = (item.price * item.quantity);
        subtotal += total;
        
        // Create cart item element
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image || '../image/main course/Beef Burger.avif'}" alt="${item.name}" onerror="this.src='../image/main course/Beef Burger.avif'">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-description">${item.description || 'Delicious dish from our menu'}</p>
                <div class="cart-item-customizations">
                    ${item.customizations ? `<p class="customizations"><strong>Customizations:</strong> ${item.customizations}</p>` : ''}
                </div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateItemQuantity(${idx}, -1)">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateItemQuantity(${idx}, 1)">+</button>
            </div>
            <div class="cart-item-price">
                <span class="price-per-item">$${item.price.toFixed(2)} each</span>
                <span class="price-total">$${total.toFixed(2)}</span>
            </div>
            <div class="cart-item-actions">
                <button class="remove-btn" onclick="removeFromCart(${idx})">
                    <span>🗑️</span> Remove
                </button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    updateSummary(subtotal);
}

// Update item quantity
function updateItemQuantity(idx, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const newQuantity = cart[idx].quantity + change;
    
    if (newQuantity <= 0) {
        // Remove item if quantity becomes 0
        removeFromCart(idx);
        return;
    }
    
    if (newQuantity > 10) {
        alert('Maximum quantity per item is 10');
        return;
    }
    
    cart[idx].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Remove item from cart
function removeFromCart(idx) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const removedItem = cart[idx];
    cart.splice(idx, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show removal confirmation
    const cartStatus = document.getElementById('cart-status');
    cartStatus.textContent = `Removed "${removedItem.name}" from cart`;
    setTimeout(() => {
        loadCart();
    }, 1000);
}

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear your entire cart?')) {
        localStorage.removeItem('cart');
        loadCart();
    }
}

// Update order summary
function updateSummary(subtotal) {
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Checkout functionality
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Calculate total
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    // Show order confirmation
    const orderDetails = cart.map(item => 
        `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const confirmation = `Order Summary:\n\n${orderDetails}\n\nSubtotal: $${subtotal.toFixed(2)}\nTax: $${tax.toFixed(2)}\nTotal: $${total.toFixed(2)}\n\nThank you for your order! Your checkout is complete.`;
    
    alert(confirmation);
    
    // Clear cart after successful checkout
    localStorage.removeItem('cart');
    loadCart();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    
    // Add event listeners for buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('checkout-btn')) {
            proceedToCheckout();
        }
        if (e.target.classList.contains('clear-cart-btn')) {
            clearCart();
        }
    });
});

// Navbar background color
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#faf8f8';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = '#faf8f8';
        navbar.style.boxShadow = 'none';
    }
}); 