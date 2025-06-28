// Animate dish sections on load
function animateDishSections() {
    // Animate dish header
    const dishHeader = document.querySelector('.dish-header');
    dishHeader.classList.remove('animated');
    setTimeout(() => {
        dishHeader.classList.add('animated');
    }, 100);
    // Animate description section
    const descriptionSection = document.querySelector('.description-section');
    descriptionSection.classList.remove('animated');
    setTimeout(() => {
        descriptionSection.classList.add('animated');
    }, 200);
    // Animate customization section
    const customizationSection = document.querySelector('.customization-section');
    customizationSection.classList.remove('animated');
    setTimeout(() => {
        customizationSection.classList.add('animated');
    }, 300);
}
// Call animation on page load
window.addEventListener('DOMContentLoaded', () => {
    animateDishSections();
});
// Size selection
const sizeOptions = document.querySelectorAll('.size-option');
sizeOptions.forEach(option => {
    option.addEventListener('click', () => {
        sizeOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
    });
});
// Cooking preference selection
const cookingOptions = document.querySelectorAll('.cooking-option');
cookingOptions.forEach(option => {
    option.addEventListener('click', () => {
        const radio = option.querySelector('input[type="radio"]');
        radio.checked = true;
    });
});
// Quantity selector
function updateQuantity(change) {
    const input = document.querySelector('.quantity-input');
    const newValue = Math.max(1, Math.min(10, parseInt(input.value) + change));
    input.value = newValue;
}
// Add to cart functionality
function addToCart() {
    const quantity = parseInt(document.querySelector('.quantity-input').value);
    const size = document.querySelector('.size-option.selected h3').textContent;
    const cooking = document.querySelector('input[name="cooking"]:checked').value;
    const addOns = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.nextElementSibling.textContent);
    
    // Get current dish information
    const dishKey = getDishFromURL();
    const dish = dishes[dishKey] || dishes["Classic Beef Burger"];
    
    // Calculate total price
    let basePrice = dish.price;
    if (size === 'Large') basePrice += 3.99;
    if (size === 'Double') basePrice += 6.99;
    
    let addOnsTotal = 0;
    addOns.forEach(addOn => {
        if (addOn === 'American Cheese') addOnsTotal += 1.50;
        if (addOn === 'Crispy Bacon') addOnsTotal += 2.99;
        if (addOn === 'Sautéed Mushrooms') addOnsTotal += 1.99;
        if (addOn === 'Fresh Avocado') addOnsTotal += 2.50;
        if (addOn === 'Pickled Jalapeños') addOnsTotal += 0.99;
        if (addOn === 'Extra House Sauce') addOnsTotal += 0.50;
    });
    
    const totalPrice = (basePrice + addOnsTotal);
    
    // Build customizations string
    const customizations = [];
    if (size !== 'Regular') customizations.push(`Size: ${size}`);
    customizations.push(`Cooking: ${cooking}`);
    if (addOns.length > 0) customizations.push(`Add-ons: ${addOns.join(', ')}`);
    
    // Build cart item object with detailed information
    const cartItem = {
        name: dish.name,
        image: dish.image,
        description: dish.description,
        quantity: quantity,
        price: totalPrice,
        customizations: customizations.join(' | ')
    };
    
    // Get cart from localStorage, add item, and save
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show success message
    alert(`${dish.name} has been added to your cart!`);
    
    // Redirect to cart page
    window.location.href = 'cart.html';
}
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
// --- DYNAMIC DISH DETAILS ---
const dishes = {
    "Classic Beef Burger": {
        name: "Classic Beef Burger",
        image: "../image/main course/Beef Burger.avif",
        price: 18.99,
        description: "Our signature Classic Beef Burger features a juicy, hand-formed beef patty made from premium ground beef, perfectly grilled to your preference. Topped with fresh lettuce, ripe tomatoes, onions, and our special house sauce. Served on a toasted brioche bun with your choice of cheese and sides.",
        ingredients: [
            "Premium Ground Beef Patty (6oz)",
            "Fresh Brioche Bun",
            "Crisp Lettuce",
            "Ripe Tomatoes",
            "Fresh Onions",
            "House Special Sauce",
            "American Cheese (optional)",
            "Sea Salt & Black Pepper"
        ],
        tags: ["🍔 Classic", "🥩 Beef", "🔥 Grilled"]
    },
    "BBQ Ribs": {
        name: "BBQ Ribs",
        image: "../image/main course/BBQ Ribs.avif",
        price: 25.00,
        description: "Slow-cooked, fall-off-the-bone ribs with our signature BBQ sauce.",
        ingredients: ["Pork Ribs", "BBQ Sauce", "Spices", "Salt", "Pepper"],
        tags: ["🍖 BBQ", "🥩 Pork"]
    },
    "Chicken Curry": {
        name: "Chicken Curry",
        image: "../image/main course/Chicken Curry.avif",
        price: 19.00,
        description: "Tender chicken in a rich, aromatic curry sauce, served with rice.",
        ingredients: ["Chicken", "Curry Sauce", "Rice", "Spices", "Vegetables"],
        tags: ["🍛 Curry", "🐔 Chicken"]
    },
    "Chicken Teriyaki": {
        name: "Chicken Teriyaki",
        image: "../image/main course/Chicken Teriyaki.jpg",
        price: 20.00,
        description: "Grilled chicken glazed with our homemade teriyaki sauce.",
        ingredients: ["Chicken", "Teriyaki Sauce", "Rice", "Vegetables"],
        tags: ["🍗 Chicken", "🍱 Teriyaki"]
    },
    "Chicken Wrap": {
        name: "Chicken Wrap",
        image: "../image/main course/Chicken Wrap.avif",
        price: 15.00,
        description: "Grilled chicken, fresh veggies, and a creamy dressing in a soft tortilla.",
        ingredients: ["Chicken", "Tortilla", "Vegetables", "Dressing"],
        tags: ["🌯 Wrap", "🐔 Chicken"]
    },
    "Egg Fried Noodles": {
        name: "Egg Fried Noodles",
        image: "../image/main course/Egg Fried Noodles.avif",
        price: 14.00,
        description: "Stir-fried noodles with egg, vegetables, and your choice of protein.",
        ingredients: ["Noodles", "Egg", "Vegetables", "Soy Sauce"],
        tags: ["🍜 Noodles", "🥚 Egg"]
    },
    "Fish and Chips": {
        name: "Fish and Chips",
        image: "../image/main course/Fish and Chips.avif",
        price: 17.00,
        description: "Crispy battered fish served with thick-cut fries and tartar sauce.",
        ingredients: ["Fish", "Potatoes", "Batter", "Tartar Sauce"],
        tags: ["🐟 Fish", "🍟 Fries"]
    },
    "Fried Rice": {
        name: "Fried Rice",
        image: "../image/main course/Fried Rice.avif",
        price: 13.00,
        description: "A classic fried rice with mixed vegetables, egg, and a savory sauce.",
        ingredients: ["Rice", "Egg", "Vegetables", "Soy Sauce"],
        tags: ["🍚 Rice", "🥕 Veg"]
    },
    "Grilled Chicken": {
        name: "Grilled Chicken",
        image: "../image/main course/Grilled Chicken.avif",
        price: 22.00,
        description: "Juicy grilled chicken breast served with a side of seasonal vegetables.",
        ingredients: ["Chicken Breast", "Vegetables", "Seasoning"],
        tags: ["🍗 Chicken", "🥦 Veg"]
    },
    "Korean Bibimbap": {
        name: "Korean Bibimbap",
        image: "../image/main course/Korean Bibimbap.avif",
        price: 21.00,
        description: "A vibrant bowl of rice, mixed vegetables, beef, and a fried egg.",
        ingredients: ["Rice", "Vegetables", "Beef", "Egg", "Gochujang"],
        tags: ["🍲 Bibimbap", "🥩 Beef"]
    },
    "Lasagna": {
        name: "Lasagna",
        image: "../image/main course/Lasagna.jpg",
        price: 20.00,
        description: "Layers of pasta, rich meat sauce, and melted cheese, baked to perfection.",
        ingredients: ["Pasta", "Meat Sauce", "Cheese", "Tomato Sauce"],
        tags: ["🍝 Pasta", "🧀 Cheese"]
    },
    "Pad Thai": {
        name: "Pad Thai",
        image: "../image/main course/Pad Thai.avif",
        price: 18.00,
        description: "Stir-fried rice noodles with shrimp, tofu, peanuts, and a tangy sauce.",
        ingredients: ["Rice Noodles", "Shrimp", "Tofu", "Peanuts", "Egg", "Tamarind Sauce"],
        tags: ["🍜 Noodles", "🍤 Shrimp"]
    },
    "Pho": {
        name: "Pho",
        image: "../image/main course/Pho.jpg",
        price: 16.00,
        description: "A hearty Vietnamese noodle soup with a flavorful broth and fresh herbs.",
        ingredients: ["Rice Noodles", "Beef", "Broth", "Herbs"],
        tags: ["🍲 Soup", "🥩 Beef"]
    },
    "Prime Rib Roast": {
        name: "Prime Rib Roast",
        image: "../image/main course/Prime Rib Roast.jpg",
        price: 35.00,
        description: "Slow-roasted prime rib, tender and juicy, served with au jus.",
        ingredients: ["Prime Rib", "Seasoning", "Au Jus"],
        tags: ["🥩 Beef", "🍖 Roast"]
    },
    "Roast Chicken Rice": {
        name: "Roast Chicken Rice",
        image: "../image/main course/Roast Chicken Rice.avif",
        price: 17.00,
        description: "Succulent roast chicken served with fragrant rice and a side of soup.",
        ingredients: ["Chicken", "Rice", "Soup", "Seasoning"],
        tags: ["🍗 Chicken", "🍚 Rice"]
    },
    "Seafood Symphony": {
        name: "Seafood Symphony",
        image: "../image/main course/Seafood Symphony.jpg",
        price: 28.00,
        description: "A delightful mix of fresh seafood in a light, savory broth.",
        ingredients: ["Seafood", "Broth", "Vegetables"],
        tags: ["🦐 Seafood", "🍲 Soup"]
    },
    "Spaghetti Bolognese": {
        name: "Spaghetti Bolognese",
        image: "../image/main course/Spaghetti Bolognese.jpg",
        price: 19.00,
        description: "A classic Italian dish with a rich, slow-cooked meat sauce.",
        ingredients: ["Spaghetti", "Meat Sauce", "Tomato", "Cheese"],
        tags: ["🍝 Pasta", "🥩 Beef"]
    },
    "Steak and Fries": {
        name: "Steak and Fries",
        image: "../image/main course/Steak and Fries.avif",
        price: 26.00,
        description: "A perfectly cooked steak served with a generous portion of crispy fries.",
        ingredients: ["Steak", "Potatoes", "Seasoning"],
        tags: ["🥩 Steak", "🍟 Fries"]
    },
    "Sushi Combo": {
        name: "Sushi Combo",
        image: "../image/main course/Sushi Combo.avif",
        price: 24.00,
        description: "A beautiful assortment of fresh sushi and sashimi.",
        ingredients: ["Sushi", "Sashimi", "Rice", "Seaweed"],
        tags: ["🍣 Sushi", "🐟 Fish"]
    },
    "Tacos": {
        name: "Tacos",
        image: "../image/main course/Tacos.avif",
        price: 16.00,
        description: "Three delicious tacos with your choice of filling, topped with fresh salsa.",
        ingredients: ["Tortilla", "Meat", "Salsa", "Vegetables"],
        tags: ["🌮 Tacos", "🥗 Veg"]
    },
    "Tonkatsu": {
        name: "Tonkatsu",
        image: "../image/main course/Tonkatsu .avif",
        price: 21.00,
        description: "A crispy, breaded pork cutlet served with a tangy tonkatsu sauce.",
        ingredients: ["Pork Cutlet", "Breadcrumbs", "Tonkatsu Sauce"],
        tags: ["🐖 Pork", "🍱 Japanese"]
    },
    "Truffle Tagliatelle": {
        name: "Truffle Tagliatelle",
        image: "../image/main course/Truffle Tagliatelle.jpg",
        price: 23.00,
        description: "Fresh pasta tossed in a creamy truffle sauce, a true delicacy.",
        ingredients: ["Tagliatelle", "Truffle Cream Sauce", "Parmesan"],
        tags: ["🍝 Pasta", "🍄 Truffle"]
    },
    "Classic Apple Pie": {
        name: "Classic Apple Pie",
        image: "../image/Dessert/Apple Pie.jpg",
        price: 8.00,
        description: "Warm apple pie with a flaky crust, served with vanilla ice cream.",
        ingredients: ["Apples", "Pie Crust", "Sugar", "Cinnamon", "Butter", "Vanilla Ice Cream"],
        tags: ["🥧 Dessert", "🍏 Apple"]
    },
    "Banana Split": {
        name: "Banana Split",
        image: "../image/Dessert/Banana Split.jpg",
        price: 12.00,
        description: "Three scoops of ice cream with banana, whipped cream, and toppings.",
        ingredients: ["Banana", "Ice Cream", "Whipped Cream", "Chocolate Syrup", "Cherries"],
        tags: ["🍌 Banana", "🍨 Ice Cream"]
    },
    "Chocolate Brownies": {
        name: "Chocolate Brownies",
        image: "../image/Dessert/Brownies.avif",
        price: 7.00,
        description: "Rich, fudgy brownies with a crispy top, served warm.",
        ingredients: ["Chocolate", "Butter", "Sugar", "Eggs", "Flour"],
        tags: ["🍫 Chocolate", "🍰 Dessert"]
    },
    "New York Cheesecake": {
        name: "New York Cheesecake",
        image: "../image/Dessert/Cheesecake.avif",
        price: 9.00,
        description: "Creamy cheesecake with a graham cracker crust and berry compote.",
        ingredients: ["Cream Cheese", "Graham Cracker Crust", "Berries", "Sugar", "Eggs"],
        tags: ["🍰 Cheesecake", "🍓 Berry"]
    },
    "Chocolate Layer Cake": {
        name: "Chocolate Layer Cake",
        image: "../image/Dessert/Chocolate Cake.jpg",
        price: 10.00,
        description: "Decadent chocolate cake with rich ganache frosting.",
        ingredients: ["Chocolate Cake", "Ganache", "Flour", "Eggs", "Sugar"],
        tags: ["🍫 Chocolate", "🍰 Cake"]
    },
    "Churros": {
        name: "Churros",
        image: "../image/Dessert/Churros.jpg",
        price: 8.00,
        description: "Crispy fried dough sticks dusted with cinnamon sugar, served with chocolate sauce.",
        ingredients: ["Dough", "Cinnamon Sugar", "Chocolate Sauce"],
        tags: ["🍩 Churros", "🍫 Chocolate"]
    },
    "Fresh Baked Cookies": {
        name: "Fresh Baked Cookies",
        image: "../image/Dessert/Cookies.avif",
        price: 6.00,
        description: "Warm chocolate chip cookies served with a glass of milk.",
        ingredients: ["Flour", "Sugar", "Chocolate Chips", "Butter", "Eggs"],
        tags: ["🍪 Cookies", "🥛 Milk"]
    },
    "French Crepes": {
        name: "French Crepes",
        image: "../image/Dessert/Crepes.jpg",
        price: 11.00,
        description: "Thin, delicate crepes filled with Nutella and fresh strawberries.",
        ingredients: ["Crepe Batter", "Nutella", "Strawberries"],
        tags: ["🥞 Crepes", "🍓 Strawberry"]
    },
    "Gourmet Cupcakes": {
        name: "Gourmet Cupcakes",
        image: "../image/Dessert/Cupcakes.jpg",
        price: 7.00,
        description: "Moist cupcakes with buttercream frosting and decorative toppings.",
        ingredients: ["Cupcake Batter", "Buttercream", "Decorations"],
        tags: ["🧁 Cupcake", "🍰 Dessert"]
    },
    "Artisan Donuts": {
        name: "Artisan Donuts",
        image: "../image/Dessert/Donuts.avif",
        price: 5.00,
        description: "Freshly made donuts with various glazes and toppings.",
        ingredients: ["Dough", "Glaze", "Toppings"],
        tags: ["🍩 Donut", "🍬 Sweet"]
    },
    "Fresh Fruit Tart": {
        name: "Fresh Fruit Tart",
        image: "../image/Dessert/Fruit Tart.jpg",
        price: 9.00,
        description: "Buttery pastry shell filled with custard and topped with seasonal fruits.",
        ingredients: ["Pastry Shell", "Custard", "Fruit"],
        tags: ["🥧 Tart", "🍓 Fruit"]
    },
    "Ice Cream Sundae": {
        name: "Ice Cream Sundae",
        image: "../image/Dessert/Ice Cream Sundae.avif",
        price: 10.00,
        description: "Vanilla ice cream topped with hot fudge, nuts, and a cherry.",
        ingredients: ["Ice Cream", "Hot Fudge", "Nuts", "Cherry"],
        tags: ["🍨 Sundae", "🍒 Cherry"]
    },
    "Chocolate Lava Cake": {
        name: "Chocolate Lava Cake",
        image: "../image/Dessert/Lava Cake.jpg",
        price: 11.00,
        description: "Warm chocolate cake with a molten center, served with vanilla ice cream.",
        ingredients: ["Chocolate Cake", "Ice Cream", "Molten Center"],
        tags: ["🍫 Chocolate", "🍰 Cake"]
    },
    "French Macarons": {
        name: "French Macarons",
        image: "../image/Dessert/Macarons.avif",
        price: 8.00,
        description: "Delicate almond cookies with various flavored fillings.",
        ingredients: ["Almond Flour", "Egg Whites", "Sugar", "Filling"],
        tags: ["🍬 Macaron", "🍰 Dessert"]
    },
    "Matcha Parfait": {
        name: "Matcha Parfait",
        image: "../image/Dessert/Matcha Parfait.avif",
        price: 12.00,
        description: "Layered dessert with matcha ice cream, red bean paste, and mochi.",
        ingredients: ["Matcha Ice Cream", "Red Bean", "Mochi"],
        tags: ["🍵 Matcha", "🍧 Parfait"]
    },
    "Milkshake Cake": {
        name: "Milkshake Cake",
        image: "../image/Dessert/Milkshake Cake.avif",
        price: 13.00,
        description: "Cake served in a milkshake glass with whipped cream and sprinkles.",
        ingredients: ["Cake", "Whipped Cream", "Sprinkles"],
        tags: ["🍰 Cake", "🥤 Milkshake"]
    },
    "Mochi Ice Cream": {
        name: "Mochi Ice Cream",
        image: "../image/Dessert/Mochi.jpg",
        price: 7.00,
        description: "Sweet rice dough filled with various ice cream flavors.",
        ingredients: ["Mochi", "Ice Cream"],
        tags: ["🍡 Mochi", "🍨 Ice Cream"]
    },
    "Vanilla Pudding": {
        name: "Vanilla Pudding",
        image: "../image/Dessert/Pudding.jpg",
        price: 6.00,
        description: "Smooth vanilla pudding topped with fresh berries.",
        ingredients: ["Milk", "Sugar", "Vanilla", "Berries"],
        tags: ["🍮 Pudding", "🍓 Berry"]
    },
    "Strawberry Shortcake": {
        name: "Strawberry Shortcake",
        image: "../image/Dessert/Strawberry Shortcake.avif",
        price: 9.00,
        description: "Light sponge cake layered with fresh strawberries and whipped cream.",
        ingredients: ["Sponge Cake", "Strawberries", "Whipped Cream"],
        tags: ["🍰 Cake", "🍓 Strawberry"]
    },
    "Tiramisu": {
        name: "Tiramisu",
        image: "../image/Dessert/Tiramisu.avif",
        price: 10.00,
        description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.",
        ingredients: ["Ladyfingers", "Coffee", "Mascarpone", "Cocoa Powder"],
        tags: ["🍰 Tiramisu", "☕ Coffee"]
    },
    "Avocado Shake": {
        name: "Avocado Shake",
        image: "../image/Drinks/Avocado Shake.avif",
        price: 6.00,
        description: "Creamy avocado blended with milk and a touch of sweetness.",
        ingredients: ["Avocado", "Milk", "Sugar", "Ice"],
        tags: ["🥑 Avocado", "🥤 Drink"]
    },
    "Mixed Berry Juice": {
        name: "Mixed Berry Juice",
        image: "../image/Drinks/Berry Juice.avif",
        price: 5.00,
        description: "Fresh blend of strawberries, blueberries, and raspberries.",
        ingredients: ["Strawberries", "Blueberries", "Raspberries", "Sugar", "Water"],
        tags: ["🍓 Berry", "🥤 Juice"]
    },
    "Coca-Cola": {
        name: "Coca-Cola",
        image: "../image/Drinks/Coca-Cola.avif",
        price: 3.00,
        description: "Classic Coca-Cola served ice cold with a slice of lemon.",
        ingredients: ["Coca-Cola", "Lemon", "Ice"],
        tags: ["🥤 Soda", "🍋 Lemon"]
    },
    "Fresh Coconut Water": {
        name: "Fresh Coconut Water",
        image: "../image/Drinks/Coconut Water.avif",
        price: 4.00,
        description: "Pure, refreshing coconut water straight from the coconut.",
        ingredients: ["Coconut Water"],
        tags: ["🥥 Coconut", "🥤 Drink"]
    },
    "Ginger Lemon Drink": {
        name: "Ginger Lemon Drink",
        image: "../image/Drinks/Ginger Lemon Drink.jpg",
        price: 5.00,
        description: "Refreshing blend of fresh ginger and lemon with honey.",
        ingredients: ["Ginger", "Lemon", "Honey", "Water"],
        tags: ["🍋 Lemon", "🫚 Ginger"]
    },
    "Hot Chocolate": {
        name: "Hot Chocolate",
        image: "../image/Drinks/Hot Chocolate.jpg",
        price: 4.00,
        description: "Rich, creamy hot chocolate topped with marshmallows.",
        ingredients: ["Cocoa", "Milk", "Sugar", "Marshmallows"],
        tags: ["🍫 Chocolate", "🥤 Hot Drink"]
    },
    "Iced Coffee": {
        name: "Iced Coffee",
        image: "../image/Drinks/Iced Coffee.avif",
        price: 4.00,
        description: "Smooth iced coffee with a splash of cream and sugar.",
        ingredients: ["Coffee", "Ice", "Cream", "Sugar"],
        tags: ["☕ Coffee", "🧊 Iced"]
    },
    "Iced Latte": {
        name: "Iced Latte",
        image: "../image/Drinks/Iced Latte.avif",
        price: 5.00,
        description: "Espresso with cold milk and a layer of foam.",
        ingredients: ["Espresso", "Milk", "Ice", "Foam"],
        tags: ["☕ Latte", "🧊 Iced"]
    },
    "Lemon Tea": {
        name: "Lemon Tea",
        image: "../image/Drinks/Lemon Tea.avif",
        price: 3.00,
        description: "Fresh brewed tea with a slice of lemon and honey.",
        ingredients: ["Tea", "Lemon", "Honey"],
        tags: ["🍋 Lemon", "🍵 Tea"]
    },
    "Lime Soda": {
        name: "Lime Soda",
        image: "../image/Drinks/Lime Soda.avif",
        price: 4.00,
        description: "Sparkling soda with fresh lime juice and mint.",
        ingredients: ["Soda", "Lime", "Mint"],
        tags: ["🍋 Lime", "🥤 Soda"]
    },
    "Fresh Mango Juice": {
        name: "Fresh Mango Juice",
        image: "../image/Drinks/Mango Juice.avif",
        price: 5.00,
        description: "Sweet and tangy mango juice made from fresh mangoes.",
        ingredients: ["Mango", "Sugar", "Water"],
        tags: ["🥭 Mango", "🥤 Juice"]
    },
    "Milk Tea": {
        name: "Milk Tea",
        image: "../image/Drinks/Milk Tea.avif",
        price: 4.00,
        description: "Smooth black tea with creamy milk and optional boba pearls.",
        ingredients: ["Black Tea", "Milk", "Sugar", "Boba Pearls (optional)"],
        tags: ["🧋 Milk Tea", "🍵 Tea"]
    },
    "Virgin Mint Mojito": {
        name: "Virgin Mint Mojito",
        image: "../image/Drinks/Mint Mojito (Non-Alcoholic).avif",
        price: 6.00,
        description: "Refreshing mint, lime, and soda water with a splash of simple syrup.",
        ingredients: ["Mint", "Lime", "Soda Water", "Simple Syrup"],
        tags: ["🌱 Mint", "🍹 Mojito"]
    },
    "Fresh Orange Juice": {
        name: "Fresh Orange Juice",
        image: "../image/Drinks/Orange Juice.avif",
        price: 4.00,
        description: "100% fresh squeezed orange juice, no pulp.",
        ingredients: ["Orange"],
        tags: ["🍊 Orange", "🥤 Juice"]
    },
    "Peach Iced Tea": {
        name: "Peach Iced Tea",
        image: "../image/Drinks/Peach Iced Tea.avif",
        price: 4.00,
        description: "Refreshing iced tea with natural peach flavor.",
        ingredients: ["Tea", "Peach Flavor", "Ice"],
        tags: ["🍑 Peach", "🍵 Tea"]
    },
    "Mixed Fruit Smoothie": {
        name: "Mixed Fruit Smoothie",
        image: "../image/Drinks/Smoothie.avif",
        price: 7.00,
        description: "Blend of seasonal fruits with yogurt and honey.",
        ingredients: ["Seasonal Fruits", "Yogurt", "Honey", "Ice"],
        tags: ["🍓 Fruit", "🥤 Smoothie"]
    },
    "Watermelon Slush": {
        name: "Watermelon Slush",
        image: "../image/Drinks/Watermelon Slush.avif",
        price: 5.00,
        description: "Frozen watermelon blended into a refreshing slush.",
        ingredients: ["Watermelon", "Ice", "Sugar"],
        tags: ["🍉 Watermelon", "🧊 Slush"]
    }
};
function getDishFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('dish');
}
function updateDishDetails() {
    const dishKey = getDishFromURL();
    const dish = dishes[dishKey] || dishes["Classic Beef Burger"];
    document.querySelector('.dish-title').textContent = dish.name;
    document.querySelector('.dish-image').src = dish.image;
    document.querySelector('.dish-image').alt = dish.name;
    document.querySelector('.dish-price').textContent = `$${dish.price}`;
    document.querySelector('.dish-description').textContent = dish.description;
    // Ingredients
    const ingList = document.querySelector('.ingredients-list');
    ingList.innerHTML = '';
    dish.ingredients.forEach(ing => {
        const li = document.createElement('li');
        li.textContent = ing;
        ingList.appendChild(li);
    });
    // Tags
    const tagsDiv = document.querySelector('.dish-tags');
    tagsDiv.innerHTML = '';
    dish.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        tagsDiv.appendChild(span);
    });
}
window.addEventListener('DOMContentLoaded', updateDishDetails); 