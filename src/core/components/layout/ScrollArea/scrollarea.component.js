import { StyledScrollArea } from './scrollarea.styles';

const ScrollArea = ({ children }) => {
    return (
        <StyledScrollArea>
            {children}
        </StyledScrollArea>
    );
};

export default ScrollArea;