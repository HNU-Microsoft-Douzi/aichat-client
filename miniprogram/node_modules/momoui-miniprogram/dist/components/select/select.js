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
/******/ 	return __webpack_require__(__webpack_require__.s = 74);
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

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var openTypeMap = {
    contact: 'contact',
    getPhoneNumber: 'getphonenumber',
    getUserInfo: 'getuserinfo',
    openSetting: 'opensetting',
    launchApp: 'launchapp'
};
var ObserversForControlledPropsByAncestor = function ObserversForControlledPropsByAncestor(props) {
    var obs = {};
    props.forEach(function (item) {
        obs[item] = function () {
            if (!this._hasAttached) {
                if (!this._propIsSet) {
                    this._propIsSet = {};
                }
                this._propIsSet[item] = true;
            }
        };
    });
    return obs;
};
// 防抖动函数
function debounce(func, wait) {
    var timer = void 0;
    var delay = parseInt(wait, 10) || 0;
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        clearTimeout(timer);
        var content = this;
        timer = setTimeout(function () {
            func.apply(content, args);
        }, delay);
    };
}
exports.debounce = debounce;
exports.openTypeMap = openTypeMap;
exports.ObserversForControlledPropsByAncestor = ObserversForControlledPropsByAncestor;

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _muiBase = __webpack_require__(0);

var _muiBase2 = _interopRequireDefault(_muiBase);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controlledProps = ['color', 'disabled', 'error', 'fullWidth', 'margin', 'size', 'variant'];
Component({
    behaviors: [_muiBase2.default, 'wx://form-field'],
    properties: {
        color: {
            type: String,
            value: 'primary'
        },
        customItem: {
            type: String,
            value: null
        },
        disabled: {
            type: Boolean,
            value: false
        },
        disableDefaultPadding: {
            type: Boolean,
            value: false
        },
        disableUnderline: {
            type: Boolean,
            value: false
        },
        error: {
            type: Boolean,
            value: false
        },
        end: {
            type: String,
            value: null
        },
        fullWidth: {
            type: Boolean,
            value: true
        },
        fields: {
            type: String,
            value: 'day'
        },
        headerText: {
            type: String,
            value: null
        },
        mode: {
            type: String,
            value: 'selector'
        },
        margin: {
            type: String,
            value: 'none'
        },
        name: {
            type: String,
            value: ''
        },
        placeholder: {
            type: String,
            value: ''
        },
        placeholderStyle: {
            type: String,
            value: ''
        },
        placeholderClass: {
            type: String,
            value: ''
        },
        range: {
            type: Array,
            value: null
        },
        rangeIndex: {
            type: String,
            value: null
        },
        rangeKey: {
            type: String,
            value: null
        },
        required: {
            type: Boolean,
            value: false
        },
        start: {
            type: String,
            value: null
        },
        // @ts-ignore
        value: null,
        variant: {
            type: String,
            value: 'standard'
        }
    },
    data: {
        _display: null,
        _focus: false,
        _value: null
    },
    lifetimes: {
        attached: function attached() {
            this._hasAttached = true;
            if (!this._controlled) {
                var _data = this.data,
                    mode = _data.mode,
                    value = _data.value;

                if (mode === 'region' && !Array.isArray(value)) {
                    this.setData({ value: [] });
                }
            }
        }
    },
    relations: {
        '../form-control/form-control': {
            type: 'ancestor',
            linked: function linked(target) {
                this._GetSelectInput()._Linked(target);
                if (target) {
                    this._formControlComp = target;
                }
            },
            unlinked: function unlinked() {
                this._GetSelectInput()._UnLinked();
            }
        },
        '../input-adornment/input-adornment': {
            type: 'descendant',
            linked: function linked(target) {
                this._GetSelectInput()._LinkedAdornment(target);
            },
            unlinked: function unlinked() {
                this._GetSelectInput()._UnLinkedAdornment();
            }
        }
    },
    methods: {
        _Cancel: function _Cancel(e) {
            var _display = this.data._display;

            this._InputBlur({
                detail: {
                    value: _display
                }
            });
            this.triggerEvent('cancel', e.detail);
        },
        _Change: function _Change(e) {
            var value = e.detail.value;
            var _data2 = this.data,
                range = _data2.range,
                rangeIndex = _data2.rangeIndex,
                rangeKey = _data2.rangeKey;

            if (range && Array.isArray(range) && rangeIndex && rangeKey) {
                var rangeItem = range[Number(value)];
                if ((typeof rangeItem === 'undefined' ? 'undefined' : _typeof(rangeItem)) === 'object') {
                    e.detail.value = rangeItem[rangeIndex];
                }
                if (!this._controlled) {
                    this.setData({ value: e.detail.value });
                }
            } else if (!this._controlled) {
                this.setData({ value: value });
            }
            this.triggerEvent('change', e.detail);
        },
        _ColumnChange: function _ColumnChange(e) {
            this.triggerEvent('columnchange', e.detail);
        },
        _InputBlur: function _InputBlur(e) {
            this._GetSelectInput()._onBlur(e);
            this.setData({ _focus: false });
        },
        _InputFocus: function _InputFocus(e) {
            var disabled = this.data.disabled;

            if (!disabled) {
                this._GetSelectInput()._onFocus(e);
                this.setData({ _focus: true });
            }
        },
        _GetSelectInput: function _GetSelectInput() {
            if (!this._muiSelectInput) {
                this._muiSelectInput = this.selectComponent('._mui-select-input');
            }
            return this._muiSelectInput;
        },
        _ReRenderControlledProps: function _ReRenderControlledProps(hasInputLabel) {
            var _this = this;

            var target = this._formControlComp;
            if (target && Array.isArray(controlledProps)) {
                var newData = {};
                controlledProps.forEach(function (item) {
                    if (!_this._propIsSet || !_this._propIsSet[item]) {
                        newData[item] = target.data[item];
                    }
                });
                if (Object.keys(newData).length > 0) {
                    this.setData(newData);
                }
            }
            this._GetSelectInput()._SetInputLabel(hasInputLabel);
        },
        _Value2Display: function _Value2Display(val) {
            var _data3 = this.data,
                range = _data3.range,
                rangeIndex = _data3.rangeIndex,
                rangeKey = _data3.rangeKey;

            var _display = '';
            var _index = void 0;
            var isValid = false;
            if (Array.isArray(val)) {
                isValid = val.every(function (item) {
                    return typeof item === 'string' || typeof item === 'number';
                });
            } else if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
                isValid = true;
            }
            if (isValid) {
                if (Array.isArray(range)) {
                    if (Array.isArray(val)) {
                        _index = [];
                        _display = val.map(function (valItem, i) {
                            if (rangeIndex && rangeKey) {
                                var displayItem = '';
                                range.some(function (rangeItem, index) {
                                    if ((typeof rangeItem === 'undefined' ? 'undefined' : _typeof(rangeItem)) === 'object' && valItem === rangeItem[rangeIndex]) {
                                        _index.push(index);
                                        displayItem = rangeItem[rangeKey];
                                        return true;
                                    }
                                    return false;
                                });
                                return displayItem;
                            } else {
                                var index = Number(valItem);
                                _index.push(index);
                                return rangeKey && _typeof(range[i][index]) === 'object' ? range[i][index][rangeKey] : range[i][index];
                            }
                        }).join(' ');
                    } else if (!(val === null || typeof val === 'undefined' || val === '')) {
                        if (rangeIndex && rangeKey) {
                            range.some(function (rangeItem, index) {
                                if ((typeof rangeItem === 'undefined' ? 'undefined' : _typeof(rangeItem)) === 'object' && val === rangeItem[rangeIndex]) {
                                    _index = index;
                                    _display = rangeItem[rangeKey];
                                    return true;
                                }
                                return false;
                            });
                        } else {
                            var index = Number(val);
                            _display = rangeKey && _typeof(range[index]) === 'object' ? range[index][rangeKey] : range[index];
                        }
                    }
                } else if (Array.isArray(val)) {
                    _display = val.join(' ');
                } else {
                    _display = val;
                }
            }
            return { _display: _display, _index: _index };
        }
    },
    observers: Object.assign({
        value: function value(val) {
            var _value = val;
            var _data4 = this.data,
                mode = _data4.mode,
                value = _data4.value;

            if (!this._hasAttached) {
                this._controlled = true;
                if (mode === 'region' && !Array.isArray(value)) {
                    _value = [];
                }
            }

            var _Value2Display2 = this._Value2Display(_value),
                _display = _Value2Display2._display,
                _index = _Value2Display2._index;

            this._InputBlur({
                detail: {
                    value: _display
                }
            });
            if (!(typeof _index === 'undefined')) {
                _value = _index;
            }
            this.setData({
                _display: _display,
                _value: _value
            });
        }
    }, (0, _utils.ObserversForControlledPropsByAncestor)(controlledProps)),
    options: {
        pureDataPattern: /^_pure/,
        styleIsolation: 'apply-shared',
        multipleSlots: true
    }
});

/***/ })

/******/ });