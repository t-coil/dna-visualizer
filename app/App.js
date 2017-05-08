import React from 'react';
import SequenceContainer from './components/SequenceContainer';
import ColorContainer from './components/ColorContainer';
import DisplayContainer from './components/DisplayContainer';

const App = () => (
    <div>
        <h1 className="page-title">DNA Secondary Structure Representation</h1>
        <SequenceContainer />
        <div className="dna-container">
            <ColorContainer />
            <DisplayContainer />
        </div>
    </div>
);

export default App;
