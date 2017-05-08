import initialBaseState from './initialBaseState';

const sequence = (state = initialBaseState.dbn, action) => {
    switch (action.type) {
        case 'CHANGE_DBN':
            return action.dbn;
        default:
            return state;
    }
};

export default sequence;
