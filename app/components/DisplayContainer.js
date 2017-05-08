import { connect } from 'react-redux';
import Molecule from './Molecule';

const mapStateToProps = state => {
    return {
        bases: state.bases,
        sequence: state.sequence,
        dbn: state.dbn
    };
};

export default connect(mapStateToProps)(Molecule);
