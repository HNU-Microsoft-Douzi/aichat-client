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
/******/ 	return __webpack_require__(__webpack_require__.s = 66);
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

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _muiBase = __webpack_require__(0);

var _muiBase2 = _interopRequireDefault(_muiBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Component({
    behaviors: [_muiBase2.default],
    properties: {
        anchorOrigin: {
            type: Object,
            value: { vertical: 'top', horizontal: 'left' }
        },
        anchorPosition: {
            type: Object,
            value: null
        },
        elevation: {
            type: Number,
            value: 8
        },
        marginThreshold: {
            type: Number,
            value: 16
        },
        onBackdropClick: {
            // @ts-ignore
            type: Function,
            value: null
        },
        onClose: {
            // @ts-ignore
            type: Function,
            value: null
        },
        open: {
            type: Boolean,
            value: false
        },
        transformOrigin: {
            type: Object,
            value: { vertical: 'top', horizontal: 'left' }
        },
        transitions: {
            type: Array,
            value: []
        },
        transitionDelay: {
            type: Number,
            optionalTypes: [Object],
            value: 0
        },
        transitionDuration: {
            type: Number,
            optionalTypes: [Object],
            value: 225
        },
        transitionType: {
            type: String,
            value: 'fade'
        }
    },
    data: {
        _contentStyle: ''
    },
    lifetimes: {
        attached: function attached() {
            var backdropInPopoverComponent = this.selectComponent('._backdrop_in_popover');
            if (backdropInPopoverComponent) {
                backdropInPopoverComponent._onBeforeShow = this._onBeforeShow.bind(this);
                this._backdropInPopoverComponent = backdropInPopoverComponent;
            }
        }
    },
    methods: {
        _ClickPopoverContent: function _ClickPopoverContent() {},
        _onBeforeShow: function _onBeforeShow() {
            return this._computePostion();
        },
        _computePostion: function _computePostion() {
            var _this = this;

            return new Promise(function (resolve) {
                var count = 0;
                var position = {};
                var anchorPosition = _this.data.anchorPosition;

                if (anchorPosition) {
                    var anchorPositionTop = anchorPosition.top,
                        anchorPositionLeft = anchorPosition.left;

                    if (!Number.isNaN(Number(anchorPositionTop)) && !Number.isNaN(Number(anchorPositionLeft))) {
                        position.anchorPositionTop = Number(anchorPositionTop);
                        position.anchorPositionLeft = Number(anchorPositionLeft);
                        position.specifyPosition = true;
                        count += 1;
                    }
                }
                if (!position.specifyPosition) {
                    var query1 = _this.createSelectorQuery().select('.mui-popover-anchor').fields({
                        rect: true,
                        size: true
                    });
                    query1.exec(function (res) {
                        var _ref = res[0] || {},
                            top = _ref.top,
                            right = _ref.right,
                            bottom = _ref.bottom,
                            left = _ref.left,
                            width = _ref.width,
                            height = _ref.height;

                        position.anchorTop = top;
                        position.anchorRight = right;
                        position.anchorBottom = bottom;
                        position.anchorLeft = left;
                        position.anchorWidth = width;
                        position.anchorHeight = height;
                        count += 1;
                        if (count >= 2) {
                            resolve(position);
                        }
                    });
                }
                var query2 = _this.createSelectorQuery().select('.mui-popover-content').fields({ size: true });
                query2.exec(function (res) {
                    var _ref2 = res[0] || {},
                        width = _ref2.width,
                        height = _ref2.height;

                    position.contentWidth = width;
                    position.contentHeight = height;
                    count += 1;
                    if (count >= 2) {
                        resolve(position);
                    }
                });
            }).then(function (position) {
                return new Promise(function (resolve) {
                    var _data = _this.data,
                        anchorOrigin = _data.anchorOrigin,
                        transformOrigin = _data.transformOrigin;

                    var _contentStyle = 'position: fixed;';
                    var top = 0;
                    var left = 0;
                    if (!position.specifyPosition) {
                        var _ref3 = anchorOrigin || {},
                            _ref3$vertical = _ref3.vertical,
                            anchorVertical = _ref3$vertical === undefined ? 'top' : _ref3$vertical,
                            _ref3$horizontal = _ref3.horizontal,
                            anchorHorizontal = _ref3$horizontal === undefined ? 'left' : _ref3$horizontal;

                        if (anchorVertical === 'top') {
                            top = position.anchorTop;
                        } else if (anchorVertical === 'center') {
                            top = position.anchorTop + position.anchorHeight / 2;
                        } else if (anchorVertical === 'bottom') {
                            top = position.anchorTop + position.anchorHeight;
                        }
                        if (anchorHorizontal === 'left') {
                            left = position.anchorLeft;
                        } else if (anchorHorizontal === 'center') {
                            left = position.anchorLeft + position.anchorWidth / 2;
                        } else if (anchorHorizontal === 'right') {
                            left = position.anchorLeft + position.anchorWidth;
                        }
                    } else {
                        top = position.anchorPositionTop;
                        left = position.anchorPositionLeft;
                    }

                    var _ref4 = transformOrigin || {},
                        _ref4$vertical = _ref4.vertical,
                        transformVertical = _ref4$vertical === undefined ? 'top' : _ref4$vertical,
                        _ref4$horizontal = _ref4.horizontal,
                        transformHorizontal = _ref4$horizontal === undefined ? 'left' : _ref4$horizontal;

                    if (transformVertical === 'center') {
                        top -= position.contentHeight / 2;
                    } else if (transformVertical === 'bottom') {
                        top -= position.contentHeight;
                    }
                    if (transformHorizontal === 'center') {
                        left -= position.contentWidth / 2;
                    } else if (transformHorizontal === 'right') {
                        left -= position.contentWidth;
                    }
                    _contentStyle = _contentStyle + 'left:' + left + 'px;top:' + top + 'px;';
                    _this.setData({
                        _contentStyle: _contentStyle
                    }, function () {
                        return resolve(null);
                    });
                });
            }).catch(function (e) {
                return console.log(e);
            });
        }
    },
    observers: {},
    options: {
        virtualHost: true,
        pureDataPattern: /^_pure/,
        styleIsolation: 'apply-shared',
        multipleSlots: true
    }
});

/***/ })

/******/ });