// /src/components/display/studioContents/scripts/umbrellaAssetMap.ts
type State = 'closed' | 'open';
type Tone  = 'white' | 'black';   // 文件名里的颜色

export type UmbrellaKey = `${State}-${Tone}`;

export const umbrellaAssetMap: Record<UmbrellaKey, string> = {
    'closed-white': '/displayStudio/umbralla/closed-white-umbralla.svg',
    'closed-black': '/displayStudio/umbralla/closed-black-umbralla.svg',
    'open-white'  : '/displayStudio/umbralla/open-white-umbralla.svg',
    'open-black'  : '/displayStudio/umbralla/open-black-umbralla.svg',
};

export function pickUmbrellaAsset(open: boolean, isDark: boolean): string {
    // 暗色主题 → 白色图标；亮色主题 → 黑色图标
    const tone: Tone = isDark ? 'white' : 'black';
    const state: State = open ? 'open' : 'closed';
    const key = `${state}-${tone}` as UmbrellaKey;
    return umbrellaAssetMap[key];
}
