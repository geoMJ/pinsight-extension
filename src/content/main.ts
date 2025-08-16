// Utilities

let pinListReady = false;
let timer: number;

const debounce = (fn: () => void, t: number) => {
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => fn(), t);
    };
};

const removePinElements = (nElementsToRemove: number, node: Element) => {
    if (nElementsToRemove < 1) return;
    const parent = node.parentElement;
    console.log(node)
    console.log(parent)
    if (parent) {
        node.remove();
        nElementsToRemove -= 1;
        removePinElements(nElementsToRemove, parent);
    }
};

// Observer
// Reflect canges when new pins appear in the container
const observer = new MutationObserver((mutations, observer) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (!(node instanceof HTMLDivElement)) continue;
            onValidMutation(node, observer);
        }
    }
});

const onValidMutation = (node: HTMLDivElement, observer: MutationObserver) => {
    if (node.role === "list") {
        observer.disconnect();
        observer.observe(node, { childList: true, subtree: true });
        console.log("changed node");
        pinListReady = true;
        return;
    } else if (pinListReady === true) return updatePinGrid();
};

// Logic for individual pins

const processedPins = new Set<String>();

// We run the AI check only if this pin has not already been processed
const processPinLink = async (pinUrl: string, pinContainer: Element) => {
    const parser = new DOMParser();
    const pinPageResponse = await fetch(pinUrl);
    const htmlPageContent = await pinPageResponse.text();
    const doc = parser.parseFromString(htmlPageContent, "text/html");

    if (doc.querySelector("[data-test-id*='ai-generated']") === null) return;
    console.log("found ai generated image");

    // There are three elements to remove : the card itself and its parents / nested containers
    removePinElements(3, pinContainer);
};

// Looping through all pin cards
const updatePinGrid = () => {
    const pinCards = document.querySelectorAll("[data-test-id='pin']");
    pinCards.forEach((card) => {
        if (card.querySelector("video")) return;
        const pinLink = card.querySelector("a");
        if (!pinLink || processedPins.has(pinLink.href)) return;
        const url = pinLink.href;
        const debouncedCheck = debounce(() => processPinLink(url, card), 200);
        debouncedCheck();
    });
};

//////////////////////////// BEGINNING /////////////////////////////////////

const reactRoot = document.getElementById("__PWS_ROOT__");
if (reactRoot) observer.observe(reactRoot, { childList: true, subtree: true });
