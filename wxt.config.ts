import { defineConfig } from "wxt";
import pkg from "./package.json";

export default defineConfig({
    srcDir: "src",
    publicDir: "public",
    imports: false,
    manifest: () => {
        return {
            name: "__MSG_extensionName__",
            short_name: "PinSight",
            description: "__MSG_extensionDescription__",
            version: pkg.version,
            icons: {
                16: "icon_16.png",
                32: "icon_32.png",
                48: "icon_48.png",
                128: "icon_128.png",
            },
            action: {
                default_icon: {
                    16: "icon_16.png",
                    32: "icon_32.png",
                    48: "icon_48.png",
                    128: "icon_128.png",
                },
            },
            default_locale: "en",
            permissions: ["storage", "tabs", "activeTab"],
            host_permissions: ["https://*.pinterest.com/*"],
            web_accessible_resources: [
                {
                    resources: ["content-scripts/content.css"],
                    matches: ["https://*.pinterest.com/*"],
                },
            ],
        };
    },
});
