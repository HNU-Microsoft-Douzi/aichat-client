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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
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

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _muiBase = __webpack_require__(0);

var _muiBase2 = _interopRequireDefault(_muiBase);

var _base = __webpack_require__(9);

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var momouiRootPath = '/miniprogram_npm/momoui-miniprogram/';
var customizedIconsPath = void 0;
/* eslint-disable */
var app = getApp();
/* eslint-disable */
if (app.momouiRootPath) {
    momouiRootPath = app.momouiRootPath;
}
if (app.customizedIconsPath) {
    customizedIconsPath = app.customizedIconsPath;
}
var muiIconPath = 'styles/static/icons/';
var themeListeners = [];
wx.onThemeChange(function (obj) {
    if (obj && obj.theme) {
        themeListeners.forEach(function (listener) {
            listener();
        });
    }
});
Component({
    behaviors: [_muiBase2.default],
    properties: {
        color: {
            type: String,
            value: null
        },
        customized: {
            type: Boolean,
            value: false
        },
        disableThemeWatcher: {
            type: Boolean,
            value: false
        },
        name: {
            type: String,
            value: 'svg'
        },
        progressProps: {
            type: Object,
            value: {
                disableShrink: false,
                value: 0,
                variant: 'indeterminate'
            }
        },
        rerender: {
            type: null,
            value: null
        },
        size: {
            type: Number,
            value: null
        },
        spin: {
            type: Boolean,
            value: false
        },
        src: {
            type: String,
            value: null
        }
    },
    data: {
        base64Content: '',
        _innerStyles: 'width:24px;height:24px;'
    },
    lifetimes: {
        attached: function attached() {
            var _this = this;

            var disableThemeWatcher = this.data.disableThemeWatcher;

            if (!disableThemeWatcher) {
                this.listener = function () {
                    var _data = _this.data,
                        name = _data.name,
                        color = _data.color,
                        size = _data.size,
                        src = _data.src,
                        customized = _data.customized;

                    var _name = name;
                    if (typeof name === 'string' && (name === 'false' || name === 'null' || name === 'undefined')) {
                        _name = '';
                    }
                    _this._Pretreatment(_name, color, size, src, customized);
                };
                themeListeners.push(this.listener);
            }
        },
        detached: function detached() {
            if (this.listener) {
                var index = themeListeners.indexOf(this.listener);
                if (index > -1) {
                    themeListeners.splice(index, 1);
                }
            }
        }
    },
    methods: {
        _Pretreatment: function _Pretreatment(name, color, size, src, customized) {
            var _this2 = this;

            if (name && !src) {
                if (color && size) {
                    this._ReadSvgAndGenBase64(name, color, size + 'px', customized);
                } else {
                    this.createSelectorQuery().select('.mui-icon').fields({
                        computedStyle: ['color', 'fontSize']
                    }, function (res) {
                        var _ref = res || {},
                            queryColor = _ref.color,
                            querySize = _ref.fontSize;

                        queryColor = queryColor || 'currentColor';
                        querySize = querySize || '24px';
                        var realColor = color || queryColor;
                        var realSize = size ? size + 'px' : querySize;
                        _this2._ReadSvgAndGenBase64(name, realColor, realSize, customized);
                    }).exec();
                }
            } else if (src) {
                this.createSelectorQuery().select('.mui-icon').fields({
                    computedStyle: ['fontSize']
                }, function (res) {
                    var _ref2 = res || {},
                        querySize = _ref2.fontSize;

                    querySize = querySize || '24px';
                    var realSize = size ? size + 'px' : querySize;
                    var _innerStyles = 'width:' + realSize + ';height:' + realSize + ';';
                    _this2.setData({ _innerStyles: _innerStyles, base64Content: src });
                }).exec();
            }
        },
        _ReadSvgAndGenBase64: function _ReadSvgAndGenBase64(iconName, color, size, customized) {
            if (iconName) {
                var iconPath = customized ? '' + (customizedIconsPath || '') + iconName : '' + momouiRootPath + muiIconPath + iconName;
                if (iconPath.substr(-4) !== '.svg') {
                    iconPath = iconPath + '.svg';
                }
                try {
                    var fileRes = wx.getFileSystemManager().readFileSync(iconPath, 'binary');
                    if (fileRes) {
                        var svgdata = String(fileRes);
                        var dstr = '<svg';
                        var svgStartIndex = svgdata.indexOf(dstr);
                        var styleIndex = svgdata.indexOf('>', svgStartIndex);
                        var insertStyle = '\n              <style type="text/css">\n                path { fill: ' + color + '; }\n            ';
                        if (iconName === 'loading') {
                            var progressProps = this.data.progressProps;

                            insertStyle = '\n                <style type="text/css">\n                  circle {\n                    stroke: ' + color + ';\n              ';
                            if (progressProps.disableShrink) {
                                insertStyle = insertStyle + '\n                    animation: none;\n                ';
                            } else {
                                insertStyle = insertStyle + '\n                    ' + (progressProps.variant !== 'indeterminate' ? 'transition: stroke-dashoffset 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' : 'animation: mui-circular-progress-keyframes-circular-dash 1.4s ease-in-out infinite') + ';\n                ';
                            }
                            insertStyle = insertStyle + '\n                  ' + (progressProps.variant === 'indeterminate' ? 'stroke-dasharray: 80px, 200px;stroke-dashoffset: 0px' : 'stroke-dasharray: 126.92;stroke-dashoffset: ' + (126.92 - (progressProps.value || 0) / 100 * 126.92).toFixed(2) + 'px') + ';\n                }\n              ';
                        }
                        insertStyle = '\n                ' + insertStyle + '\n              </style>\n            ';
                        svgdata = '' + svgdata.slice(0, styleIndex + 1) + insertStyle + svgdata.slice(styleIndex + 1);
                        var base64 = new _base2.default();
                        var svgtobase64 = base64.encode(svgdata);
                        var base64Content = 'data:image/svg+xml;base64,' + svgtobase64;
                        var _innerStyles = 'width:' + size + ';height:' + size + ';';
                        this.setData({
                            base64Content: base64Content,
                            _innerStyles: _innerStyles
                        });
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    },
    observers: {
        'name, color, size, src, customized, mClass, mStyle, progressProps, rerender': function nameColorSizeSrcCustomizedMClassMStyleProgressPropsRerender(name, color, size, src, customized) {
            var _name = name;
            if (typeof name === 'string' && (name === 'false' || name === 'null' || name === 'undefined')) {
                _name = '';
            }
            this._Pretreatment(_name, color, size, src, customized);
        }
    },
    options: {
        virtualHost: true,
        pureDataPattern: /^_pure/,
        styleIsolation: 'apply-shared'
    }
});

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */
var Base64 = function () {
    function Base64() {
        _classCallCheck(this, Base64);

        this._keyStr = '';
        this._keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    }

    Base64._utf8Encode = function _utf8Encode(str) {
        var string = str.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if (c > 127 && c < 2048) {
                utftext += String.fromCharCode(c >> 6 | 192);
                utftext += String.fromCharCode(c & 63 | 128);
            } else {
                utftext += String.fromCharCode(c >> 12 | 224);
                utftext += String.fromCharCode(c >> 6 & 63 | 128);
                utftext += String.fromCharCode(c & 63 | 128);
            }
        }
        return utftext;
    };

    Base64._utf8Decode = function _utf8Decode(utftext) {
        var string = '';
        var i = 0;
        var c = 0;
        var c2 = 0;
        var c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if (c > 191 && c < 224) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode((c & 31) << 6 | c2 & 63);
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                i += 3;
            }
        }
        return string;
    };

    Base64.prototype.encode = function encode(inp) {
        var output = '';
        var chr1 = void 0;
        var chr2 = void 0;
        var chr3 = void 0;
        var enc1 = void 0;
        var enc2 = void 0;
        var enc3 = void 0;
        var enc4 = void 0;
        var i = 0;
        var input = Base64._utf8Encode(inp);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = (chr1 & 3) << 4 | chr2 >> 4;
            enc3 = (chr2 & 15) << 2 | chr3 >> 6;
            enc4 = chr3 & 63;
            if (Number.isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (Number.isNaN(chr3)) {
                enc4 = 64;
            }
            output += this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    };

    Base64.prototype.decode = function decode(inp) {
        var output = '';
        var chr1 = void 0;
        var chr2 = void 0;
        var chr3 = void 0;
        var enc1 = void 0;
        var enc2 = void 0;
        var enc3 = void 0;
        var enc4 = void 0;
        var i = 0;
        var input = inp.replace(/[^A-Za-z0-9+/=]/g, '');
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = enc1 << 2 | enc2 >> 4;
            chr2 = (enc2 & 15) << 4 | enc3 >> 2;
            chr3 = (enc3 & 3) << 6 | enc4;
            output += String.fromCharCode(chr1);
            if (enc3 !== 64) {
                output += String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output += String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8Decode(output);
        return output;
    };

    return Base64;
}();

exports.default = Base64;
/* eslint-disable */

/***/ })

/******/ });