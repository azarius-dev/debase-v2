import { createContext, useState, useEffect } from 'react';
import _ from 'lodash';
 
import { Snackbar } from '@core/components';
import { StyledSnackbarManager } from './snackbar-manager.styles';

const SnackbarManagerContext = createContext({});

const SnackbarManager = ({
    children
}) => {

    const [ snackbars, setSnackbars ] = useState([]);
    const [ snackbarsHistory, setSnackbarsHistory ] = useState([]);
    let timerID;

    const handleSnackbar = ({
        id,
        duration = 3000,
        message = 'snackbar message',
        status = 'warning',
        position = 'bottom-right',
        offset = 30
    }) => {
        if (!id || id === '') return console.warn('DEBASE UI: Snackbars need an ID');
        if (snackbars.findIndex(snackbar => snackbar.id === id) >= 0) return;
        setSnackbars(prevArray => [...prevArray, {
            id,
            duration,
            message,
            status,
            position,
            offset
        }]);
    };
    
    const handleClose = id => {
        const index = snackbars.findIndex(snackbar => snackbar.id === id);
        const localSnackbars = _.cloneDeep(snackbars);
        localSnackbars.splice(index, 1);
        setSnackbars(localSnackbars);
        clearTimeout(timerID);
    };

    useEffect(() => {
        if (snackbars && snackbars.length !== 0) {
            timerID = setTimeout(() => {
                const localSnackbars = _.cloneDeep(snackbars);
                localSnackbars.splice(0, 1);
                setSnackbars(localSnackbars);
            }, 3000);
        }

        return () => {
            clearTimeout(timerID);
        }
    }, [snackbars])

    return (
        <SnackbarManagerContext.Provider value={{ snackbars, handleSnackbar }}>
            <StyledSnackbarManager>
                {snackbars && snackbars.length !== 0 && snackbars.map((snackbar, i) => {
                    if (i !== 0) return null;
                    const {
                        id,
                        duration,
                        message,
                        status,
                        position,
                        offset
                    } = snackbar;
                    return (
                        <Snackbar
                            key={`snackbar-${i}`}
                            id={id}
                            message={message}
                            status={status}
                            position={position}
                            offset={offset}
                            handleClose={handleClose}
                        />
                    );
                })}
                {children}
            </StyledSnackbarManager>
        </SnackbarManagerContext.Provider>
    );
};

export { SnackbarManagerContext };

export default SnackbarManager;