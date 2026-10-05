let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalItems;
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    alert(`${name} was added to your cart! 🧋`);
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);

    saveCart();
    displayCart();
    updateCartCount();
}

function increaseQuantity(name) {
    const item = cart.find(item => item.name === name);

    if (item) {
        item.quantity++;
    }

    saveCart();
    displayCart();
    updateCartCount();
}

function decreaseQuantity(name) {
    const item = cart.find(item => item.name === name);

    if (item) {
        item.quantity--;

        if (item.quantity <= 0) {
            removeFromCart(name);
            return;
        }
    }

    saveCart();
    displayCart();
    updateCartCount();
}

function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty:(</h2>
                <p>Go to the menu and add some delicious treats!</p>
                <a href="menu.html">Browse Menu</a>
            </div>
        `;

        if (cartTotal) {
            cartTotal.textContent = "€0.00";
        }

        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>€${item.price.toFixed(2)} each</p>
            </div>

            <div class="quantity-controls">
                <button onclick="decreaseQuantity('${item.name}')">
                    −
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity('${item.name}')">
                    +
                </button>
            </div>

            <div class="cart-item-price">
                €${itemTotal.toFixed(2)}
            </div>

            <button 
                class="remove-button"
                onclick="removeFromCart('${item.name}')">
                🗑️
            </button>
        `;

        cartContainer.appendChild(cartItem);
    });

    cartTotal.textContent = `€${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    displayCart();

    const addButtons = document.querySelectorAll(".add-to-cart");

    addButtons.forEach(button => {
        button.addEventListener("click", () => {

            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);

            addToCart(name, price);
        });
    });
});