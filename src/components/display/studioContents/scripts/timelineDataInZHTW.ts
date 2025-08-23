// /src/components/display/studioContents/scripts/timelineData.ts
export type TimelineEvent = {
    year: string;      // 字串是為了寫 "2009 —— 2010"
    title: string;
    description: string;
    // 以後可能會加 link, image 等等
};

export const timelineEvents: TimelineEvent[] = [
    {
        year:'',
        title:'SSSSSSSSSSSSSSSSStart……',
        description:'',
    },
    {
        year: '2001',
        title: '網站成立',
        description: '河南大學網站正式成立，開始架設學校的網路宣傳與資訊平台。',
    },
    {
        year: '2002',
        title: '製作校首頁與新聞網',
        description: '我們負責設計和製作河南大學首頁、新聞網等等，填補了學校網路建置的空缺。',
    },
    {
        year: '2003',
        title: '《校園文化網》上線',
        description: '《校園文化網》網站做好了，主要用來展現校園生活與學生風采，內容比較偏文學性質。',
    },
    {
        year: '2004',
        title: '首部 DV 劇企劃與製作',
        description: '我們企劃並製作了河南大學第一部 DV 劇《一剎那的燦爛碰撞》，從拍片到後製花了半年才完成。',
    },
    {
        year: '2005',
        title: 'DV 劇校內公映',
        description: '《一剎那的燦爛碰撞》在學校大禮堂公開播映，迴響超熱烈。',
    },
    {
        year: '2006',
        title: 'CUBA 西北賽區拍攝報導',
        description: '負責第八屆 CUBA 西北賽區的比賽拍攝和網路新聞報導工作。',
    },
    {
        year: '2007',
        title: '《校園文化網》全面改版',
        description: '我們對《校園文化網》做了大改版，把它定位成學校入口網，為之後改成「河大在線」做準備。',
    },
    {
        year: '2008',
        title: '《河大在線》上線',
        description: '《河大在線》正式上線，無論是理念或技術都大躍進。',
    },
    {
        year: '2009 —— 2010',
        title: '電子雜誌《Share》問世',
        description: '在 2009 到 2010 年間，河南大學第一本電子雜誌《Share》誕生了。',
    },
    {
        year:'……',
        title:'',
        description: '',
    },
    {
        year:'2024 —— 2025',
        title:'網站工作室全新網站上線',
        description:'嶄新的工作室與部門網頁，還有即將登場的論壇，都在指引著更好的未來。',
    },
    {
        year:'',
        title:'Endlessssssssssssssssssss……',
        description:'',
    },

    // 預留位置，之後補上 2023 / 2024：
    // { year: '2023', title: '...', description: '...' },
    // { year: '2024', title: '...', description: '...' },
];