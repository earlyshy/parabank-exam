import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/home.page';
import { LoginPage } from '../page-objects/login-page';
import { generateRandomUser } from '../utils/data-generator';
import { FileManager } from '../utils/file-manager';
import { RegisterPage } from '../page-objects/register-page';
import { AccountPage } from '../page-objects/account-page';
import { AccountManager, Account } from '../utils/account-manager-utils';
import { OpenNewSavingsAccountPage } from '../page-objects/open-savings-account';
import { GLOBAL } from '../config/global.config';
import { log } from 'console';


test('Register new user', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const accountPage = new AccountPage(page);
  const savings = new OpenNewSavingsAccountPage(page);
  const userData = generateRandomUser()

  await homePage.navigate();
  await homePage.clickRegisterLink();

  await registerPage.enterZipCode();
  await registerPage.fillTheRegistrationForm(userData);
  await registerPage.submitRegistration();
  await accountPage.verifyHomeLink();
  await accountPage.verifyAboutLink();
  await accountPage.verifyContactContent();
  await accountPage.clickAccountService('Open New Account')
  const newAccountId = await savings.createNewAccount(GLOBAL.ACCOUNT_TYPES.SAVINGS);

  const newAccount: Account = {
    id: newAccountId,
    type: 'SAVINGS'
  }

  await accountPage.clickAccountService('Transfer Funds');
  AccountManager.saveAccount(newAccount);
  FileManager.saveUserData(userData);
})

test('Login user', async ({ page }) => {


  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await homePage.navigate();

  const userData = FileManager.loadUserData();
  expect(userData).not.toBeNull();
  await loginPage.login(userData.username, userData.password);

  await accountPage.verifyAccountServiceMenu();
})

