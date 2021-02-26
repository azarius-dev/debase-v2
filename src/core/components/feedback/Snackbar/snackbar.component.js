import { useState, useEffect, useRef } from 'react';

import { CloseIcon } from '@assets';
import {
    StyledSnackbar,
    StyledIcon
} from './snackbar.styles';

const Snackbar = ({
    id,
    message,
    status,
    position,
    offset,
    handleClose,
}) => {

    const [ size, setSize ] = useState({ w: 0, h:0 });
    const snackbarRef = useRef(null);

    const calcPosition = position => {
        const windowWidth = window.offsetWidth;
        switch(position) {
            case 'top-left': {
                return {
                    left: offset,
                    top: offset
                };
            }
            case 'top-center': {
                return {
                    left: (windowWidth) / 2 - (size.w / 2),
                    top: offset
                };
            }
            case 'top-right': {
                return {
                    right: offset,
                    top: offset
                };
            }
            case 'bottom-left': {
                return {
                    left: offset,
                    bottom: offset
                };
            }
            case 'bottom-center': {
                return {
                    x: (windowWidth) / 2 - (size.w / 2),
                    bottom: offset
                };
            }
            case 'bottom-right': {
                return {
                    right: offset,
                    bottom: offset
                };
            }
        }
    };

    useEffect(() => {
        if (snackbarRef && snackbarRef.current) {
            const snackbarRect = snackbarRef.current.getBoundingClientRect();
            setSize({
                w: snackbarRect.width,
                h: snackbarRect.height
            });
        }
    }, [snackbarRef]);

    return (
        <StyledSnackbar
            ref={snackbarRef}
            status={status}
            style={calcPosition(position)}
            onClick={() => handleClose(id)}
        >
            {message}
            <StyledIcon>
                <CloseIcon />
            </StyledIcon>
        </StyledSnackbar>
    );
};

export default Snackbar;