import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root/RootReducer';
import rootSaga from './root/RootSaga';

// console.log('------------------------REDUX STORE----------------------')
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware
  .run(rootSaga)
  .toPromise()
  .catch((e) => {
    console.log({
      message: e.message,
      source: 'sagaError',
      stacktrace: e.sagaStack,
    });
  });

export default store;
