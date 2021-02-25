import {
    DashboardIcon,
    TuneIcon,
    AccountTreeIcon
} from '@assets';
import {
    Dashboard,
    Pools,
    Rebase,
    Roadmap,
    Faq
} from '@dapp/views';

const DAPP_ROUTES = [
    {
        label: 'dashboard',
        path: '/',
        icon: <DashboardIcon />,
        component: <Dashboard />
    },
    {
        label: 'pools',
        path: '/pools',
        icon: <AccountTreeIcon />,
        component: <Pools />,
    },
    {
        label: 'rebase',
        path: '/rebase',
        icon: <TuneIcon />,
        component: <Rebase />
    },
    {
        label: 'dev',
        path: '/dev',
        icon: <TuneIcon />,
        component: <Faq />
    }
];

export default DAPP_ROUTES;