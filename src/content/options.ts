import { getValueFromStorage, setValueInStorage } from "@/utils/storage";
import { defaultOptions, ExtensionOptions } from "@/utils/types";

export const getOptions = async (): Promise<ExtensionOptions> => {
    const options = await getValueFromStorage("options");
    return options || defaultOptions;
};

export const getOption = async <K extends keyof ExtensionOptions>(key: K): Promise<ExtensionOptions[K]> => {
    const options = await getOptions();
    return options[key] ?? defaultOptions[key];
};


export const setOption = async <K extends keyof ExtensionOptions>(key: K, value: ExtensionOptions[K]) => {
    const options = await getOptions();
    options[key] = value;
    await setValueInStorage("options", options);
};

export const setOptionsToDefault = async () => {
    await setValueInStorage("options", defaultOptions);
};
