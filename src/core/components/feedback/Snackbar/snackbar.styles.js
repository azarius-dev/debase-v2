import styled from 'styled-components';
import { fadeIn } from '@core/animations';

export const StyledSnackbar = styled.div`
    box-sizing: border-box;
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background-color: ${props => props.theme.colors.background};
    border-radius: 10px;
    border: 2px solid ${props => props.theme.colors[props.status + 'Light']};
    box-shadow: ${props => props.theme.shadows[props.status]};
    padding: 16px 20px;
    z-index: 20000;
    user-select: none;
    cursor: pointer;
    /*opacity: 0;
    animation: ${fadeIn} 0.6s ease forwards;*/
`;

export const StyledIcon = styled.div`
    svg {
        height: 12px;
        width: 12px;
    }
`;