const API_BASE = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

async function apiRequest(url, options = {}) {
    const token = getToken();
    if (token) {
        options.headers = { ...options.headers, Authorization: `Bearer ${token}` };
    }
    const response = await fetch(`${API_BASE}${url}`, options);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'API Error');
    return result;
}

function renderNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return; // Exit if navbar element is not found
    const token = getToken();

    // Apply the .navbar class directly to match your CSS perfectly
    nav.className = "navbar"; 

   nav.innerHTML = `
    <a href="index.html" class="logo">🛒 E-STORE</a>
    <div class="nav-links">
        <a href="index.html" class="nav-home">Home</a>
        ${token ? 
            `<a href="cart.html">Cart</a> <a href="#" id="logout">Logout</a>` 
            : `<a href="login.html">Login</a> <a href="register.html">Register</a>`}
    </div>
`;
;

    if (token) {
        document.getElementById('logout').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear(); // Clear token and user data
            window.location.href = 'index.html'; // Redirect to home
        });
    }
}
document.addEventListener('DOMContentLoaded', renderNavbar);