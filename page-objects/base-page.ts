import {Page} from '@playwright/test';
import {GLOBAL} from '../config/global.config';

export class BasePage{
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async navigate() {
        await this.page.goto(GLOBAL.BASE_URL);
    }
}