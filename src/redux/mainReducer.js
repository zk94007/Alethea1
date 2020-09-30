import {combineReducers} from 'redux';
import AletheaReducer from '../containers/redux/reducer';

//@BlueprintReduxImportInsertion

export const combinedReducers = combineReducers({
    alethea: AletheaReducer
});
