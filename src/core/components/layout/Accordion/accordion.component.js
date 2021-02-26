import { useState } from 'react';

import { AddIcon, RemoveIcon } from '@assets';
import { DisplaySmall, TextSmall } from '@core/components';
import {
    StyledAccordion,
    StyledQuestion,
    StyledIndicator,
    StyledAnswer
} from './accordion.styles';

const Accordion = ({
    children,
    question = 'Change this question',
    color = 'primary',
    activeIcon = <RemoveIcon />,
    inactiveIcon = <AddIcon />,
    isActive = false
}) => {

    const [ active, setActive ] = useState(isActive);

    return (
        <StyledAccordion color={color}>
            <StyledQuestion onClick={() => setActive(!active)}>
                <DisplaySmall color={color}>
                    {question}
                </DisplaySmall>
                <StyledIndicator color={color}>
                    {active ? activeIcon : inactiveIcon}
                </StyledIndicator>
            </StyledQuestion>
            {active && (
                <StyledAnswer>
                    <TextSmall>
                        {children}
                    </TextSmall>
                </StyledAnswer>
            )}
        </StyledAccordion>
    );
};

export default Accordion;