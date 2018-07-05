(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './createPersister'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./createPersister'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.createPersister);
    global.index = mod.exports;
  }
})(this, function (exports, _createPersister) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'createPersister', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_createPersister).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});