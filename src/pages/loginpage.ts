import { Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/playwrightwrapper";

export default class LoginPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  private LoginPageElements = {
    myAccount: "(//div[@id='entry_217834']/descendant::a[@class='icon-left both nav-link dropdown-toggle'])[3]//span",
    loginLink:"(//a[@class='icon-left both nav-link dropdown-toggle']/following::a[@class='icon-left both dropdown-item'])[4]/div/span",
    emailInput: "(//div[@class='form-group']//descendant::input)[1]",
    passwordInput: "(//div[@class='form-group']//following::input[1])[2]",
    loginBtn: "//input[@class='btn btn-primary']",
    myAccountPageHeader: "//h2[text()='My Account']",
    logout:"//div[@class='list-group mb-3']/a[13]/following-sibling::a",
    accountLogout:"//div[@id='content']/h1"

    }

  async clickMyAccount() {
    // await this.page.waitForTimeout(30000);
  await this.base.waitAndClick(this.LoginPageElements.myAccount);
  // await this.page.waitForTimeout(30000);
}

  async clickLoginLink() {
  const login = this.page.locator(this.LoginPageElements.loginLink);
  await login.waitFor({ state: "visible", timeout: 9000 });
  await login.click();
  }

  async enterEmail(email: string) {
    await this.page.fill(this.LoginPageElements.emailInput, email);
  }

  async enterPassword(password: string) {
    await this.page.fill(this.LoginPageElements.passwordInput, password);
  }
//   async enterEmail(email: string) {
//   const emailField = this.page.locator(this.LoginPageElements.emailInput);
//   await emailField.waitFor({ state: "visible", timeout: 5000 });
//   await emailField.fill(email);
// }

// async enterPassword(password: string) {
//   const passwordField = this.page.locator(this.LoginPageElements.passwordInput);
//   await passwordField.waitFor({ state: "visible", timeout: 5000 });
//   await passwordField.fill(password);
// }


  async clickLoginButton() {
    await this.base.waitAndClick(this.LoginPageElements.loginBtn);
  }

async isOnMyAccountPage(): Promise<boolean> {
  await this.page.waitForTimeout(5000); 
  return await this.page.isVisible(this.LoginPageElements.myAccountPageHeader);
}

async getLoginErrorMessage():Promise<string>{
const error=await this.page.locator(".alert.alert-danger.alert-dismissible");
await error.waitFor({state:"visible",timeout:8000})
return await error.textContent() ?? "";
}

async clickLogout(){
   await this.base.waitAndClick(this.LoginPageElements.logout);
}

async getAccountLogoutText():Promise<string>{
  const logoutText = await this.page.locator(this.LoginPageElements.accountLogout);
    await logoutText.waitFor({ state: "visible", timeout: 5000 });
    return await logoutText.textContent() ?? "";
}
}