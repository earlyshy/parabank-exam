import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/home.page';
import { LoginPage } from '../page-objects/login-page';
import { generateRandomUser } from '../utils/data-generator';
import { FileManager } from '../utils/file-manager';
import { RegisterPage } from '../page-objects/register-page';
import { AccountPage } from '../page-objects/account-page';
import { log } from 'console';


test('Register new user', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const accountPage = new AccountPage(page);

  const userData = generateRandomUser()

  await homePage.navigate();
  await homePage.clickRegisterLink();

  await registerPage.enterZipCode();
  await registerPage.fillTheRegistrationForm(userData);
  await registerPage.submitRegistration();


  FileManager.saveUserData(userData);
})

test('Login user', async ({ page }) => {
  const userData = FileManager.loadUserData();
  expect(userData).not.toBeNull();

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await homePage.navigate();
  await loginPage.login(userData.username, userData.password);
  await accountPage.verifyAccountServiceMenu();
})

