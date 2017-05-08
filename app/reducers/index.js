import { combineReducers } from 'redux';
import bases from './bases';
import sequence from './sequence';
import dbn from './dbn';

const dnaVisualizer = combineReducers({
    bases,
    sequence,
    dbn
});

export default dnaVisualizer;
