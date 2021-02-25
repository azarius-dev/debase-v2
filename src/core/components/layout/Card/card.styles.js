import styled from 'styled-components';

export const StyledCard = styled.div`
    position: relative;
    box-sizing: border-box;
    display: flex;
    border-radius: 10px;
    border: 2px solid ${props => props.theme.colors[props.color + 'Light']};
    background-color: ${props => props.theme.colors.background};
    box-shadow: ${props => props.theme.shadows[props.color]};

    &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: ${props => props.theme.colors[props.color]};
        border-radius: 5px;
        opacity: .05;
    }
`;

export const StyledActiveBorderSVG = styled.svg`
    position: absolute;
    z-index: 2;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    height: calc(100% + 2px);
    width: calc(100% + 2px);
    user-select: none;
    pointer-events: none;
    filter: drop-shadow(${props => props.theme.shadows[props.color + 'Small']});
`;

export const StyledActiveBorderSVGRect = styled.rect`
    fill: transparent;
    stroke: ${props => props.theme.colors[props.color + 'Light']};
    stroke-width: 4px;
    stroke-linecap: round;
    rx: 10px;
`;

export const StyledLoader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    z-index: 4;
    flex-grow: 1;
`;