import get from 'lodash/get';

/**
 * @param {Object} state The current state.
 * @param {Array} paths The paths to persist.
 * @return {Object}
 */
function getSubset(state, paths) {
  if (!paths.length) {
    return state;
  }

  const subset = {};

  paths.forEach((path) => {
    subset[path] = get(state, path);
  });

  return subset;
}

/**
 * @param {Object} config The middleware config.
 * @param {string} [config.key='redux'] The storage key.
 * @param {Array} [config.paths=[]] The paths to store. It persists the whole state of not set.
 * @return {Function}
 */
export default function createPersister(config) {
  const { key = 'redux', paths = [] } = config;

  /**
   * The persister middleware.
   * @param {Object} store The redux store.
   * @return {Function}
   */
  return function persister(store) {
    return next => (action) => {
      const result = next(action);
      const subset = getSubset(store.getState(), paths);
      console.warn('subset to store', subset);
      return result;
    };
  };
}
