console.log('Login script loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');

    // DOM Elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForms = document.querySelectorAll('.login-form');
    const studentForm = document.getElementById('student-form');
    const signupModal = document.getElementById('signup-modal');
    const profileSetupModal = document.getElementById('profile-setup-modal');
    const showSignupBtn = document.getElementById('show-signup');
    const linkedinLoginBtn = document.getElementById('linkedin-login');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const cancelSignupBtn = document.getElementById('cancel-signup');
    const cancelProfileBtn = document.getElementById('cancel-profile');
    const signupForm = document.getElementById('signup-form');
    const profileSetupForm = document.getElementById('profile-setup-form');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const toast = document.getElementById('toast');

    // ----- Tab switching -----
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            loginForms.forEach(form => form.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            window.location.hash = targetTab;
        });
    });

    // ----- Toggle password visibility -----
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            input.type = input.type === 'password' ? 'text' : 'password';
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // ----- Close modals -----
    function closeModal(modal) { modal.style.display = 'none'; }

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });

    if (cancelSignupBtn) cancelSignupBtn.addEventListener('click', () => closeModal(signupModal));
    if (cancelProfileBtn) cancelProfileBtn.addEventListener('click', () => closeModal(profileSetupModal));
    window.addEventListener('click', (e) => { if (e.target.classList.contains('modal')) closeModal(e.target); });

    // ----- Toast -----
    function showToast(message, type = 'success') {
        if (toast) {
            toast.textContent = message;
            toast.className = `toast ${type}`;
            toast.classList.add('show');
            setTimeout(() => { toast.classList.remove('show'); }, 3000);
        } else {
            console.log('Toast:', message);
        }
    }

    // ----- Student login -----
    const loginStudentBtn = document.getElementById('login-student-btn');
    if (loginStudentBtn) {
        loginStudentBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = document.getElementById('student-email').value.trim();
            const password = document.getElementById('student-password').value;

            if (!email || !password) {
                showToast('Please enter email and password', 'error');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                showToast('Login successful! Redirecting...', 'success');
                setTimeout(() => { window.location.href = 'Student_dash.html'; }, 1000);
            } else {
                showToast('Invalid email or password', 'error');
            }
        });
    }

    // ----- Signup form -----
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('signup-fullname').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const graduation = document.getElementById('signup-graduation').value;
            const department = document.getElementById('signup-department').value;
            const position = document.getElementById('signup-position').value.trim();
            const password = document.getElementById('signup-password').value;

            if (!fullName || !email || !graduation || !department || !position || !password) {
                showToast('Please fill all signup fields', 'error');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.some(u => u.email === email)) {
                showToast('Email already exists. Login instead.', 'error');
                return;
            }

            const newUser = {
                fullName,
                email,
                graduationYear: graduation,
                department,
                currentPosition: position,
                password,
                userType: 'student',
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            showToast('Signup successful! Redirecting...', 'success');
            setTimeout(() => { window.location.href = 'Student_dash.html'; }, 1500);
        });
    }

    // ----- Profile Setup -----
    if (profileSetupForm) {
        profileSetupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const domain = document.getElementById('profile-domain').value;
            const batch = document.getElementById('profile-batch').value;
            if (!domain || !batch) {
                showToast('Please fill all required fields', 'error');
                return;
            }
            showToast('Setting up your profile...', 'success');
            setTimeout(() => {
                closeModal(profileSetupModal);
                showToast('Profile setup complete! Welcome.', 'success');
            }, 1500);
        });
    }

    // ----- Mock Google/LinkedIn login -----
    const googleBtn = document.querySelector('.google-btn');
    if (googleBtn) googleBtn.addEventListener('click', () => {
        showToast('Google login mock', 'success');
    });

    if (linkedinLoginBtn) {
        linkedinLoginBtn.addEventListener('click', () => {
            showToast('Connecting to LinkedIn...', 'success');
            setTimeout(() => {
                const mockUser = { name: 'Sarah Johnson', title: 'Engineer', company: 'Google', email: 'sarah.johnson@google.com' };
                const isFirstTime = Math.random() > 0.5;
                if (isFirstTime) {
                    profileSetupModal.style.display = 'block';
                } else {
                    showToast('Welcome back, Sarah!', 'success');
                }
            }, 1500);
        });
    }

    // ----- Input focus effect -----
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('focus', function () { this.parentElement.classList.add('focused'); });
        input.addEventListener('blur', function () { this.parentElement.classList.remove('focused'); });
    });

    // ----- Forgot password -----
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            const email = document.getElementById('student-email').value;
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showToast(`Password reset link sent to ${email}`, 'success');
            } else {
                showToast('Please enter a valid email', 'error');
            }
        });
    }
});
