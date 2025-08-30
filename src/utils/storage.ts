import { defaultOptions, EXTENSION_STORAGE_KEY } from "./constants";
import { ExtensionOptions, ExtensionStorage, ExtensionStorageRoot } from "./types";

export const getValueFromStorage = async (key: keyof ExtensionStorage): Promise<ExtensionOptions | null> => {
    const extensionStorage: ExtensionStorageRoot = await chrome.storage.local.get(EXTENSION_STORAGE_KEY);
    if (!extensionStorage[EXTENSION_STORAGE_KEY]) return null;
    return extensionStorage[EXTENSION_STORAGE_KEY][key];
};

export const setValueInStorage = async (key: keyof ExtensionStorage, value: any) => {
    const currentStorage: ExtensionStorageRoot = await chrome.storage.local.get(EXTENSION_STORAGE_KEY);
    if (!currentStorage[EXTENSION_STORAGE_KEY]) {
        currentStorage[EXTENSION_STORAGE_KEY] = {options: defaultOptions};
    }
    currentStorage[EXTENSION_STORAGE_KEY][key] = value;
    await chrome.storage.local.set(currentStorage);
};

export const listenForStorageChanges = (callback: (changes: any) => void) => {
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === "local") {
            callback(changes);
        }
    });
};
