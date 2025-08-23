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
        title: 'Website Founded',
        description: 'The Henan University website was founded, building the school\'s online promotional platform.'
    },
    {
        year: '2002',
        title: 'Homepage & News Network Production',
        description: 'Designed and produced the university\'s official homepage and news network, filling a gap in online infrastructure.'
    },
    {
        year: '2003',
        title: '"Campus Culture Website" Launched',
        description: 'A new website was launched to showcase campus life with a literary focus.'
    },
    {
        year: '2004',
        title: 'First DV Drama Produced',
        description: 'The first DV drama, "A Moment of Brilliant Collision," was produced over six months.'
    },
    {
        year: '2005',
        title: 'DV Drama Publicly Screened',
        description: 'The DV drama was publicly screened at the university auditorium to a strong response.'
    },
    {
        year: '2006',
        title: 'CUBA Northwest Division Covered',
        description: 'Filmed and reported on the 8th CUBA Northwest Division competition.'
    },
    {
        year: '2007',
        title: '"Campus Culture Website" Revised',
        description: 'The website was comprehensively revised into a university portal, a precursor to "Heda Online."'
    },
    {
        year: '2008',
        title: '"Heda Online" Launched',
        description: 'Heda Online officially launched, marking a significant leap in concept and technology.'
    },
    {
        year: '2009 —— 2010',
        title: 'E-magazine "Share" Emerged',
        description: 'The first electronic magazine, "Share," was created.'
    },
    {
        year: '……',
        title: '',
        description: ''
    },
    {
        year: '2024 —— 2025',
        title: 'New Website Launched',
        description: 'Brand-new websites and an upcoming forum are pointing to a better future.'
    },
    {
        year:'',
        title:'Endlessssssssssssssssssss……',
        description:'',
    },
];
