import get from 'lodash/get';
import set from 'lodash/set';
import debounce from 'lodash/debounce';
import { logger, group } from '@virtuous/logger';
import localStorageAdapater from './adapters/LocalStorageAdapater';

const defaultPaths = [];

/**
 * @param {Object} state The current state.
 * @param {Array} [paths=[]] The paths to persist.
 * @return {Object}
 */
function getSubset(state, paths = defaultPaths) {
  if (!paths.length) {
    return state;
  }

  const subset = {};

  paths.forEach((entry) => {
    set(subset, entry, get(state, entry));
  });

  return subset;
}

/**
 * @param {Object} config The middleware config.
 * @param {string} [config.key='redux'] The storage key.
 * @param {Array} [config.paths=[]] The paths to store. It persists the whole state of not set.
 * @return {Function}
 */
export function persistState(config) {
  const {
    key = 'redux',
    paths = [],
    adapter = localStorageAdapater,
    logEngine = logger,
  } = config;

  return function handleCreateStore(createStore) {
    return (reducer, initialState, enhancer) => {
      let finalInitialState = initialState || {};

      adapter.get(key, (error, value) => {
        if (error) {
          logEngine.warn('Unable to persist state to localStorage:', error);
          return;
        }

        finalInitialState = {
          ...initialState && initialState,
          ...value,
        };
        group('redux-persister %cLoaded persistent state', value, 'gray');
      });

      const store = createStore(reducer, finalInitialState, enhancer);

      store.subscribe(() => {
        const state = store.getState();
        const subset = getSubset(state, paths);

        adapter.set(key, subset, debounce((error) => {
          if (error) {
            logEngine.warn('Unable to persist state to localStorage:', error);
          }
        }, 100));
      });

      return store;
    };
  };
}

export { localStorageAdapater as storage };
