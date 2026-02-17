async function loadProducts() {
    const container = document.getElementById("products");
    if (!container) return;

    try {
        const products = await apiRequest('/products');
        container.innerHTML = products.map(p => `
            <div class="card">
                <img src="${p.image || 'https://via.placeholder.com/300'}" alt="${p.name}">
                <div class="card-body">
                    <h3>${p.name}</h3>
                    <span class="price">₹${p.price.toLocaleString('en-IN')}</span>
                    <button class="btn btn-accent" onclick="addToCart('${p._id}')">Add to Cart</button>
                </div>
            </div>
        `).join('');
    } catch (err) { container.innerHTML = `<p>Error connecting to server.</p>`; }
}

async function addToCart(productId) {
    if (!getToken()) { alert("Please login first!"); return; }
    try {
        await apiRequest('/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        alert('Added to cart!');
    } catch (err) { alert(err.message); }
}

document.addEventListener('DOMContentLoaded', loadProducts);