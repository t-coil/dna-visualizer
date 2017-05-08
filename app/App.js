import React from 'react';
import DotBracket from './components/DotBracket';
import ColorContainer from './components/ColorContainer';
import DisplayContainer from './components/DisplayContainer';

const App = () => (
    <div>
        <h1 className="page-title">DNA Visualizer</h1>
        <DotBracket />
        <ColorContainer />
        <DisplayContainer />
    </div>
);

export default App;
