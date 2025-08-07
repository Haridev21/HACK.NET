// student_auth.js

// -----------------------------
// STUDENT AUTHENTICATION
// -----------------------------
function handleStudentSignup(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const regNo = document.getElementById("regNo").value.trim();
  const email = document.getElementById("email").value.trim();
  const department = document.getElementById("department").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (localStorage.getItem(`student_${regNo}`)) {
    alert("Student already registered.");
    return;
  }

  const student = {
    name,
    regNo,
    email,
    department,
    password
  };

  localStorage.setItem(`student_${regNo}`, JSON.stringify(student));
  alert("Student signup successful. You can now login.");
  window.location.href = "student_login.html";
}

function handleStudentLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  let isAuthenticated = false;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("student_")) {
      const student = JSON.parse(localStorage.getItem(key));
      if ((student.email === username || student.regNo === username) && student.password === password) {
        isAuthenticated = true;
        break;
      }
    }
  }

  if (isAuthenticated) {
    alert("Login successful!");
    window.location.href = "Student_dashboard.html";
  } else {
    alert("Invalid student credentials.");
  }
}

// -----------------------------
// ALUMNI AUTHENTICATION
// -----------------------------
function handleAlumniSignup(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const passoutYear = document.getElementById("passoutYear").value.trim();
  const email = document.getElementById("email").value.trim();
  const department = document.getElementById("department").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (localStorage.getItem(`alumni_${email}`)) {
    alert("Alumni already registered.");
    return;
  }

  const alumni = {
    name,
    passoutYear,
    email,
    department,
    password
  };

  localStorage.setItem(`alumni_${email}`, JSON.stringify(alumni));
  alert("Alumni signup successful. You can now login.");
  window.location.href = "Alumni_dashboard.html";
}

function handleAlumniLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim(); // email
  const password = document.getElementById("password").value;

  const key = `alumni_${username}`;
  const alumniData = localStorage.getItem(key);

  if (alumniData) {
    const alumni = JSON.parse(alumniData);
    if (alumni.password === password) {
      alert("Alumni login successful!");
      window.location.href = "Alumni_dashboard.html";
      return;
    }
  }

  alert("Invalid alumni credentials.");
}
