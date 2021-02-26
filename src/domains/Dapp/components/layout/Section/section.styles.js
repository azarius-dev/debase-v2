import styled from 'styled-components';

export const StyledSection = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex-grow: 1;
`;

export const StyledBody = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 40px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.colors.text}1A;
    background-color: ${props => props.theme.colors.background};
`;

export const StyledHeader = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 65px;
    padding: 0 40px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.colors.text}1A;
    background-color: ${props => props.theme.colors.background};
`;

export const StyledInfoIcon = styled.div`
    svg {
        height: 18px;
        width: 18px;
    }
`;