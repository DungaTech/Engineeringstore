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

// Close search results when clicking outside
document.addEventListener('click', function(e) {
    if (!searchResults.contains(e.target) && e.target !== searchInput && e.target !== searchBtn) {
        searchResults.style.display = 'none';
    }
});