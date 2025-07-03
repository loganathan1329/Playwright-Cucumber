import { Page } from "@playwright/test";
import { getLogger } from "../../utils/logger";
import { ActionUtils } from "../../utils/actionUtils";
const log = getLogger("cucumber:loginpage");

export class LoginPage {
  readonly page: Page;

  // URLs
  readonly loginUrl = "https://www.saucedemo.com/v1/";
  readonly dashboardUrlPattern = "**/v1/inventory*";

  // Locators
  readonly loginIdInput = "#user-name";
  readonly passwordInput = "#password";
  readonly nextButton = "//span[@class='button-ripple']";
  readonly submitButton = "#login-button";
  readonly errorAlert = "//*[@id='login_button_container']/div/form/h3";
  readonly cookiesButton = '//*[@id="hs-eu-confirmation-button"]';
  readonly userProfileAvatar = "//button[normalize-space()='Open Menu']";
  readonly signOutButton = "//a[@id='logout_sidebar_link']";

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    log("Navigating to login page...");
    await this.page.goto(this.loginUrl);
    log("Navigation complete.");
  }

  async handleCookiesPopup() {
    if (await ActionUtils.isVisible(this.page, this.cookiesButton, { timeout: 2000 }, "Cookies Button")) {
      await ActionUtils.click(this.page, this.cookiesButton, "Cookies Button");
    }
  }

  async enterUsername(username: string) {
    await ActionUtils.fill(this.page, this.loginIdInput, username, "Username Input");
  }

  async clickNextButton() {
    await ActionUtils.click(this.page, this.nextButton, "Next Button");
  }

  async enterPassword(password: string) {
    await ActionUtils.fill(this.page, this.passwordInput, password, "Password Input");
  }

  async clickSubmitButton() {
    await ActionUtils.click(this.page, this.submitButton, "Submit Button");
  }

  async loginErrorMessage(): Promise<boolean> {
    return await ActionUtils.isVisible(this.page, this.errorAlert, { timeout: 15000 }, "Login Error Alert");
  }

  async isAtDashboard() {
    await ActionUtils.waitForURL(this.page, this.dashboardUrlPattern, { timeout: 15000 });
    return this.page.url().includes("/inventory");
  }

  async clickLogoutButton() {
    await ActionUtils.click(this.page, this.userProfileAvatar, "User Profile Avatar");
    await ActionUtils.click(this.page, this.signOutButton, "Sign Out Button");
  }
}