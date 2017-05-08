export const changeColor = (color, id) => {
    return {
        type: 'CHANGE_COLOR',
        color,
        id
    };
};

export const toggleColorPicker = (id, open) => {
    return {
        type: 'TOGGLE_COLOR_PICKER',
        id,
        open
    };
};

export const changeSequence = sequence => {
    return {
        type: 'CHANGE_SEQUENCE',
        sequence
    };
};

export const changeDBN = dbn => {
    return {
        type: 'CHANGE_DBN',
        dbn
    };
};

export const addErrorMessage = message => {
    return {
        type: 'ADD_ERROR_MESSAGE',
        message
    };
};

export const removeErrorMessage = () => {
    return {
        type: 'REMOVE_ERROR_MESSAGE'
    };
};

export const changeFont = font => {
    return {
        type: 'CHANGE_FONT',
        font
    };
};

export const changeBaseSize = size => {
    return {
        type: 'CHANGE_BASE_SIZE',
        size
    };
};

export const changeLineWidth = width => {
    return {
        type: 'CHANGE_LINE_WIDTH',
        width
    };
};
