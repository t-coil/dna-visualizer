import { connect } from 'react-redux';
import SequenceDBN from './SequenceDBN';
import { changeFont,
    changeSequenceAndDBN,
    addErrorMessage,
    removeErrorMessage,
    changeBaseSize,
    changeLineWidth } from '../actions/index';

const mapStateToProps = state => {
    return {
        sequence: state.pair.sequence,
        dbn: state.pair.dbn,
        error: state.error,
        styles: state.styles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeSequenceAndDBN: (sequence, dbn) => dispatch(changeSequenceAndDBN(sequence, dbn)),
        addErrorMessage: message => dispatch(addErrorMessage(message)),
        removeErrorMessage: () => dispatch(removeErrorMessage()),
        changeStyle: (type, update) => {
            switch (type) {
                case 'font':
                    return dispatch(changeFont(update));
                case 'baseSize':
                    return dispatch(changeBaseSize(update));
                case 'lineWidth':
                    return dispatch(changeLineWidth(update));
                default:
                    return null;
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SequenceDBN);
