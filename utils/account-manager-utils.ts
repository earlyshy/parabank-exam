import { writeFileSync, readFileSync, existsSync, mkdirSync} from 'fs';
import path from 'path';
import { GLOBAL } from '../config/global.config';

export interface Account {
    id: string;
    type: string;
    balance?: number;
    existingId: string;
    existingType: string;
}

export class AccountManager {
    private static ACCOUNTS_FILE = path.join(GLOBAL.USER_DATA_PATH, 'accounts.json');

    
    // static saveAccount(account: Account):void {
    //     let accounts: Account[] = [];
    //     if (existsSync(this.ACCOUNTS_FILE)) {
    //         const data = readFileSync(this.ACCOUNTS_FILE, 'utf-8');
    //         accounts = JSON.parse(data);
    //     }
    //     accounts.push(account);
    //     writeFileSync(this.ACCOUNTS_FILE, JSON.stringify(accounts, null, 2));
    // }

        static ensureUserDataDirectoryExists() {
            if (!existsSync(GLOBAL.USER_DATA_PATH)) {
                mkdirSync(GLOBAL.USER_DATA_PATH, { recursive: true });
            }
        }
    
        static saveUserData(userData: any) {
            this.ensureUserDataDirectoryExists();
            writeFileSync(this.ACCOUNTS_FILE, JSON.stringify(userData, null, 2));
        }

    static getAccounts(){
        if(existsSync(this.ACCOUNTS_FILE)){
            const data = readFileSync(this.ACCOUNTS_FILE, 'utf-8');
            return JSON.parse(data);
        }
        return null;
    }

    static getAccountById(accountId: string): Account | undefined {
        const accounts = this.getAccounts();
        return accounts.find((account: { id: string; }) => account.id === accountId);
    }
}