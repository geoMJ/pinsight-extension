// Util function to avoid too many requests to the server
const debounce = <CallbackWithArgs extends (...args: any[]) => void>(
    fn: CallbackWithArgs,
    t: number
) => {
    let timer: number;
    return function (...args: Parameters<CallbackWithArgs>) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), t);
    };
};

// Observer
// Reflect changes when new pins appear in the container
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            const isNodeValid =
                node instanceof HTMLDivElement &&
                node.getAttribute("role") === "listitem" &&
                node.hasChildNodes();

            if (!isNodeValid) continue;
            updatePinGrid();
        }
    }
});

// Logic for pin removal

// Pins marked as non AI
const processedHumanPins = new Set<String>();

// We'll remove the pin which tree starts at the "list item" element
const removePinElements = (levels: number, node: Element) => {
    let pinNode: Element | null = node;
    for (let i = 0; i < levels && pinNode; i++) {
        pinNode = pinNode.parentElement;
    }
    pinNode?.remove();
};

// We run the AI check only if this pin has not already been processed
const processPinLink = async (pinUrl: string, pinContainer: Element) => {
    const parser = new DOMParser();
    const pinPageResponse = await fetch(pinUrl);
    const htmlPageContent = await pinPageResponse.text();
    const doc = parser.parseFromString(htmlPageContent, "text/html");

    if (doc.querySelector("[data-test-id*='ai-generated']") === null)
        return processedHumanPins.add(pinUrl);

    // There are three elements to remove : the card itself and its parents / nested containers
    removePinElements(2, pinContainer);
};

// Looping through all pin cards
const debouncedCheck = debounce(processPinLink, 200);

const updatePinGrid = () => {
    const pinCards = document.querySelectorAll("[data-test-id='pin']");
    pinCards.forEach((card) => {
        if (card.querySelector("video")) return;
        const pinLink = card.querySelector("a");
        if (!pinLink || processedHumanPins.has(pinLink.href)) return;
        const url = pinLink.href;
        debouncedCheck(url, card);
    });
};

//////////////////////////// BEGINNING /////////////////////////////////////

const reactRoot = document.getElementById("__PWS_ROOT__");
if (reactRoot) observer.observe(reactRoot, { childList: true, subtree: true });
