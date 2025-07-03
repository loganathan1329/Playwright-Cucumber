import { After, AfterAll, AfterStep, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import * as path from "path";
import * as fs from "fs";
import { getLogger } from "../utils/logger";

const log = getLogger('cucumber:steps');

let browser: Browser;
let page: Page;
let context: BrowserContext;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function () {
  context = await browser.newContext();
  page = await context.newPage();
  pageFixture.page = page;
  this.page = page;
  this.context = context;
});

After(async function ({ pickle, result }) {
 
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  
});

AfterStep(async function ({ pickle, result, pickleStep }) {
   if (result?.status === Status.FAILED && this.page) {
    const screenshotsDir = path.resolve("test-result", "screenshots");
    await fs.promises.mkdir(screenshotsDir, { recursive: true });
    const screenshotPath = path.join(screenshotsDir, `${pickle.name}.png`);
    await this.page.screenshot({ path: screenshotPath, type: "png" });
    const imageBuffer = await fs.promises.readFile(screenshotPath);
    await this.attach(imageBuffer, "image/png");
  }
  // Find the index of the current step in the pickle.steps array
  const stepIndex = pickle.steps.findIndex(s => s.id === pickleStep.id);
  const scenarioName = pickle.name;
  const stepText = pickleStep.text;

  if (result.status === 'PASSED') {
    log(`[${scenarioName}] Step PASSED: ${stepText}`);
  } else if (result.status === 'FAILED') {
    log(`[${scenarioName}] Step FAILED: ${stepText}`);
  } else {
    log(`[${scenarioName}] Step ${result.status}: ${stepText}`);
  }
});

AfterAll(async function () {
  if (browser) await browser.close();
});
