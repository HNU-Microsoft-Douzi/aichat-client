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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = Behavior({
    behaviors: ['wx://form-field'],
    properties: {
        checked: {
            type: Boolean,
            value: null
        },
        color: {
            type: String,
            value: 'secondary'
        },
        defaultChecked: {
            type: Boolean,
            value: false
        },
        disabled: {
            type: Boolean,
            value: false
        },
        disableRipple: {
            type: Boolean,
            value: false
        },
        edge: {
            type: String,
            value: ''
        },
        icon: {
            type: Object,
            value: null
        },
        onChange: {
            // @ts-ignore
            type: Function,
            value: null
        },
        rippleColor: {
            type: String,
            value: null
        },
        size: {
            type: String,
            value: 'medium'
        },
        value: {
            type: String,
            optionalTypes: [Number],
            value: null
        }
    },
    data: {
        _pureOneWay: false,
        _pureIsControlled: false,
        _checked: false,
        _currentIcon: '',
        _checkedClass: 'mui-unchecked'
    },
    lifetimes: {
        attached: function attached() {
            this._hasAttached = true;
            var _data = this.data,
                checked = _data.checked,
                defaultChecked = _data.defaultChecked;

            var _checked = defaultChecked;
            if (typeof checked === 'boolean') {
                _checked = checked;
                this._CheckedBeControl(true);
            }
            this.setData(Object.assign({}, this._GenIcon({ checked: _checked })));
        }
    },
    methods: {
        _CheckedBeControl: function _CheckedBeControl(isControled) {
            this.setData({ _pureIsControlled: isControled });
        },
        _CheckControll: function _CheckControll(e) {
            var _data2 = this.data,
                _checked = _data2._checked,
                value = _data2.value,
                isOneWay = _data2._pureOneWay,
                thisIsControlled = _data2._pureIsControlled,
                onChange = _data2.onChange;

            var realChecked = isOneWay || !_checked;
            if (realChecked !== !!_checked) {
                if (onChange && typeof onChange === 'function') {
                    onChange(realChecked, value, e, this.dataset);
                }
                if (!thisIsControlled && realChecked !== !!_checked) {
                    this.setData({ checked: realChecked });
                }
                if (this._group) {
                    var _group$data = this._group.data,
                        targets = _group$data._pureTargets,
                        isControlled = _group$data._pureIsControlled,
                        multiple = _group$data._pureMultiple;

                    if (value) {
                        // this._group直接调用_InnerChange，保证_InnerChange内部的this指向this._group
                        this._group._InnerChange({ checked: realChecked, value: value }, e);
                    }
                    if (!isControlled) {
                        if (realChecked && targets && !multiple) {
                            Object.keys(targets).forEach(function (targetName) {
                                if (targetName !== value) {
                                    targets[targetName]._GroupControll(false);
                                }
                            });
                        }
                        this.setData(this._GenIcon({ checked: realChecked }));
                    }
                } else if (!thisIsControlled) {
                    this.setData(this._GenIcon({ checked: realChecked }));
                }
            }
        },
        _GenIcon: function _GenIcon() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                checkedArg = _ref.checked;

            var _data3 = this.data,
                icon = _data3.icon,
                _checked = _data3._checked,
                isSwitch = _data3._pureIsSwitch;

            var checked = _checked;
            if (typeof checkedArg !== 'undefined') {
                checked = checkedArg;
            }
            var mergeIcon = Object.assign(Object.assign({}, this.defaultIcon || {}), icon);
            var checkedIcon = mergeIcon.checked,
                uncheckedIcon = mergeIcon.unchecked;

            var _currentIcon = uncheckedIcon;
            var _checkedClass = 'mui-unchecked';
            if (checked) {
                _currentIcon = checkedIcon;
                _checkedClass = 'mui-checked';
            }
            var newData = {
                _checked: checked,
                _currentIcon: _currentIcon,
                _checkedClass: _checkedClass
            };
            if (isSwitch) {
                newData.value = checked;
            }
            return newData;
        },
        _GroupControll: function _GroupControll(checked) {
            this.setData(this._GenIcon({ checked: checked }));
        },
        _ReRenderControlledProps: function _ReRenderControlledProps() {
            var _this = this;

            var target = this._formControlLabelComp;
            if (target && Array.isArray(this.controlledProps)) {
                var newData = {};
                this.controlledProps.forEach(function (item) {
                    if (!_this._propIsSet || !_this._propIsSet[item]) {
                        if (item === 'value' && _this._group) {
                            _this._group._Linked(_this, target.data[item]);
                        }
                        newData[item] = target.data[item];
                    }
                });
                if (Object.keys(newData).length > 0) {
                    this.setData(newData);
                }
            }
        }
    },
    observers: {
        checked: function checked(_checked2) {
            var _checked = this.data._checked;

            if (_checked2 !== !!_checked && !this._group) {
                if (_checked2 !== !!_checked) {
                    this.setData(this._GenIcon({ checked: _checked2 }));
                }
            }
        },
        value: function value(_value) {
            if (_value && this._group) {
                this._group._BindValue(_value, this);
            }
        },

        'size, disabled': function sizeDisabled() {
            this.setData(this._GenIcon());
        }
    }
});

/***/ })

/******/ });