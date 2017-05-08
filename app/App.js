import React from 'react';
import SequenceContainer from './components/SequenceContainer';
import ColorContainer from './components/ColorContainer';
import DisplayContainer from './components/DisplayContainer';

const App = () => (
    <div>
        <h1 className="page-title">DNA Visualizer</h1>
        <SequenceContainer />
        <ColorContainer />
        <DisplayContainer />
    </div>
);

export default App;
