import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pagefixture";
import LoginPage from "../../pages/loginpage";
import * as testData from "../../helper/testData/login.json";

let loginPage: LoginPage;

Given('the user is on the homepage',{ timeout: 20000 }, async function () {
  await pageFixture.page.goto("https://ecommerce-playground.lambdatest.io/");

  loginPage = new LoginPage(pageFixture.page);
});

When('the user clicks on My Account', { timeout: 20000 },async function () {
  await loginPage.clickMyAccount();
});

When('And the user clicks on login', { timeout: 20000 },async function () {
  await loginPage.clickLoginLink();
});

When('the user enters valid credentials', { timeout: 20000 },async function () {
    const user = testData.validLogins[0]; 

  await loginPage.enterEmail(user.email);
  await loginPage.enterPassword(user.password);
});

When('the user clicks on the Login button', async function () {
  await loginPage.clickLoginButton();
});

Then('the user should see the My Account page',{ timeout: 20000 }, async function () {
  const result = await loginPage.isOnMyAccountPage();
  expect(result).toBeTruthy();
});  

When('the user enters E-Mail {string}', async function (email:string) {
await loginPage.enterEmail(email);
});
       

When('the user enters Password {string}', async function (password:string) {
await loginPage.enterPassword(password);
});

//  Then('the user should see the {string} and {string}', async function (expectedMessage: string, check: string) {
//   const actualMessage = await loginPage.getLoginErrorMessage();
//   expect(actualMessage.trim()).toContain(expectedMessage);
// // });
         Then('the user should see the {string}', async function (expectedMessage:string) {
           const actualMessage = await loginPage.getLoginErrorMessage();
          expect(actualMessage.trim()).toContain(expectedMessage);
         });

        
  