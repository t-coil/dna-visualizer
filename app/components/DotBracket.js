import React from 'react';

const DotBracket = () => (
    <div className="dbn-container">
        <button className="upload-button">Upload Sequence</button>
        <div>
            <label htmlFor="sequence">Sequence:</label>
            <input type="text" name="sequence" />
        </div>
        <div>
            <label htmlFor="dbn">Dot-Bracket Notation:</label>
            <input type="text" name="dbn" />
        </div>
    </div>
);

export default DotBracket;
