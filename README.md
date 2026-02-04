# Selenium Test Bench: Cloud-Integrated E-Commerce Mockup

## 📌 Project Overview
This is a responsive web application designed as a robust environment for practicing **Selenium WebDriver** automation. Unlike static test sites, this project integrates with **Google Firebase** to simulate real-world scenarios such as network latency, cloud data persistence, and asynchronous UI updates.

## 🚀 Key Features
* **Firebase Firestore Integration:** Real-time user registration and database storage.
* **Persistent Authentication:** Session-based login states that survive page refreshes.
* **Dynamic Search Engine:** A JavaScript-driven search functionality for validating data grids.
* **Automation-Friendly DOM:** Elements are clearly labeled with unique IDs to facilitate stable locators.
* **Responsive Design:** Built with Tailwind CSS to test cross-device browser automation.

## 🛠️ Tech Stack
* **Frontend:** HTML5, JavaScript (ES6+), Tailwind CSS.
* **Backend-as-a-Service:** Google Firebase (Firestore).
* **Automation Target:** Selenium WebDriver (Java/JUnit).

## 🧪 Testing Scenarios
This repository is configured to test the following automation flows:
1.  **User Onboarding:** Validating that a new user can be registered and successfully written to the cloud database.
2.  **Asynchronous Login:** Testing the ability of WebDriver to wait for Firebase authentication tokens.
3.  **Data Consistency:** Ensuring the navbar correctly displays the user's name (retrieved from Firestore) across different pages.
4.  **Functional Search:** Verifying that the product grid filters correctly based on search input.
