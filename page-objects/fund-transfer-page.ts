import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';


export class FundTransferPage extends BasePage{
    toAccount: Locator;
    inputAmount: Locator;
    transferButton: Locator;
    successMessage: Locator;
    constructor(page: Page){
        super(page);
        this.toAccount = page.locator('select[id="toAccountId"]');
        this.inputAmount = page.locator('input[id="amount"]');
        this.transferButton = page.getByRole('button', { name: 'Transfer' });
        this.successMessage = page.locator('div#showResult');
    }

    async selectToAccount(accountId: string): Promise<void>{
        await this.toAccount.selectOption(accountId);
    }

    async inputTransferAmount(amount: string): Promise<void>{
        await this.inputAmount.fill(amount);
    }

    async clickTransferButton(): Promise<void>{
        await this.transferButton.click();
    }

    async transferFunds(toAccountId: string, amount: string): Promise<void>{
        await this.selectToAccount(toAccountId);
        await this.inputTransferAmount(amount);
        await this.clickTransferButton();
        await expect(this.successMessage).toBeVisible();
    }
    
}