import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

        this.handleSequenceChange = this.handleSequenceChange.bind(this);
        this.handleDBNChange = this.handleDBNChange.bind(this);
        this.handleSequenceSubmit = this.handleSequenceSubmit.bind(this);
        this.handleFontSubmit = this.handleFontSubmit.bind(this);
        this.handleBaseSizeChange = this.handleBaseSizeChange.bind(this);
        this.handleLineWidthChange = this.handleLineWidthChange.bind(this);
    }

    handleSequenceChange(event) {
        this.setState({ sequence: event.target.value });
    }

    handleDBNChange(event) {
        this.setState({ dbn: event.target.value });
    }

    handleSequenceSubmit(event) {
        event.preventDefault();
        if (this.state.sequence.length === this.state.dbn.length) {
            this.props.changeSequence(this.state.sequence);
            this.props.changeDBN(this.state.dbn);
            this.props.removeErrorMessage();
        } else {
            this.props.addErrorMessage('DBN Does Not Match Sequence Length');
        }
    }

    handleFontSubmit(event) {
        this.setState({ font: event.target.value });
        this.props.changeFont(event.target.value);
    }

    handleBaseSizeChange(event) {
        this.setState({ baseSize: event.target.value });
        this.props.changeBaseSize(event.target.value);
    }

    handleLineWidthChange(event) {
        this.setState({ lineWidth: event.target.value });
        this.props.changeLineWidth(event.target.value);
    }

    render() {
        return (
            <div className="dbn-container">
                <form onSubmit={this.handleSequenceSubmit}>
                    <div className="input-container">
                        <input value={this.state.sequence} onChange={this.handleSequenceChange} />
                        <label htmlFor="sequence" className="small-label">Sequence</label>
                        <input value={this.state.dbn} onChange={this.handleDBNChange} />
                        <label htmlFor="dbn" className="small-label">Dot-Bracket Notation</label>
                    </div>
                    <button className="upload-button">Change Sequence</button>
                    <select name="font" onChange={this.handleFontSubmit}>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Feenix">Feenix</option>
                        <option value="Comic Sans MS">Comic Sans!!!</option>
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                    </select>
                    <div className="slider-container">
                        <label htmlFor="base-size" className="medium-label">Base Size</label>
                        <input className="slider" value={this.state.baseSize} onChange={this.handleBaseSizeChange} type="range" min="2" max="10" name="base-size" />
                    </div>
                    <div className="slider-container">
                        <label htmlFor="line-width" className="medium-label">Line Width</label>
                        <input className="slider" value={this.state.lineWidth} onChange={this.handleLineWidthChange} type="range" min="1" max="10" name="line-width" />
                    </div>
                </form>
                {this.props.error ? this.props.error : null }
            </div>
        );
    }
}

SequenceDBN.propTypes = {
    sequence: PropTypes.string.isRequired,
    dbn: PropTypes.string.isRequired,
    changeSequence: PropTypes.func.isRequired,
    changeDBN: PropTypes.func.isRequired,
    addErrorMessage: PropTypes.func.isRequired,
    removeErrorMessage: PropTypes.func.isRequired,
    changeFont: PropTypes.func.isRequired,
    error: PropTypes.string,
    styles: PropTypes.shape({
        baseSize: PropTypes.number.isRequired,
        lineWidth: PropTypes.number.isRequired,
        font: PropTypes.string.isRequired
    }).isRequired,
    changeBaseSize: PropTypes.func.isRequired,
    changeLineWidth: PropTypes.func.isRequired
};

export default SequenceDBN;
