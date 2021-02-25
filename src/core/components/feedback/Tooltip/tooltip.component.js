import { useState, useEffect, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useMousePosition } from '@hooks';
import {
    StyledTooltipWrapper,
    StyledTooltipContainer,
    StyledTooltip
} from './tooltip.styles';

const Tooltip = props => {

    const { message, isHtml, position, followCursor, offset, enterDelay, leaveDelay, children } = props;

    const [ active, setActive ] = useState(false);
    const [ positionXY, setPositionXY ] = useState({ x: 0, y: 0 });

    const rootNode = document.getElementById('root');

    const wrapperRef = useRef(null);
    const tooltipRef = useRef(null);

    const mousePosition = useMousePosition();

    const onMouseEnterWrapper = e => {
        calcPosition();
        setActive(true);
    };
    const onMouseLeaveWrapper = e => {
        setActive(false);
    };
    const onMouseMoveWrapper = e => {
        if (!followCursor) {return}
        calcPosition();
    };

    const calcPosition = () => {
        if (!tooltipRef || !tooltipRef.current) {return}
        
        const wrapperRect = wrapperRef.current.getBoundingClientRect();
        const tooltipWidth = tooltipRef.current.offsetWidth;
        const tooltipHeight = tooltipRef.current.offsetHeight;

        const originLeft = followCursor ? mousePosition.x : wrapperRect.left;
        const originTop = followCursor ? mousePosition.y : wrapperRect.top;
        const originWidth = followCursor ? 0 : wrapperRect.width;
        const originHeight = followCursor ? 0 : wrapperRect.height;

        switch(position) {
            case 'top-left': {
                return setPositionXY({
                    x: originLeft,
                    y: originTop - offset - tooltipHeight
                });
            }
            case 'top-center': {
                return setPositionXY({
                    x: originLeft + (originWidth / 2) - (tooltipWidth / 2),
                    y: originTop - offset - tooltipHeight
                });
            }
            case 'top-right': {
                return setPositionXY({
                    x: originLeft + originWidth - tooltipWidth,
                    y: originTop - offset - tooltipHeight
                });
            }
            case 'right-top': {
                return setPositionXY({
                    x: originLeft + originWidth + offset,
                    y: originTop
                });
            }
            case 'right-center': {
                return setPositionXY({
                    x: originLeft + originWidth + offset,
                    y: originTop + (originHeight / 2) - (tooltipHeight / 2),
                });
            }
            case 'right-bottom': {
                return setPositionXY({
                    x: originLeft + originWidth + offset,
                    y: originTop + originHeight - tooltipHeight
                });
            }
            case 'bottom-right': {
                return setPositionXY({
                    x: originLeft + originWidth - tooltipWidth,
                    y: originTop + originHeight + offset
                });
            }
            case 'bottom-center': {
                return setPositionXY({
                    x: originLeft + (originWidth / 2) - (tooltipWidth / 2),
                    y: originTop + originHeight + offset
                });
            }
            case 'bottom-left': {
                return setPositionXY({
                    x: originLeft + originWidth - tooltipWidth,
                    y: originTop + originHeight + offset
                });
            }
            case 'left-bottom': {
                return setPositionXY({
                    x: originLeft - offset - tooltipWidth,
                    y: originTop + originHeight
                });
            }
            case 'left-center': {
                return setPositionXY({
                    x: originLeft - offset - tooltipWidth,
                    y: originTop + (originHeight / 2) - (tooltipHeight / 2),
                });
            }
            case 'left-top': {
                return setPositionXY({
                    x: originLeft - offset - tooltipWidth,
                    y: originTop
                });
            }
        }
    };
    
    const renderTooltip = () => {
        if (!active || !message || message === '') {return null}
        return (
            createPortal(
                <StyledTooltipContainer>
                    <StyledTooltip
                        ref={tooltipRef}s
                        style={{ 
                            left: positionXY.x,
                            top: positionXY.y
                        }}
                    >
                        {message}
                    </StyledTooltip>
                </StyledTooltipContainer>,
                rootNode
            )
        );
    };

    useEffect(() => {
        if (!active) {return}
        calcPosition();
    }, [active]);

    return (
        <StyledTooltipWrapper
            ref={wrapperRef}
            onMouseEnter={e => onMouseEnterWrapper(e)}
            onMouseLeave={e => onMouseLeaveWrapper(e)}
            onMouseMove={e => onMouseMoveWrapper(e)}
        >
            {children}
            {renderTooltip()}
        </StyledTooltipWrapper>
    );

};

Tooltip.defaultProps = {
    message: '',
    isHtml: false,
    position: 'top-center',
    followCursor: false,
    offset: 10,
    enterDelay: null,
    leaveDelay: null
};

export default Tooltip;