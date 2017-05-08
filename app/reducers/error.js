const error = (state = '', action) => {
    switch (action.type) {
        case 'ADD_ERROR_MESSAGE':
            return action.message;
        case 'REMOVE_ERROR_MESSAGE':
            return '';
        default:
            return state;
    }
};

export default error;
