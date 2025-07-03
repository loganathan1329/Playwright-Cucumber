import { Page, Locator } from "@playwright/test";
// Update the import path below if your logger utility is located elsewhere
// import { getLogger } from "../../utils/logger";
import { getLogger } from "../utils/logger";
const log = getLogger("cucumber:actions");

export class ActionUtils {
  static async click(page: Page, selector: string, description?: string) {
    try {
      log(`Clicking ${description || selector}`);
      await page.click(selector);
    } catch (error) {
      log(`Error clicking ${description || selector}: ${error}`);
      throw error;
    }
  }

  static async fill(page: Page, selector: string, value: string, description?: string) {
    try {
      log(`Filling ${description || selector} with value: ${value}`);
      await page.fill(selector, value);
    } catch (error) {
      log(`Error filling ${description || selector}: ${error}`);
      throw error;
    }
  }

  static async isVisible(page: Page, selector: string, options?: any, description?: string): Promise<boolean> {
    try {
      log(`Checking visibility of ${description || selector}`);
      return await page.isVisible(selector, options);
    } catch (error) {
      log(`Error checking visibility of ${description || selector}: ${error}`);
      return false;
    }
  }

  static async waitForURL(page: Page, urlOrPattern: string, options?: any) {
    try {
      log(`Waiting for URL: ${urlOrPattern}`);
      await page.waitForURL(urlOrPattern, options);
    } catch (error) {
      log(`Error waiting for URL ${urlOrPattern}: ${error}`);
      throw error;
    }
  }
}