import { useState } from 'react';

import { Tooltip, DisplayMedium, DisplaySmall } from '@core/components';
import {
    StyledProgress,
    StyledBar,
    StyledBarInner,
    StyledIndicator,
    StyledIndicatorInner,
    StyledTotal
} from './progress.styles';

const Progress = ({ variant, currentValue, totalValue, label }) => {

    // TODO: update style with state value
    //const [ percentage, setPercentage ] = useState(Number(currentValue) / Number(totalValue) * 100);

    return (
        <StyledProgress>
            <StyledBar>
                <StyledBarInner style={{ width: `${Number(currentValue) / Number(totalValue) * 100}%` }} />
                <StyledIndicator style={{ left: `${Number(currentValue) / Number(totalValue) * 100}%` }}>
                    <Tooltip
                        message={`${currentValue} ${label}`}
                        followCursor={true}
                        offset={15}
                    >
                        <StyledIndicatorInner />
                    </Tooltip>
                </StyledIndicator>
            </StyledBar>
            <StyledTotal>
                <DisplayMedium color="secundary">{totalValue}</DisplayMedium>
                <DisplaySmall color="primary">{label}</DisplaySmall>
            </StyledTotal>
        </StyledProgress>
    );
};

export default Progress;