import _ from 'lodash';
import * as d3 from 'd3';

let errorCallback;
const basePairValue = 30;
const endBaseValue = 40;

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
    // We create a separate array for the phosphate backbone to
    // create a better layout rendering.
    const phosphate = [];
    const linkData = db.split('').reduce((acc, char, index) => {
        if (index !== 0) {
            phosphate.push({ source: index - 1, target: index, value: 20 });
        }

        if (char === '(') {
            indices.push(index);
        } else if (char === ')') {
            const source = indices[indices.length - 1];
            if (source === undefined) {
                return errorCallback('Invalid Dot-Bracket Notation');
            }
            indices.pop();
            acc.push({ source, target: index, value: basePairValue });
        }

        return acc;
    }, []);

    if (indices.length > 0) {
        errorCallback('Invalid Dot-Bracket Notation');
    }

    phosphate.unshift({ source: 0, target: db.length - 1, value: endBaseValue });
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

    const simulation = d3.forceSimulation()
        .nodes(seq);

    const svg = d3.select('.dna-container')
        .append('svg');
    const width = 960;
    const height = 600;
    const radius = 5;

    const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('stroke-width', 2)
        .style('stroke', d => {
            return d.value === endBaseValue ? '#fff' : '#0e1717';
        })
        .attr('stroke-dasharray', d => {
            return d.value === basePairValue ? '3, 2' : null;
        });

    const node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(seq)
        .enter()
        .append('g')
        .append('circle')
        .attr('r', radius)
        .attr('fill', d => _.get(_.find(bases, ['id', d.char]), 'color', '#000'))
        .call(d3.drag()
            .on('start', dragStarted)
            .on('drag', dragged)
            .on('end', dragEnded));

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
        .iterations(8)
        .distance(d => d.value)
        .strength(1);

    simulation
        .force('charge', d3.forceManyBody().strength(-40))
        .force('collide', d3.forceCollide())
        .force('link', linkForce)
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('x', d3.forceX().strength(0.05))
        .force('y', d3.forceY().strength(0.05));

    function tick() {
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
    }

    simulation.on('tick', tick);

    function dragStarted(d) {
        if (!d3.event.active) {
            simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
        tick();
    }

    function dragEnded(d) {
        if (!d3.event.active) {
            simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
    }

    return simulation;
};

export const generateNewGraph = (sequence, dbn, bases) => {
    d3.selectAll('svg').remove();
    GraphGenerator(sequence, dbn, bases);
};
