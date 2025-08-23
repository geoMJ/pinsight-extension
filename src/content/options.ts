import { getValueFromStorage, setValueInStorage } from "@/utils/storage";
import { defaultOptions, ExtensionOptions } from "@/utils/types";

export const getOptions = async (): Promise<ExtensionOptions> => {
    const options = await getValueFromStorage("options");
    return options || defaultOptions;
};

export const getOption = async (key: keyof ExtensionOptions): Promise<any> => {
    const options = await getOptions();
    return options[key];
};

export const setOption = async (key: keyof ExtensionOptions, value: any) => {
    const options = await getOptions();
    options[key] = value;
    await setValueInStorage("options", options);
};

export const setOptionsToDefault = async () => {
    await setValueInStorage("options", defaultOptions);
};
