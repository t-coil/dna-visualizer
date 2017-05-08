import { combineReducers } from 'redux';
import bases from './bases';
import sequence from './sequence';
import dbn from './dbn';
import error from './error';
import styles from './styles';

const dnaVisualizer = combineReducers({
    bases,
    sequence,
    dbn,
    error,
    styles
});

export default dnaVisualizer;
