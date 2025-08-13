export type MobileOS =
    | "Android"
    | "iOS"
    | "HarmonyOS"
    | "Windows Phone"
    | "Meego"
    | "Palm"
    | "Symbian"
    | "KaiOS"
    | "BlackBerry"
    | "Tizen"
    | "ChromeOS"
    | "Unknown";

export interface DeviceInfo {
    isMobile: boolean;
    os: MobileOS;
    isTouchDevice: boolean;
    ua: string;
}

export function detectDevice(): DeviceInfo {
    const ua = navigator.userAgent;
    let os: MobileOS = "Unknown";

    if (/Android/i.test(ua)) {
        os = "Android";
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
        os = "iOS";
    } else if (/HarmonyOS/i.test(ua)) {
        os = "HarmonyOS";
    } else if (/Windows Phone|IEMobile/i.test(ua)) {
        os = "Windows Phone";
    } else if (/MeeGo/i.test(ua)) {
        os = "Meego";
    } else if (/webOS|Palm/i.test(ua)) {
        os = "Palm";
    } else if (/Symbian|Series60/i.test(ua)) {
        os = "Symbian";
    } else if (/KaiOS/i.test(ua)) {
        os = "KaiOS";
    } else if (/BlackBerry|BB10/i.test(ua)) {
        os = "BlackBerry";
    } else if (/Tizen/i.test(ua)) {
        os = "Tizen";
    } else if (/CrOS/i.test(ua) && /Mobile/i.test(ua)) {
        os = "ChromeOS";
    }

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    //  简单判断是否为移动设备
    const isMobile = os !== "Unknown" || isTouchDevice;

    return {
        isMobile,
        os,
        isTouchDevice,
        ua,
    };
}
