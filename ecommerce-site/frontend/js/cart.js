// frontend/js/cart.js

document.addEventListener('DOMContentLoaded', () => {
    loadCart();

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }
});

async function loadCart() {
    const cartItems = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');

    try {
        const cart = await apiRequest('/cart'); // GET /api/cart

        if (!cart || cart.length === 0) {
            cartItems.innerHTML = '<div class="cart-item-row">Your cart is empty.</div>';
            subtotalEl.innerText = '₹0';
            totalEl.innerText = '₹0';
            return;
        }

        let subtotal = 0;

        cartItems.innerHTML = cart.map(item => {
            const itemTotal = item.productId.price * item.quantity;
            subtotal += itemTotal;

            return `
                <div class="cart-item-row">
                    <div class="cart-item-info">
                        <h3>${item.productId.name}</h3>
                        <p>₹${item.productId.price.toLocaleString('en-IN')} × ${item.quantity}</p>
                    </div>

                    <div class="cart-item-price">
                        ₹${itemTotal.toLocaleString('en-IN')}
                    </div>

                    <div class="controls">
                        <button class="remove-btn" data-id="${item.productId._id}">
                            Remove
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Update totals
        subtotalEl.innerText = `₹${subtotal.toLocaleString('en-IN')}`;
        totalEl.innerText = `₹${subtotal.toLocaleString('en-IN')}`;

        // ✅ VERY IMPORTANT: Attach remove button listeners AFTER rendering
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = btn.dataset.id;
                removeFromCart(productId);
            });
        });

    } catch (error) {
        console.error('Cart Error:', error);
        cartItems.innerHTML = '<p>Error loading cart items.</p>';
    }
}

async function removeFromCart(productId) {
    try {
        await apiRequest(`/cart/remove/${productId}`, {
            method: 'DELETE'
        });

        // Reload cart after removing item
        loadCart();

    } catch (error) {
        console.error('Remove error:', error);
        alert('Failed to remove item');
    }
}
