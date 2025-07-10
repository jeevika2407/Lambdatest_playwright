import { Locator, Page } from "@playwright/test";

export default class PlaywrightWrapper {
  constructor(private page: Page) {}

  async goto(url: string) {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async waitAndClick(locator: string | Locator) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.waitFor({ state: "visible" });
    await element.click();
  }

  async navigateTo(link: string | Locator) {
    const element = typeof link === "string" ? this.page.locator(link) : link;
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: "load" }),
      element.click(),
    ]);
  }

  async fillText(locator: string | Locator, text: string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.fill(text);
  }

  async getText(locator: string | Locator): Promise<string | null> {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    return await element.textContent();
  }
}
