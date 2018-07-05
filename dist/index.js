(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './persistState'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./persistState'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.persistState);
    global.index = mod.exports;
  }
})(this, function (exports, _persistState) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'persistState', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_persistState).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});