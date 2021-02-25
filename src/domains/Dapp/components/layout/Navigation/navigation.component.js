import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

import { UIContext } from '@dapp/contexts';
import {
    StyledNavigation,
    StyledButton,
    StyledIcon,
    StyledText,
    StyledBorder
} from './navigation.styles';

const Navigation = ({ routes }) => {

    const { ui, uiMethods } = useContext(UIContext);
    const navigationRef = useRef(null);
    const navItemsRef = useRef([]);

    const renderActiveIndicator = () => {
        if (navigationRef && navigationRef.current && navItemsRef && navItemsRef.current && navItemsRef.current.length !== 0) {
            const navigationRect = navigationRef.current.getBoundingClientRect();
            const activeButtonRect = navItemsRef.current[ui.activeRouteIndex].getBoundingClientRect();
            return <StyledBorder style={{ top: activeButtonRect.top - navigationRect.top }}/>
        } else return null;
    };

    return (
        <StyledNavigation ref={navigationRef}>
            {routes && routes.length !== 0 && routes.map((route, i) => {
                const { label, path, icon } = route;
                return (
                    <StyledButton
                        ref={el => navItemsRef.current[i] = el}
                        key={label} 
                        as={Link}
                        to={path}
                        onClick={() => uiMethods.detectActiveRoute(path)}
                    >
                        <StyledIcon>{icon}</StyledIcon>
                        <StyledText>{label}</StyledText>
                    </StyledButton>
                );
            })}
            {renderActiveIndicator()}
        </StyledNavigation>
    );

};

export default Navigation;