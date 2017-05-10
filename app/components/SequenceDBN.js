import React, { Component } from 'react';
import PropTypes from 'prop-types';

function showError(error) {
    if (error) {
        return (
            <div className="error-container">Error: {error}</div>
        );
    }
    return null;
}

class SequenceDBN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sequence: this.props.sequence,
            dbn: this.props.dbn,
            font: this.props.styles.font,
            baseSize: this.props.styles.baseSize,
            lineWidth: this.props.styles.lineWidth
        };

        this.handleSequenceSubmit = this.handleSequenceSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.validateSequence = this.validateSequence.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ sequence: nextProps.sequence });
    }

    handleChange(event) {
        const type = event.target.name;
        const value = event.target.value;
        this.setState(() => {
            return { [type]: value };
        });
        if (type !== 'dbn' && type !== 'sequence') {
            this.props.changeStyle(type, value);
        }
    }

    handleSequenceSubmit(event) {
        event.preventDefault();
        if (/[^A-z]+/.test(this.state.sequence)) {
            this.props.addErrorMessage('Invalid sequence');
        } else if (this.state.sequence.length === this.state.dbn.length) {
            this.props.changeSequenceAndDBN(this.state.sequence.toUpperCase(), this.state.dbn);
            this.props.removeErrorMessage();
        } else {
            this.props.addErrorMessage('DBN Does Not Match Sequence Length');
        }
    }

    render() {
        return (
            <div>
                <div className="dbn-container">
                    <form onSubmit={this.handleSequenceSubmit}>
                        <div className="input-container">
                            <input value={this.state.sequence} onChange={this.handleChange} name="sequence" />
                            <label htmlFor="sequence" className="small-label">Sequence</label>
                            <input value={this.state.dbn} onChange={this.handleChange} name="dbn" />
                            <label htmlFor="dbn" className="small-label">Dot-Bracket Notation</label>
                        </div>
                        <button className="upload-button">Change Sequence</button>
                        <select name="font" onChange={this.handleChange}>
                            <option id="select-label">Base Label Font</option>
                            <option value="Open Sans">Open Sans</option>
                            <option value="Fenix">Fenix</option>
                            <option value="Comic Sans MS">Comic Sans!!!</option>
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                        </select>
                        <div className="slider-container">
                            <label htmlFor="base-size" className="medium-label">Base Size</label>
                            <input className="slider" value={this.state.baseSize} onChange={this.handleChange} type="range" min="2" max="10" name="baseSize" />
                        </div>
                        <div className="slider-container">
                            <label htmlFor="line-width" className="medium-label">Line Width</label>
                            <input className="slider" value={this.state.lineWidth} onChange={this.handleChange} type="range" min="1" max="10" name="lineWidth" />
                        </div>
                    </form>
                </div>
                {showError(this.props.error)}
            </div>
        );
    }
}

SequenceDBN.propTypes = {
    sequence: PropTypes.string.isRequired,
    dbn: PropTypes.string.isRequired,
    changeSequenceAndDBN: PropTypes.func.isRequired,
    addErrorMessage: PropTypes.func.isRequired,
    removeErrorMessage: PropTypes.func.isRequired,
    error: PropTypes.string,
    styles: PropTypes.shape({
        baseSize: PropTypes.number.isRequired,
        lineWidth: PropTypes.number.isRequired,
        font: PropTypes.string.isRequired
    }).isRequired,
    changeStyle: PropTypes.func.isRequired
};

export default SequenceDBN;
