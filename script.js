console.log('Student Dashboard Script Loaded');

// ----- Sample alumni data -----
const alumniData = [
    { id: 1, name: "Sarah Johnson", role: "Senior Software Engineer", company: "Google", domain: "software", batch: "2020", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face", email: "sarah.johnson@google.com", linkedin: "https://linkedin.com/in/sarahjohnson" },
    { id: 2, name: "Michael Chen", role: "Data Scientist", company: "Microsoft", domain: "data", batch: "2021", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", email: "michael.chen@microsoft.com", linkedin: "https://linkedin.com/in/michaelchen" },
    { id: 3, name: "Emily Rodriguez", role: "Product Manager", company: "Amazon", domain: "product", batch: "2022", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", email: "emily.rodriguez@amazon.com", linkedin: "https://linkedin.com/in/emilyrodriguez" },
    { id: 4, name: "David Kim", role: "UX Designer", company: "Apple", domain: "design", batch: "2021", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", email: "david.kim@apple.com", linkedin: "https://linkedin.com/in/davidkim" },
    { id: 5, name: "Lisa Wang", role: "Marketing Manager", company: "Meta", domain: "marketing", batch: "2023", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", email: "lisa.wang@meta.com", linkedin: "https://linkedin.com/in/lisawang" },
    { id: 6, name: "James Wilson", role: "Backend Engineer", company: "Netflix", domain: "software", batch: "2020", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", email: "james.wilson@netflix.com", linkedin: "https://linkedin.com/in/jameswilson" }
];

// ----- Load requests from localStorage -----
let userRequests = JSON.parse(localStorage.getItem('userRequests') || '[]');

// ----- DOM Elements -----
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const searchBtn = document.getElementById('search-btn');
const domainFilter = document.getElementById('domain-filter');
const companyFilter = document.getElementById('company-filter');
const batchFilter = document.getElementById('batch-filter');
const alumniList = document.getElementById('alumni-list');
const resultsCount = document.querySelector('.results-count');
const requestTabBtns = document.querySelectorAll('.request-tab-btn');
const requestsList = document.getElementById('requests-list');
const requestModal = document.getElementById('request-modal');
const closeModal = document.querySelector('.close-modal');
const cancelRequest = document.getElementById('cancel-request');
const requestForm = document.getElementById('request-form');
const toast = document.getElementById('toast');
const logoutBtn = document.querySelector('.logout-btn');

// ----- Toast notification -----
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
}
// ----- Update username dynamically -----
function updateUsername() {
    const userNameElem = document.querySelector('.user-name');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.name) {
        userNameElem.textContent = currentUser.name;
    } else {
        userNameElem.textContent = 'Guest';
    }
}

// Call this function on page load
document.addEventListener('DOMContentLoaded', () => {
    updateUsername();  // Update the username
    displayAlumni(alumniData);
    displayRequests(userRequests);
});

// ----- Display alumni -----
function displayAlumni(alumni) {
    resultsCount.textContent = `${alumni.length} alumni found`;

    if (alumni.length === 0) {
        alumniList.innerHTML = `<div class="empty-state"><i class="fas fa-search"></i><h3>No alumni found</h3><p>Try adjusting your search filters</p></div>`;
        return;
    }

    alumniList.innerHTML = alumni.map(a => `
        <div class="alumni-card">
            <div class="alumni-header">
                <img src="${a.avatar}" alt="${a.name}" class="alumni-avatar">
                <div class="alumni-info">
                    <h4>${a.name}</h4>
                    <p>${a.role}</p>
                    <p>${a.company}</p>
                </div>
            </div>
            <div class="alumni-details">
                <span>${a.domain}</span>
                <span>${a.batch}</span>
            </div>
            <button class="request-btn" onclick="openRequestModal(${a.id})">
                <i class="fas fa-paper-plane"></i> Send Request
            </button>
        </div>
    `).join('');
}

// ----- Open request modal -----
function openRequestModal(alumniId) {
    const alumni = alumniData.find(a => a.id === alumniId);
    if (!alumni) return;

    document.getElementById('modal-alumni-avatar').src = alumni.avatar;
    document.getElementById('modal-alumni-name').textContent = alumni.name;
    document.getElementById('modal-alumni-role').textContent = alumni.role;
    document.getElementById('modal-alumni-company').textContent = alumni.company;

    requestForm.setAttribute('data-alumni-id', alumniId);
    requestModal.style.display = 'block';
}

// ----- Close request modal -----
function closeRequestModal() {
    requestModal.style.display = 'none';
    requestForm.reset();
}

closeModal.addEventListener('click', closeRequestModal);
cancelRequest.addEventListener('click', closeRequestModal);
window.addEventListener('click', (e) => { if (e.target === requestModal) closeRequestModal(); });

// ----- Handle request form submission -----
requestForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const alumniId = parseInt(requestForm.getAttribute('data-alumni-id'));
    const requestType = document.getElementById('request-type').value;
    const message = document.getElementById('request-message').value;
    const alumni = alumniData.find(a => a.id === alumniId);

    const newRequest = {
        id: userRequests.length + 1,
        alumniId,
        alumniName: alumni.name,
        alumniRole: alumni.role,
        alumniCompany: alumni.company,
        alumniAvatar: alumni.avatar,
        type: requestType,
        message,
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
    };

    userRequests.push(newRequest);
    localStorage.setItem('userRequests', JSON.stringify(userRequests));

    showToast('Request sent successfully!', 'success');
    closeRequestModal();

    if (document.getElementById('requests').classList.contains('active')) {
        displayRequests(userRequests);
    }
});

// ----- Display requests -----
function displayRequests(requests) {
    const activeFilter = document.querySelector('.request-tab-btn.active').getAttribute('data-request-type');
    let filteredRequests = requests;

    if (activeFilter !== 'all') filteredRequests = requests.filter(req => req.status === activeFilter);

    if (filteredRequests.length === 0) {
        requestsList.innerHTML = `<div class="empty-state"><i class="fas fa-inbox"></i><h3>No requests found</h3><p>${activeFilter === 'all' ? 'You haven\'t sent any requests yet.' : `No ${activeFilter} requests.`}</p></div>`;
        return;
    }

    requestsList.innerHTML = filteredRequests.map(req => `
        <div class="request-item">
            <div class="request-header">
                <div class="request-alumni">
                    <img src="${req.alumniAvatar}" alt="${req.alumniName}">
                    <div class="request-alumni-info">
                        <h4>${req.alumniName}</h4>
                        <p>${req.alumniRole} at ${req.alumniCompany}</p>
                    </div>
                </div>
                <span class="request-status ${req.status}">${req.status}</span>
            </div>
            <div class="request-details">
                <span class="request-type">${req.type === 'mentorship' ? 'Mentorship' : 'Mock Interview'}</span>
                <p class="request-message">${req.message}</p>
                <p class="request-date">Sent on ${req.date}</p>
            </div>
        </div>
    `).join('');
}

// ----- Request tab filtering -----
requestTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        requestTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        displayRequests(userRequests);
    });
});

// ----- Tab switching -----
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
        if (targetTab === 'search') displayAlumni(alumniData);
        if (targetTab === 'requests') displayRequests(userRequests);
    });
});

// ----- Filters -----
[domainFilter, companyFilter, batchFilter].forEach(filter => {
    filter.addEventListener('change', () => {
        if (document.getElementById('search').classList.contains('active')) performSearch();
    });
});

function performSearch() {
    const domain = domainFilter.value;
    const company = companyFilter.value.toLowerCase();
    const batch = batchFilter.value;

    const filtered = alumniData.filter(a => 
        (!domain || a.domain === domain) &&
        (!company || a.company.toLowerCase() === company) &&
        (!batch || a.batch === batch)
    );

    displayAlumni(filtered);
}

// ----- Logout -----
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('currentUser');
            showToast('Logged out successfully!', 'success');
            setTimeout(() => window.location.href = 'login.html', 1000);
        }
    });
}

// ----- Initialize dashboard -----
document.addEventListener('DOMContentLoaded', () => {
    displayAlumni(alumniData);
    displayRequests(userRequests);
});
