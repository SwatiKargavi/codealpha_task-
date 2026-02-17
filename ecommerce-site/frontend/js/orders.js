// frontend/js/orders.js
document.addEventListener('DOMContentLoaded', async () => {
  const orderSummary = document.getElementById('order-summary');
  const placeOrderBtn = document.getElementById('place-order');

  // Load order summary
  async function loadSummary() {
    try {
      const cart = await apiRequest('/cart');
      const total = cart.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
      orderSummary.innerHTML = `
        <ul>${cart.map(item => `<li>${item.productId.name} x${item.quantity} - $${item.productId.price * item.quantity}</li>`).join('')}</ul>
        <p>Total: $${total}</p>
      `;
    } catch (error) {
      orderSummary.innerHTML = '<p>Error loading summary.</p>';
    }
  }

  // Place order
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', async () => {
      try {
        const result = await apiRequest('/orders/place', { method: 'POST' });
        alert('Order placed! ID: ' + result.orderId);
        window.location.href = 'index.html';
      } catch (error) {
        alert('Order failed: ' + error.message);
      }
    });
  }

  loadSummary();
});