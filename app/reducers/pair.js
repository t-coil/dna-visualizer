import initialBaseState from './initialBaseState';

const pair = (state = initialBaseState.pair, action) => {
    switch (action.type) {
        case 'CHANGE_SEQUENCE_AND_DBN':
            return Object.assign({}, state, { dbn: action.dbn, sequence: action.sequence });
        default:
            return state;
    }
};

export default pair;
