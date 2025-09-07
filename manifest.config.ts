import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
    manifest_version: 3,
    name: "__MSG_extensionName__",
    short_name: "PinSight",
    description: "__MSG_extensionDescription__",
    version: pkg.version,
    icons: {
        16: "public/icon_16.png",
        32: "public/icon_32.png",
        48: "public/icon_48.png",
        128: "public/icon_128.png",
    },
    action: {
        default_icon: {
            16: "public/icon_16.png",
            32: "public/icon_32.png",
            48: "public/icon_48.png",
            128: "public/icon_128.png",
        },
        default_popup: "src/popup/index.html",
    },
    content_scripts: [
        {
            js: ["src/content/main.ts"],
            css: ["src/content/injected.css"],
            matches: ["https://*.pinterest.com/*"],
        },
    ],
    background: {
        service_worker: "src/service-workers/background.ts",
    },
    permissions: ["storage", "tabs"],
    default_locale: "en",
});