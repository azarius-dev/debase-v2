const parseNumToUsFormat = value => new Intl.NumberFormat('en-US', {
    style: 'decimal'
}).format(value);

export default parseNumToUsFormat;