import { useScene } from "@motion-canvas/core";

export const useColors = () => {
    let vars = useScene().variables;
    const get = (name: string) => vars.get(name, "#FFF");

    return {
        bgPrimary: get("bgPrimary"),
        bgSecondary: get("bgSecondary"),
        bgAccentRed: get("bgAccentRed"),
        bgAccentYellow: get("bgAccentYellow"),
        grid: get("grid"),
        fgPrimary: get("fgPrimary"),
        fgSecondary: get("fgSecondary"),
        fgTertiary: get("fgTertiary"),
        fgAccentRed: get("fgAccentRed"),
        fgAccentYellow: get("fgAccentYellow"),
    };
};
