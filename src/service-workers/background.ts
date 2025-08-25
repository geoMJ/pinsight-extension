import { ChromeMessage } from "@/utils/types";

chrome.runtime.onMessage.addListener((message: ChromeMessage, _, sendResponse) => {
    if (message.type === "CHECK_PIN_PAGE" && message.url) {
        (async () => {
            if (!message.url) return;
            try {
                const res = await fetch(message.url);
                const html = await res.text();
                sendResponse({ success: true, html });
            } catch (err) {
                sendResponse({ success: false, error: `${err}` });
            }
        })();
        return true;
    }
});
