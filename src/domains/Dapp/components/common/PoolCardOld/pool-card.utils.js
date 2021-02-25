import { ContentCopyIcon, ExchangeIcon, LinkIcon, SchoolIcon, ExtensionIcon } from '@assets';

export const getIcon = icon => {
    switch(icon) {
        case 'contract': return <ContentCopyIcon />
        case 'exchange': return <ExchangeIcon />
        case 'link': return <LinkIcon />
        case 'school': return <SchoolIcon />
        default: return <ExtensionIcon />
    }
};