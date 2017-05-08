const initialBaseState = {
    bases: [
        {
            id: 'C',
            color: '#C0392B',
            colorPicker: false
        },
        {
            id: 'G',
            color: '#2980B9',
            colorPicker: false
        },
        {
            id: 'A',
            color: '#229954',
            colorPicker: false
        },
        {
            id: 'T',
            color: '#F1C40F',
            colorPicker: false
        }
    ],
    sequence: 'TTGGGGGGACTGGGGCTCCCATTCGTTGCCTTTATAAATCCTTGCAAGCCAATTAACAGGTTGGTGAGGGGCTTGGGTGAAAAGGTGCTTAAGACTCCGT',
    dbn: '...(((((.(...).)))))........(((((.....((..(.((((((..(((.((...)).)))..)))))).).)))))))...............',
    styles: {
        baseSize: 6,
        lineWidth: 2,
        font: 'Open Sans'
    }
};

export default initialBaseState;
