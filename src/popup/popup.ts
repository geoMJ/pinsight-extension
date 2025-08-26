import { getOption, setOption } from "@/content/options";
import { PinDisplayMode } from "@/utils/types";

const reloadBtn = document.getElementById("page-reload-btn") as HTMLButtonElement;
const displayModeRadios = document.getElementsByName("display-option") as NodeListOf<HTMLInputElement>;
const extensionToggle = document.getElementById("extension-toggle") as HTMLInputElement;
const extensionStatus = document.getElementById("extension-status") as HTMLParagraphElement;

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
};

const initPopup = async () => {
    await checkDisplayModeRadio();
    await checkExtensionToggle();

    extensionToggle.addEventListener("change", () => {
        extensionStatus.textContent = extensionToggle.checked ? "Enabled" : "Disabled";
        setOption("extensionEnabled", extensionToggle.checked);
    });

    reloadBtn.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0].id) {
                chrome.tabs.reload(tabs[0].id);
            }
        });
    });

    displayModeRadios.forEach((input: HTMLInputElement) => {
        input.addEventListener("change", () => {
            if (input.checked) {
                const selectedValue = input.value as PinDisplayMode;
                setOption("displayMode", selectedValue);
            }
        });
    });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "GET_AI_PINS_COUNT" }, (response) => {
                if (response && response.type === "AI_PINS_COUNT") {
                    const aiCountSpan = document.getElementById("ai-count") as HTMLSpanElement;
                    aiCountSpan.textContent = response.count.toString();
                }
            });
        }
    });
};

initPopup();
