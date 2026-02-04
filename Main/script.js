// --- 1. FIREBASE CONFIGURATION ---
// REPLACE THIS BLOCK with the actual config from your Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyC_Em8LUAAHHqmJtYakKmVHOguWf8AQQJI",
    authDomain: "ecommerce-test-6bbe1.firebaseapp.com",
    projectId: "ecommerce-test-6bbe1",
    storageBucket: "ecommerce-test-6bbe1.firebasestorage.app",
    messagingSenderId: "334991860288",
    appId: "1:334991860288:web:fe5be28c3c0c970ce4b5a5",
    measurementId: "G-QZE9QGJJRV"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- 2. PRODUCT DATA ---
const products = [
  { name: "Laptop", price: "$1200", image: "laptop.jpg" },
  { name: "Phone", price: "$800", image: "phone.jpg" },
  { name: "Headphones", price: "$150", image: "headphone.jpg" },
  { name: "Smartwatch", price: "$200", image: "watch.png" },
  { name: "Camera", price: "$500", image: "camera.jpg" },
  { name: "Monitor", price: "$250", image: "monitor.jpg" }
];

// --- 3. UI RENDERING ---
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

function updateNavbar() {
    const authLinks = document.getElementById("authLinks");
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

    if (loggedInUser && authLinks) {
        // Updated to include both first and last name for Selenium verification
        authLinks.innerHTML = `
            <span class="mr-4 font-semibold text-gray-700">Hi, ${loggedInUser.firstName} ${loggedInUser.lastName}</span>
            <button onclick="logoutUser()" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
        `;
    }
}

// --- 4. CORE LOGIC ---

function logoutUser() {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

function handleSearch(e) {
  e.preventDefault();
  const searchTerm = document.getElementById("small-searchterms").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));
  renderProducts(filtered);
}

// --- 5. FIREBASE REGISTRATION (Async) ---
async function registerUser() {
  const firstName = document.getElementById("FirstName")?.value.trim();
  const lastName = document.getElementById("LastName")?.value.trim();
  const email = document.getElementById("Email")?.value.trim();
  const password = document.getElementById("Password")?.value;
  const confirm = document.getElementById("ConfirmPassword")?.value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;

  if (!firstName || !lastName || !email || !password || !confirm || !gender) {
    alert("All fields are required!");
    return;
  }
  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // Save to Firestore: "users" collection, document ID is the email
    await db.collection("users").doc(email).set({
      firstName,
      lastName,
      email,
      password,
      gender,
      createdAt: new Date().toISOString()
    });
    
    alert("Registration Successful!");
    window.location.href = "index.html"; // Move to lhome after success
  } catch (error) {
    console.error("Firebase Error:", error);
    alert("System error. Check if Firestore 'Test Mode' is enabled.");
  }
}

// --- 6. FIREBASE LOGIN (Async) ---
async function loginUser() {
  const email = document.getElementById("Email")?.value.trim();
  const password = document.getElementById("Password")?.value;
  const resultEl = document.getElementById("result");

  if (!email || !password) {
    if (resultEl) resultEl.innerText = "Please enter email and password";
    return;
  }

  try {
    // Look up the user by their email document ID
    const userDoc = await db.collection("users").doc(email).get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData.password === password) {
        // Success: Store in sessionStorage (persists until tab closes)
        sessionStorage.setItem("loggedInUser", JSON.stringify(userData));
        window.location.href = "index.html";
      } else {
        showError(resultEl, "Invalid password");
      }
    } else {
      showError(resultEl, "User does not exist");
    }
  } catch (error) {
    console.error("Login Error:", error);
    showError(resultEl, "Connection error. Check console.");
  }
}

function showError(el, msg) {
  if (el) {
    el.innerText = msg;
    el.className = "mt-4 font-bold text-red-600";
  } else {
    alert(msg);
  }
}

// Initialize UI
document.addEventListener("DOMContentLoaded", () => {
    updateNavbar();
    renderProducts(products);
});