import styled from 'styled-components';

export const StyledAccordion = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 2px solid ${props => props.theme.colors[props.color + 'Light']};
    background-color: ${props => props.theme.colors.background};
    box-shadow: ${props => props.theme.shadows[props.color]};
`;

export const StyledQuestion = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 30px;
`;

export const StyledIndicator = styled.div`
    position: relative;

    fill: ${props => props.theme.colors[props.color + 'Light']};
    color: ${props => props.theme.colors[props.color + 'Light']};
    filter: drop-shadow(${props => props.theme.shadows[props.color + 'Text']});

    svg {
        height: 18px;
        width: 18px;
    }
`;

export const StyledAnswer = styled.div`
    position: relative;
    padding: 0 30px 30px 30px;
`;