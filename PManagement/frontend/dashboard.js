const API_URL = 'http://localhost:5000/api';

// --- INITIAL LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    loadDashboardData();

    const projectForm = document.getElementById('project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', handleFormSubmit);
    }
});

// --- API FUNCTIONS ---
async function loadDashboardData() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/projects`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const projects = await response.json();
        renderProjects(projects);
        updateStats(projects);
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('proj-title').value;
    const description = document.getElementById('proj-desc').value;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });

        if (response.ok) {
            document.getElementById('project-form').reset();
            closeModal();
            loadDashboardData();
        }
    } catch (err) {
        console.error("Create error:", err);
    }
}

// --- DELETE FUNCTION (Only define this ONCE) ---
async function deleteProject(id) {
    if (!confirm("Are you sure?")) return;
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_URL}/projects/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) loadDashboardData();
    } catch (err) {
        console.error("Delete error:", err);
    }
}

// --- UI CONTROLS ---
function showModal() {
    document.getElementById('projectModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

function renderProjects(projects) {
    const container = document.getElementById('project-list');
    if (!container) return;
    container.innerHTML = projects.map(p => `
        <div class="card">
            <h4>${p.title}</h4>
            <p>${p.description || ''}</p>
            <button onclick="deleteProject('${p._id}')" class="btn-delete">Delete</button>
        </div>
    `).join('');
}

function updateStats(projects) {
    document.getElementById('stat-projects').innerText = projects.length;
}