import styled from 'styled-components';

export const StyledDebug = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`;

export const StyledGraph = styled.div`
    box-sizing: border-box;
    position: relative;
    display: flex;
    z-index: 1;
    width: 100%;
    height: 100%;
`;

export const StyledGrid = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const StyledActiveLineContainer = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    z-index: 1;
`;

export const StyledActiveLineX = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    border-left: 1px dashed ${props => props.theme.colors.secundary}33;
    backface-visibility: hidden;
`;

export const StyledActiveLineY = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    border-top: 1px dashed ${props => props.theme.colors.secundary}33;
    backface-visibility: hidden;
`;

export const StyledActiveDot = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    background-color: ${props => props.theme.colors.secundary}22;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
    pointer-events none;

    :before {
        content: '';
        display: flex;
        background-color: ${props => props.theme.colors.secundary};
        border-radius: 50%;
        width: 8px;
        height: 8px;
    }

`;

export const StyledGraphSVG = styled.svg`
    position: absolute;
    filter: drop-shadow(0 0 5px ${ props => props.theme.colors.secundary });
`;

export const StyledPolygon = styled.polygon`
    position: relative;
    stroke: ${ props => props.theme.colors.secundary };
    stroke-width: 2px;
    stroke-linejoin: round;
`;

export const StyledGraphTooltip = styled.div`
    box-sizing: border-box;
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.background};
    border: 2px solid ${props => props.theme.colors.secundaryLight};
    box-shadow: ${props => props.theme.shadows.secundary};
    border-radius: 10px;
    z-index: 10;
    padding: 14px 18px;
    gap: 5px;
    transform: translate(-50%, 10px);
    white-space: nowrap;
    user-select: none;
    pointer-events none;
    min-width: 150px;
`;

export const StyledGraphTooltipItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const StyledGraphTooltipLabel = styled.div`
    margin-right: auto;
    padding-right: 20px;
    color: ${props => props.theme.colors.secundaryLight};
`;

export const StyledGraphTooltipValue = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    font-weight: 300;
`;