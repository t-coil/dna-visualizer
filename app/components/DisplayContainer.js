import { connect } from 'react-redux';
import Molecule from './Molecule';

const mapStateToProps = state => {
    return {
        bases: state.bases
    };
};

export default connect(mapStateToProps)(Molecule);
