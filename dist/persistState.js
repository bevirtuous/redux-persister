(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/get', 'lodash/set', 'lodash/throttle', '@virtuous/logger', './adapters/LocalStorageAdapater'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/get'), require('lodash/set'), require('lodash/throttle'), require('@virtuous/logger'), require('./adapters/LocalStorageAdapater'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.get, global.set, global.throttle, global.logger, global.LocalStorageAdapater);
    global.persistState = mod.exports;
  }
})(this, function (exports, _get, _set, _throttle, _logger, _LocalStorageAdapater) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _get2 = _interopRequireDefault(_get);

  var _set2 = _interopRequireDefault(_set);

  var _throttle2 = _interopRequireDefault(_throttle);

  var _LocalStorageAdapater2 = _interopRequireDefault(_LocalStorageAdapater);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function getSubset(state, paths) {
    if (!paths.length) {
      return state;
    }

    var subset = {};
    paths.forEach(function (path) {
      (0, _set2.default)(subset, path, (0, _get2.default)(state, path));
    });

    return subset;
  }

  function persistState(config) {
    var _config$key = config.key,
        key = _config$key === undefined ? 'redux' : _config$key,
        _config$paths = config.paths,
        paths = _config$paths === undefined ? [] : _config$paths,
        _config$adapter = config.adapter,
        adapter = _config$adapter === undefined ? _LocalStorageAdapater2.default : _config$adapter,
        _config$logEngine = config.logEngine,
        logEngine = _config$logEngine === undefined ? _logger.logger : _config$logEngine;


    return function handleCreateStore(createStore) {
      return function (reducer, initialState, enhancer) {
        var finalInitialState = initialState;

        adapter.get(key, function (error, value) {
          if (error) {
            logEngine.warn('Unable to persist state to localStorage:', error);
            return;
          }

          finalInitialState = Object.assign({}, initialState, value);
          (0, _logger.group)('redux-persister %cLoaded persistent state', value, 'gray');
        });

        var store = createStore(reducer, finalInitialState, enhancer);

        store.subscribe((0, _throttle2.default)(function () {
          var state = store.getState();
          var subset = getSubset(state, paths);

          adapter.set(key, subset, function (error) {
            if (error) {
              logEngine.warn('Unable to persist state to localStorage:', error);
              return;
            }
            (0, _logger.group)('redux-persister %cStored state subset', subset, 'gray');
          });
        }, 500));

        return store;
      };
    };
  }

  exports.default = persistState;
});