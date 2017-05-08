import * as d3 from 'd3';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Component } from 'react';
import GraphGenerator from './GraphGenerator';

class Molecule extends Component {
    componentDidMount() {
        GraphGenerator(this.props.sequence, this.props.dbn, this.props.bases);
    }

    componentDidUpdate() {
        d3.select('svg')
            .selectAll('circle')
            .attr('fill', d => _.get(_.find(this.props.bases, ['id', d.char]), 'color', '#000'));
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
    })).isRequired
};

export default Molecule;
