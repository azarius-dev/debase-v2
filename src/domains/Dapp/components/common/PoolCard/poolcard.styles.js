import styled from 'styled-components';

export const StyledPoolCard = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    gap: 20px;
`;

export const StyledPoolCardInner = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 15px;
`;

export const StyledHeader = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const StyledInfoIcon = styled.div`
    position: relative;
    margin-left: auto;

    svg {
        height: 18px;
        width: 18px;
    }
`;