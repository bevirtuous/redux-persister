(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'greenlet'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('greenlet'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.greenlet);
    global.helpers = mod.exports;
  }
})(this, function (exports, _greenlet) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.jsonParse = exports.jsonStringify = undefined;

  var _greenlet2 = _interopRequireDefault(_greenlet);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var jsonStringify = exports.jsonStringify = (0, _greenlet2.default)(function (data) {
    return JSON.stringify(data);
  });
  var jsonParse = exports.jsonParse = (0, _greenlet2.default)(function (data) {
    return JSON.parse(data);
  });
});