import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UIContext } from '@dapp/contexts';
import {
    StyledNavigation,
    StyledButton,
    StyledButtonIcon,
    StyledButtonText,
    StyledButtonBorder
} from './navigation.styles';

const Navigation = ({ routes }) => {

    const { ui, uiMethods } = useContext(UIContext);

    const renderNavigationButtons = () => {
        if (!routes) {return null}
        return routes.map(route => {
            const { label, path, icon } = route;
            const isActive = path === ui.activeRoute.path;
            return (
                <StyledButton
                    as={Link}
                    key={label} 
                    to={path}
                    onClick={() => uiMethods.detectActiveRoute(path)}
                >
                    <StyledButtonIcon>
                        {icon}
                    </StyledButtonIcon>
                    <StyledButtonText>
                        {label}
                    </StyledButtonText>
                    {isActive && (
                        <StyledButtonBorder />
                    )}
                </StyledButton>
            );
        });
    };

    return (
        <StyledNavigation>
            {renderNavigationButtons()}
        </StyledNavigation>
    );

};

export default Navigation;