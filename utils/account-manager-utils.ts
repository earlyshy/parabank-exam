import { writeFileSync, readFileSync, existsSync } from 'fs';
import path from 'path';
import { GLOBAL } from '../config/global.config';

export interface Account {
    id: string;
    type: string;
    balance?: number;
}

export class AccountManager {
    private static ACCOUNTS_FILE = path.join(GLOBAL.USER_DATA_PATH, 'accounts.json');

    static saveAccount(account: Account):void {
        let accounts: Account[] = [];
        if (existsSync(this.ACCOUNTS_FILE)) {
            const data = readFileSync(this.ACCOUNTS_FILE, 'utf-8');
            accounts = JSON.parse(data);
        }
        accounts.push(account);
        writeFileSync(this.ACCOUNTS_FILE, JSON.stringify(accounts, null, 2));
    }

    static getAccounts(): Account[]{
        if(existsSync(this.ACCOUNTS_FILE)){
            const data = readFileSync(this.ACCOUNTS_FILE, 'utf-8');
            return JSON.parse(data);
        }
        return [];
    }

    static getAccountById(accountId: string): Account | undefined {
        const accounts = this.getAccounts();
        return accounts.find(account => account.id === accountId);
    }
}