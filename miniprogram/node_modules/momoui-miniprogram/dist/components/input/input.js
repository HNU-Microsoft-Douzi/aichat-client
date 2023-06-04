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
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
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

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var styleProps = ['color', 'variant', 'size'];
exports.default = Behavior({
    data: {
        muiClasses: ''
    },
    lifetimes: {
        attached: function attached() {
            if (!this._firstOberverForMuiClass) {
                var _data = this.data,
                    color = _data.color,
                    variant = _data.variant,
                    size = _data.size,
                    mClass = _data.mClass;

                this._defindMuiBehaviors({
                    color: color,
                    variant: variant,
                    size: size,
                    mClass: mClass
                });
            }
        }
    },
    methods: {
        _defindMuiBehaviors: function _defindMuiBehaviors() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            /** 整合所有样式 */
            var newData = {};
            var muiClassesArr = [];
            styleProps.forEach(function (sp) {
                muiClassesArr.push(params[sp] ? 'mui-' + sp + '-' + params[sp] : '');
            });
            if (params.mClass) {
                muiClassesArr.push(params.mClass);
            }
            newData.muiClasses = muiClassesArr.join(' ');
            this.setData(newData);
        }
    },
    observers: {
        'color, variant, size, mClass': function colorVariantSizeMClass(color, variant, size, mClass) {
            this._firstOberverForMuiClass = true;
            this._defindMuiBehaviors({
                color: color,
                variant: variant,
                size: size,
                mClass: mClass
            });
        }
    }
});

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _muiBase = __webpack_require__(0);

var _muiBase2 = _interopRequireDefault(_muiBase);

var _muiController = __webpack_require__(2);

var _muiController2 = _interopRequireDefault(_muiController);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controlledProps = ['color', 'disabled', 'error', 'fullWidth', 'focus', 'margin', 'size', 'variant'];
Component({
    behaviors: [_muiBase2.default, _muiController2.default, 'wx://form-field'],
    properties: {
        adjustPosition: {
            type: Boolean,
            value: true
        },
        alwaysEmbed: {
            type: Boolean,
            value: false
        },
        color: {
            type: String,
            value: 'primary'
        },
        cursor: {
            type: Number,
            value: null
        },
        cursorSpacing: {
            type: Number,
            value: 24
        },
        confirmType: {
            type: String,
            value: 'done'
        },
        confirmHold: {
            type: Boolean,
            value: false
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
        fullWidth: {
            type: Boolean,
            value: false
        },
        fixed: {
            type: Boolean,
            value: false
        },
        focus: {
            type: Boolean,
            value: false
        },
        holdKeyboard: {
            type: Boolean,
            value: false
        },
        inputDisabled: {
            type: Boolean,
            value: false
        },
        inputChange: {
            // @ts-ignore
            type: Function,
            value: null
        },
        inputFocus: {
            // @ts-ignore
            type: Function,
            value: null
        },
        inputBlur: {
            // @ts-ignore
            type: Function,
            value: null
        },
        inputConfirm: {
            // @ts-ignore
            type: Function,
            value: null
        },
        lineChange: {
            // @ts-ignore
            type: Function,
            value: null
        },
        inputKeyboardHeightChange: {
            // @ts-ignore
            type: Function,
            value: null
        },
        margin: {
            type: String,
            value: 'none'
        },
        multiline: {
            type: Boolean,
            value: false
        },
        maxlength: {
            type: Number,
            value: 140
        },
        name: {
            type: String,
            value: ''
        },
        password: {
            type: Boolean,
            value: false
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
        readOnly: {
            type: Boolean,
            value: false
        },
        rows: {
            type: Number,
            value: 1
        },
        rowsMax: {
            type: Number,
            value: 0
        },
        selectionStart: {
            type: Number,
            value: -1
        },
        selectionEnd: {
            type: Number,
            value: -1
        },
        showConfirmBar: {
            type: Boolean,
            value: false
        },
        size: {
            type: String,
            value: 'medium'
        },
        type: {
            type: String,
            value: 'text'
        },
        value: {
            type: String,
            value: ''
        },
        variant: {
            type: String,
            value: 'standard'
        }
    },
    data: {
        _focus: false,
        _textAutoHeight: true,
        _textareaHeight: 0,
        _hasInputLabel: false,
        _inputLabelShrink: false,
        _textareaStyle: ''
    },
    lifetimes: {
        attached: function attached() {
            this._hasAttached = true;
        }
    },
    relations: {
        '../form-control/form-control': {
            type: 'ancestor',
            linked: function linked(target) {
                this._Linked(target);
            },
            unlinked: function unlinked() {
                this._UnLinked();
            }
        },
        '../input-adornment/input-adornment': {
            type: 'descendant',
            linked: function linked(target) {
                this._LinkedAdornment(target);
            },
            unlinked: function unlinked() {
                this._UnLinkedAdornment();
            }
        }
    },
    methods: {
        _AdjustTextareaHeight: function _AdjustTextareaHeight(rows, rowsMax) {
            var _this = this;

            var multiline = this.data.multiline;

            if (multiline) {
                this._hasInitTextareaHeight = true;
                if (rows > 1 || rowsMax > 0) {
                    var query = this.createSelectorQuery();
                    query.select('.mui-input').fields({
                        computedStyle: ['line-height']
                    });
                    query.exec(function (res) {
                        var _ref = res || [],
                            view = _ref[0];

                        var lineHeight = view['line-height'];
                        if (lineHeight && lineHeight.slice(-2) === 'px') {
                            lineHeight = Number(lineHeight.slice(0, -2));
                            if (!Number.isNaN(lineHeight)) {
                                _this.data._pureLineHeight = lineHeight;
                                _this._CalcTextareaHeight(rows, rowsMax);
                            }
                        }
                    });
                } else {
                    this._CalcTextareaHeight(rows, rowsMax);
                }
            }
        },
        _CalcTextareaHeight: function _CalcTextareaHeight(rows, rowsMax) {
            var _textAutoHeight = true;
            var _textareaHeight = 0;
            if (rows > 1) {
                _textareaHeight = this.data._pureLineHeight * rows;
                _textAutoHeight = false;
            } else if (rowsMax > 0 && (this.data._pureLineCount || 0) >= rowsMax) {
                _textareaHeight = this.data._pureLineHeight * rowsMax;
                _textAutoHeight = false;
            }
            this.setData({
                _textareaHeight: _textareaHeight,
                _textAutoHeight: _textAutoHeight
            });
        },
        _onFocus: function _onFocus(e) {
            this.setData({ _focus: true });
            if (this._formControlComp) {
                var shrink = true;
                this._SetInputLabelShrink(shrink);
                this._formControlComp._ControlFormItem('_onFocus', ['input-label'], {});
            }
            var inputFocus = this.data.inputFocus;

            if (inputFocus && typeof inputFocus === 'function') {
                inputFocus(e, this.dataset);
            }
        },
        _onBlur: function _onBlur(e) {
            this.setData({ _focus: false });
            if (this._formControlComp) {
                var shrink = !!e.detail.value;
                this._SetInputLabelShrink(shrink);
                this._formControlComp._ControlFormItem('_onBlur', ['input-label'], {});
            }
            var inputBlur = this.data.inputBlur;

            if (inputBlur && typeof inputBlur === 'function') {
                inputBlur(e, this.dataset);
            }
        },
        _onChange: function _onChange(e) {
            var inputChange = this.data.inputChange;

            if (inputChange && typeof inputChange === 'function') {
                var _ref2 = e.detail || {},
                    value = _ref2.value,
                    cursor = _ref2.cursor,
                    keyCode = _ref2.keyCode;

                inputChange(value, cursor, keyCode, e, this.dataset);
            }
        },
        _onConfirm: function _onConfirm(e) {
            var inputConfirm = this.data.inputConfirm;

            if (inputConfirm && typeof inputConfirm === 'function') {
                var _ref3 = e.detail || {},
                    value = _ref3.value;

                inputConfirm(value, e, this.dataset);
            }
        },
        _onKeyboardHeightChange: function _onKeyboardHeightChange(e) {
            var inputKeyboardHeightChange = this.data.inputKeyboardHeightChange;

            if (inputKeyboardHeightChange && typeof inputKeyboardHeightChange === 'function') {
                inputKeyboardHeightChange(e, this.dataset);
            }
        },
        _LineChange: function _LineChange(e) {
            var _data = this.data,
                lineChange = _data.lineChange,
                rows = _data.rows,
                rowsMax = _data.rowsMax,
                multiline = _data.multiline;

            if (multiline) {
                var _ref4 = e || {},
                    _ref4$detail = _ref4.detail;

                _ref4$detail = _ref4$detail === undefined ? {} : _ref4$detail;
                var _ref4$detail$lineHeig = _ref4$detail.lineHeight,
                    lineHeight = _ref4$detail$lineHeig === undefined ? 0 : _ref4$detail$lineHeig,
                    _ref4$detail$lineCoun = _ref4$detail.lineCount,
                    lineCount = _ref4$detail$lineCoun === undefined ? 0 : _ref4$detail$lineCoun;

                this.data._pureLineHeight = lineHeight;
                this.data._pureLineCount = lineCount;
                this._hasChangedLine = true;
                if (this._hasObserverdRows) {
                    if (rows <= 1 || !this._hasInitTextareaHeight) {
                        this._AdjustTextareaHeight(rows, rowsMax);
                    }
                }
            }
            if (lineChange && typeof lineChange === 'function') {
                lineChange(e, this.dataset);
            }
        },
        _Linked: function _Linked(target) {
            if (target) {
                this._formControlComp = target;
                var shrink = !!this.data.value;
                this._SetInputLabelShrink(shrink);
            }
        },
        _UnLinked: function _UnLinked() {
            this._formControlComp = undefined;
        },
        _LinkedAdornment: function _LinkedAdornment(target) {
            this._permanentShrink = undefined;
            this._hasLinkedToInputAdornment = true;
            if (target) {
                var position = target.data.position;

                if (position === 'start') {
                    this._permanentShrink = true;
                    var shrink = !!this.data.value;
                    this._SetInputLabelShrink(shrink);
                }
            }
        },
        _UnLinkedAdornment: function _UnLinkedAdornment() {
            this._permanentShrink = undefined;
        },
        _ReRenderControlledProps: function _ReRenderControlledProps(hasInputLabel) {
            var _this2 = this;

            var target = this._formControlComp;
            if (target && Array.isArray(controlledProps)) {
                var newData = {};
                if (typeof hasInputLabel !== 'undefined') {
                    newData._hasInputLabel = hasInputLabel;
                }
                controlledProps.forEach(function (item) {
                    if (!_this2._propIsSet || !_this2._propIsSet[item]) {
                        newData[item] = target.data[item];
                    }
                });
                if (Object.keys(newData).length > 0) {
                    this.setData(newData);
                }
            }
        },
        _SetInputLabel: function _SetInputLabel(hasInputLabel) {
            this.setData({ _hasInputLabel: hasInputLabel });
        },
        _SetInputLabelShrink: function _SetInputLabelShrink(shrink) {
            if (this._formControlComp) {
                var _shrink = this._permanentShrink || shrink;
                this.setData({ _inputLabelShrink: _shrink });
                this._formControlComp._SetInputLabelShrink(_shrink);
            }
        }
    },
    observers: Object.assign({ 'rows, rowsMax': function rowsRowsMax(rows, rowsMax) {
            this._hasObserverdRows = true;
            if (this._hasChangedLine) {
                this._AdjustTextareaHeight(rows, rowsMax);
            }
        }, '_textAutoHeight, _textareaHeight': function _textAutoHeight_textareaHeight(_textAutoHeight, _textareaHeight) {
            this.setData({
                _textareaStyle: !_textAutoHeight && _textareaHeight ? 'height: ' + _textareaHeight + 'px;' : ''
            });
        } }, (0, _utils.ObserversForControlledPropsByAncestor)(controlledProps)),
    options: {
        // virtualHost: true,
        pureDataPattern: /^_pure/,
        styleIsolation: 'apply-shared',
        multipleSlots: true
    }
});

/***/ })

/******/ });