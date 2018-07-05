(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/get', 'lodash/set', './adapters/LocalStorageAdapater'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/get'), require('lodash/set'), require('./adapters/LocalStorageAdapater'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.get, global.set, global.LocalStorageAdapater);
    global.persistState = mod.exports;
  }
})(this, function (exports, _get, _set, _LocalStorageAdapater) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _get2 = _interopRequireDefault(_get);

  var _set2 = _interopRequireDefault(_set);

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
        adapter = _config$adapter === undefined ? _LocalStorageAdapater2.default : _config$adapter;


    return function handleCreateStore(createStore) {
      return function (reducer, initialState, enhancer) {
        var finalInitialState = initialState;

        adapter.get(key, function (error, value) {
          if (error) {
            console.warn('Unable to persist state to localStorage:', error);
            return;
          }

          finalInitialState = Object.assign({}, initialState, value);
        });

        var store = createStore(reducer, finalInitialState, enhancer);

        store.subscribe(function () {
          var state = store.getState();
          var subset = getSubset(state, paths);

          adapter.set(key, subset, function (error) {
            if (error) {
              console.warn('Unable to persist state to localStorage:', error);
            }
          });
        });

        return store;
      };
    };
  }

  exports.default = persistState;
});