import { getOption, setOption } from "@/content/options";
import { PinDisplayMode } from "@/utils/types";

const contentContainers = document.querySelectorAll(".content");
const extensionToggle = document.getElementById("extension-toggle") as HTMLInputElement;
const extensionStatus = document.getElementById("extension-status") as HTMLParagraphElement;
const displayModeRadios = document.getElementsByName("display-option") as NodeListOf<HTMLInputElement>;
const reloadBtn = document.getElementById("page-reload-btn") as HTMLButtonElement;
const aiCountSpan = document.getElementById("ai-count") as HTMLSpanElement;

const onPinterest = (tab: chrome.tabs.Tab) => tab.url && tab.url.includes("pinterest.com");

const checkDisplayModeRadio = async () => {
    const mode = await getOption("displayMode");
    displayModeRadios.forEach((input) => {
        input.checked = input.value === mode;
    });
};

const checkExtensionToggle = async () => {
    const isEnabled = await getOption("extensionEnabled");
    extensionToggle.checked = isEnabled;
    extensionStatus.textContent = isEnabled ? "Enabled" : "Disabled";
    contentContainers.forEach((container) => {
        container.classList.toggle("greyed-out", !isEnabled);
    });
};

const showReloadHint = (tab: chrome.tabs.Tab) => {
    if (onPinterest(tab)) {
        reloadBtn.classList.add("reload-needed");
    }
};

const resetReactiveElements = () => {
    reloadBtn.classList.remove("reload-needed");
    aiCountSpan.textContent = "0";
};

const initPopup = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await checkDisplayModeRadio();
    await checkExtensionToggle();

    extensionToggle.addEventListener("change", () => {
        extensionStatus.textContent = extensionToggle.checked ? "Enabled" : "Disabled";
        setOption("extensionEnabled", extensionToggle.checked);
        contentContainers.forEach((container) => {
            container.classList.toggle("greyed-out", !extensionToggle.checked);
        });
        showReloadHint(tab);
    });

    displayModeRadios.forEach((input: HTMLInputElement) => {
        input.addEventListener("change", () => {
            if (input.checked) {
                const selectedValue = input.value as PinDisplayMode;
                setOption("displayMode", selectedValue);
            }
            showReloadHint(tab);
        });
    });

    reloadBtn.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0].id) {
                chrome.tabs.reload(tabs[0].id);
                resetReactiveElements();
            }
        });
    });

    if (onPinterest(tab) && tab.id) {
        chrome.tabs.sendMessage(tab.id, { type: "GET_AI_PINS_COUNT" }, (response) => {
            if (response && response.type === "AI_PINS_COUNT") {
                aiCountSpan.textContent = response.count.toString();
            }
        });
    }
};

initPopup();
