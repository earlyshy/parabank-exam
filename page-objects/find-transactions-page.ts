import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

interface Transaction {
    id: number;
    accountId: number;
    type: string;
    date: number;
    amount: number;
    description: string;
}

export class FindTransactionPage extends BasePage {
    findByAmount: Locator;
    findButton: Locator;
    transactionResults: Locator;
    
    constructor(page: Page) {
        super(page);
        this.findByAmount = page.locator('input[id="amount"]');
        this.findButton = page.locator('button[id="findByAmount"]');
        this.transactionResults = page.locator('#transactionTable tbody tr, div.ng-scope');
    }
    
    async findTransactionByAmount(amountToBeSearch: string): Promise<void> {
        await this.findByAmount.fill(amountToBeSearch);
        await this.clickFindTransactionByAmountButton();
    }

    async clickFindTransactionByAmountButton(): Promise<void> {
        await this.findButton.click();
    }
    
    async getTransactionsForAccount(accountId: string, amount: string): Promise<Transaction[]> {
        const response = await this.page.request.get(
            `https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${accountId}/transactions/amount/${amount}?timeout=30000`
        );
        
        expect(response.status()).toBe(200);
        return await response.json() as Transaction[];
    }
    
    async validateTransactionDetails(accountId: string, amount: string, expectedCount?: number): Promise<Transaction[]> {
        const transactions = await this.getTransactionsForAccount(accountId, amount);
        
        // If expectedCount is provided, validate the number of transactions
        if (expectedCount !== undefined) {
            expect(transactions.length).toEqual(expectedCount);
        }
        
        // Validate each transaction contains required fields
        transactions.forEach(transaction => {
            expect(transaction).toHaveProperty('id');
            expect(transaction).toHaveProperty('accountId');
            expect(transaction).toHaveProperty('type');
            expect(transaction).toHaveProperty('date');
            expect(transaction).toHaveProperty('amount');
            expect(transaction).toHaveProperty('description');
            
            // Validate the amount matches our search
            expect(transaction.amount).toEqual(parseFloat(amount));
            
            // Validate the account ID matches
            expect(transaction.accountId.toString()).toEqual(accountId);
        });
        
        return transactions;
    }
    
    async validateTransactionTypes(transactions: Transaction[], expectedTypes: string[]): Promise<void> {
        // Validate that the transaction types match the expected types
        expect(transactions.length).toEqual(expectedTypes.length);
        
        for (let i = 0; i < transactions.length; i++) {
            expect(transactions[i].type).toEqual(expectedTypes[i]);
        }
    }
    
    async validateTransactionDescriptions(transactions: Transaction[], expectedDescriptions: string[]): Promise<void> {
        // Validate that the transaction descriptions match the expected descriptions
        expect(transactions.length).toEqual(expectedDescriptions.length);
        
        for (let i = 0; i < transactions.length; i++) {
            expect(transactions[i].description).toEqual(expectedDescriptions[i]);
        }
    }
    
    async interceptAndValidateTransactions(accountId: string, amount: string): Promise<Transaction[]> {
        // Set up the request interception
        let transactions: Transaction[] = [];
        
        const responsePromise = this.page.waitForResponse(
            response => 
                response.url().includes(`/accounts/${accountId}/transactions/amount/${amount}`) && 
                response.status() === 200
        );
        
        // Trigger the search
        await this.findTransactionByAmount(amount);
        
        // Wait for the response
        const response = await responsePromise;
        transactions = await response.json() as Transaction[];
        
        // Basic validation that we got data
        expect(transactions.length).toBeGreaterThan(0);
        
        return transactions;
    }
}