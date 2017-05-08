import { combineReducers } from 'redux';
import bases from './bases';
import sequence from './sequence';
import dbn from './dbn';
import error from './error';

const dnaVisualizer = combineReducers({
    bases,
    sequence,
    dbn,
    error
});

export default dnaVisualizer;
