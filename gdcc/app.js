const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
let cart = [];

// Fetch Products from Fake Store API
async function fetchProducts() {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.innerText = 'Loading products...';
    productList.appendChild(loadingIndicator);

    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Network response was not ok');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productList.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    } finally {
        productList.removeChild(loadingIndicator);
    }
}

// Display Products in the UI
function displayProducts(products) {
    productList.innerHTML = ''; // Clear any existing products
    products.forEach(product => {
        const productCard = `
            <div class="col-md-3">
                <div class="product-card">
                    <img src="${product.image}" alt="${product.title}" class="img-fluid" style="height: 200px;">
                    <h5>${product.title}</h5>
                    <p>₹${product.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Add item to cart
function addToCart(id, title, price, image) {
    const itemInCart = cart.find(item => item.id === id);
    if (itemInCart) {
        itemInCart.quantity += 1;
    } else {
        cart.push({ id, title, price, image, quantity: 1 });
    }
    renderCart();
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

// Render cart items in the UI
function renderCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="details">
                    <span>${item.title}</span><br>
                    <span>₹${item.price} x ${item.quantity}</span>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItems.innerHTML += cartItem;
    });

    const totalPrice = `
        <h5>Total: ₹${total.toFixed(2)}</h5>
    `;
    document.getElementById('cart-total').innerHTML = totalPrice;
}

// Initialize the application
fetchProducts();
