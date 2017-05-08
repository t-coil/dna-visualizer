import initialBaseState from './initialBaseState';

const sequence = (state = initialBaseState.sequence, action) => {
    switch (action.type) {
        case 'CHANGE_SEQUENCE':
            return action.sequence;
        default:
            return state;
    }
};

export default sequence;
