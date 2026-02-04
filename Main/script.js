// Data persistence
let users = JSON.parse(localStorage.getItem("users") || "[]");

const products = [
  { name: "Laptop", price: "$1200", image: "https://via.placeholder.com/150" },
  { name: "Phone", price: "$800", image: "https://via.placeholder.com/150" },
  { name: "Headphones", price: "$150", image: "https://via.placeholder.com/150" },
  { name: "Smartwatch", price: "$200", image: "https://via.placeholder.com/150" },
  { name: "Camera", price: "$500", image: "https://via.placeholder.com/150" },
  { name: "Monitor", price: "$250", image: "https://via.placeholder.com/150" }
];

// UI: Rendering Products
function renderProducts(list) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;
  grid.innerHTML = list.map(p => `
    <div class="bg-white p-4 rounded shadow hover:shadow-lg">
      <img src="${p.image}" alt="${p.name}" class="w-full h-32 object-cover mb-2 rounded">
      <h3 class="font-bold text-lg">${p.name}</h3>
      <p class="text-gray-700">${p.price}</p>
    </div>
  `).join('');
}

// Logic: Check Login State for Navbar
function updateNavbar() {
    const authLinks = document.getElementById("authLinks");
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (loggedInUser && authLinks) {
        authLinks.innerHTML = `
            <span class="mr-4 font-semibold text-gray-700">Hi, ${loggedInUser.firstName} ${loggedInUser.lastName}</span>
            <button onclick="logoutUser()" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
        `;
    }
}

// Logic: Logout
function logoutUser() {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

// Logic: Search
function handleSearch(e) {
  e.preventDefault();
  const searchTerm = document.getElementById("small-searchterms").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));
  renderProducts(filtered);
}

// Logic: Registration
function registerUser() {
  const firstName = document.getElementById("FirstName").value.trim();
  const lastName = document.getElementById("LastName").value.trim();
  const email = document.getElementById("Email").value.trim();
  const password = document.getElementById("Password").value;
  const confirm = document.getElementById("ConfirmPassword").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;

  if (!firstName || !lastName || !email || !password || !confirm || !gender) {
    alert("All fields are required!");
    return;
  }
  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  users.push({ firstName, lastName, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  
  // REDIRECT TO HOME PAGE AFTER REGISTRATION
  alert("Registration Successful!");
  window.location.href = "index.html";
}

// Logic: Login
function loginUser() {
  const email = document.getElementById("Email").value.trim();
  const password = document.getElementById("Password").value;
  const resultEl = document.getElementById("result");

  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Save user to session
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "index.html";
  } else {
    resultEl.innerText = "Invalid email or password";
    resultEl.className = "mt-4 font-bold text-red-600";
  }
}