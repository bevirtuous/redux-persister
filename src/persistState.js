import get from 'lodash/get';
import set from 'lodash/set';
import debounce from 'lodash/debounce';
import { adapter as localStorageAdapter } from './adapters/LocalStorageAdapter';

const logger = console;
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
 * @param {Object} [config.adapter=localStorageAdapter] A adapter to user a the storage.
 * @param {Object} [config.logEngine=logger] The log API to use. Defaults to the console API.
 * @return {Function}
 */
export function persistState(config) {
  const {
    key = 'redux',
    paths = [],
    adapter = localStorageAdapter,
    logEngine = logger,
  } = config;

  return function handleCreateStore(createStore) {
    return (reducer, initialState, enhancer) => {
      const store = createStore(reducer, initialState, enhancer);

      store.subscribe(() => {
        const state = store.getState();
        const subset = getSubset(state, paths);

        adapter.set(key, subset, debounce((error) => {
          if (error) {
            logEngine.error('Warning: Unable to persist redux state:', error);
          }
        }, 100));
      });

      return store;
    };
  };
}

export { localStorageAdapter as storage };
