import { GLOBAL } from '../config/global.config';


export function generateRandomUser(){
    const randomStr = Math.random().toString(36).substring(2, 15);
    return { 
        firstName: `Test${randomStr}`,
        lastName: `User${randomStr}`,
        address: `${Math.floor(Math.random() * 1000)} Main St`,
        city: `Anytown`,
        state: `CA`,
        zipCode: Math.floor(Math.random() * 90000),
        phone: `555${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        ssn: `${Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')}`,
        username: `user${randomStr}`,
        password: `password${randomStr}`,
        tag: GLOBAL.ACCOUNT_TAG,
    }
}