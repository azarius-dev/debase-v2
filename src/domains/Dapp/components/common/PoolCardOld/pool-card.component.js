import { useContext } from 'react';
import _ from 'lodash';

/* import components */
import { Button, IconButton, List, Tooltip, DisplaySmall } from '@core/components';
import { HelpIcon } from '@assets';
import { StatusIndicator } from '@dapp/components';
import { getIcon } from './pool-card.utils';
import {
    StyledPool,
    StyledPoolHeader,
    StyledTitleWrapper,
    StyledSubtitle,
    StyledInfo,
    StyledPoolBody,
    StyledPoolCard,
    StyledPoolLinks,
    StyledPoolLists,
    StyledHighlightData,
    StyledPoolAnchor,
    StyledPoolFooter
} from './pool-card.styles';

const PoolCard = ({
    title,
    subtitle,
    tooltip,
    status,
    data,
    highlightData,
    links
}) => {

    const renderTooltip = () => {
        if (!tooltip || tooltip === '') {return null}
        return (
            <StyledInfo>
                <Tooltip
                    message={tooltip}
                    followCursor={true}
                >
                    <HelpIcon />
                </Tooltip>
            </StyledInfo>
        );
    };
    const renderSubtitle = () => {
        if (!subtitle) {return null}
        return (
            <StyledSubtitle>
                {subtitle}
            </StyledSubtitle>
        );
    };
    const renderHeader = () => {
        return (
            <StyledPoolHeader>
                <Tooltip
                    message={status}
                    followCursor={true}
                >
                    <StatusIndicator
                        status={status}
                    />
                </Tooltip>
                <StyledTitleWrapper>
                    <DisplaySmall
                        color="text"
                    >
                        {title}
                    </DisplaySmall>
                    {renderSubtitle()}
                </StyledTitleWrapper>
                {renderTooltip()}
            </StyledPoolHeader>
        );
    };
    const renderLists = () => {
        if (!data || data.length === 0) {return null}
        const localData = _.cloneDeep(data);
        const splicedData = [];
        while(localData.length > 0) {
            splicedData.push(localData.splice(0,6));
        }
        return splicedData.map((listData, i) => {
            return (
                <List 
                    key={i}
                    alternateRows={false}
                    data={listData}
                />
            );
        });
    };
    const renderHighlightData = () => {
        if (!highlightData || highlightData === 0) {return null}
        return (
            <StyledHighlightData>
                <List
                    alternateRows={false}
                    data={highlightData}
                />
            </StyledHighlightData>
        );
    };
    const renderLinks = () => {
        if (!links || links.length === 0) {return null}
        return (
            <StyledPoolLinks>
                {links.map((link, i) => {
                    const { icon, url } = link;
                    return (
                        <IconButton
                            key={i}
                            color="primary"
                            size="medium"
                            edge="rounded"
                        >
                            <StyledPoolAnchor
                                target="_blank"
                                href={url}
                            >
                                {getIcon(icon)}
                            </StyledPoolAnchor>
                        </IconButton>
                    );
                })}
            </StyledPoolLinks>
        );
    };

    return (
        <StyledPool>
            {renderHeader()}
            <StyledPoolBody>
                <StyledPoolCard>
                    <Card
                        status={status}
                        color="primary"
                        gutter={1}
                    >
                        <StyledPoolLists>
                            {renderLists()}
                        </StyledPoolLists>
                        {renderHighlightData()}
                    </Card>
                </StyledPoolCard>
                {renderLinks()}
            </StyledPoolBody>
            <StyledPoolFooter>
                <Button 
                    variant="offset"
                    color="primary"
                    onClick={() => console.log('route')}
                >
                    stake
                </Button>
            </StyledPoolFooter>
        </StyledPool>
    );

};

PoolCard.defaultProps = {

};

export default PoolCard;