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
  Object.keys(_persistState).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _persistState[key];
      }
    });
  });
});