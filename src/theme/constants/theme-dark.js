const THEME_DARK = {

    colors: {
        background: '#0C0815',
        text: '#FFFFFF',
        
        primary: '#F96CC3',
        primaryLight: '#FCE7F8',
        primaryDark: '#C918DB',
    
        secundary: '#50FEF4',
        secundaryLight: '#8fffff',
        secundaryDark: '#4699E2',
        
        error: '#FF1057',
        errorLight: '#FFB9CE',
        errorDark: '#A60031',

        warning: '#FFB802',
        warningLight: '#FFDD9A',
        warningDark: '#FF9A02',

        success: '#75FF34',
        successLight: '#E0FFD1',
        successDark: '#42C802',
    },

    shadows: {
        base: `0 0 10px #FFFFFFCC`,

        primary: `
            0 0 10px #C918DB99,
            0 0 50px #F96CC344,
            inset 0 0 10px #C918DB99,
            inset 0 0 50px #F96CC344
        `,
        primaryText: `
            0 0 10px #F96CC3
        `,

        secundary: `
            0 0 10px #50FEF499,
            0 0 50px #4699E211,
            inset 0 0 10px #50FEF499,
            inset 0 0 50px #4699E211
        `,
        secundaryText: `
            0 0 10px #50FEF4
        `,

        error: `
            0 0 10px #FF105799,
            0 0 50px #A6003144,
            inset 0 0 10px #FF105799,
            inset 0 0 50px #A6003144
        `,

        warning: `
            0 0 10px #FF9A0299,
            0 0 50px #FF9A0244,
            inset 0 0 10px #FF9A0299,
            inset 0 0 50px #FF9A0244
        `,

        success: `
            0 0 10px #75FF3499,
            0 0 50px #42C80244,
            inset 0 0 10px #75FF3499,
            inset 0 0 50px #42C80244
        `,
    }

};

export default THEME_DARK;