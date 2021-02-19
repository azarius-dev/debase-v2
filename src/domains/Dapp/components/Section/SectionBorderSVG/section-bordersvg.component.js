import React, { useContext } from 'domains/Dapp/layout/Section/SectionBorderSVG/react';

/* import contexts */
import { ThemeContext } from 'domains/Dapp/layout/Section/SectionBorderSVG/styled-components';
/* import styles */
import { StyledSectionBorderSVG, StyledRect } from './section-bordersvg.styles';

const SectionBorderSVG = props => {

    const { color, size } = props;
    const { w: width, h: height } = size;

    const theme = useContext(ThemeContext);

    const rectId = 'section-gradient-primary-rect';

    return (
        <React.Fragment>
            <StyledSectionBorderSVG style={{ 
                left: '0px',
                filter: `drop-shadow(0 0 5px ${theme.colors[color]})`
            }}>
                <defs>
                    <linearGradient
                        id={rectId}
                        gradientTransform="rotate(45)"
                    >
                        <stop offset="0%" stopColor={theme.colors[color]} />
                        <stop offset="80%" stopColor={`${theme.colors.background}00`} />
                    </linearGradient>
                </defs>
                <StyledRect 
                    x="2"
                    y="2"
                    width={width - 4}
                    height={height - 4}
                    stroke={`url(#${rectId})`}
                />
            </StyledSectionBorderSVG>
        </React.Fragment>
    );

};

SectionBorderSVG.defaultProps = {
    color: 'text'
};

export default SectionBorderSVG;