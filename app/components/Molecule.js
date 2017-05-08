import PropTypes from 'prop-types';
import { Component } from 'react';
import { GraphGenerator, generateNewGraph, updateGraphStyles } from './GraphGenerator';

class Molecule extends Component {
    componentDidMount() {
        GraphGenerator(this.props.sequence,
            this.props.dbn,
            this.props.bases,
            this.props.addErrorMessage);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.sequence !== this.props.sequence || prevProps.dbn !== this.props.dbn) {
            generateNewGraph(this.props.sequence,
                this.props.dbn,
                this.props.bases);
        } else {
            updateGraphStyles(this.props.bases, this.props.styles);
        }
    }

    render() {
        return null;
    }
}

Molecule.propTypes = {
    sequence: PropTypes.string.isRequired,
    dbn: PropTypes.string.isRequired,
    bases: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        colorPicker: PropTypes.bool.isRequired
    })).isRequired,
    styles: PropTypes.shape({
        baseSize: PropTypes.number.isRequired,
        lineWidth: PropTypes.number.isRequired,
        font: PropTypes.string.isRequired
    }).isRequired,
    addErrorMessage: PropTypes.func.isRequired,
};

export default Molecule;
