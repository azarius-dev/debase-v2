import { Link } from 'react-router-dom';

import { HelpIcon } from '@assets';
import { Card, Button, IconButton, Tooltip, DisplaySmall, Flexbox } from '@core/components';
import { StatusIndicator } from '@dapp/components';

import {
    StyledPoolCard,
    StyledPoolCardInner,
    StyledHeader,
    StyledInfoIcon,
    StyledLinkList
} from './poolcard.styles';

const PoolCard = ({
    children,
    label = 'pool',
    info,
    linkData,
    routePath = '/',
    isActive = false
}) => {

    return (
        <StyledPoolCard>
            <StyledPoolCardInner>
                <StyledHeader>
                    <Tooltip
                        message={isActive ? 'Active pool' : 'Inactive pool'}
                        followCursor={true}
                    >
                        <StatusIndicator status={isActive ? 'active' : 'inactive'} />
                    </Tooltip>
                    <DisplaySmall color="primary">
                        {label}
                    </DisplaySmall>

                    {info && info !== '' && (
                        <StyledInfoIcon>
                            <Tooltip
                                message={info}
                                followCursor={true}
                            >
                                <HelpIcon />
                            </Tooltip>
                        </StyledInfoIcon>
                    )}
                    
                </StyledHeader>
                <Card
                    isActive={isActive}
                    gutter={30}
                >
                    {children}
                </Card>
                <Button
                    as={Link}
                    to={routePath}
                >
                    Stake
                </Button>
            </StyledPoolCardInner>

            {linkData && linkData.length !== 0 && (
                <Flexbox gap="15px">
                    {linkData.map((link, i) => {
                        const { icon, info, url } = link;
                        return (
                            <Tooltip
                                key={`poollink-${i}`}
                                message={info}
                                followCursor={true}
                            >
                                <IconButton
                                    as="a"
                                    href={url}
                                    target="_target"
                                >
                                    {icon}
                                </IconButton>
                            </Tooltip>
                        );
                    })};
                </Flexbox>
            )}

        </StyledPoolCard>
    );

};

export default PoolCard;