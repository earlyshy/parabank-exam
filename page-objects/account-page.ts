import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { readFileSync } from 'fs';
import path from 'path';

interface AccountService{
    name: string;
    href: string;
}

export class AccountPage extends BasePage {
    accountsOverView: Locator;
    accountServiceMenu: Locator;
    homeLink: Locator;
    aboutLink: Locator;
    contactLink: Locator;
    homeContent: Locator;
    aboutContent: Locator;
    contactContent: Locator;

    constructor(page: Page){
        super(page);
        this.accountsOverView = page.locator('h1.title');
        this.accountServiceMenu = page.locator('ul.serviceMenuHorizontal, div#leftPanel ul');
        this.homeLink = page.getByRole('link', { name: 'home', exact: true })
        this.aboutLink = page.getByRole('link', { name: 'about', exact: true })
        this.contactLink = page.getByRole('link', { name: 'contact', exact: true })
        this.homeContent = page.locator('#bodyPanel #rightPanel');
        this.aboutContent = page.locator('#bodyPanel #rightPanel');
        this.contactContent = page.locator('#bodyPanel #rightPanel');
    }

    async verifyHomeLink(): Promise<void>{
        await expect(this.homeLink).toBeVisible();
        await this.homeLink.click();
        await expect(this.homeContent).toBeVisible();
    }
    
    async verifyAboutLink(): Promise<void>{
        await expect(this.aboutLink).toBeVisible();
        await this.aboutLink.click();
        await expect(this.aboutContent).toBeVisible();
    }

    async verifyContactContent(): Promise<void>{
        await expect(this.contactLink).toBeVisible();
        await this.contactLink.click();
        await expect(this.contactContent).toBeVisible();
    }


    async verifyAccountsOverview(){
        await expect(this.accountsOverView).toHaveText('Accounts Overview');
    }

    async verifyAccountServiceMenu(): Promise<void> {
        const expectedServices = this.listOfAccountServicesMenu();
        await expect(this.accountServiceMenu).toBeVisible();

        for(const service of expectedServices){
            const serviceLink = this.page.getByRole('link', { name: service.name });
            //verify the link is visible
            await expect(serviceLink).toBeVisible();
            //verify the link has the correct href
            await expect(serviceLink).toHaveAttribute('href', new RegExp(service.href));
        }
    }

    async clickAccountService(serviceName: string): Promise<void> {
        const serviceLink = this.page.getByRole('link', { name: serviceName });
        await expect(serviceLink).toBeVisible();
        await serviceLink.click();
    }

    async getAccountServiceName(): Promise<string[]> {
        const serviceNames: string[] = [];
        const listItems = await this.accountServiceMenu.all();

        await Promise.all(listItems.map(async (listItem) => {
            const linkLocator = listItem.locator('a');
            if(await linkLocator.count() >0){
                const text = await linkLocator.textContent();
                if(text){
                    serviceNames.push(text.trim());
                }
            }
        }
        ));

        return serviceNames;
    }

    private listOfAccountServicesMenu(): AccountService[]{
        try{
            const filePath = path.join(__dirname, '../user-data/account-services.json');
            const data = readFileSync(filePath, 'utf-8');
            const servicesData = JSON.parse(data);
            return servicesData.accountServices;
        }catch (error) {
            console.error('Error reading or parsing the file:', error);
            throw new Error('Failed to load account services menu')
        }
    }

}