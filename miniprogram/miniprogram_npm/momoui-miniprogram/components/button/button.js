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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
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

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _muiBase = __webpack_require__(0);

var _muiBase2 = _interopRequireDefault(_muiBase);

var _muiController = __webpack_require__(2);

var _muiController2 = _interopRequireDefault(_muiController);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controlledProps = ['color', 'disabled', 'disableElevation', 'disableRipple', 'size', 'variant'];
Component({
    behaviors: [_muiBase2.default, _muiController2.default, 'wx://form-field-button'],
    properties: {
        appParameter: {
            type: String,
            value: ''
        },
        color: {
            type: String,
            value: 'default'
        },
        disabled: {
            type: Boolean,
            value: false
        },
        disableElevation: {
            type: Boolean,
            value: false
        },
        disableRipple: {
            type: Boolean,
            value: false
        },
        formType: {
            type: String,
            value: ''
        },
        fullWidth: {
            type: Boolean,
            value: false
        },
        hoverClass: {
            type: String,
            value: ''
        },
        hoverStopPropagation: {
            type: Boolean,
            value: false
        },
        hoverStartTime: {
            type: Number,
            value: 20
        },
        hoverStayTime: {
            type: Number,
            value: 70
        },
        icon: {
            type: String,
            optionalTypes: [Object],
            value: null
        },
        iconSize: {
            type: Number,
            value: null
        },
        iconColor: {
            type: String,
            value: null
        },
        iconPosition: {
            type: String,
            value: 'left'
        },
        iconSpin: {
            type: Boolean,
            value: false
        },
        lang: {
            type: String,
            value: 'en'
        },
        loading: {
            type: Boolean,
            value: false
        },
        openType: {
            type: String,
            value: ''
        },
        rippleColor: {
            type: String,
            value: ''
        },
        sendMessageTitle: {
            type: String,
            value: ''
        },
        sendMessagePath: {
            type: String,
            value: ''
        },
        sendMessageImg: {
            type: String,
            value: ''
        },
        sessionFrom: {
            type: String,
            value: ''
        },
        shape: {
            type: String,
            value: 'normal'
        },
        showMessageCard: {
            type: String,
            value: ''
        },
        size: {
            type: String,
            value: 'medium'
        },
        variant: {
            type: String,
            value: 'text'
        }
    },
    data: {
        _groupStyle: ''
    },
    lifetimes: {
        attached: function attached() {
            this._hasAttached = true;
        }
    },
    relations: {
        '../button-group/button-group': {
            type: 'parent',
            linked: function linked(target) {
                if (target) {
                    this._buttonGrouplComp = target;
                    this._ReRenderControlledProps();
                }
            },
            unlinked: function unlinked() {
                this._buttonGrouplComp = undefined;
            }
        }
    },
    methods: {
        _ReRenderControlledProps: function _ReRenderControlledProps() {
            var _this = this;

            var target = this._buttonGrouplComp;
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
        },
        _TriggerRipple: function _TriggerRipple(e) {
            var buttonBase = this.selectComponent('._mui-base-in-button');
            if (buttonBase) {
                buttonBase._RippleAction(e);
            }
        }
    },
    observers: Object.assign({}, (0, _utils.ObserversForControlledPropsByAncestor)(controlledProps)),
    options: {
        // virtualHost: true,
        pureDataPattern: /^_pure/,
        styleIsolation: 'apply-shared',
        multipleSlots: true
    }
});

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

/***/ })

/******/ });