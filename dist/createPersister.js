(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash/get'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash/get'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.get);
    global.createPersister = mod.exports;
  }
})(this, function (exports, _get) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createPersister;

  var _get2 = _interopRequireDefault(_get);

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
      subset[path] = (0, _get2.default)(state, path);
    });

    return subset;
  }

  function createPersister(config) {
    var _config$key = config.key,
        key = _config$key === undefined ? 'redux' : _config$key,
        _config$paths = config.paths,
        paths = _config$paths === undefined ? [] : _config$paths;

    return function persister(store) {
      return function (next) {
        return function (action) {
          var result = next(action);
          var subset = getSubset(store.getState(), paths);
          console.warn('subset to store', subset);
          return result;
        };
      };
    };
  }
});