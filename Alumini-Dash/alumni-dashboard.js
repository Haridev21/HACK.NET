// Global variables
let currentRating = 0;
let currentFilter = 'all';
let requests = [];
let testimonials = [];
let jobs = [];

// Sample data for demonstration
const sampleRequests = [
    {
        id: 1,
        student: "Sarah Johnson",
        email: "sarah.johnson@student.edu",
        subject: "Career Advice Request",
        message: "Hi! I'm a junior CS student and I'm really interested in getting into web development. Could you share some advice about breaking into the industry and what skills I should focus on?",
        status: "pending",
        date: "2024-01-15",
        time: "10:30 AM"
    },
    {
        id: 2,
        student: "Mike Chen",
        email: "mike.chen@student.edu",
        subject: "Internship Guidance",
        message: "Hello! I'm looking for summer internships and would love to get some tips on how to prepare for technical interviews. Your experience would be really valuable!",
        status: "pending",
        date: "2024-01-14",
        time: "2:15 PM"
    },
    {
        id: 3,
        student: "Emily Rodriguez",
        email: "emily.rodriguez@student.edu",
        subject: "Project Collaboration",
        message: "I'm working on a machine learning project and would appreciate some guidance on best practices and potential improvements. Would you be available for a quick chat?",
        status: "accepted",
        date: "2024-01-13",
        time: "9:45 AM"
    },
    {
        id: 4,
        student: "David Kim",
        email: "david.kim@student.edu",
        subject: "Networking Opportunity",
        message: "I'm attending a tech conference next month and would love to connect with you there. Could you share some networking tips?",
        status: "rejected",
        date: "2024-01-12",
        time: "4:20 PM"
    }
];

const sampleTestimonials = [
    {
        id: 1,
        title: "From Student to Software Engineer",
        content: "My journey from being a CS student to a software engineer at a top tech company was incredible. The skills I learned in college, combined with the mentorship I received from alumni, were invaluable. My advice to current students: focus on building real projects, network actively, and never stop learning.",
        category: "career-success",
        rating: 5,
        date: "2024-01-10",
        anonymous: false
    },
    {
        id: 2,
        title: "Overcoming Academic Challenges",
        content: "I struggled with algorithms and data structures initially, but with persistence and help from the community, I not only improved but also developed a passion for problem-solving. This foundation has been crucial in my career.",
        category: "challenges-overcome",
        rating: 4,
        date: "2024-01-05",
        anonymous: false
    }
];

const sampleJobs = [
    {
        id: 1,
        title: "Software Engineering Intern",
        company: "TechCorp Inc.",
        role: "backend-developer",
        type: "internship",
        location: "San Francisco, CA",
        description: "We're looking for a passionate software engineering intern to join our backend team. You'll work on developing scalable APIs, database design, and cloud infrastructure. This is a great opportunity to learn from experienced engineers and contribute to real-world projects.",
        referralLink: "https://techcorp.com/careers/intern-2024",
        deadline: "2024-02-15",
        date: "2024-01-10"
    },
    {
        id: 2,
        title: "Frontend Developer",
        company: "StartupXYZ",
        role: "frontend-developer",
        type: "full-time",
        location: "Remote",
        description: "Join our fast-growing startup as a frontend developer. You'll be responsible for building beautiful, responsive user interfaces using React, TypeScript, and modern CSS. We offer competitive salary, equity, and flexible work arrangements.",
        referralLink: "",
        deadline: "2024-03-01",
        date: "2024-01-08"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load sample data
    requests = [...sampleRequests];
    testimonials = [...sampleTestimonials];
    jobs = [...sampleJobs];
    
    // Initialize all components
    setupTabNavigation();
    setupDashboard();
    setupProfileForm();
    setupRequests();
    setupTestimonials();
    setupJobs();
    setupModal();
    setupToast();
    setupDarkMode();
    
    // Update initial stats
    updateDashboardStats();
    updateRequestBadge();
}

// Tab Navigation
function setupTabNavigation() {
    const navLinks = document.querySelectorAll('.nav-links li');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all nav links and tab contents
            navLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked nav link and corresponding tab
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Dashboard Setup
function setupDashboard() {
    loadRecentActivity();
}

function loadRecentActivity() {
    const activityList = document.getElementById('activity-list');
    const activities = [
        {
            type: 'request',
            title: 'New request from Sarah Johnson',
            description: 'Career advice request received',
            time: '2 hours ago'
        },
        {
            type: 'accepted',
            title: 'Request accepted',
            description: 'You accepted Emily Rodriguez\'s request',
            time: '1 day ago'
        },
        {
            type: 'testimonial',
            title: 'Testimonial submitted',
            description: 'Your testimonial was published',
            time: '3 days ago'
        }
    ];
    
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i class="fas ${getActivityIcon(activity.type)}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
            </div>
            <div class="activity-time">${activity.time}</div>
        </div>
    `).join('');
}

function getActivityIcon(type) {
    const icons = {
        'request': 'fa-envelope',
        'accepted': 'fa-check',
        'testimonial': 'fa-quote-left'
    };
    return icons[type] || 'fa-info-circle';
}

function updateDashboardStats() {
    const pendingCount = requests.filter(r => r.status === 'pending').length;
    const acceptedCount = requests.filter(r => r.status === 'accepted').length;
    const testimonialCount = testimonials.length;
    const jobsCount = jobs.length;
    
    document.getElementById('pending-requests').textContent = pendingCount;
    document.getElementById('accepted-requests').textContent = acceptedCount;
    document.getElementById('testimonials').textContent = testimonialCount;
    document.getElementById('posted-jobs').textContent = jobsCount;
}

// Profile Form Setup
function setupProfileForm() {
    const profileForm = document.getElementById('profile-form');
    
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            fullName: document.getElementById('full-name').value,
            email: document.getElementById('email').value,
            graduationYear: document.getElementById('graduation-year').value,
            major: document.getElementById('major').value,
            company: document.getElementById('company').value,
            position: document.getElementById('position').value,
            bio: document.getElementById('bio').value,
            linkedin: document.getElementById('linkedin').value,
            github: document.getElementById('github').value
        };
        
        // Simulate saving profile
        saveProfile(formData);
    });
}

function saveProfile(formData) {
    // Simulate API call
    setTimeout(() => {
        showToast('Profile updated successfully!', 'success');
        
        // Update user info in sidebar
        document.querySelector('.user-info h4').textContent = formData.fullName;
        document.querySelector('.user-info p').textContent = `Class of ${formData.graduationYear}`;
        
        // Update page header
        document.querySelector('.page-header h1').textContent = `Welcome back, ${formData.fullName.split(' ')[0]}!`;
    }, 1000);
}

// Requests Setup
function setupRequests() {
    loadRequests();
    setupRequestFilters();
}

function loadRequests() {
    const requestsList = document.getElementById('requests-list');
    const filteredRequests = filterRequests(requests, currentFilter);
    
    if (filteredRequests.length === 0) {
        requestsList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No ${currentFilter === 'all' ? '' : currentFilter} requests found.</p>
            </div>
        `;
        return;
    }
    
    requestsList.innerHTML = filteredRequests.map(request => `
        <div class="request-item" data-id="${request.id}">
            <div class="request-header">
                <div class="request-student">${request.student}</div>
                <div class="request-status ${request.status}">${request.status.charAt(0).toUpperCase() + request.status.slice(1)}</div>
            </div>
            <div class="request-content">
                <strong>${request.subject}</strong><br>
                ${request.message.substring(0, 150)}${request.message.length > 150 ? '...' : ''}
            </div>
            <div class="request-actions">
                ${request.status === 'pending' ? `
                    <button class="btn-accept" onclick="handleRequest(${request.id}, 'accepted')">
                        <i class="fas fa-check"></i> Accept
                    </button>
                    <button class="btn-reject" onclick="handleRequest(${request.id}, 'rejected')">
                        <i class="fas fa-times"></i> Reject
                    </button>
                ` : ''}
                <button class="btn btn-secondary" onclick="viewRequestDetails(${request.id})">
                    <i class="fas fa-eye"></i> View Details
                </button>
            </div>
        </div>
    `).join('');
}

function setupRequestFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            loadRequests();
        });
    });
}

function filterRequests(requests, filter) {
    if (filter === 'all') return requests;
    return requests.filter(request => request.status === filter);
}

function handleRequest(requestId, action) {
    const request = requests.find(r => r.id === requestId);
    if (request) {
        request.status = action;
        loadRequests();
        updateDashboardStats();
        updateRequestBadge();
        
        const actionText = action === 'accepted' ? 'accepted' : 'rejected';
        showToast(`Request ${actionText} successfully!`, 'success');
    }
}

function viewRequestDetails(requestId) {
    const request = requests.find(r => r.id === requestId);
    if (request) {
        const modal = document.getElementById('request-modal');
        const modalContent = document.getElementById('modal-content');
        
        modalContent.innerHTML = `
            <h2>${request.subject}</h2>
            <div style="margin: 1rem 0;">
                <strong>From:</strong> ${request.student} (${request.email})
            </div>
            <div style="margin: 1rem 0;">
                <strong>Date:</strong> ${request.date} at ${request.time}
            </div>
            <div style="margin: 1rem 0;">
                <strong>Status:</strong> 
                <span class="request-status ${request.status}">${request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
            </div>
            <div style="margin: 1rem 0;">
                <strong>Message:</strong>
                <p style="margin-top: 0.5rem; line-height: 1.6; color: #666;">${request.message}</p>
            </div>
            ${request.status === 'pending' ? `
                <div style="margin-top: 2rem; display: flex; gap: 1rem;">
                    <button class="btn-accept" onclick="handleRequest(${request.id}, 'accepted'); closeModal();">
                        <i class="fas fa-check"></i> Accept Request
                    </button>
                    <button class="btn-reject" onclick="handleRequest(${request.id}, 'rejected'); closeModal();">
                        <i class="fas fa-times"></i> Reject Request
                    </button>
                </div>
            ` : ''}
        `;
        
        modal.style.display = 'block';
    }
}

function updateRequestBadge() {
    const badge = document.getElementById('request-badge');
    const pendingCount = requests.filter(r => r.status === 'pending').length;
    badge.textContent = pendingCount;
    badge.style.display = pendingCount > 0 ? 'block' : 'none';
}

// Testimonials Setup
function setupTestimonials() {
    setupRatingStars();
    setupTestimonialForm();
    loadMyTestimonials();
}

function setupRatingStars() {
    const stars = document.querySelectorAll('.stars i');
    const ratingText = document.querySelector('.rating-text');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            currentRating = rating;
            
            // Update star display
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
            
            // Update rating text
            const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
            ratingText.textContent = ratingLabels[rating];
        });
        
        // Hover effects
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.style.color = '#ffa502';
                }
            });
        });
        
        star.addEventListener('mouseleave', function() {
            stars.forEach((s, index) => {
                if (index < currentRating) {
                    s.style.color = '#ffa502';
                } else {
                    s.style.color = '#ddd';
                }
            });
        });
    });
}

function setupTestimonialForm() {
    const testimonialForm = document.getElementById('testimonial-form');
    
    testimonialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (currentRating === 0) {
            showToast('Please provide a rating', 'error');
            return;
        }
        
        const formData = {
            title: document.getElementById('testimonial-title').value,
            content: document.getElementById('testimonial-content').value,
            category: document.getElementById('testimonial-category').value,
            rating: currentRating,
            anonymous: document.getElementById('testimonial-anonymous').checked
        };
        
        submitTestimonial(formData);
    });
}

function submitTestimonial(formData) {
    // Simulate API call
    setTimeout(() => {
        const newTestimonial = {
            id: testimonials.length + 1,
            ...formData,
            date: new Date().toISOString().split('T')[0]
        };
        
        testimonials.push(newTestimonial);
        
        // Reset form
        document.getElementById('testimonial-form').reset();
        currentRating = 0;
        
        // Reset stars
        document.querySelectorAll('.stars i').forEach(star => {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        });
        document.querySelector('.rating-text').textContent = 'Click to rate';
        
        // Update testimonials list
        loadMyTestimonials();
        updateDashboardStats();
        
        showToast('Testimonial submitted successfully!', 'success');
    }, 1000);
}

function loadMyTestimonials() {
    const testimonialsList = document.getElementById('my-testimonials');
    
    if (testimonials.length === 0) {
        testimonialsList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <i class="fas fa-quote-left" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No testimonials submitted yet.</p>
            </div>
        `;
        return;
    }
    
    testimonialsList.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-card">
            <div class="testimonial-header">
                <div class="testimonial-title">${testimonial.title}</div>
                <div class="testimonial-category">${formatCategory(testimonial.category)}</div>
            </div>
            <div class="testimonial-content">${testimonial.content}</div>
            <div class="testimonial-meta">
                <div>
                    <span>Rating: ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}</span>
                    ${testimonial.anonymous ? ' (Anonymous)' : ''}
                </div>
                <div>${testimonial.date}</div>
            </div>
        </div>
    `).join('');
}

function formatCategory(category) {
    return category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Modal Setup
function setupModal() {
    const modal = document.getElementById('request-modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    document.getElementById('request-modal').style.display = 'none';
}

// Toast Notifications
function setupToast() {
    // Toast functionality is handled by showToast function
}

function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatTime(timeString) {
    return timeString;
}

// Export functions for global access
window.handleRequest = handleRequest;
window.viewRequestDetails = viewRequestDetails;
window.closeModal = closeModal;

// Job Posting Functionality
function setupJobs() {
    setupJobForm();
    loadMyJobs();
}

function setupJobForm() {
    const jobForm = document.getElementById('job-form');
    
    jobForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            title: document.getElementById('job-title').value,
            company: document.getElementById('job-company').value,
            role: document.getElementById('job-role').value,
            type: document.getElementById('job-type').value,
            location: document.getElementById('job-location').value,
            description: document.getElementById('job-description').value,
            referralLink: document.getElementById('job-referral-link').value,
            deadline: document.getElementById('job-deadline').value
        };
        
        submitJob(formData);
    });
    
    // Set minimum date for deadline to today
    const deadlineInput = document.getElementById('job-deadline');
    const today = new Date().toISOString().split('T')[0];
    deadlineInput.min = today;
}

function submitJob(formData) {
    const newJob = {
        id: jobs.length + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0]
    };
    
    jobs.unshift(newJob); // Add to beginning of array
    loadMyJobs();
    updateDashboardStats();
    
    // Reset form
    document.getElementById('job-form').reset();
    
    showToast('Job posted successfully! It will appear on the /jobs page.', 'success');
}

function loadMyJobs() {
    const jobsList = document.getElementById('my-jobs');
    
    if (jobs.length === 0) {
        jobsList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <i class="fas fa-briefcase" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>No jobs posted yet.</p>
            </div>
        `;
        return;
    }
    
    jobsList.innerHTML = jobs.map(job => `
        <div class="job-card">
            <div class="job-header">
                <div>
                    <div class="job-title">${job.title}</div>
                    <div class="job-company">${job.company}</div>
                </div>
            </div>
            <div class="job-meta">
                <span class="job-tag">${formatRole(job.role)}</span>
                <span class="job-tag type">${formatJobType(job.type)}</span>
                <span class="job-tag location">${job.location}</span>
            </div>
            <div class="job-description" onclick="toggleJobDescription(this)">
                ${job.description}
            </div>
            <div class="job-footer">
                <div class="job-deadline">
                    <i class="fas fa-clock"></i> Deadline: ${formatDate(job.deadline)}
                </div>
                <div class="job-actions">
                    <button class="btn-edit" onclick="editJob(${job.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete" onclick="deleteJob(${job.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleJobDescription(element) {
    element.classList.toggle('expanded');
}

function editJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    // Populate form with job data
    document.getElementById('job-title').value = job.title;
    document.getElementById('job-company').value = job.company;
    document.getElementById('job-role').value = job.role;
    document.getElementById('job-type').value = job.type;
    document.getElementById('job-location').value = job.location;
    document.getElementById('job-description').value = job.description;
    document.getElementById('job-referral-link').value = job.referralLink;
    document.getElementById('job-deadline').value = job.deadline;
    
    // Switch to job form tab
    document.querySelector('[data-tab="post-job"]').click();
    
    showToast('Job loaded for editing. Update the form and click "Post Job" to save changes.', 'success');
}

function deleteJob(jobId) {
    if (confirm('Are you sure you want to delete this job posting?')) {
        jobs = jobs.filter(j => j.id !== jobId);
        loadMyJobs();
        updateDashboardStats();
        showToast('Job deleted successfully.', 'success');
    }
}

function formatRole(role) {
    return role.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function formatJobType(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
}

// Export job functions for global access
window.toggleJobDescription = toggleJobDescription;
window.editJob = editJob;
window.deleteJob = deleteJob;

// Dark Mode Functionality
function setupDarkMode() {
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    // Update button state
    updateDarkModeButton(savedTheme === 'dark');
    
    // Add click event listener
    darkModeBtn.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button state
        updateDarkModeButton(newTheme === 'dark');
        
        // Show toast notification
        const message = newTheme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled';
        showToast(message, 'success');
    });
}

function updateDarkModeButton(isDark) {
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const icon = darkModeBtn.querySelector('i');
    const text = darkModeBtn.querySelector('span');
    
    if (isDark) {
        icon.className = 'fas fa-sun';
        text.textContent = 'Light Mode';
        darkModeBtn.classList.add('active');
    } else {
        icon.className = 'fas fa-moon';
        text.textContent = 'Dark Mode';
        darkModeBtn.classList.remove('active');
    }
}
