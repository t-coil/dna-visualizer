import { connect } from 'react-redux';
import SequenceDBN from './SequenceDBN';
import { changeSequence, changeDBN, addErrorMessage, removeErrorMessage } from '../actions/index';

const mapStateToProps = state => {
    return {
        sequence: state.sequence,
        dbn: state.dbn,
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeSequence: sequence => dispatch(changeSequence(sequence)),
        changeDBN: dbn => dispatch(changeDBN(dbn)),
        addErrorMessage: message => dispatch(addErrorMessage(message)),
        removeErrorMessage: () => dispatch(removeErrorMessage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SequenceDBN);
