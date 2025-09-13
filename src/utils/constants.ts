import { ExtensionOptions } from "./types";

export const EXTENSION_STORAGE_KEY = "pinterest-ai-blocker-1.0.0";

export const defaultOptions: ExtensionOptions = {
    displayMode: "labelled",
    extensionEnabled: true
};

export const aiFlags = [
    "ai-generated",
    "ai generated",
    "ai modified",
    "ai art",
    "ai-art",
    "ai image",
    "by ai",
    "with ai",
    "it's ai",
    "it is ai",
    "its ai",
    "this is ai",
    "looks ai",
    "looks like ai",
    "looks like",
    "looks like",
    "artificial intelligence",
    "ai artwork",
    "ai art",
    "ai picture",
    "ai image",
    "ai drawing",
    "ai painting",
    "ai content",
    "ai photo",
    "ai render",
    "ai design",
    "ai creation",
    "ai style",
    "ai produced",
    "ai modified",
];