import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { GLOBAL } from '../config/global.config';

export class FileManager{
    static ensureUserDataDirectoryExists() {
        if (!existsSync(GLOBAL.USER_DATA_PATH)) {
            mkdirSync(GLOBAL.USER_DATA_PATH, { recursive: true });
        }
    }

    static saveUserData(userData: any) {
        this.ensureUserDataDirectoryExists();
        writeFileSync(GLOBAL.USER_FILE, JSON.stringify(userData, null, 2));
    }

    static loadUserData() {
        if (existsSync(GLOBAL.USER_FILE)) {
            const data = readFileSync(GLOBAL.USER_FILE, 'utf-8');
            return JSON.parse(data);
        }
        return null;
    }
}