import initialBaseState from './initialBaseState';

function updateObject(oldObject, newValues) {
    return Object.assign({}, oldObject, newValues);
}

const styles = (state = initialBaseState.styles, action) => {
    switch (action.type) {
        case 'CHANGE_FONT':
            return updateObject(state, { font: action.font });
        case 'CHANGE_BASE_SIZE':
            return updateObject(state, { baseSize: parseInt(action.size, 10) });
        case 'CHANGE_LINE_WIDTH':
            return updateObject(state, { lineWidth: parseInt(action.width, 10) });
        default:
            return state;
    }
};

export default styles;
