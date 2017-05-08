import _ from 'lodash';
import { connect } from 'react-redux';
import ColorSelector from './ColorSelector';
import { changeColor, toggleColorPicker } from '../actions/index';

const mapStateToProps = state => {
    return {
        bases: state.bases
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChange: (color, event) => {
            let element = event.target;
            while (_.get(element, 'className') !== 'color-picker' && element) {
                element = element.parentElement;
            }
            dispatch(changeColor(color.hex, element.id));
        },
        onClick: (id, open) => dispatch(toggleColorPicker(id, open))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorSelector);
