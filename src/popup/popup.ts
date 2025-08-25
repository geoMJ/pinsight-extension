import { getOption, setOption } from "@/content/options";

const reloadBtn = document.getElementById("page-reload-btn") as HTMLButtonElement;
const displayModeRadios = document.getElementsByName("display-option") as NodeListOf<HTMLInputElement>;

const checkDisplayModeRadio = async () => {
    const mode = await getOption("displayMode");
    console.log(mode)
    displayModeRadios.forEach((input) => {
        input.checked = input.value === mode;
    });
};

const initPopup = async () => {

    await checkDisplayModeRadio();

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
                const selectedValue = input.value;
                setOption("displayMode", selectedValue);
            }
        });
    });
};

initPopup();
