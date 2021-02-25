import { Card, List, TextMini } from '@core/components';
import {
    StyledPoolStake,
    StyledInfo,
    StyledStakeForms,
    StyledClaimActions
} from './pool-stake.styles';

const PoolStake = ({
    info,
    listData,
    stakeForms,
    claimActions
}) => {

    const renderInfo = () => {
        if (!info) return null;
        return (
            <StyledInfo>
                <TextMini>
                    {info}
                </TextMini>
            </StyledInfo>
        );
    };
    const renderList = () => {
        if (!listData || listData.length === 0) return null;
        return (
            <Card
                color="secundary"
            >
                <List 
                    data={listData}
                />
            </Card>
        );
    };
    const renderForms = () => {
        if (!stakeForms) return null;
        return (
            <StyledStakeForms>
                {stakeForms}
            </StyledStakeForms>
        );
    };
    const renderClaimActions = () => {
        if (!claimActions) return null;
        return (
            <StyledClaimActions>
                {claimActions}
            </StyledClaimActions>
        );
    };

    return (
        <StyledPoolStake>
            {renderInfo()}
            {renderList()}
            {renderForms()}
            {renderClaimActions()}
        </StyledPoolStake>
    );
};

export default PoolStake;