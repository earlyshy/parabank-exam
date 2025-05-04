import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';


export class OpenNewSavingsAccountPage extends BasePage{
    accountTypeSelect: Locator;
    fromAccountSelect: Locator;
    openAccountButton: Locator;
    newAccountId: Locator;
    successMessage: Locator;

    constructor(page: Page){
        super(page);
        this.accountTypeSelect = page.locator('select[name="type"]');
        this.fromAccountSelect = page.locator('select[name="fromAccountId"]');
        this.openAccountButton = page.getByRole('button', { name: 'Open New Account' });
        this.newAccountId = page.locator('#newAccountId');
    }

    async selectAccountType(accountType: string): Promise<void>{
        await this.accountTypeSelect.selectOption(accountType);
    }

    async selectFromAccount(accountId: string): Promise<void>{
        await this.fromAccountSelect.selectOption(accountId);
    }

    async clickOpenAccountButton(): Promise<void>{
        await this.openAccountButton.click();
    }

    async getNewAccountNumber(): Promise<string>{
        await expect(this.newAccountId).toBeVisible();
        const accountId = await this.newAccountId.textContent();
        if(!accountId){
            throw new Error('Failed to get new account number')
        }
        return accountId.trim();
    }

    async createNewAccount(accountType: string, fromAccountId: string): Promise<string>{
        await this.selectAccountType(accountType);

        if(fromAccountId){
            await this.selectFromAccount(fromAccountId);
        }
        
        await this.clickOpenAccountButton();
        return await this.getNewAccountNumber();
    }
}