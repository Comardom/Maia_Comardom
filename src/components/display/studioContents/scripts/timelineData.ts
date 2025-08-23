// /src/components/display/studioContents/scripts/timelineData.ts
export type TimelineEvent = {
    year: string;      // 字符串便于写 "2009 —— 2010"
    title: string;
    description: string;
    // 未来可能加入 link, image 等字段
};

export const timelineEvents: TimelineEvent[] = [
    {
        year:'',
        title:'SSSSSSSSSSSSSSSSStart……',
        description:'',
    },
    {
        year: '2001',
        title: '网站成立',
        description: '河南大学网站成立，开始搭建学校网络宣传与信息化平台。',
    },
    {
        year: '2002',
        title: '制作校主页与新闻网',
        description: '负责设计和制作河南大学主页、新闻网等一系列官方网站，并进行后续改版，填补学校网络建设空白。',
    },
    {
        year: '2003',
        title: '《校园文化网》上线',
        description: '《校园文化网》制作完毕，以展现校园生活与学生风采为主，偏文学性质。',
    },
    {
        year: '2004',
        title: '首部 DV 剧策划与制作',
        description: '策划并制作河南大学首部 DV 剧《一刹那的灿烂碰撞》，拍摄与后期历时半年完成。',
    },
    {
        year: '2005',
        title: 'DV 剧校内公映',
        description: 'DV 剧《一刹那的灿烂碰撞》在学校大礼堂公映，反响强烈。',
    },
    {
        year: '2006',
        title: 'CUBA 西北赛区拍摄报道',
        description: '负责第八届 CUBA 西北赛区的比赛拍摄与网络新闻报道工作。',
    },
    {
        year: '2007',
        title: '《校园文化网》全面改版',
        description: '对《校园文化网》进行全面改版，定位为高校门户，为后续过渡至“河大在线”做准备。',
    },
    {
        year: '2008',
        title: '《河大在线》上线',
        description: '《河大在线》正式上线，理念与技术都有显著飞跃。',
    },
    {
        year: '2009 —— 2010',
        title: '电子杂志《Share》问世',
        description: '2009—2010 年间，河南大学第一份电子杂志《Share》诞生。',
    },
    {
        year:'……',
        title:'',
        description: '',
    },
    {
        year:'2024 —— 2025',
        title:'网站工作室全新网站上线',
        description:'崭新的工作室与部门网页，即将迎来的论坛，都在指引着更好的未来。',
    },
    {
        year:'',
        title:'Endlessssssssssssssssssss……',
        description:'',
    },

    // 预留位置，后续添加 2023 / 2024：
    // { year: '2023', title: '...', description: '...' },
    // { year: '2024', title: '...', description: '...' },
];
