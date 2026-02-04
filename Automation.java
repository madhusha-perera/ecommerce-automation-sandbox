package test;

import org.junit.Assert;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class Automation {
    
    private static WebDriver driver;
    private static WebDriverWait wait;
    private static String baseUrl = "https://techmeee.netlify.app"; 
    private static String uniqueEmail; 
    private static String password = "Password123";

    public static void main(String[] args) {
        // Unique email generated here
        uniqueEmail = "madhushaperera" + System.currentTimeMillis() + "@test.com";

        startBrowser();
        registerNewUser();
        quitBrowser();

        startBrowser();
        loginUser();
        searchForProduct("Headphones");
        quitBrowser();
        
        System.out.println("\nALL TASKS COMPLETED SUCCESSFULLY.");
    }

    public static void startBrowser() {
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.manage().window().maximize();
        driver.get(baseUrl);
        String title = driver.getTitle();
        System.out.println("Step: Browser started and navigated to " + title + " Website");
    }

    public static void registerNewUser() {
        // 1. Click Register
        wait.until(ExpectedConditions.elementToBeClickable(By.linkText("Register"))).click();
        
        // 2. Wait for the Register page to load by checking for the FirstName field
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("FirstName"))).sendKeys("Madhusha");
        
        // 3. Fill other fields
        driver.findElement(By.id("LastName")).sendKeys("Perera");
        driver.findElement(By.id("Email")).sendKeys(uniqueEmail);
        driver.findElement(By.id("Password")).sendKeys(password);
        driver.findElement(By.id("ConfirmPassword")).sendKeys(password);
        
        // --- IMPROVED LOCATOR FOR GENDER ---
        // Using CSS Selector [value='Male'] is more reliable than ID if the ID is missing or buggy
        WebElement maleRadio = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("input[value='Male']")));
        maleRadio.click();
        
        // 4. Submit
        driver.findElement(By.cssSelector("button[type='submit']")).click();

        // 5. Handle the "Registration Successful!" alert
        wait.until(ExpectedConditions.alertIsPresent());
        Alert alert = driver.switchTo().alert();
        System.out.println("Alert handled: " + alert.getText());
        alert.accept(); 

        // 6. Wait for redirect back to index.html
        wait.until(ExpectedConditions.urlContains("index.html"));
        System.out.println("Step: Registration successful with: " + uniqueEmail);
    }

    public static void loginUser() {
        wait.until(ExpectedConditions.elementToBeClickable(By.linkText("Login"))).click();
        
        // Wait for Login page elements
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("Email"))).sendKeys(uniqueEmail);
        driver.findElement(By.id("Password")).sendKeys(password);
        driver.findElement(By.cssSelector("button[type='submit']")).click();

        // 7. Verify login by checking if "John Doe" appeared in the navbar
        wait.until(ExpectedConditions.urlContains("index.html"));
        WebElement authLinks = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("authLinks")));
        
        Assert.assertTrue("Login failed: John Doe not found in navbar", authLinks.getText().contains("Madhusha Perera"));
        System.out.println("Step: Login verified for Madhusha Perara.");
    }

    public static void searchForProduct(String productName) {
        // 1. Locate and fill search bar
        WebElement searchBar = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("small-searchterms")));
        searchBar.clear();
        searchBar.sendKeys(productName);
        
        // 2. Click search
        driver.findElement(By.cssSelector("#searchForm button")).click();

        // 3. The "Wait" - This is the simplest, most effective way.
        // It pauses the script UNTIL the product name appears in the grid.
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id("productsGrid"), productName));
        try {
            Thread.sleep(4000); // 4000 milliseconds = 4 seconds
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 4. Final verification
        WebElement grid = driver.findElement(By.id("productsGrid"));
        Assert.assertTrue("Product not found in grid!", grid.getText().contains(productName));
        
        System.out.println("Step: Search for '" + productName + "' successful.");
    }

    public static void quitBrowser() {
        if (driver != null) {
            driver.quit();
            System.out.println("Step: Browser closed.");
        }
    }
}