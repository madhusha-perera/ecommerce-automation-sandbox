# Selenium Automation – TechMee Website Testing

This project contains an automated test script written in **Java with Selenium WebDriver and JUnit** to perform end-to-end testing on the demo website:

[https://techmeee.netlify.app](https://techmeee.netlify.app)

The script automates three main tasks:

1. User Registration
2. User Login
3. Product Search

---

## What the Automation Does

### Step 1 – Register a New User

* Opens the browser
* Navigates to the website
* Clicks **Register**
* Fills in user details (with a unique email each run)
* Selects gender
* Submits the form
* Handles the “Registration Successful” alert
* Confirms redirect back to home page

### Step 2 – Login with the Same User

* Reopens the browser
* Clicks **Login**
* Enters the same email and password
* Submits the form
* Verifies that the logged-in user name appears in the navbar

### Step 3 – Search for a Product

* Locates the search bar
* Searches for **“Headphones”**
* Waits for results to load
* Verifies that the product appears in the product grid

---

## Technologies Used

* Java
* Selenium WebDriver
* JUnit Assertions
* ChromeDriver

---

## Prerequisites

Before running the project, ensure you have:

* Java JDK 8+ installed
* Maven or Eclipse/IntelliJ setup
* Google Chrome installed
* ChromeDriver compatible with your Chrome version
* Selenium dependencies added to your project

### Maven Dependency (if using Maven)

Add this to your `pom.xml`:

```xml
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.10.0</version>
</dependency>

<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
</dependency>
```

---

## How to Run

1. Place `Automation.java` inside package:

```
src/test/java/test/Automation.java
```

2. Run the file as a **Java Application** from your IDE.

---

## Test Data Used

| Field       | Value          |
| ----------- | -------------- |
| First Name  | Madhusha       |
| Last Name   | Perera         |
| Email       | Auto-generated |
| Password    | `Password123`  |
| Search Item | Headphones     |

The email is generated dynamically using the current timestamp, so each run creates a new user.

---

## Expected Output

If everything works correctly, you should see console logs like:

```
Browser started...
Registration successful...
Login verified...
Search successful...
ALL TASKS COMPLETED SUCCESSFULLY.
```

---

## Notes

* If ChromeDriver version mismatch occurs, download the correct driver from:
  [https://chromedriver.chromium.org](https://chromedriver.chromium.org)

* If elements change on the website, locators may need updates.

---

## Author

Madhusha Perera
Automated Testing Project
