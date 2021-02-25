import styled from 'styled-components';

export const StyledNavigation = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const StyledButton = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 15px;
    height: 50px;
    padding: 0 18px;
`;

export const StyledIcon = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => props.theme.colors.primaryLight};
    fill: ${props => props.theme.colors.primaryLight};
    filter: drop-shadow(${props => props.theme.shadows.primaryText});

    svg {
        width: 20px;
        height: 20px;
    }
`;

export const StyledText = styled.div`
    position: relative;
    padding: 0;
    margin: 0;
    font-family: 'bladerunner', sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 100%;
    text-transform: lowercase;
    color: ${ props => props.theme.colors.text };
    text-shadow: ${props => props.theme.shadows.primaryText};
    user-select: none;
`;

export const StyledBorder = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    border-radius: 10px;
    border: 2px solid ${props => props.theme.colors.primaryLight};
    box-shadow: ${props => props.theme.shadows.primary};
    user-select: none;
    pointer-events: none;
    transition: .2s ease all;
`;