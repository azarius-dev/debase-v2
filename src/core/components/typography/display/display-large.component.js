import styled from 'styled-components';
import Display from './display.component';

const DisplayLarge = styled(Display).attrs(props => ({
    content: props.children,
}))`
    font-size: 45px;
    font-weight: 500;
    text-transform: lowercase;
    color: ${ props => props.theme.colors.primary };
    -webkit-text-fill-color: ${ props => props.theme.colors.primary };
    margin-top: 3px;

    &:before {
        content: attr(content);
        position: absolute;
        top: -3px;
        left: 3px;
        color: ${ props => props.theme.colors.text };
        background-image: linear-gradient(30deg, ${props => props.theme.colors.text} 30%, ${props => props.theme.colors.text}10 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        white-space: nowrap;
    }
`;

export default DisplayLarge;