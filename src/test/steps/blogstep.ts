import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pagefixture";
import BlogPage from "../../pages/blogPage";

let blogPage: BlogPage;

// Given('the user is on the homepage', async function () {
//   await pageFixture.page.goto("https://ecommerce-playground.lambdatest.io/");
//   blogPage = new BlogPage(pageFixture.page);
// });

When('the user clicks on the Blog button', async function () {
    blogPage = new BlogPage(pageFixture.page);
  await blogPage.clickBlog();
});

Then('the user selects any article from the blog', async function () {
  await blogPage.clickArticle();
});

Then('the user is navigated to the selected blog page', async function () {
  const titleVisible = await blogPage.isBlogTitleVisible();
  expect(titleVisible).toBeTruthy();
});

When('the user enters the following comment details:', async function (dataTable) {
  const data = dataTable.hashes()[0]; // get the first row as object
  await blogPage.enterName(data.name);
  await blogPage.enterEmail(data.email);
  await blogPage.enterComment(data.comment);
});

When('the user clicks on the Post Comment button', async function () {
  await blogPage.clickPostComment();
});

Then('the user should see the message {string}', async function (expectedMessage) {
  const actualMessage = await blogPage.getSuccessMessage();
  expect(actualMessage.trim()).toContain(expectedMessage);
});
