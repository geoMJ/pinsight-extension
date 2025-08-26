import { EXTENSION_STORAGE_KEY } from "./storage";

export type PinDisplayMode = "hidden" | "blurred" | "labelled";
export type MessageType = "CHECK_PIN_PAGE" | "GET_AI_PINS_COUNT";

export interface ExtensionOptions {
    displayMode: PinDisplayMode;
    extensionEnabled: boolean;
}

export const defaultOptions: ExtensionOptions = {
    displayMode: "labelled",
    extensionEnabled: true
};

export interface ExtensionStorage {
    options: ExtensionOptions;
}

export interface ExtensionStorageRoot {
    [EXTENSION_STORAGE_KEY]: ExtensionStorage | undefined;
}

export interface ChromeMessage {
    type: MessageType;
    url?: string;
}