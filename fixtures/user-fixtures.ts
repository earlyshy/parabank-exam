import { test as base } from '@playwright/test';
import { FileManager } from '../utils/file-manager';

interface UserData {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    ssn: string;
    username: string;
    password: string;
    tag: string;
  }

interface UserFixtures {
    registeredUser: UserData;
}
  
export const test = base.extend<UserFixtures>({ 
    registeredUser: async ({}, use) => {
        const userData = FileManager.loadUserData();
        await use(userData);
    }
});

export { expect } from '@playwright/test';