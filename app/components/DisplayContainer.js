import { connect } from 'react-redux';
import Molecule from './Molecule';
import { addErrorMessage } from '../actions';

const mapStateToProps = state => {
    return {
        bases: state.bases,
        sequence: state.sequence,
        dbn: state.dbn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addErrorMessage: message => dispatch(addErrorMessage(message))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Molecule);
