import { WrenchScrewdriverIcon, WalletIcon, CubeIcon, ChatBubbleBottomCenterTextIcon, CpuChipIcon, TagIcon} from "@heroicons/react/24/outline";

/*     Temp conf     */
export const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

/*     SelectRatio for project case     */
export const selectRatio = [
    {label: '1X1', value: '1X1'},
    {label: '2X1', value: '2X1'},
    {label: '1X2', value: '1X2'},
    {label: '2X2', value: '2X2'},
];

/*     User menu      */
export const userNavigation = [
    { title: 'Your Profile', url: '#', current: false },
    { title: 'Settings', url: '#', current: false },
    { title: 'Sign out', url: '#', current: false },
]

/*     Site Menu      */
export const navigation = [
    {
        order: 100,
        title: 'Projects',
        url: '/projects',
        icon: CubeIcon,
    },
    {
        order: 110,
        title: 'Technologies',
        url: '/technologies',
        icon: CpuChipIcon,
    },
    {
        order: 120,
        title: 'Tags',
        url: '/tags',
        icon: TagIcon,
    },
    {
        order: 200,
        title: 'Portfolio',
        url: '/portfolio',
        icon: WalletIcon,
    },
    {
        order: 300,
        title: 'Messages',
        url: '/messages',
        icon: ChatBubbleBottomCenterTextIcon,
        submenu: [
            {
                order: 310,
                title: 'Messages list',
                url: '/messages',
            },
            {
                order: 320,
                title: 'Mailing',
                url: '/mailing',
            },
        ],
    },
    {
        order: 400,
        title: 'Builder pages',
        url: '/builder',
        icon: WrenchScrewdriverIcon,
    },
]
