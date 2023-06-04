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
/******/ 	return __webpack_require__(__webpack_require__.s = 78);
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

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _muiBase = __webpack_require__(0);

var _muiBase2 = _interopRequireDefault(_muiBase);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Component({
    behaviors: [_muiBase2.default],
    properties: {
        centered: {
            type: Boolean,
            value: false
        },
        indicatorColor: {
            type: String,
            value: 'secondary'
        },
        onChange: {
            // @ts-ignore
            type: Function,
            value: null
        },
        orientation: {
            type: String,
            value: 'horizontal'
        },
        textColor: {
            type: String,
            value: 'inherit'
        },
        value: {
            type: String,
            optionalTypes: [Number, Array, Object],
            value: null
        },
        variant: {
            type: String,
            value: 'standard'
        }
    },
    data: {
        _pureTabs: [],
        _indicatorStyle: '',
        _translate: 0,
        _showArrow: true
    },
    lifetimes: {
        created: function created() {
            var _this = this;

            if (!this._ArrangeTabs) {
                this._ArrangeTabs = (0, _utils.debounce)(function () {
                    var newTabs = _this.data._pureTabs;
                    if (newTabs.length > 0) {
                        newTabs.forEach(function (item, index) {
                            item._defaultValue = index;
                            item._ReRenderControlledProps();
                        });
                    }
                }, 50);
            }
        }
    },
    relations: {
        '../tab/tab': {
            type: 'descendant',
            linked: function linked(target) {
                if (target) {
                    this.data._pureTabs.push(target);
                    this.setData({ _pureTabs: this.data._pureTabs });
                }
            },
            unlinked: function unlinked(target) {
                var _targetIndex = this.data._pureTabs.findIndex(function (item) {
                    return item === target;
                });
                this.data._pureTabs.splice(_targetIndex, 1);
                this.setData({ _pureTabs: this.data._pureTabs });
            }
        }
    },
    methods: {
        _AdjustTabsOffset: function _AdjustTabsOffset(activeIndex, tabsStart, tabStart, tabsEnd, tabEnd) {
            var lastActiveIndex = this._lastActiveIndex || 0;
            var _translate = this.data._translate;
            var _detal = 0;
            if (lastActiveIndex < activeIndex && tabsEnd < tabEnd) {
                _detal = tabsEnd - tabEnd;
                _translate += _detal;
            } else if (lastActiveIndex > activeIndex && tabsStart > tabStart) {
                _detal = tabsStart - tabStart;
                _translate += _detal;
            }
            this._lastActiveIndex = activeIndex;
            return { _translate: _translate, _detal: _detal };
        },
        _ComputeTabsPosition: function _ComputeTabsPosition(activeIndex) {
            var _this2 = this;

            var _data = this.data,
                Tabs = _data._pureTabs,
                variant = _data.variant,
                orientation = _data.orientation;

            var endTabIndex = Tabs.length - 1;
            var promises = [this._QueryTabsScroller(), this._QueryTabsContainer(), Tabs[activeIndex]._QueryTab()];
            if (variant === 'scrollable') {
                promises.push(activeIndex === 0 ? undefined : Tabs[0]._QueryTab());
                promises.push(activeIndex === endTabIndex ? undefined : Tabs[endTabIndex]._QueryTab());
            }
            Promise.all(promises).then(function (values) {
                var tabsView = values[0],
                    containerView = values[1],
                    tabView = values[2],
                    firstTabView = values[3],
                    lastTabView = values[4];

                var _ref = tabsView || {},
                    _ref$left = _ref.left,
                    tabsLeft = _ref$left === undefined ? 0 : _ref$left,
                    _ref$right = _ref.right,
                    tabsRight = _ref$right === undefined ? 0 : _ref$right,
                    _ref$top = _ref.top,
                    tabsTop = _ref$top === undefined ? 0 : _ref$top,
                    _ref$bottom = _ref.bottom,
                    tabsBottom = _ref$bottom === undefined ? 0 : _ref$bottom;

                var _ref2 = containerView || {},
                    _ref2$left = _ref2.left,
                    containerLeft = _ref2$left === undefined ? 0 : _ref2$left,
                    _ref2$top = _ref2.top,
                    containerTop = _ref2$top === undefined ? 0 : _ref2$top;

                var _ref3 = tabView || {},
                    _ref3$left = _ref3.left,
                    tabLeft = _ref3$left === undefined ? 0 : _ref3$left,
                    _ref3$right = _ref3.right,
                    tabRight = _ref3$right === undefined ? 0 : _ref3$right,
                    _ref3$top = _ref3.top,
                    tabTop = _ref3$top === undefined ? 0 : _ref3$top,
                    _ref3$bottom = _ref3.bottom,
                    tabBottom = _ref3$bottom === undefined ? 0 : _ref3$bottom,
                    _ref3$width = _ref3.width,
                    tabWidth = _ref3$width === undefined ? 0 : _ref3$width,
                    _ref3$height = _ref3.height,
                    tabHeight = _ref3$height === undefined ? 0 : _ref3$height;

                var _positionAtStart = false;
                var _positionAtEnd = false;
                var _showArrow = true;
                var indicatorOffset = void 0;
                var indicatorLength = void 0;
                if (orientation === 'horizontal') {
                    indicatorOffset = tabLeft - containerLeft;
                    indicatorLength = tabWidth;
                } else {
                    indicatorOffset = tabTop - containerTop;
                    indicatorLength = tabHeight;
                }
                var tabsStart = void 0;
                var tabsEnd = void 0;
                var tabStart = void 0;
                var tabEnd = void 0;
                if (orientation === 'horizontal') {
                    tabsStart = tabsLeft;
                    tabsEnd = tabsRight;
                    tabStart = tabLeft;
                    tabEnd = tabRight;
                } else {
                    tabsStart = tabsTop;
                    tabsEnd = tabsBottom;
                    tabStart = tabTop;
                    tabEnd = tabBottom;
                }

                var _AdjustTabsOffset2 = _this2._AdjustTabsOffset(activeIndex, tabsStart, tabStart, tabsEnd, tabEnd),
                    _translate = _AdjustTabsOffset2._translate,
                    _detal = _AdjustTabsOffset2._detal;

                if (variant === 'scrollable') {
                    var _ref4 = firstTabView || tabView || {},
                        _ref4$left = _ref4.left,
                        firstTabLeft = _ref4$left === undefined ? 0 : _ref4$left,
                        _ref4$top = _ref4.top,
                        firstTabTop = _ref4$top === undefined ? 0 : _ref4$top;

                    var _ref5 = lastTabView || tabView || {},
                        _ref5$right = _ref5.right,
                        lastTabRight = _ref5$right === undefined ? 0 : _ref5$right,
                        _ref5$bottom = _ref5.bottom,
                        lastTabBottom = _ref5$bottom === undefined ? 0 : _ref5$bottom;

                    var firstTabStart = orientation === 'horizontal' ? firstTabLeft : firstTabTop;
                    var lastTabEnd = orientation === 'horizontal' ? lastTabRight : lastTabBottom;
                    if (tabsStart <= firstTabStart + _detal) {
                        _positionAtStart = true;
                    }
                    if (tabsEnd >= lastTabEnd + _detal) {
                        _positionAtEnd = true;
                    }
                    if (_positionAtEnd && _positionAtStart) {
                        _showArrow = false;
                    }
                }
                var _indicatorStyle = void 0;
                if (orientation === 'horizontal') {
                    _indicatorStyle = 'left: ' + indicatorOffset + 'px; width: ' + indicatorLength + 'px;';
                } else {
                    _indicatorStyle = 'top: ' + indicatorOffset + 'px; height: ' + indicatorLength + 'px;';
                }
                _this2.setData({
                    _indicatorStyle: _indicatorStyle,
                    _translate: _translate,
                    _positionAtEnd: _positionAtEnd,
                    _positionAtStart: _positionAtStart,
                    _showArrow: _showArrow
                });
            }).catch(function (e) {
                return console.log(e);
            });
        },
        _Move: function _Move(direction) {
            var _this3 = this;

            var _data2 = this.data,
                Tabs = _data2._pureTabs,
                _translate = _data2._translate,
                orientation = _data2.orientation;

            var tabIndex = direction === 'left' ? 0 : Tabs.length - 1;
            Promise.all([this._QueryTabsScroller(), Tabs[tabIndex]._QueryTab()]).then(function (values) {
                var tabsView = values[0],
                    tabView = values[1];
                var _tabsView$left = tabsView.left,
                    tabsLeft = _tabsView$left === undefined ? 0 : _tabsView$left,
                    _tabsView$right = tabsView.right,
                    tabsRight = _tabsView$right === undefined ? 0 : _tabsView$right,
                    _tabsView$top = tabsView.top,
                    tabsTop = _tabsView$top === undefined ? 0 : _tabsView$top,
                    _tabsView$bottom = tabsView.bottom,
                    tabsBottom = _tabsView$bottom === undefined ? 0 : _tabsView$bottom,
                    _tabsView$width = tabsView.width,
                    tabsWidth = _tabsView$width === undefined ? 0 : _tabsView$width;
                var _tabView$left = tabView.left,
                    tabLeft = _tabView$left === undefined ? 0 : _tabView$left,
                    _tabView$right = tabView.right,
                    tabRight = _tabView$right === undefined ? 0 : _tabView$right,
                    _tabView$top = tabView.top,
                    tabTop = _tabView$top === undefined ? 0 : _tabView$top,
                    _tabView$bottom = tabView.bottom,
                    tabBottom = _tabView$bottom === undefined ? 0 : _tabView$bottom;

                var _detal = void 0;
                if (orientation === 'horizontal') {
                    _detal = direction === 'left' ? tabsLeft - tabLeft : tabsRight - tabRight;
                } else {
                    _detal = direction === 'left' ? tabsTop - tabTop : tabsBottom - tabBottom;
                }
                var newData = {};
                if (direction === 'left') {
                    if (_detal > 0) {
                        newData._positionAtEnd = false;
                    }
                    if (_detal > tabsWidth) {
                        _detal = tabsWidth;
                    } else {
                        newData._positionAtStart = true;
                    }
                } else if (direction === 'right') {
                    if (-_detal > 0) {
                        newData._positionAtStart = false;
                    }
                    if (-_detal > tabsWidth) {
                        _detal = -tabsWidth;
                    } else {
                        newData._positionAtEnd = true;
                    }
                }
                newData._translate = _translate + _detal;
                _this3.setData(newData);
            }).catch(function (e) {
                return console.log(e);
            });
        },
        _MoveToLeft: function _MoveToLeft() {
            var _positionAtStart = this.data._positionAtStart;

            if (!_positionAtStart) {
                this._Move('left');
            }
        },
        _MoveToRight: function _MoveToRight() {
            var _positionAtEnd = this.data._positionAtEnd;

            if (!_positionAtEnd) {
                this._Move('right');
            }
        },
        _QueryTabsContainer: function _QueryTabsContainer() {
            var _this4 = this;

            return new Promise(function (resolve) {
                var query = _this4.createSelectorQuery();
                query.select('.mui-tabs-flex-container').fields({
                    rect: true
                });
                query.exec(function (res) {
                    var _ref6 = res || {},
                        view = _ref6[0];

                    var _ref7 = view || {},
                        _ref7$left = _ref7.left,
                        left = _ref7$left === undefined ? 0 : _ref7$left,
                        _ref7$top = _ref7.top,
                        top = _ref7$top === undefined ? 0 : _ref7$top;

                    var queryRes = { left: left, top: top };
                    resolve(queryRes);
                });
            });
        },
        _QueryTabsScroller: function _QueryTabsScroller() {
            var _this5 = this;

            return new Promise(function (resolve) {
                var query = _this5.createSelectorQuery();
                query.select('.mui-tabs-scroller').fields({
                    rect: true,
                    size: true
                });
                query.exec(function (res) {
                    var _ref8 = res || {},
                        view = _ref8[0];

                    var _ref9 = view || {},
                        _ref9$left = _ref9.left,
                        left = _ref9$left === undefined ? 0 : _ref9$left,
                        _ref9$right = _ref9.right,
                        right = _ref9$right === undefined ? 0 : _ref9$right,
                        _ref9$top = _ref9.top,
                        top = _ref9$top === undefined ? 0 : _ref9$top,
                        _ref9$bottom = _ref9.bottom,
                        bottom = _ref9$bottom === undefined ? 0 : _ref9$bottom,
                        _ref9$width = _ref9.width,
                        width = _ref9$width === undefined ? 0 : _ref9$width;

                    var queryRes = {
                        left: left,
                        right: right,
                        top: top,
                        bottom: bottom,
                        width: width
                    };
                    resolve(queryRes);
                });
            });
        },
        _onChange: function _onChange(e, value) {
            var onChange = this.data.onChange;

            if (onChange && typeof onChange === 'function') {
                e.detail.current = value;
                onChange(e, this.dataset);
            }
        }
    },
    observers: {
        'value, _pureTabs': function value_pureTabs() {
            if (this._ArrangeTabs) {
                this._ArrangeTabs();
            }
        }
    },
    options: {
        pureDataPattern: /^_pure/,
        styleIsolation: 'apply-shared'
    }
});

/***/ })

/******/ });