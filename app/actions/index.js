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
