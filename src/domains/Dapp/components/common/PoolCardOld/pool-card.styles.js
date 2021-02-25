import styled from 'styled-components';

export const StyledPool = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const StyledPoolHeader = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-bottom: 14px;
    padding-right: 50px;
    gap: 12px;
`;

export const StyledTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const StyledSubtitle = styled.div`
    font-size: 14px;
    opacity: .6;
`;

export const StyledInfo = styled.div`
    margin-left: auto;
`;

export const StyledPoolBody = styled.div`
    position: relative;
    display: flex;
    flex-grow: 1;
    gap: 15px;
`;

export const StyledPoolCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const StyledPoolFooter = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding-top: 30px;
`;

export const StyledPoolLists = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    grid-auto-rows: max-content;
    flex-grow: 1;
    padding: 15px 0;
`;

export const StyledHighlightData = styled.div`
    color: ${ props => props.theme.colors.primary };
    border-top: 1px solid ${props => props.theme.colors.primary}33;
    background-color: ${ props => props.theme.colors.background}33;
`;

export const StyledPoolLinks = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
    padding-top: 15px;
`;

export const StyledPoolAnchor = styled.a`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    fill: inherit;
    color: inherit;
    outline: none!important;
`;