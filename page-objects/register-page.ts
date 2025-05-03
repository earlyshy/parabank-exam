import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { FileManager } from '../utils/file-manager';

export class RegisterPage extends BasePage{
    firstNameInput: Locator;
    lastNameInput: Locator;
    addressInput: Locator;
    cityInput: Locator;
    stateInput: Locator;
    zipCodeInput: Locator;
    phoneInput: Locator;
    ssnInput: Locator;
    usernameInput: Locator;
    passwordInput: Locator;
    confirmPasswordInput: Locator;
    registerButton: Locator;


    constructor(page: Page){
        super(page);
        this.firstNameInput = page.locator('input[id="customer.firstName"]');
        this.lastNameInput = page.locator('input[id="customer.lastName"]');
        this.addressInput = page.locator('input[id="customer.address.street"]');
        this.cityInput = page.locator('input[id="customer.address.city"]');
        this.stateInput = page.locator('input[id="customer.address.state"]');
        this.zipCodeInput = page.locator('input[id="customer.address.zipCode"]');
        this.phoneInput = page.locator('input[id="customer.phoneNumber"]');
        this.ssnInput = page.locator('input[id="customer.ssn"]');
        this.usernameInput = page.locator('input[id="customer.username"]');
        this.passwordInput = page.locator('input[id="customer.password"]');
        this.confirmPasswordInput = page.locator('input[id="repeatedPassword"]');
        this.registerButton = page.getByRole('button', { name: 'Register' });

    }

    async fillRegisterForm(userData: any){
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.addressInput.fill(userData.address);
        await this.cityInput.fill(userData.city);
        await this.stateInput.fill(userData.state);
        await this.phoneInput.fill(userData.phoneNumber);
        await this.ssnInput.fill(userData.ssn);
        await this.usernameInput.fill(userData.username);
        await this.passwordInput.fill(userData.password);
        await this.confirmPasswordInput.fill(userData.password);
    }

    async submitRegistration(){
        await this.registerButton.click();
    }

    async enterZipCode(): Promise<void> {
        try{
            const userData = FileManager.loadUserData();
            const zipCodeStr = this.toFormValue(userData.zipCode);
            await this.zipCodeInput.fill(zipCodeStr);
            await expect(this.zipCodeInput).toHaveValue(zipCodeStr);

        }catch (error) {
            console.error('Error entering zip code:', error);
            throw error; // Rethrow the error to ensure the test fails
        }
    }
    
    async enterFieldValue(locator: Locator, value: any, fieldName: string): Promise<void> {
        try{
            const stringValue = this.toFormValue(value);
            await locator.fill(stringValue);
            await expect(locator).toHaveValue(stringValue);

        }catch (error) {
            console.error(`Error entering ${fieldName}:`, error);
            throw error; // Rethrow the error to ensure the test fails
        }
    }

    async fillTheRegistrationForm(userData: any): Promise<void> {
        if(!userData){
            throw new Error('User data is not provided');
        }
        await this.enterFieldValue(this.firstNameInput, userData.firstName, 'first name');
        await this.enterFieldValue(this.lastNameInput, userData.lastName, 'last name');
        await this.enterFieldValue(this.addressInput, userData.address, 'address');
        await this.enterFieldValue(this.cityInput, userData.city, 'city');
        await this.enterFieldValue(this.stateInput, userData.state, 'state');
        await this.enterFieldValue(this.phoneInput, userData.phone, 'phone');
        await this.enterFieldValue(this.ssnInput, userData.ssn, 'SSN');
        await this.enterFieldValue(this.usernameInput, userData.username, 'username');
        await this.enterFieldValue(this.passwordInput, userData.password, 'password');
        await this.enterFieldValue(this.confirmPasswordInput, userData.password, 'confirm password');
    }

    async registerUser(userData: any): Promise<boolean> {
        await this.fillTheRegistrationForm(userData);
        await this.submitRegistration();
        try{
            await expect(this.registerButton).toBeVisible();
            return true;
        }catch(error){
            console.error('Error during registration:', error);
            return false;
        }
    }

    private toFormValue(value: any): string{
        if(value === null || value === undefined){
            return '';
        }
        return String(value);
    }

}