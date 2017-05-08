import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SequenceDBN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sequence: this.props.sequence,
            dbn: this.props.dbn
        };

        this.handleSequenceChange = this.handleSequenceChange.bind(this);
        this.handleDBNChange = this.handleDBNChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSequenceChange(event) {
        this.setState({ sequence: event.target.value });
    }

    handleDBNChange(event) {
        this.setState({ dbn: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.sequence.length === this.state.dbn.length) {
            this.props.changeSequence(this.state.sequence);
            this.props.changeDBN(this.state.dbn);
            this.props.removeErrorMessage();
        } else {
            this.props.addErrorMessage('DBN Does Not Match Sequence Length');
        }
    }

    render() {
        return (
            <div className="dbn-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-container">
                        <input value={this.state.sequence} onChange={this.handleSequenceChange} />
                        <label htmlFor="sequence">Sequence</label>
                        <input value={this.state.dbn} onChange={this.handleDBNChange} />
                        <label htmlFor="dbn">Dot-Bracket Notation</label>
                    </div>
                    <button className="upload-button">Edit Sequence</button>
                    {this.props.error ? this.props.error : null }
                </form>
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
    error: PropTypes.string
};

export default SequenceDBN;
