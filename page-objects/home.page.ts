import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';


export class HomePage extends BasePage {
    registerLink: Locator;
    loginForm: Locator;

    constructor(page: Page){
        super(page);
        this.registerLink = page.getByRole('link', { name: 'Register' });

    }

    async clickRegisterLink(){
        await this.registerLink.click();
    }
}