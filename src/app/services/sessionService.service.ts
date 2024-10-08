import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
/**
 * Session storage service
 * Provides methods to get, set, remove, clear session storage items.
 */
export class SessionService {
    /**
     * set session storage item
     * @param key
     * @param value
     */
    setItem(key: string, value: any) {
        sessionStorage.setItem(key, value);
    }

    /**
     * get session storage item
     * @param key
     */
    getItem(key: string): any {
        let value = sessionStorage.getItem(key) ?? '';
        return value;
    }

    /**
     * remove session storage item
     * @param key
     */
    removeItem(key: string) {
        sessionStorage.removeItem(key);
    }

    /**
     * remove all session storage items
     */
    clear() {
        sessionStorage.clear();
    }

}
