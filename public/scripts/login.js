const API_BASE = "http://localhost:3000/users"; // Replace with your backend URL

// Show the correct form
function showForm(formType) {
  document.getElementById("signup-form").style.display = formType === "signup" ? "block" : "none";
  document.getElementById("login-form").style.display = formType === "login" ? "block" : "none";
}

// Signup function
async function signup() {
  const name = document.getElementById("signup-name").value;
  const password = document.getElementById("signup-password").value;

  const response = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  });

  const data = await response.json();
  const status = document.getElementById("status");

  if (response.ok) {
    status.innerText = "Signup successful! Please log in.";
    status.style.color = "green";
    showForm("login");
  } else {
    status.innerText = data.error || "Signup failed.";
    status.style.color = "red";
  }
}

// Login function
async function login() {
  const name = document.getElementById("login-name").value;
  const password = document.getElementById("login-password").value;

  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  });

  const data = await response.json();
  const status = document.getElementById("status");

  if (response.ok) {
    localStorage.setItem("token", data.token); // Store the token
    status.innerText = "Login successful! Redirecting...";
    status.style.color = "green";

    // Redirect to the main page after a short delay
    setTimeout(() => {
      window.location.href = "index.html"; // Replace with your main page
    }, 1000);
  } else {
    status.innerText = data.message || "Login failed.";
    status.style.color = "red";
  }
}

// // Signup function
// async function signup() {
//   const name = document.getElementById("signup-name").value;
//   const password = document.getElementById("signup-password").value;

//   const response = await fetch(`${API_BASE}/signup`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, password }),
//   });

//   const data = await response.json();
//   const status = document.getElementById("status");

//   if (response.ok) {
//     status.innerText = "Signup successful! You can now log in.";
//     status.style.color = "green";
//   } else {
//     status.innerText = data.error || "Signup failed.";
//     status.style.color = "red";
//   }
// }

// // Login function
// async function login() {
//   const name = document.getElementById("login-name").value;
//   const password = document.getElementById("login-password").value;

//   const response = await fetch(`${API_BASE}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, password }),
//   });

//   const data = await response.json();
//   const status = document.getElementById("status");

//   if (response.ok) {
//     // Store the token
//     localStorage.setItem("token", data.token);
//     status.innerText = "Login successful!";
//     status.style.color = "green";

//     // Show logout button
//     document.getElementById("logout-btn").style.display = "block";
//   } else {
//     status.innerText = data.message || "Login failed.";
//     status.style.color = "red";
//   }
// }

// Logout function
function logout() {
  localStorage.removeItem("token");
  document.getElementById("status").innerText = "Logged out successfully.";
  document.getElementById("logout-btn").style.display = "none";
}

// Example of making authenticated requests
async function getProtectedData() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE}/protected`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Protected data:", data);
  } else {
    console.error("Unauthorized access");
  }
}
