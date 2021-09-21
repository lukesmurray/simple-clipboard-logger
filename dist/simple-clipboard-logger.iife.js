var simpleClipboardLogger=function(e){"use strict";var t=Object.freeze({__proto__:null,consoleEventLogger:function(e){console.log(e)}});function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}window.crypto||(window.crypto=window.msCrypto);var r=Object.freeze({__proto__:null,dateMetadataProvider:function(){return{date:(new Date).toISOString()}},hrefMetadataProvider:function(e,t){return n({},"".concat(t.eventType,"Href"),window.location.href)},selectionIdMetadataProvider:function(){var e;return function(t,n){return"copy"!==n.eventType&&"cut"!==n.eventType||(e=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:21,t="",n=crypto.getRandomValues(new Uint8Array(e));e--;){var r=63&n[e];t+=r<36?r.toString(36):r<62?(r-26).toString(36).toUpperCase():r<63?"_":"-"}return t}()),{selectionId:e}}}});function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),n(this,"metadataProviders",[]),n(this,"eventFilters",[]),n(this,"eventLoggers",[]),this.onCopy=this.onCopy.bind(this),this.onCut=this.onCut.bind(this),this.onPaste=this.onPaste.bind(this)}var t,r,i;return t=e,r=[{key:"addMetadataProvider",value:function(e){this.metadataProviders.push(e)}},{key:"removeMetadataProvider",value:function(e){var t=this.metadataProviders.indexOf(e);t>-1&&this.metadataProviders.splice(t,1)}},{key:"addEventFilter",value:function(e){this.eventFilters.push(e)}},{key:"removeEventFilter",value:function(e){var t=this.eventFilters.indexOf(e);t>-1&&this.eventFilters.splice(t,1)}},{key:"addEventLogger",value:function(e){this.eventLoggers.push(e)}},{key:"removeEventLogger",value:function(e){var t=this.eventLoggers.indexOf(e);t>-1&&this.eventLoggers.splice(t,1)}},{key:"addEventTarget",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.copy,o=void 0===r||r,i=n.cut,a=void 0===i||i,s=n.paste,u=void 0===s||s;o&&e.addEventListener("copy",this.onCopy),a&&e.addEventListener("cut",this.onCut),u&&e.addEventListener("paste",this.onPaste);var v=function(){o&&e.removeEventListener("copy",t.onCopy),a&&e.removeEventListener("cut",t.onCut),u&&e.removeEventListener("paste",t.onPaste)};return v}},{key:"handleCopyOrCut",value:function(e,t){var n;if(!this.isFiltered(e)){var r={eventType:t,data:{"text/plain":null===(n=window.getSelection())||void 0===n?void 0:n.toString()}},o=this.getMetadata(e,r);this.logEvent(a(a({},r),o))}}},{key:"onCopy",value:function(e){this.handleCopyOrCut(e,"copy")}},{key:"onCut",value:function(e){this.handleCopyOrCut(e,"copy")}},{key:"onPaste",value:function(e){var t,n;if(!this.isFiltered(e)){var r={eventType:"paste",data:{"text/html":null===(t=e.clipboardData)||void 0===t?void 0:t.getData("text/html"),"text/plain":null===(n=e.clipboardData)||void 0===n?void 0:n.getData("text/plain")}},o=this.getMetadata(e,r);this.logEvent(a(a({},r),o))}}},{key:"isFiltered",value:function(e){return!this.eventFilters.every((function(t){return t(e)}))}},{key:"getMetadata",value:function(e,t){return this.metadataProviders.reduce((function(t,n){return a(a({},t),"function"==typeof n?n(e,t):n)}),t)}},{key:"logEvent",value:function(e){this.eventLoggers.forEach((function(t){return t(e)}))}}],r&&o(t.prototype,r),i&&o(t,i),e}();return e.SimpleClipboardLogger=s,e.eventLoggers=t,e.metadataProviders=r,Object.defineProperty(e,"__esModule",{value:!0}),e}({});
//# sourceMappingURL=simple-clipboard-logger.iife.js.map
