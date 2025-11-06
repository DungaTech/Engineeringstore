// Product Data
const products = [
    {
        id: 1,
        name: "Professional Drawing Board",
        price: 50000,
        image: "images/drawingboard.jpeg",
        category: "Civil Engineering",
        badge: "Best Seller",
        rating: 4.5,
        reviews: 24
    },
    {
        id: 2,
        name: "Safety Boots - Steel Toe",
        price: 40000,
        image: "images/boot.jpeg",
        category: "Civil Engineering",
        badge: "Popular",
        rating: 5,
        reviews: 18
    },
    {
        id: 3,
        name: "Engineering Calculator",
        price: 45000,
        image: "images/calculator.jpeg",
        category: "Computer Engineering",
        badge: "Essential",
        rating: 5,
        reviews: 32
    },
    {
        id: 4,
        name: "Lab Coat - White",
        price: 15000,
        image: "images/labcoat.jpeg",
        category: "Laboratory Engineering",
        badge: "New",
        rating: 4.5,
        reviews: 15
    },
    {
        id: 5,
        name: "Architectural Scale Ruler",
        price: 25000,
        image: "images/scale ruler.jpeg",
        category: "Civil Engineering",
        badge: "Essential",
        rating: 5,
        reviews: 28
    },
    {
        id: 6,
        name: "Professional Set Square",
        price: 18000,
        image: "images/setsquare.jpeg",
        category: "Civil Engineering",
        badge: "Popular",
        rating: 4.5,
        reviews: 21
    },
    {
        id: 7,
        name: "Aluminum T-Square",
        price: 32000,
        image: "images/t-square.jpeg",
        category: "Civil Engineering",
        badge: "Essential",
        rating: 5,
        reviews: 19
    },
    {
        id: 8,
        name: "A3 Drawing Papers (Pack of 50)",
        price: 35000,
        image: "images/A3.jpeg",
        category: "Civil Engineering",
        badge: "Value Pack",
        rating: 4.5,
        reviews: 26
    },
    {
        id: 9,
        name: "Engineer's Overcoat",
        price: 20000,
        image: "images/overcoats.jpeg",
        category: "Civil Engineering",
        badge: "Professional",
        rating: 5,
        reviews: 17
    },
    {
        id: 10,
        name: "Digital Multimeter",
        price: 65000,
        image: "images/multimeter.jpeg",
        category: "Electrical Engineering",
        badge: "Professional",
        rating: 4.5,
        reviews: 14
    },
    {
        id: 11,
        name: "Surface Stencils",
        price: 10000,
        image: "images/stensils.jpeg",
        category: "Civil Engineering",
        badge: "Specialized",
        rating: 5,
        reviews: 12
    },
    {
        id: 12,
        name: "Safety Helmets",
        price: 10000,
        image: "images/helmets.jpeg",
        category: "Civil Engineering",
        badge: "Safety",
        rating: 4.5,
        reviews: 23
    }
];

// Cart functionality
let cart = [];
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const cartCount = document.querySelector('.cart-count');
const subtotal = document.getElementById('subtotal');
const total = document.getElementById('total');
const checkoutBtn = document.getElementById('checkoutBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const productsContainer = document.getElementById('productsContainer');

// WhatsApp number for checkout
const WHATSAPP_NUMBER = "255763782257";

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    initializeEventListeners();
});

// Load products into the page
function loadProducts() {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

// Create product card HTML
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-product-id', product.id);

    const ratingStars = generateRatingStars(product.rating);

    productCard.innerHTML = `
        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        <div class="product-img" style="background-image: url('${product.image}')"></div>
        <div class="product-content">
            <h3>${product.name}</h3>
            <div class="product-price">TZS ${product.price.toLocaleString()}</div>
            <div class="product-rating">
                ${ratingStars}
                <span>(${product.reviews})</span>
            </div>
            <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    `;

    return productCard;
}

// Generate rating stars
function generateRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Initialize event listeners
function initializeEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
            const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');

            addToCart(id, name, price, image);
        }
    });

    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    searchBtn.addEventListener('click', handleSearch);

    // Cart modal controls
    cartIcon.addEventListener('click', () => {
        cartModal.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartModal.contains(e.target) && !cartIcon.contains(e.target)) {
            cartModal.classList.remove('active');
        }
    });

    // Checkout button
    checkoutBtn.addEventListener('click', checkoutOnWhatsApp);

    // Contact form submission - UPDATED WITH WHATSAPP INTEGRATION
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        let whatsappMessage = `*NEW MESSAGE FROM WEBSITE CONTACT FORM*\n\n`;
        whatsappMessage += `*Name:* ${name}\n`;
        whatsappMessage += `*Email:* ${email}\n`;
        whatsappMessage += `*Subject:* ${subject}\n`;
        whatsappMessage += `*Message:* ${message}\n`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');

        // Show success message
        showNotification('Message opened in WhatsApp!');

        // Clear form after sending
        this.reset();
    });

    // Initialize empty cart message
    emptyCart.style.display = 'block';
}

// Search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        searchResults.style.display = 'none';
        return;
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    displaySearchResults(filteredProducts, searchTerm);
}

// Display search results
function displaySearchResults(results, searchTerm) {
    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No products found</div>';
        searchResults.style.display = 'block';
        return;
    }

    results.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="search-result-info">
                <h4>${highlightSearchTerm(product.name, searchTerm)}</h4>
                <div class="price">TZS ${product.price.toLocaleString()}</div>
            </div>
        `;

        resultItem.addEventListener('click', () => {
            scrollToProduct(product.id);
            searchResults.style.display = 'none';
            searchInput.value = '';
        });

        searchResults.appendChild(resultItem);
    });

    searchResults.style.display = 'block';
}

// Highlight search term in results
function highlightSearchTerm(text, term) {
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Scroll to product
function scrollToProduct(productId) {
    const productElement = document.querySelector(`[data-product-id="${productId}"]`);
    if (productElement) {
        productElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Add highlight effect
        productElement.style.boxShadow = '0 0 0 3px var(--accent)';
        setTimeout(() => {
            productElement.style.boxShadow = '';
        }, 2000);
    }
}

// Cart functions
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    updateCart();
    cartModal.classList.add('active');

    // Show success message
    showNotification(`${name} added to cart!`);
}

function updateCart() {
    cartItems.innerHTML = '';
    let cartTotal = 0;

    if (cart.length === 0) {
        cartItems.appendChild(emptyCart);
        emptyCart.style.display = 'block';
    } else {
        emptyCart.style.display = 'none';

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            cartTotal += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img" style="background-image: url('${item.image}')"></div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">TZS ${item.price.toLocaleString()}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    subtotal.textContent = `TZS ${cartTotal.toLocaleString()}`;
    total.textContent = `TZS ${(cartTotal + 10000).toLocaleString()}`;
}

function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCart();
    } else if (item && item.quantity === 1) {
        removeFromCart(id);
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
    showNotification('Item removed from cart');
}

// WhatsApp Checkout Function
function checkoutOnWhatsApp() {
    if (cart.length === 0) {
        showNotification('Your cart is empty! Add some products before checking out.', 'error');
        return;
    }

    let message = "🛒 *ORDER FROM ENGINEERING DISCOUNT STORE*\n\n";
    message += "Hello! I would like to order the following items:\n\n";

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        message += `*${index + 1}. ${item.name}*\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Price: TZS ${item.price.toLocaleString()} each\n`;
        message += `   Total: TZS ${itemTotal.toLocaleString()}\n\n`;
    });

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const finalTotal = cartTotal + 10000;

    message += `📦 *Shipping:* TZS 10,000\n`;
    message += `💰 *Subtotal:* TZS ${cartTotal.toLocaleString()}\n`;
    message += `🎯 *Grand Total:* TZS ${finalTotal.toLocaleString()}\n\n`;
    message += `Please confirm availability and provide payment details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');

    // Clear cart after successful checkout
    cart = [];
    updateCart();
    cartModal.classList.remove('active');

    // Show success message
    showNotification('Order sent to WhatsApp successfully! We will contact you shortly.');
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Add styles for notification
    if (!document.querySelector('.notification-style')) {
        const style = document.createElement('style');
        style.className = 'notification-style';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                color: var(--dark);
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                border-left: 4px solid var(--success);
            }
            .notification.error {
                border-left-color: var(--danger);
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification i {
                font-size: 20px;
                color: var(--success);
            }
            .notification.error i {
                color: var(--danger);
            }
        `;
        document.head.appendChild(style);
    }

    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
/* ===== RESPONSIVE DESIGN ===== */

/* Base responsive settings */
html {
    font-size: 100%; /* 16px base */
    -webkit-text-size-adjust: 100%; /* Prevent font scaling in landscape */
}

/* Container adjustments for different screens */
.container {
    width: 92%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

/* Mobile-first responsive breakpoints */
@media (max-width: 1200px) {
    .container {
        width: 95%;
        max-width: 1140px;
    }

    html {
        font-size: 95%;
    }
}

/* Tablet devices */
@media (max-width: 992px) {
    .container {
        width: 97%;
        max-width: 960px;
    }

    html {
        font-size: 90%;
    }

    /* Adjust grid layouts for tablet */
    .categories,
    .products,
    .about-features {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    .about-content,
    .contact-content {
        grid-template-columns: 1fr;
        gap: 30px;
    }

    /* Header adjustments for tablet */
    .main-header {
        flex-direction: column;
        gap: 20px;
        text-align: center;
    }

    .search-box input {
        width: 280px;
    }

    /* Navigation adjustments */
    nav ul {
        flex-wrap: wrap;
        justify-content: center;
    }

    nav ul li {
        flex: 1 0 33.333%;
    }

    nav ul li a {
        text-align: center;
        padding: 12px 10px;
        font-size: 0.9rem;
    }

    /* Hero section adjustments */
    .hero {
        padding: 80px 0;
    }

    .hero h2 {
        font-size: 2.2rem;
    }

    .hero p {
        font-size: 1.1rem;
    }

    /* Section title adjustments */
    .section-title h2 {
        font-size: 1.8rem;
    }

    /* Stats grid adjustments */
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Mobile devices */
@media (max-width: 768px) {
    .container {
        width: 100%;
        padding: 0 20px;
    }

    html {
        font-size: 85%;
    }

    /* Single column layouts for mobile */
    .categories,
    .products,
    .about-features {
        grid-template-columns: 1fr;
        gap: 15px;
    }

    /* Header adjustments for mobile */
    .top-bar-content {
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }

    .contact-info {
        flex-direction: column;
        gap: 10px;
    }

    .search-box input {
        width: 250px;
    }

    /* Navigation adjustments for mobile */
    nav ul {
        flex-direction: column;
        border-radius: 0;
    }

    nav ul li {
        flex: 1;
    }

    nav ul li a {
        border-right: none;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        justify-content: center;
        padding: 15px;
    }

    /* Hero section mobile adjustments */
    .hero {
        padding: 60px 0;
    }

    .hero h2 {
        font-size: 1.8rem;
    }

    .hero p {
        font-size: 1rem;
        padding: 0 10px;
    }

    .hero-buttons {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .btn {
        width: 100%;
        max-width: 250px;
        text-align: center;
    }

    /* Section title mobile adjustments */
    .section-title {
        margin: 40px 0 30px;
    }

    .section-title h2 {
        font-size: 1.6rem;
    }

    /* Stats grid mobile adjustments */
    .stats-grid {
        grid-template-columns: 1fr;
        gap: 15px;
    }

    .stat-item {
        padding: 15px;
    }

    .stat-number {
        font-size: 1.8rem;
    }

    /* Footer adjustments for mobile */
    .footer-content {
        grid-template-columns: 1fr;
        gap: 30px;
        text-align: center;
    }

    .footer-logo {
        justify-content: center;
    }

    .footer-social {
        justify-content: center;
    }

    .footer-column h3:after {
        left: 50%;
        transform: translateX(-50%);
    }
}

/* Small mobile devices */
@media (max-width: 576px) {
    .container {
        padding: 0 15px;
    }

    html {
        font-size: 80%;
    }

    /* Further adjustments for very small screens */
    .search-box input {
        width: 200px;
        font-size: 14px;
    }

    .logo h1 {
        font-size: 1.2rem;
    }

    .logo span {
        font-size: 0.9rem;
    }

    .hero h2 {
        font-size: 1.5rem;
    }

    .hero p {
        font-size: 0.9rem;
    }

    .section-title h2 {
        font-size: 1.4rem;
    }

    /* Card adjustments for small screens */
    .category-card,
    .product-card,
    .feature-card {
        padding: 15px;
    }

    .category-content,
    .product-content {
        padding: 15px;
    }

    /* Form adjustments */
    .contact-form {
        padding: 20px;
    }

    .form-group input,
    .form-group textarea {
        padding: 10px 12px;
    }
}

/* Extra small devices (phones in landscape) */
@media (max-width: 480px) {
    .search-box input {
        width: 180px;
    }

    .cart-icon {
        font-size: 20px;
    }

    .hero {
        padding: 50px 0;
    }

    .hero h2 {
        font-size: 1.3rem;
    }
}

/* ===== FLEXIBLE IMAGES ===== */
img {
    max-width: 100%;
    height: auto;
    display: block;
}

/* ===== TOUCH-FRIENDLY ELEMENTS ===== */
@media (hover: none) and (pointer: coarse) {
    /* Increase touch target sizes */
    .btn,
    .btn-category,
    .add-to-cart,
    nav ul li a {
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Remove hover effects on touch devices */
    .category-card:hover,
    .product-card:hover,
    .feature-card:hover {
        transform: none;
    }

    /* Alternative feedback for touch devices */
    .category-card:active,
    .product-card:active,
    .feature-card:active {
        transform: scale(0.98);
    }
}

/* ===== ORIENTATION SPECIFIC STYLES ===== */
@media (max-width: 768px) and (orientation: landscape) {
    .hero {
        padding: 40px 0;
    }

    .hero h2 {
        font-size: 1.5rem;
    }
}

/* ===== PRINT STYLES ===== */
@media print {
    .top-bar,
    nav,
    .hero-buttons,
    .cart-icon,
    .footer-social {
        display: none !important;
    }

    .container {
        width: 100%;
        max-width: none;
    }

    body {
        background: white;
        color: black;
        font-size: 12pt;
        line-height: 1.4;
    }

    a {
        color: black;
        text-decoration: underline;
    }
}

/* ===== ACCESSIBILITY IMPROVEMENTS ===== */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    :root {
        --primary: #0000FF;
        --secondary: #000080;
        --accent: #FF0000;
    }

    .category-card,
    .product-card,
    .feature-card {
        border: 2px solid #000;
    }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    body {
        background: #1a1a1a;
        color: #e0e0e0;
    }

    .category-card,
    .product-card,
    .feature-card,
    .contact-info,
    .contact-form {
        background: #2d2d2d;
        color: #e0e0e0;
    }

    .search-box input,
    .form-group input,
    .form-group textarea {
        background: #2d2d2d;
        color: #e0e0e0;
        border-color: #555;
    }
}

/* ===== FLEXBOX FALLBACKS ===== */
/* Ensure flexbox works in older browsers */
.categories,
.products,
.about-features,
.footer-content {
    display: flex;
    flex-wrap: wrap;
}

.categories > *,
.products > *,
.about-features > *,
.footer-content > * {
    flex: 1 1 300px;
    margin: 10px;
}

/* ===== RESPONSIVE TYPOGRAPHY ===== */
/* Fluid typography using clamp() */
.hero h2 {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
}

.hero p {
    font-size: clamp(0.9rem, 2.5vw, 1.2rem);
}

.section-title h2 {
    font-size: clamp(1.4rem, 4vw, 2rem);
}

/* ===== SAFE AREA INSETS FOR NOTCHED DEVICES ===== */
@supports(padding: max(0px)) {
    .container,
    .hero,
    footer {
        padding-left: max(15px, env(safe-area-inset-left));
        padding-right: max(15px, env(safe-area-inset-right));
    }

    .hero {
        padding-top: max(60px, env(safe-area-inset-top));
    }

    footer {
        padding-bottom: max(30px, env(safe-area-inset-bottom));
    }
}

// Close search results when clicking outside
document.addEventListener('click', function(e) {
    if (!searchResults.contains(e.target) && e.target !== searchInput && e.target !== searchBtn) {
        searchResults.style.display = 'none';
    }
});