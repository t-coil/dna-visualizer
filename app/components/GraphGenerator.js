import _ from 'lodash';
import * as d3 from 'd3';

let errorCallback;

function createNodeArray(sequence) {
    return sequence.split('').map((char, index) => {
        if (index === 0) {
            return { char, prime: 5 };
        } else if (index === sequence.length - 1) {
            return { char, prime: 3 };
        }

        return { char };
    });
}

function createLinkData(db) {
    const indices = [];
    const phosphate = [];
    const linkData = db.split('').reduce((acc, char, index) => {
        if (index !== 0) {
            phosphate.push({ source: index - 1, target: index, value: 1 });
        }

        if (char === '(') {
            indices.push(index);
        } else if (char === ')') {
            const source = indices[indices.length - 1];
            if (source === undefined) {
                return errorCallback('Invalid Dot-Bracket Notation');
            }
            indices.pop();
            acc.push({ source, target: index, value: 4 });
        }

        return acc;
    }, []);

    if (indices.length > 0) {
        errorCallback('Invalid Dot-Bracket Notation');
    }

    phosphate.unshift({ source: 0, target: db.length - 1, value: 5 });
    return phosphate.concat(linkData);
}

export const updateGraphStyles = (bases, styles) => {
    d3.select('svg')
        .selectAll('circle')
        .attr('fill', d => _.get(_.find(bases, ['id', d.char]), 'color', '#000'))
        .attr('r', styles.baseSize);

    d3.select('svg')
        .selectAll('line')
        .attr('stroke-width', styles.lineWidth);

    d3.select('svg')
        .selectAll('text')
        .style('font-family', styles.font);
};

export const GraphGenerator = (sequence, dbn, bases, callback) => {
    if (callback) {
        errorCallback = callback;
    }

    const seq = createNodeArray(sequence);
    const links = createLinkData(dbn);

    if (!Array.isArray(links)) {
        return null;
    }

    const svg = d3.select('.dna-container')
        .append('svg');
    const width = 960;
    const height = 600;
    const radius = 5;
    const strokeColor = {
        1: '#0e1717',
        4: '#0e1717',
        5: '#fff'
    };
    const strokeStyle = {
        1: null,
        4: '3, 2',
        5: null
    };

    const simulation = d3.forceSimulation()
        .nodes(seq);

    const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('stroke-width', 2)
        .style('stroke', d => strokeColor[d.value])
        .attr('stroke-dasharray', d => strokeStyle[d.value]);

    const node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(seq)
        .enter()
        .append('g')
        .append('circle')
        .attr('r', radius)
        .attr('fill', d => _.get(_.find(bases, ['id', d.char]), 'color', '#000'));

    const label = svg.selectAll('text')
        .data(seq)
        .enter()
        .append('text')
        .attr('dx', 5)
        .attr('dy', 5)
        .text(d => {
            const prime = _.get(d, 'prime');
            if (prime) {
                return `${d.char} ${prime}'`;
            }
            return d.char;
        })
        .attr('class', 'label')
        .attr('fill', '#000')
        .style('font-size', '15px')
        .style('font-family', 'Open Sans');

    const linkForce = d3.forceLink(links)
        .distance(d => d.value)
        .strength(1);

    simulation
        .force('charge', d3.forceManyBody().strength(-100))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collide', d3.forceCollide(radius * 2).strength(1))
        .force('x', d3.forceX())
        .force('y', d3.forceY())
        .force('link', linkForce);

    simulation.on('tick', () => {
        node
            .attr('cx', d => d.x = Math.max(radius, Math.min(960 - radius, d.x)))
            .attr('cy', d => d.y = Math.max(radius, Math.min(600 - radius, d.y)));

        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        label
            .attr('x', d => d.x)
            .attr('y', d => d.y);
    });

    return simulation;
};

export const generateNewGraph = (sequence, dbn, bases) => {
    d3.selectAll('svg').remove();
    GraphGenerator(sequence, dbn, bases);
};
