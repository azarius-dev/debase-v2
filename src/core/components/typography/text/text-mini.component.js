import styled from 'styled-components';
import Text from './text.component';

const TextMini = styled(Text)`
    font-size: 13px;
    font-weight: 400;
    line-height: 150%;
    color: ${props => props.theme.colors.text};
`;

export default TextMini;