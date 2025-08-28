document.addEventListener('DOMContentLoaded', () => {
    console.log('Signup script loaded');
    
    const signupForm = document.getElementById('signup-form');
    const toast = document.getElementById('toast');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    // Toggle password visibility
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Toast notification function
    function showToast(message, type = 'success') {
        if (toast) {
            toast.textContent = message;
            toast.className = `toast ${type}`;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        } else {
            console.log('Toast notification:', message);
        }
    }
    
    // Form validation helpers
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Field error handling functions
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;
        
        // Remove existing error
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error styling
        field.classList.add('error');
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }
    
    function clearFieldErrors() {
        // Remove all error messages and styling
        document.querySelectorAll('.field-error').forEach(error => error.remove());
        document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
    }
    
    // Signup form submission
    if (signupForm) {
        console.log('Adding submit listener to signup form');
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Signup form submitted!');
            
            const fullName = document.getElementById('signup-fullname').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const graduation = document.getElementById('signup-graduation').value;
            const department = document.getElementById('signup-department').value;
            const position = document.getElementById('signup-position').value.trim();
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            
            console.log('Form values:', { fullName, email, graduation, department, position, password: password ? '***' : '', confirmPassword: confirmPassword ? '***' : '' });
            
            // Clear previous error states
            clearFieldErrors();
            
            // Validation
            let isValid = true;
            
            // Full Name validation
            if (!fullName) {
                showFieldError('signup-fullname', 'Full name is required');
                isValid = false;
            } else if (fullName.length < 2) {
                showFieldError('signup-fullname', 'Full name must be at least 2 characters');
                isValid = false;
            } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
                showFieldError('signup-fullname', 'Full name can only contain letters and spaces');
                isValid = false;
            }
            
            // Email validation
            if (!email) {
                showFieldError('signup-email', 'Email is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showFieldError('signup-email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Graduation Year validation
            if (!graduation) {
                showFieldError('signup-graduation', 'Please select your graduation year');
                isValid = false;
            }
            
            // Department validation
            if (!department) {
                showFieldError('signup-department', 'Please select your department');
                isValid = false;
            }
            
            // Position validation
            if (!position) {
                showFieldError('signup-position', 'Current position is required');
                isValid = false;
            } else if (position.length < 3) {
                showFieldError('signup-position', 'Position must be at least 3 characters');
                isValid = false;
            }
            
            // Password validation
            if (!password) {
                showFieldError('signup-password', 'Password is required');
                isValid = false;
            } else if (password.length < 8) {
                showFieldError('signup-password', 'Password must be at least 8 characters');
                isValid = false;
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
                showFieldError('signup-password', 'Password must contain uppercase, lowercase, and number');
                isValid = false;
            }
            
            // Confirm Password validation
            if (!confirmPassword) {
                showFieldError('signup-confirm-password', 'Please confirm your password');
                isValid = false;
            } else if (password !== confirmPassword) {
                showFieldError('signup-confirm-password', 'Passwords do not match');
                isValid = false;
            }
            
            if (isValid) {
                // LocalStorage logic for signup
                let users = JSON.parse(localStorage.getItem('users') || '[]');
                if (users.some(u => u.email === email)) {
                    showToast('An account with this email already exists. Please login instead.', 'error');
                    return;
                }
                const userData = {
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
                users.push(userData);
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(userData));
                showToast('Account created successfully! Redirecting to dashboard...', 'success');
                setTimeout(() => {
                    window.location.href = 'Student_dash.html';
                }, 1500);
            }
        });
    } else {
        console.error('Signup form not found!');
    }
    
    // Real-time validation for signup fields
    const signupFields = [
        'signup-fullname',
        'signup-email', 
        'signup-graduation',
        'signup-department',
        'signup-position',
        'signup-password',
        'signup-confirm-password'
    ];
    
    signupFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => {
                validateField(fieldId);
            });
            
            field.addEventListener('input', () => {
                // Clear error when user starts typing
                const formGroup = field.closest('.form-group');
                const existingError = formGroup.querySelector('.field-error');
                if (existingError) {
                    existingError.remove();
                    field.classList.remove('error');
                }
            });
        }
    });
    
    // Real-time password confirmation validation
    const passwordField = document.getElementById('signup-password');
    const confirmPasswordField = document.getElementById('signup-confirm-password');
    
    if (passwordField && confirmPasswordField) {
        confirmPasswordField.addEventListener('input', () => {
            if (passwordField.value && confirmPasswordField.value) {
                if (passwordField.value !== confirmPasswordField.value) {
                    showFieldError('signup-confirm-password', 'Passwords do not match');
                } else {
                    const formGroup = confirmPasswordField.closest('.form-group');
                    const existingError = formGroup.querySelector('.field-error');
                    if (existingError) {
                        existingError.remove();
                        confirmPasswordField.classList.remove('error');
                    }
                }
            }
        });
    }
    
    function validateField(fieldId) {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        
        switch (fieldId) {
            case 'signup-fullname':
                if (!value) {
                    showFieldError(fieldId, 'Full name is required');
                } else if (value.length < 2) {
                    showFieldError(fieldId, 'Full name must be at least 2 characters');
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    showFieldError(fieldId, 'Full name can only contain letters and spaces');
                }
                break;
                
            case 'signup-email':
                if (!value) {
                    showFieldError(fieldId, 'Email is required');
                } else if (!validateEmail(value)) {
                    showFieldError(fieldId, 'Please enter a valid email address');
                }
                break;
                
            case 'signup-graduation':
                if (!value) {
                    showFieldError(fieldId, 'Please select your graduation year');
                }
                break;
                
            case 'signup-department':
                if (!value) {
                    showFieldError(fieldId, 'Please select your department');
                }
                break;
                
            case 'signup-position':
                if (!value) {
                    showFieldError(fieldId, 'Current position is required');
                } else if (value.length < 3) {
                    showFieldError(fieldId, 'Position must be at least 3 characters');
                }
                break;
                
            case 'signup-password':
                if (!value) {
                    showFieldError(fieldId, 'Password is required');
                } else if (value.length < 8) {
                    showFieldError(fieldId, 'Password must be at least 8 characters');
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    showFieldError(fieldId, 'Password must contain uppercase, lowercase, and number');
                }
                break;
        }
    }
}); 