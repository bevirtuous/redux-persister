(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Adapter', '../helpers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Adapter'), require('../helpers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Adapter, global.helpers);
    global.LocalStorageAdapater = mod.exports;
  }
})(this, function (exports, _Adapter2, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Adapter3 = _interopRequireDefault(_Adapter2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var LocalStorageAdapater = function (_Adapter) {
    _inherits(LocalStorageAdapater, _Adapter);

    function LocalStorageAdapater() {
      _classCallCheck(this, LocalStorageAdapater);

      return _possibleConstructorReturn(this, (LocalStorageAdapater.__proto__ || Object.getPrototypeOf(LocalStorageAdapater)).apply(this, arguments));
    }

    _createClass(LocalStorageAdapater, [{
      key: 'set',
      value: function set(key, value, callback) {
        var _this2 = this;

        (0, _helpers.jsonStringify)(value).then(function (serializedValue) {
          return callback(null, _this2.storage.setItem(key, serializedValue));
        }).catch(function (error) {
          return callback(error);
        });
      }
    }, {
      key: 'get',
      value: function get(key, callback) {
        var value = this.storage.getItem(key);

        (0, _helpers.jsonParse)(value).then(function (deserializedValue) {
          return callback(null, deserializedValue);
        }).catch(function (error) {
          return callback(error);
        });
      }
    }]);

    return LocalStorageAdapater;
  }(_Adapter3.default);

  exports.default = new LocalStorageAdapater(window.localStorage);
});