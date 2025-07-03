import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";
import { LoginPage } from "../pages/LoginPage";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getLogger } from "../../utils/logger";
const log = getLogger("cucumber:steps");
setDefaultTimeout(70 * 1000); // 70 seconds
let loginPage: LoginPage;

Given("I am on the login page", async function () {
  log(".........Navigating to login page........");
  if (!pageFixture.page) {
    throw new Error("Playwright page is not initialized.");
  }
  loginPage = new LoginPage(pageFixture.page);
  await loginPage.goto();
  log("Navigation complete.");
});

When("I enter valid email", async function () {
  log("Entering username...");
  await loginPage.enterUsername("standard_user");
  log("Username entered.");
});

When("I click the Next button", async function () {
  log("Clicking the Next button...");
  await loginPage.clickNextButton();
  log("Next button clicked.");
});

When("I enter valid password", async function () {
  log("Entering password...");
  await loginPage.enterPassword("secret_sauce");
  log("Password entered.");
});

When("I click on the submit button", async function () {
  log("Clicking the submit button...");
  await loginPage.clickSubmitButton();
  log("Submit button clicked.");
});

Then("I should be logged in and see the dashboard", async function () {
  log("Checking if user is at dashboard...");
  expect(await loginPage.isAtDashboard()).toBe(true);
  //await loginPage.handleCookiesPopup();
  log("User is at dashboard.");
});

Then("I click on the logout button", async function () {
  log("Clicking the logout button...");
  await loginPage.clickLogoutButton();
  log("Logout button clicked.");
});

When("I enter email {string}", async function (email) {
  log(`Entering email: ${email}`);
  await loginPage.enterUsername(email);
  log("Email entered.");
});

When("I enter password {string}", async function (password) {
  log(`Entering password: ${password}`);
  await loginPage.enterPassword(password);
  log("Password entered.");
});

Then("I should see an error message", async function () {
  log("Checking for error message");
  expect(await loginPage.loginErrorMessage()).toBe(true);
  log("Error message is visible.");
});