module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 71);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = Behavior({
    properties: {
        mClass: {
            type: String,
            value: ''
        },
        mStyle: {
            type: String,
            value: ''
        }
    }
});

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _muiBase = __webpack_require__(0);

var _muiBase2 = _interopRequireDefault(_muiBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Behavior({
    behaviors: [_muiBase2.default, 'wx://form-field'],
    properties: {
        defaultValue: {
            type: Array,
            optionalTypes: [String, Number],
            value: null
        },
        onChange: {
            // @ts-ignore
            type: Function,
            value: null
        },
        row: {
            type: Boolean,
            value: false
        },
        value: {
            type: Array,
            optionalTypes: [String, Number],
            value: null
        }
    },
    data: {
        _pureTargets: {},
        _pureCheckedValue: {},
        _pureIsControlled: false,
        _pureMultiple: true
    },
    lifetimes: {
        attached: function attached() {
            var _data = this.data,
                value = _data.value,
                defaultValue = _data.defaultValue,
                isMultiple = _data._pureMultiple;

            var checkedValue = void 0;
            var isControlled = false;
            if (Array.isArray(value)) {
                isControlled = true;
                checkedValue = value;
            } else if (typeof value === 'string') {
                isControlled = true;
                checkedValue = value.split(',');
            } else if (typeof value === 'number') {
                isControlled = true;
                checkedValue = [value];
            } else if (Array.isArray(defaultValue)) {
                checkedValue = defaultValue;
            } else if (typeof defaultValue === 'string') {
                checkedValue = defaultValue.split(',');
            } else if (typeof defaultValue === 'number') {
                checkedValue = [defaultValue];
            }
            if (checkedValue) {
                var checkedValueMap = this.data._pureCheckedValue;

                if (!isMultiple && checkedValue[0]) {
                    checkedValueMap[checkedValue[0]] = true;
                } else {
                    checkedValue.forEach(function (value) {
                        if (value) {
                            checkedValueMap[value] = true;
                        }
                    });
                }
                this.data._pureIsControlled = isControlled;
                this.data._pureCheckedValue = checkedValueMap;
                if (!isControlled) {
                    this.setData({
                        value: checkedValue
                    });
                }
            }
        }
    },
    methods: {
        _BindValue: function _BindValue(value, target) {
            if (value && target) {
                this.data._pureTargets[value] = target;
                this.setData({ _pureTargets: this.data._pureTargets });
            }
        },
        _UnbindValue: function _UnbindValue(value, target) {
            if (value && target) {
                delete this.data._pureTargets[value];
                this.setData({ _pureTargets: this.data._pureTargets });
            }
        },
        _InnerChange: function _InnerChange(detail, event) {
            var value = detail.value,
                checked = detail.checked;

            var checkedValue = [];
            var tmpCheckedValueMap = false;
            var _data2 = this.data,
                isMultiple = _data2._pureMultiple,
                checkedValueFromThisData = _data2._pureCheckedValue,
                onChange = _data2.onChange;

            if (this.data._pureIsControlled) {
                tmpCheckedValueMap = Object.assign({}, checkedValueFromThisData);
            }
            var checkedValueMap = this._Trigger(value, checked, tmpCheckedValueMap);
            checkedValue = Object.keys(checkedValueMap).filter(function (item) {
                return checkedValueMap[item];
            });
            var realCheckedValue = isMultiple ? checkedValue : checkedValue[0];
            if (onChange && typeof onChange === 'function') {
                onChange(realCheckedValue, event, this.dataset);
            }
            var isControlled = this.data._pureIsControlled;

            if (!isControlled) {
                this.setData({ value: realCheckedValue });
            }
        },
        _Linked: function _Linked(target, val) {
            if (target && target.data) {
                var value = val;
                if (typeof val === 'undefined') {
                    value = target.data.value;
                }
                if (value) {
                    this._BindValue(value, target);
                    var realChecked = this.data._pureCheckedValue[value] || false;
                    target._GroupControll(realChecked);
                    this._Trigger(value, realChecked);
                }
            }
        },
        _UnLinked: function _UnLinked(target) {
            if (target && target.data) {
                var value = target.data.value;

                if (value) {
                    this._UnbindValue(value, target);
                    this._Trigger(value, false);
                }
            }
        },
        _Trigger: function _Trigger(value, checked, checkedValueMap) {
            if (value) {
                var _data3 = this.data,
                    isMultiple = _data3._pureMultiple,
                    checkedValue = _data3._pureCheckedValue;

                var realCheckedValue = checkedValueMap || checkedValue;
                if (!isMultiple) {
                    realCheckedValue = {};
                }
                realCheckedValue[value] = checked;
                return realCheckedValue;
            }
            return null;
        }
    },
    observers: {
        value: function value(_value) {
            var checkedValueArr = [];
            var _data4 = this.data,
                targets = _data4._pureTargets,
                checkedValue = _data4._pureCheckedValue;

            var targetsKeyArr = Object.keys(targets);
            if (targetsKeyArr.length) {
                if (typeof _value === 'string') {
                    checkedValueArr = _value.split(',');
                } else if (Array.isArray(_value)) {
                    checkedValueArr = _value;
                }
                var checkedValueMap = {};
                checkedValueArr.forEach(function (val) {
                    checkedValueMap[val] = true;
                });
                targetsKeyArr.forEach(function (targetName) {
                    var realChecked = checkedValueMap[targetName] || false;
                    checkedValue[targetName] = realChecked;
                    targets[targetName]._GroupControll(realChecked);
                });
            }
        }
    }
});

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _checkGroupController = __webpack_require__(7);

var _checkGroupController2 = _interopRequireDefault(_checkGroupController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Component({
    behaviors: [_checkGroupController2.default],
    data: {
        _pureMultiple: false
    },
    relations: {
        '../radio/radio': {
            type: 'descendant',
            linked: function linked(target) {
                this._Linked(target);
            },
            unlinked: function unlinked(target) {
                this._UnLinked(target);
            }
        }
    },
    options: {
        // virtualHost: true,
        pureDataPattern: /^_pure/,
        styleIsolation: 'apply-shared'
    }
});

/***/ })

/******/ });