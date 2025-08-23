// /src/components/display/studioContents/scripts/umbrellaAssetMap.ts
type State = 'closed' | 'open';
type Tone  = 'white' | 'black';   // 文件名里的颜色

export type UmbrellaKey = `${State}-${Tone}`;

export const umbrellaAssetMap: Record<UmbrellaKey, string> = {
    'closed-white': '/displayStudio/umbrella/closed-white-umbrella.svg',
    'closed-black': '/displayStudio/umbrella/closed-black-umbrella.svg',
    'open-white'  : '/displayStudio/umbrella/open-white-umbrella.svg',
    'open-black'  : '/displayStudio/umbrella/open-black-umbrella.svg',
};

export function pickUmbrellaAsset(open: boolean, isDark: boolean): string {
    // 暗色主题 → 白色图标；亮色主题 → 黑色图标
    const tone: Tone = isDark ? 'white' : 'black';
    const state: State = open ? 'open' : 'closed';
    const key = `${state}-${tone}` as UmbrellaKey;
    return umbrellaAssetMap[key];
}