// Sample alumni data
const alumniData = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Senior Software Engineer",
        company: "Google",
        domain: "software",
        batch: "2020",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        email: "sarah.johnson@google.com",
        linkedin: "https://linkedin.com/in/sarahjohnson"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Data Scientist",
        company: "Microsoft",
        domain: "data",
        batch: "2021",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        email: "michael.chen@microsoft.com",
        linkedin: "https://linkedin.com/in/michaelchen"
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Product Manager",
        company: "Amazon",
        domain: "product",
        batch: "2022",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        email: "emily.rodriguez@amazon.com",
        linkedin: "https://linkedin.com/in/emilyrodriguez"
    },
    {
        id: 4,
        name: "David Kim",
        role: "UX Designer",
        company: "Apple",
        domain: "design",
        batch: "2021",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        email: "david.kim@apple.com",
        linkedin: "https://linkedin.com/in/davidkim"
    },
    {
        id: 5,
        name: "Lisa Wang",
        role: "Marketing Manager",
        company: "Meta",
        domain: "marketing",
        batch: "2023",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        email: "lisa.wang@meta.com",
        linkedin: "https://linkedin.com/in/lisawang"
    },
    {
        id: 6,
        name: "James Wilson",
        role: "Backend Engineer",
        company: "Netflix",
        domain: "software",
        batch: "2020",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        email: "james.wilson@netflix.com",
        linkedin: "https://linkedin.com/in/jameswilson"
    }
];

// Sample requests data
let userRequests = [
    {
        id: 1,
        alumniId: 1,
        alumniName: "Sarah Johnson",
        alumniRole: "Senior Software Engineer",
        alumniCompany: "Google",
        alumniAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        type: "mentorship",
        message: "I'm looking for guidance on system design interviews and would love to learn from your experience at Google.",
        status: "pending",
        date: "2024-01-15"
    },
    {
        id: 2,
        alumniId: 3,
        alumniName: "Emily Rodriguez",
        alumniRole: "Product Manager",
        alumniCompany: "Amazon",
        alumniAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        type: "mock-interview",
        message: "I have a product manager interview coming up and would appreciate a mock interview session.",
        status: "accepted",
        date: "2024-01-10"
    }
];

// DOM Elements
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

// Tab switching functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
        
        // Load appropriate data
        if (targetTab === 'search') {
            displayAlumni(alumniData);
        } else if (targetTab === 'requests') {
            displayRequests(userRequests);
        }
    });
});

// Search functionality
searchBtn.addEventListener('click', performSearch);

function performSearch() {
    const domain = domainFilter.value;
    const company = companyFilter.value;
    const batch = batchFilter.value;
    
    let filteredAlumni = alumniData.filter(alumni => {
        const domainMatch = !domain || alumni.domain === domain;
        const companyMatch = !company || alumni.company.toLowerCase() === company.toLowerCase();
        const batchMatch = !batch || alumni.batch === batch;
        
        return domainMatch && companyMatch && batchMatch;
    });
    
    displayAlumni(filteredAlumni);
}

// Display alumni in grid
function displayAlumni(alumni) {
    resultsCount.textContent = `${alumni.length} alumni found`;
    if (alumni.length === 0) {
        alumniList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No alumni found</h3>
                <p>Try adjusting your search filters</p>
            </div>
        `;
        return;
    }
    alumniList.innerHTML = alumni.map(alumni => {
        return `
        <div class="alumni-card">
            <div class="alumni-header">
                <img src="${alumni.avatar}" alt="${alumni.name}" class="alumni-avatar">
                <div class="alumni-info">
                    <h4>${alumni.name}</h4>
                    <p>${alumni.role}</p>
                    <p>${alumni.company}</p>
                </div>
            </div>
            <div class="alumni-details">
                <span>${alumni.domain}</span>
                <span>${alumni.batch}</span>
            </div>
            <button class="request-btn" onclick="openRequestModal(${alumni.id})">
                <i class="fas fa-paper-plane"></i> Send Request
            </button>
            <button class="request-btn" style="background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%); color: white; margin-top: 8px;" onclick="openLiveChatModal(${alumni.id}, '${alumni.name.replace(/'/g, "\\'")}')">
                <i class="fas fa-comments"></i> Request Live Chat
            </button>
        </div>
        `;
    }).join('');
}

// Request modal functionality
function openRequestModal(alumniId) {
    const alumni = alumniData.find(a => a.id === alumniId);
    if (!alumni) return;
    
    document.getElementById('modal-alumni-avatar').src = alumni.avatar;
    document.getElementById('modal-alumni-name').textContent = alumni.name;
    document.getElementById('modal-alumni-role').textContent = alumni.role;
    document.getElementById('modal-alumni-company').textContent = alumni.company;
    
    // Store alumni ID for form submission
    requestForm.setAttribute('data-alumni-id', alumniId);
    
    requestModal.style.display = 'block';
}

// Close modal
function closeRequestModal() {
    requestModal.style.display = 'none';
    requestForm.reset();
}

closeModal.addEventListener('click', closeRequestModal);
cancelRequest.addEventListener('click', closeRequestModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === requestModal) {
        closeRequestModal();
    }
});

// Handle request form submission
requestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const alumniId = parseInt(requestForm.getAttribute('data-alumni-id'));
    const requestType = document.getElementById('request-type').value;
    const message = document.getElementById('request-message').value;
    
    const alumni = alumniData.find(a => a.id === alumniId);
    
    // Create new request
    const newRequest = {
        id: userRequests.length + 1,
        alumniId: alumniId,
        alumniName: alumni.name,
        alumniRole: alumni.role,
        alumniCompany: alumni.company,
        alumniAvatar: alumni.avatar,
        type: requestType,
        message: message,
        status: 'pending',
        date: new Date().toISOString().split('T')[0]
    };
    
    userRequests.push(newRequest);
    
    // Show success message
    showToast('Request sent successfully!', 'success');
    
    // Close modal
    closeRequestModal();
    
    // Update requests display if on requests tab
    if (document.getElementById('requests').classList.contains('active')) {
        displayRequests(userRequests);
    }
});

// Display requests
function displayRequests(requests) {
    const activeFilter = document.querySelector('.request-tab-btn.active').getAttribute('data-request-type');
    
    let filteredRequests = requests;
    if (activeFilter !== 'all') {
        filteredRequests = requests.filter(req => req.status === activeFilter);
    }
    
    if (filteredRequests.length === 0) {
        requestsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>No requests found</h3>
                <p>${activeFilter === 'all' ? 'You haven\'t sent any requests yet.' : `No ${activeFilter} requests.`}</p>
            </div>
        `;
        return;
    }
    
    requestsList.innerHTML = filteredRequests.map(request => `
        <div class="request-item">
            <div class="request-header">
                <div class="request-alumni">
                    <img src="${request.alumniAvatar}" alt="${request.alumniName}">
                    <div class="request-alumni-info">
                        <h4>${request.alumniName}</h4>
                        <p>${request.alumniRole} at ${request.alumniCompany}</p>
                    </div>
                </div>
                <span class="request-status ${request.status}">${request.status}</span>
            </div>
            <div class="request-details">
                <span class="request-type">${request.type === 'mentorship' ? 'Mentorship' : 'Mock Interview'}</span>
                <p class="request-message">${request.message}</p>
                <p class="request-date">Sent on ${request.date}</p>
            </div>
        </div>
    `).join('');
}