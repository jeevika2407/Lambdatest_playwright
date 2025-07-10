import { Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/playwrightwrapper";

export default class BlogPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  private BlogPageElements = {
    blogButton: "//div[@id='widget-navbar-217834']//ul/li[2]/following-sibling::li/a/div/span[contains(text(),'Blog')]",
    article: "(//a[@class='text-ellipsis-2'][contains(text(),'amet volutpat consequat mauris nunc congue nisi vi')])[1]",
    nameInput: "(//input[@id='input-name'])[1]",
    emailInput: "(//input[@id='input-email'])[1]",
    commentTextarea: "(//textarea[@id='input-comment'])[1]",
    postCommentBtn: "//form[@id='form-comment']//div[2]/following-sibling::button",
    successMessage: "#form-comment .alert-success",
    blogTitle: "//div[h1]/h1",
    img: "//img[contains(@src,'inner-banner-1920x200.webp')]",
    productName: "//div[h1]/h1",
  };

  async clickBlog() {
    await this.base.waitAndClick(this.BlogPageElements.blogButton);
  }

  async clickArticle() {
    await this.base.waitAndClick(this.BlogPageElements.article);
  }

async isBlogTitleVisible(): Promise<boolean> {
  try {
    await this.page.waitForSelector(this.BlogPageElements.blogTitle, { timeout: 7000 });
    return await this.page.isVisible(this.BlogPageElements.blogTitle);
  } catch (error) {
    console.error("Blog title not visible within timeout:", error);
    return false;
  }
}

  async enterName(name: string) {
    await this.page.fill(this.BlogPageElements.nameInput, name);
  }

  async enterEmail(email: string) {
    await this.page.fill(this.BlogPageElements.emailInput, email);
  }

  async enterComment(comment: string) {
    await this.page.fill(this.BlogPageElements.commentTextarea, comment);
  }

  async clickPostComment() {
    await this.base.waitAndClick(this.BlogPageElements.postCommentBtn);
  }

  async getSuccessMessage(): Promise<string> {
    await this.page.waitForSelector(this.BlogPageElements.successMessage, { state: "visible", timeout: 7000 });
    return await this.page.textContent(this.BlogPageElements.successMessage) || "";
  }

  async clickImage() {
    await this.base.waitAndClick(this.BlogPageElements.img);
  }

  async isProductNameDisplayed(): Promise<boolean> {
    return await this.page.isVisible(this.BlogPageElements.productName);
  }

}

