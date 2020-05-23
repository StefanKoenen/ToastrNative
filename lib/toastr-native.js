(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Toastr", function() { return Toastr; });
const defaultContainerId = "toast-container";
function isNotNullOrUndefined(value) {
    return value != null && typeof value !== "undefined";
}
function isFunction(functionToCheck) {
    return (functionToCheck && {}.toString.call(functionToCheck) === "[object Function]");
}
let Toastr = (() => {
    class Toastr {
        static getDefaults() {
            return {
                closeButton: false,
                closeClass: "toast-close-button",
                closeDuration: 0,
                closeEasing: false,
                closeHtml: '<button type="button">&times;</button>',
                closeMethod: false,
                closeOnHover: true,
                complete: () => { },
                containerId: defaultContainerId,
                debug: false,
                escapeHtml: false,
                extendedTimeOut: 1000,
                hideDuration: 1000,
                hideMethod: "fadeOut",
                iconClass: "toast-info",
                iconClasses: {
                    error: "toast-error",
                    info: "toast-info",
                    success: "toast-success",
                    warning: "toast-warning",
                },
                messageClass: "toast-message",
                newestOnTop: true,
                onClick: () => { },
                onCloseClick: (event) => { },
                onHidden: undefined,
                onShown: undefined,
                positionClass: "toast-top-right",
                preventDuplicates: false,
                progressBar: false,
                progressClass: "toast-progress",
                rtl: false,
                showDuration: 300,
                showMethod: "fadeIn",
                tapToDismiss: true,
                target: "body",
                timeOut: 5000,
                titleClass: "toast-title",
                toastClass: "toast",
            };
        }
        static clear(toastElement, clearOptions) {
            const options = Toastr.getOptions();
            if (!Toastr.containerEl) {
                Toastr.getContainer(options, false);
            }
            if (!Toastr.clearToast(toastElement, options, clearOptions)) {
                Toastr.clearContainer(options);
            }
        }
        static clearContainer(options) {
            if (Toastr.containerEl == null)
                return;
            var toastsToClear = Toastr.containerEl.children;
            for (var i = toastsToClear.length - 1; i >= 0; i--) {
                Toastr.clearToast(toastsToClear[i], options);
            }
        }
        static fadeOut(toastElement, toastr) {
            toastElement.classList.add("animate__animated", "animate__fadeOut");
            if (isNotNullOrUndefined(toastr.hideDuration) &&
                !isNaN(toastr.hideDuration)) {
                toastElement.style.setProperty("--animate-duration", toastr.hideDuration / 1000 + "s");
            }
        }
        static removeToast(toastElement) {
            var _a, _b;
            if (!Toastr.containerEl) {
                Toastr.containerEl = Toastr.getContainer();
            }
            if (toastElement.offsetWidth > 0 && toastElement.offsetHeight > 0) {
                return;
            }
            (_a = toastElement.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(toastElement);
            if (Toastr.containerEl.children.length === 0) {
                (_b = Toastr.containerEl.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(Toastr.containerEl);
                Toastr.previousToast = undefined;
            }
        }
        static clearToast(toastElement, options, clearOptions) {
            var _a;
            var force = clearOptions && clearOptions.force ? clearOptions.force : false;
            if (toastElement &&
                (force || toastElement !== ((_a = toastElement.ownerDocument) === null || _a === void 0 ? void 0 : _a.activeElement))) {
                if (options.hideMethod !== "none") {
                    Toastr.fadeOut(toastElement, {
                        hideDuration: options.hideDuration,
                        hideEasing: options.hideEasing,
                        hideMethod: options.hideMethod,
                        complete: () => {
                            Toastr.removeToast(toastElement);
                        },
                    });
                }
                else {
                    throw new Error("HideMethod not implemented yet");
                }
                return true;
            }
            return false;
        }
        static createContainer(options) {
            Toastr.containerEl = document.createElement("div");
            Toastr.containerEl.setAttribute("id", options.containerId);
            Toastr.containerEl.classList.add(options.positionClass);
            const targetEl = document.querySelector(options.target);
            if (targetEl != null) {
                targetEl.appendChild(Toastr.containerEl);
            }
            else {
                console.warn(`Couldn't create toastr container.`);
            }
        }
        static warning(message, title, optionsOverride) {
            return Toastr.notify({
                type: Toastr.toastType.warning,
                iconClass: Toastr.getOptions().iconClasses.warning,
                message: message,
                optionsOverride: optionsOverride,
                title: title,
            });
        }
        static remove(toastElement) {
            var _a;
            var options = Toastr.getOptions();
            if (!Toastr.containerEl) {
                Toastr.getContainer(options);
            }
            if (toastElement &&
                toastElement !== ((_a = toastElement.ownerDocument) === null || _a === void 0 ? void 0 : _a.activeElement)) {
                Toastr.removeToast(toastElement);
                return;
            }
            if (Toastr.containerEl.children.length) {
                Toastr.removeElement(Toastr.containerEl);
            }
        }
        static removeElement(el) {
            el && el.parentNode && el.parentNode.removeChild(el);
        }
        static info(message, title, optionsOverride) {
            return Toastr.notify({
                type: Toastr.toastType.info,
                iconClass: Toastr.getOptions().iconClasses.info,
                message: message,
                optionsOverride: optionsOverride,
                title: title,
            });
        }
        static subscribe(callback) {
            Toastr.listener = callback;
        }
        static success(message, title, optionsOverride) {
            return Toastr.notify({
                type: Toastr.toastType.success,
                iconClass: Toastr.getOptions().iconClasses.success,
                message: message,
                optionsOverride: optionsOverride,
                title: title,
            });
        }
        static error(message, title, optionsOverride) {
            return Toastr.notify({
                type: Toastr.toastType.error,
                iconClass: Toastr.getOptions().iconClasses.error,
                message: message,
                optionsOverride: optionsOverride,
                title: title,
            });
        }
        static getContainer(options, create) {
            if (!options) {
                options = Toastr.getOptions();
            }
            if (options.containerId != null) {
                Toastr.containerEl = (document.getElementById(options.containerId));
            }
            if (Toastr.containerEl != null) {
                return Toastr.containerEl;
            }
            if (create === true) {
                Toastr.createContainer(options);
            }
            return Toastr.containerEl;
        }
        static createElementFromHTML(htmlString) {
            var div = document.createElement("div");
            div.innerHTML = htmlString.trim();
            return div.firstChild;
        }
        static publish(args) {
            if (!Toastr.listener) {
                return;
            }
            Toastr.listener(args);
        }
        static notify(map) {
            const shouldExit = (options, map) => {
                if (options.preventDuplicates) {
                    if (map.message === Toastr.previousToast) {
                        return true;
                    }
                    else {
                        Toastr.previousToast = map.message;
                    }
                }
                return false;
            };
            let options = Toastr.getOptions();
            let iconClass = map.iconClass || options.iconClass;
            if (typeof map.optionsOverride !== "undefined") {
                options = Object.assign(options, map.optionsOverride);
                iconClass = map.optionsOverride.iconClass || iconClass;
            }
            if (shouldExit(options, map)) {
                return;
            }
            Toastr.toastId++;
            Toastr.containerEl = Toastr.getContainer(options, true);
            let intervalId = undefined;
            let toastElement = document.createElement("div");
            let $titleElement = document.createElement("div");
            let $messageElement = document.createElement("div");
            let progressElement = document.createElement("div");
            let closeElement = Toastr.createElementFromHTML(options.closeHtml);
            let progressBar = {
                intervalId: undefined,
                hideEta: undefined,
                maxHideTime: undefined,
            };
            let response = {
                toastId: Toastr.toastId,
                state: "visible",
                startTime: new Date(),
                endTime: new Date(),
                options: options,
                map: map,
            };
            const hideToast = (override) => {
                var _a;
                var method = override && options.closeMethod !== false
                    ? options.closeMethod
                    : options.hideMethod;
                var hideDuration = override && options.closeDuration !== 0
                    ? options.closeDuration
                    : options.hideDuration;
                if (toastElement === ((_a = toastElement.ownerDocument) === null || _a === void 0 ? void 0 : _a.activeElement) &&
                    !override) {
                    return;
                }
                clearTimeout(+(progressBar.intervalId || 0));
                Toastr.fadeOut(toastElement, {
                    hideDuration: hideDuration,
                    complete: function () {
                        Toastr.removeToast(toastElement);
                        clearTimeout(intervalId);
                        if (typeof options.onHidden !== "undefined") {
                        }
                        if (options.onHidden && response.state !== "hidden") {
                            options.onHidden();
                        }
                        response.state = "hidden";
                        response.endTime = new Date();
                        Toastr.publish(response);
                    },
                });
            };
            const displayToast = () => {
                if (options.showMethod === "fadeIn") {
                    Toastr.fadeIn(toastElement, {
                        showDuration: options.showDuration,
                        showEasing: options.showEasing,
                        complete: options.onShown,
                    });
                }
                else {
                    throw new Error("Show method not implemented yet");
                }
                if (options.timeOut) {
                    intervalId = setTimeout(hideToast, options.timeOut);
                    progressBar.maxHideTime = parseFloat(options.timeOut.toString());
                    progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                    if (options.progressBar) {
                        progressBar.intervalId = setInterval(updateProgress, 10);
                    }
                }
            };
            const handleEvents = () => {
                if (options.closeOnHover) {
                    toastElement.addEventListener("onmouseover", stickAround);
                    toastElement.addEventListener("onmouseout", delayedHideToast);
                }
                if (!options.onClick && options.tapToDismiss) {
                    toastElement.addEventListener("click", () => {
                        hideToast(false);
                    });
                }
                if (options.closeButton && closeElement) {
                    toastElement.addEventListener("click", function (event) {
                        if (event.stopPropagation) {
                            event.stopPropagation();
                        }
                        else if (event.cancelBubble !== undefined &&
                            event.cancelBubble !== true) {
                            event.cancelBubble = true;
                        }
                        if (options.onCloseClick) {
                            options.onCloseClick(event);
                        }
                        hideToast(true);
                    });
                }
                if (isFunction(options.onClick)) {
                    toastElement.addEventListener("click", function (event) {
                        options.onCloseClick(event);
                        hideToast(false);
                    });
                }
            };
            const escapeHtml = (source) => {
                if (source == null) {
                    source = "";
                }
                return source
                    .replace(/&/g, "&amp;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#39;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");
            };
            const setAria = () => {
                var ariaValue = "";
                switch (map.iconClass) {
                    case "toast-success":
                    case "toast-info":
                        ariaValue = "polite";
                        break;
                    default:
                        ariaValue = "assertive";
                }
                toastElement.setAttribute("aria-live", ariaValue);
            };
            const setIcon = () => {
                if (map.iconClass) {
                    toastElement.classList.add(options.toastClass, iconClass);
                }
            };
            const setSequence = () => {
                if (options.newestOnTop) {
                    Toastr.containerEl.insertBefore(toastElement, Toastr.containerEl.firstChild);
                }
                else {
                    Toastr.containerEl.appendChild(toastElement);
                }
            };
            const setTitle = () => {
                if (map.title) {
                    var suffix = map.title;
                    if (options.escapeHtml) {
                        suffix = escapeHtml(map.title);
                    }
                    $titleElement.innerHTML += suffix;
                    $titleElement.classList.add(options.titleClass);
                    toastElement.appendChild($titleElement);
                }
            };
            const setMessage = () => {
                if (map.message) {
                    var suffix = map.message;
                    if (options.escapeHtml) {
                        suffix = escapeHtml(map.message);
                    }
                    $messageElement.innerHTML += suffix;
                    $messageElement.classList.add(options.messageClass);
                    toastElement.appendChild($messageElement);
                }
            };
            const setCloseButton = () => {
                if (options.closeButton) {
                    closeElement.classList.add(options.closeClass);
                    closeElement.setAttribute("role", "button");
                    toastElement.insertBefore(closeElement, toastElement.firstChild);
                }
            };
            const setProgressBar = () => {
                if (options.progressBar) {
                    progressElement.classList.add(options.progressClass);
                    toastElement.insertBefore(progressElement, toastElement.firstChild);
                }
            };
            const setRTL = () => {
                if (options.rtl) {
                    toastElement.classList.add("rtl");
                }
            };
            const delayedHideToast = () => {
                if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                    intervalId = setTimeout(hideToast, options.extendedTimeOut);
                    progressBar.maxHideTime = options.extendedTimeOut;
                    progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                }
            };
            const stickAround = () => {
                clearTimeout(intervalId);
                progressBar.hideEta = 0;
            };
            const updateProgress = () => {
                var _a, _b;
                var percentage = (((_a = progressBar.hideEta) !== null && _a !== void 0 ? _a : 0 - new Date().getTime()) /
                    ((_b = progressBar === null || progressBar === void 0 ? void 0 : progressBar.maxHideTime) !== null && _b !== void 0 ? _b : 0)) *
                    100;
                progressElement.style.width = percentage + "%";
            };
            const personalizeToast = () => {
                setIcon();
                setTitle();
                setMessage();
                setCloseButton();
                setProgressBar();
                setRTL();
                setSequence();
                setAria();
            };
            personalizeToast();
            displayToast();
            handleEvents();
            Toastr.publish(response);
            if (options.debug && console) {
                console.log(response);
            }
            return toastElement;
        }
        static fadeIn(toastElement, arg1) {
            toastElement.classList.add("animate__animated", "animate__fadeIn");
            toastElement.style.setProperty("--animate-duration", "10s");
        }
        static getOptions() {
            return Object.assign({}, Toastr.getDefaults(), Toastr.options);
        }
    }
    Toastr.version = "1.0.0";
    Toastr.toastId = 0;
    Toastr.toastType = {
        error: "error",
        info: "info",
        success: "success",
        warning: "warning",
    };
    return Toastr;
})();



/***/ })
/******/ ]);
});
//# sourceMappingURL=toastr-native.js.map