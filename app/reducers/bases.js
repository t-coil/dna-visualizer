import initialBaseState from './initialBaseState';

function updateItemInArray(array, id, callback) {
    const updatedArray = array.map(item => {
        if (item.id !== id) {
            return item;
        }

        return callback(item);
    });

    return updatedArray;
}

function updateObject(oldObject, newValues) {
    return Object.assign({}, oldObject, newValues);
}

let newBases;

const bases = (state = initialBaseState, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            newBases = updateItemInArray(state, action.id, base => {
                return updateObject(base, { color: action.color });
            });

            return newBases;
        case 'TOGGLE_COLOR_PICKER':
            if (action.open) {
                newBases = state.map(base => {
                    if (base.colorPicker && base.id !== action.id) {
                        return updateObject(base, { colorPicker: false });
                    } else if (base.id === action.id) {
                        return updateObject(base, { colorPicker: true });
                    }
                    return base;
                });
            } else {
                newBases = updateItemInArray(state, action.id, base => {
                    return updateObject(base, { colorPicker: !base.colorPicker });
                });
            }

            return newBases;
        default:
            return state;
    }
};

export default bases;
