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
    
        error: '#FF2F6D',
        success: '#B0FF8B'
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
    }

};

export default THEME_DARK;