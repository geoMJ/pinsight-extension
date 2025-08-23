import { EXTENSION_STORAGE_KEY } from "./storage";

export type PinDisplayMode = "hidden" | "blurred" | "labelled";

export interface ExtensionOptions {
    blockingMode: PinDisplayMode;
}

export const defaultOptions: ExtensionOptions = {
    blockingMode: "labelled",
};

export interface ExtensionStorage {
    options: ExtensionOptions;
}

export interface ExtensionStorageRoot {
    [EXTENSION_STORAGE_KEY]: ExtensionStorage | undefined;
}

export interface ChromeMessage {
    type: string;
    url: string;
}