import * as d3 from 'd3';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Component } from 'react';

const sequence = 'TTGGGGGGACTGGGGCTCCCATTCGTTGCCTTTATAAATCCTTGCAAGCCAATTAACAGGTTGGTGAGGGGCTTGGGTGAAAAGGTGCTTAAGACTCCGT';
const dbn = '...(((((.(...).)))))........(((((.....((..(.((((((..(((.((...)).)))..)))))).).)))))))...............';

function createNodeArray(seq) {
    return seq.split('').map((char, index) => ({ index, char }));
}

function createLinkData(db) {
    const indices = [];
    const linkData = db.split('').reduce((acc, char, index) => {
        if (char === '(') {
            indices.push(index);
        } else if (char === ')') {
            const source = indices[indices.length - 1];
            if (source === undefined) {
                return 'bad dbn';
            }
            indices.pop();
            acc.push({ source, target: index });
        }

        return acc;
    }, []);

    if (indices.length > 0) {
    return 'bad dbn';
    }

    return linkData;
}

function generateGraph(seq, links, bases) {
    const svg = d3.select('#app')
        .append('div')
        .attr('class', 'node-container')
        .append('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const simulation = d3.forceSimulation()
        .nodes(seq);

    const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('stroke-width', 2);

    const node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(seq)
        .enter()
        .append('circle')
        .attr('r', 15)
        .attr('fill', d => _.find(bases, ['id', d.char]).color);

    const label = svg.selectAll('myText')
        .data(seq)
        .enter()
        .append('text')
        .text(d => d.char);

    const linkForce = d3.forceLink(links)
        .id(d => d.index);

    simulation
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 3))
        .force('link', linkForce);


    simulation.on('tick', () => {
        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('fill', d => _.find(bases, ['id', d.char]).color);

        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y);

        label
            .attr('x', d => d.x)
            .attr('y', d => d.y);
    });
}

class Molecule extends Component {
    componentDidMount() {
        generateGraph(createNodeArray(sequence), createLinkData(dbn), this.props.bases);
    }

    componentDidUpdate() {
        d3.select('svg')
            .selectAll('circle')
            .attr('fill', d => _.find(this.props.bases, ['id', d.char]).color);
    }

    render() {
        return null;
    }

}

Molecule.propTypes = {
    bases: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        colorPicker: PropTypes.bool.isRequired
    })).isRequired
};

export default Molecule;
