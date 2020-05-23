!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}(window,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Toastr=void 0;function o(e){return null!=e&&void 0!==e}let i=(()=>{class e{static getDefaults(){return{closeButton:!1,closeClass:"toast-close-button",closeDuration:0,closeEasing:!1,closeHtml:'<button type="button">&times;</button>',closeMethod:!1,closeOnHover:!0,complete:()=>{},containerId:"toast-container",debug:!1,escapeHtml:!1,extendedTimeOut:1e3,hideDuration:1e3,hideMethod:"fadeOut",iconClass:"toast-info",iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},messageClass:"toast-message",newestOnTop:!0,onClick:()=>{},onCloseClick:e=>{},onHidden:void 0,onShown:void 0,positionClass:"toast-top-right",preventDuplicates:!1,progressBar:!1,progressClass:"toast-progress",rtl:!1,showDuration:300,showMethod:"fadeIn",tapToDismiss:!0,target:"body",timeOut:5e3,titleClass:"toast-title",toastClass:"toast"}}static clear(t,n){const o=e.getOptions();e.containerEl||e.getContainer(o,!1),e.clearToast(t,o,n)||e.clearContainer(o)}static clearContainer(t){if(null==e.containerEl)return;const n=e.containerEl.children;for(let o=n.length-1;o>=0;o--)e.clearToast(n[o],t)}static fadeOut(e,t){e.classList.add("animate__animated","animate__fadeOut"),o(t.hideDuration)&&!isNaN(t.hideDuration)&&e.style.setProperty("--animate-duration",t.hideDuration/1e3+"s")}static removeToast(t){var n,o;e.containerEl||(e.containerEl=e.getContainer()),t.offsetWidth>0&&t.offsetHeight>0||(null===(n=t.parentNode)||void 0===n||n.removeChild(t),0===e.containerEl.children.length&&(null===(o=e.containerEl.parentElement)||void 0===o||o.removeChild(e.containerEl),e.previousToast=void 0))}static clearToast(t,n,o){var i;const s=!(!o||!o.force)&&o.force;if(t&&(s||t!==(null===(i=t.ownerDocument)||void 0===i?void 0:i.activeElement))){if("none"===n.hideMethod)throw new Error("HideMethod not implemented yet");return e.fadeOut(t,{hideDuration:n.hideDuration,hideEasing:n.hideEasing,hideMethod:n.hideMethod,complete:()=>{e.removeToast(t)}}),!0}return!1}static createContainer(t){e.containerEl=document.createElement("div"),e.containerEl.setAttribute("id",t.containerId),e.containerEl.classList.add(t.positionClass);const n=document.querySelector(t.target);null!=n?n.appendChild(e.containerEl):console.warn("Couldn't create toastr container.")}static warning(t,n,o){return e.notify({type:e.toastType.warning,iconClass:e.getOptions().iconClasses.warning,message:t,optionsOverride:o,title:n})}static remove(t){var n;const o=e.getOptions();e.containerEl||e.getContainer(o),t&&t!==(null===(n=t.ownerDocument)||void 0===n?void 0:n.activeElement)?e.removeToast(t):e.containerEl.children.length&&e.removeElement(e.containerEl)}static removeElement(e){o(e)&&o(e.parentNode)&&e.parentNode.removeChild(e)}static info(t,n,o){return e.notify({type:e.toastType.info,iconClass:e.getOptions().iconClasses.info,message:t,optionsOverride:o,title:n})}static subscribe(t){e.listener=t}static success(t,n,o){return e.notify({type:e.toastType.success,iconClass:e.getOptions().iconClasses.success,message:t,optionsOverride:o,title:n})}static error(t,n,o){return e.notify({type:e.toastType.error,iconClass:e.getOptions().iconClasses.error,message:t,optionsOverride:o,title:n})}static getContainer(t,n){return t||(t=e.getOptions()),null!=t.containerId&&(e.containerEl=document.getElementById(t.containerId)),null!=e.containerEl||!0===n&&e.createContainer(t),e.containerEl}static createElementFromHTML(e){const t=document.createElement("div");return t.innerHTML=e.trim(),t.firstChild}static publish(t){e.listener&&e.listener(t)}static notify(t){let n,o=e.getOptions(),i=t.iconClass||o.iconClass;if(void 0!==t.optionsOverride&&(o=Object.assign(Object.assign({},o),t.optionsOverride),i=t.optionsOverride.iconClass||i),((t,n)=>{if(t.preventDuplicates){if(n.message===e.previousToast)return!0;e.previousToast=n.message}return!1})(o,t))return;e.toastId++,e.containerEl=e.getContainer(o,!0);const s=document.createElement("div"),a=document.createElement("div"),r=document.createElement("div"),l=document.createElement("div"),c=e.createElementFromHTML(o.closeHtml),d={intervalId:void 0,hideEta:void 0,maxHideTime:void 0},u={toastId:e.toastId,state:"visible",startTime:new Date,endTime:new Date,options:o,map:t},m=t=>{var i;t&&!1!==o.closeMethod?o.closeMethod:o.hideMethod;const a=t&&0!==o.closeDuration?o.closeDuration:o.hideDuration;(s!==(null===(i=s.ownerDocument)||void 0===i?void 0:i.activeElement)||t)&&(clearTimeout(+(d.intervalId||0)),e.fadeOut(s,{hideDuration:a,complete:()=>{e.removeToast(s),clearTimeout(n),o.onHidden,o.onHidden&&"hidden"!==u.state&&o.onHidden(),u.state="hidden",u.endTime=new Date,e.publish(u)}}))},p=e=>(null==e&&(e=""),e.replace(/&/g,"&amp;").replace(/'/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")),f=()=>{(o.timeOut>0||o.extendedTimeOut>0)&&(n=setTimeout(m,o.extendedTimeOut),d.maxHideTime=o.extendedTimeOut,d.hideEta=(new Date).getTime()+d.maxHideTime)},v=()=>{clearTimeout(n),d.hideEta=0},g=()=>{var e,t;const n=(null!==(e=d.hideEta)&&void 0!==e?e:0-(new Date).getTime())/(null!==(t=null==d?void 0:d.maxHideTime)&&void 0!==t?t:0)*100;l.style.width=n+"%"};var h;return t.iconClass&&s.classList.add(o.toastClass,i),(()=>{if(t.title){let e=t.title;o.escapeHtml&&(e=p(t.title)),a.innerHTML+=e,a.classList.add(o.titleClass),s.appendChild(a)}})(),(()=>{if(t.message){let e=t.message;o.escapeHtml&&(e=p(t.message)),r.innerHTML+=e,r.classList.add(o.messageClass),s.appendChild(r)}})(),o.closeButton&&(c.classList.add(o.closeClass),c.setAttribute("role","button"),s.insertBefore(c,s.firstChild)),o.progressBar&&(l.classList.add(o.progressClass),s.insertBefore(l,s.firstChild)),o.rtl&&s.classList.add("rtl"),o.newestOnTop?e.containerEl.insertBefore(s,e.containerEl.firstChild):e.containerEl.appendChild(s),(()=>{let e="";switch(t.iconClass){case"toast-success":case"toast-info":e="polite";break;default:e="assertive"}s.setAttribute("aria-live",e)})(),(()=>{if("fadeIn"!==o.showMethod)throw new Error("Show method not implemented yet");e.fadeIn(s,{showDuration:o.showDuration,showEasing:o.showEasing,complete:o.onShown}),o.timeOut&&(n=setTimeout(m,o.timeOut),d.maxHideTime=parseFloat(o.timeOut.toString()),d.hideEta=(new Date).getTime()+d.maxHideTime,o.progressBar&&(d.intervalId=setInterval(g,10)))})(),o.closeOnHover&&(s.addEventListener("onmouseover",v),s.addEventListener("onmouseout",f)),!o.onClick&&o.tapToDismiss&&s.addEventListener("click",()=>{m(!1)}),o.closeButton&&c&&s.addEventListener("click",e=>{e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&!0!==e.cancelBubble&&(e.cancelBubble=!0),o.onCloseClick&&o.onCloseClick(e),m(!0)}),(h=o.onClick)&&"[object Function]"==={}.toString.call(h)&&s.addEventListener("click",e=>{o.onCloseClick(e),m(!1)}),e.publish(u),o.debug&&console&&console.log(u),s}static fadeIn(e,t){e.classList.add("animate__animated","animate__fadeIn"),e.style.setProperty("--animate-duration","10s")}static getOptions(){return Object.assign(Object.assign({},e.getDefaults()),e.options)}}return e.version="1.0.0",e.toastId=0,e.toastType={error:"error",info:"info",success:"success",warning:"warning"},e})();t.Toastr=i}])}));
//# sourceMappingURL=toastr-native.js.map