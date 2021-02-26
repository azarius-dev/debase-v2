import styled, { css } from 'styled-components';

/* variants */
const variants = {
    default: css`
        color: ${props => props.theme.colors[props.color + 'Light']};
        border: 2px solid ${props => props.theme.colors[props.color + 'Light']};
        border-radius: 10px;
        background-color: ${props => props.theme.colors[props.color]}11;
        box-shadow: ${props => props.theme.shadows[props.color]};
        text-shadow: ${props => props.theme.shadows[props.color + 'Text']};

        &:hover {
            background-color: ${props => props.theme.colors[props.color]}22!important;
        }
    `
};

/* sizes */
const sizes = {
    small: css`
        height: 32px;
        font-size: 14px;
        padding: 0 15px;
    `,
    medium: css`
        font-size: 16px;
        height: 50px;
        padding: 0 10px;
    `,
};

/* alignment */
const alignments = {
    left: css`
        justify-content: flex-start;
        text-align: left;
    `,
    center: css`
        justify-content: center;
        text-align: center;
    `,
    right: css`
        justify-content: flex-end;
        text-align: right;
    `
};

export const StyledButton = styled.button`
    box-sizing: border-box;
    position: relative;
    z-index: 0;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    appearance: none;
    margin: 0;
    padding: 0;
    color: ${ props => props.theme.colors.text };
    text-decoration: none;
    font-family: 'bladerunner', sans-serif;
    font-size: 16px;
    height: 42px;
    padding: 0 30px;
    background-color: transparent;
    border: 0;
    border-radius: 0;
    outline: none;
    user-select: none;
    transition: .1s ease all;

    ${props => variants[props.variant] }
    ${props => sizes[props.size] }
    ${props => alignments[props.alignment] }
`;