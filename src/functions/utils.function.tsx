const config = import.meta.env;

const STORAGES: {[key: string]: string} = {
    session: 'sessionStorage',
    local: 'localStorage',
}

const storage = STORAGES[config.APP_STORAGE as string] || 'sessionStorage'; // Fallback on session always

export const getItemFromSession = (key: string) => {
    const item = (window as any)[storage].getItem(key);

    return item ? JSON.parse(item) : null;
}

export const setItemInSession = (key: string, value: unknown) => {
    const item = JSON.stringify(value);
    
    (window as any)[storage].setItem(key, item);
}

export const removeItemFromSession = (key: string) => {
    (window as any)[storage].removeItem(key);
}