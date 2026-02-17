// frontend/js/auth.js
console.log("Auth.js is loaded!"); // Debug line

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (!loginForm) {
        console.error("CRITICAL: login-form ID not found in HTML!");
        return;
    }

    console.log("Login form detected, listener attached."); // Debug line

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Button clicked!"); // This should appear in console

        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData);

        try {
            const result = await apiRequest('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            alert('Success!');
            window.location.href = 'index.html';
        } catch (err) {
            console.error("Login failed:", err);
            alert("Error: " + err.message);
        }
    });
});
    // REGISTER FORM
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(registerForm));
            try {
                await apiRequest('/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                alert('Account Created!'); window.location.href = 'login.html';
            } catch (err) { alert(err.message); }
        });
    }
;