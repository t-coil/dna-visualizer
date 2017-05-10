import { combineReducers } from 'redux';
import bases from './bases';
import pair from './pair';
import error from './error';
import styles from './styles';

const dnaVisualizer = combineReducers({
    bases,
    pair,
    error,
    styles
});

export default dnaVisualizer;
