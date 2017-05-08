import { connect } from 'react-redux';
import SequenceDBN from './SequenceDBN';
import { changeFont,
    changeSequence,
    changeDBN,
    addErrorMessage,
    removeErrorMessage,
    changeBaseSize,
    changeLineWidth } from '../actions/index';

const mapStateToProps = state => {
    return {
        sequence: state.sequence,
        dbn: state.dbn,
        error: state.error,
        styles: state.styles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeSequence: sequence => dispatch(changeSequence(sequence)),
        changeDBN: dbn => dispatch(changeDBN(dbn)),
        addErrorMessage: message => dispatch(addErrorMessage(message)),
        removeErrorMessage: () => dispatch(removeErrorMessage()),
        changeFont: font => dispatch(changeFont(font)),
        changeBaseSize: size => dispatch(changeBaseSize(size)),
        changeLineWidth: width => dispatch(changeLineWidth(width))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SequenceDBN);
