import { createGlobalStyle } from 'styled-components';

const NormalizerStyle = createGlobalStyle`
    #root {
        & hr {
            box-sizing: content-box;
            height: 0;
            overflow: visible;
        }
        & abbr[title] {
            border-bottom: none;
            text-decoration: underline;
            text-decoration: underline dotted;
        }
        & b,
        & strong {
            font-weight: bolder;
        }
        & button,
        & optgroup,
        & select,
        & textarea {
            line-height: 100%;
        }
    }
`;

export default NormalizerStyle;