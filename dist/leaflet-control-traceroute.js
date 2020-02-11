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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/Control.Traceroute.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/dist/cjs.js!./css/trace.css":
/*!**************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!./css/trace.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".leaflet-control-traceroute {\n  font-family: \"Lucida Console\", Monaco, monospace;\n  font-weight: bold;\n  font-size: 22px;\n  filter: saturate(0%);\n}\n\n.leaflet-control-traceroute-icon {\n  display: inline-block;\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n  text-align: center;\n  vertical-align: middle;\n\n  font-size: xx-large;\n  text-shadow: 4px 4px 3px grey;\n}\n\n/* Waypoint icon */\n.leaflet-control-traceroute-point:before {\n  content: \"⊙\";\n  /* content: \"◯\"; */\n}\n\n/* Bearing Target icon */\n.leaflet-control-traceroute-losange:before {\n  content: \"◇\";\n}\n\n/* Midpoint icon */\n.leaflet-control-traceroute-arrow {\n  transform: rotateZ(-90deg);\n}\n.leaflet-control-traceroute-arrow:before {\n  content: \"➤\";\n  /* content: \"➢\"; */\n}\n\n/* Tracker icon */\n.leaflet-control-traceroute-airplane {\n  transform: rotateZ(-90deg);\n}\n.leaflet-control-traceroute-airplane:before {\n  content: \"✈\";\n}\n\n/* Alternative tracker icon */\n.leaflet-control-traceroute-helicopter:before {\n  content: \"✇\";\n  /*content: \"⊛\"; */\n}\n\n@keyframes revolution {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n.leaflet-control-traceroute-helicopter {\n  animation-name: revolution;\n  animation-duration: 1s;\n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n}\n.leaflet-control-traceroute-helicopter:hover{\n  animation-play-state: paused;\n}\n", ""]);


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "../node_modules/leaflet-rotatedmarker/leaflet.rotatedMarker.js":
/*!**********************************************************************!*\
  !*** ../node_modules/leaflet-rotatedmarker/leaflet.rotatedMarker.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(L) {(function() {
    // save these original methods before they are overwritten
    var proto_initIcon = L.Marker.prototype._initIcon;
    var proto_setPos = L.Marker.prototype._setPos;

    var oldIE = (L.DomUtil.TRANSFORM === 'msTransform');

    L.Marker.addInitHook(function () {
        var iconOptions = this.options.icon && this.options.icon.options;
        var iconAnchor = iconOptions && this.options.icon.options.iconAnchor;
        if (iconAnchor) {
            iconAnchor = (iconAnchor[0] + 'px ' + iconAnchor[1] + 'px');
        }
        this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center bottom' ;
        this.options.rotationAngle = this.options.rotationAngle || 0;

        // Ensure marker keeps rotated during dragging
        this.on('drag', function(e) { e.target._applyRotation(); });
    });

    L.Marker.include({
        _initIcon: function() {
            proto_initIcon.call(this);
        },

        _setPos: function (pos) {
            proto_setPos.call(this, pos);
            this._applyRotation();
        },

        _applyRotation: function () {
            if(this.options.rotationAngle) {
                this._icon.style[L.DomUtil.TRANSFORM+'Origin'] = this.options.rotationOrigin;

                if(oldIE) {
                    // for IE 9, use the 2D rotation
                    this._icon.style[L.DomUtil.TRANSFORM] = 'rotate(' + this.options.rotationAngle + 'deg)';
                } else {
                    // for modern browsers, prefer the 3D accelerated version
                    this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
                }
            }
        },

        setRotationAngle: function(angle) {
            this.options.rotationAngle = angle;
            this.update();
            return this;
        },

        setRotationOrigin: function(origin) {
            this.options.rotationOrigin = origin;
            this.update();
            return this;
        }
    });
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "../node_modules/leaflet.geodesic/dist/leaflet.geodesic.umd.min.js":
/*!*************************************************************************!*\
  !*** ../node_modules/leaflet.geodesic/dist/leaflet.geodesic.umd.min.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! Leaflet.Geodesic 2.5.0 - (c) Henry Thasler - https://github.com/henrythasler/Leaflet.Geodesic */
!function(t,n){ true?n(exports,__webpack_require__(/*! leaflet */ "leaflet")):undefined}(this,(function(t,n){"use strict";n=n&&n.hasOwnProperty("default")?n.default:n;
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
var i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var i in n)n.hasOwnProperty(i)&&(t[i]=n[i])})(t,n)};function e(t,n){function e(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}var s=function(){return(s=Object.assign||function(t){for(var n,i=1,e=arguments.length;i<e;i++)for(var s in n=arguments[i])Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s]);return t}).apply(this,arguments)};function a(){for(var t=0,n=0,i=arguments.length;n<i;n++)t+=arguments[n].length;var e=Array(t),s=0;for(n=0;n<i;n++)for(var a=arguments[n],o=0,r=a.length;o<r;o++,s++)e[s]=a[o];return e}var o=function(){function t(t){this.options={wrap:!0,steps:3},this.ellipsoid={a:6378137,b:6356752.3142,f:1/298.257223563},this.options=s(s({},this.options),t)}return t.prototype.toRadians=function(t){return t*Math.PI/180},t.prototype.toDegrees=function(t){return 180*t/Math.PI},t.prototype.wrap360=function(t){return 0<=t&&t<360?t:(t%360+360)%360},t.prototype.wrap180=function(t){return-180<=t&&t<180?t:((t+180)%360+360)%360-180},t.prototype.direct=function(t,n,i,e){void 0===e&&(e=100);var s=this.toRadians(t.lat),a=this.toRadians(t.lng),o=this.toRadians(n),r=i,h=1e3*Number.EPSILON,c=this.ellipsoid,p=c.a,u=c.b,l=c.f,f=Math.sin(o),g=Math.cos(o),d=(1-l)*Math.tan(s),M=1/Math.sqrt(1+d*d),y=d*M,L=Math.atan2(d,g),v=M*f,m=1-v*v,w=m*(p*p-u*u)/(u*u),b=1+w/16384*(4096+w*(w*(320-175*w)-768)),E=w/1024*(256+w*(w*(74-47*w)-128)),O=r/(u*b),P=null,x=null,R=null,S=null,D=0;do{R=Math.cos(2*L+O),S=O,O=r/(u*b)+E*(P=Math.sin(O))*(R+E/4*((x=Math.cos(O))*(2*R*R-1)-E/6*R*(4*P*P-3)*(4*R*R-3)))}while(Math.abs(O-S)>h&&++D<e);if(D>=e)throw new EvalError("Direct vincenty formula failed to converge after "+e+" iterations (start="+t.lat+"/"+t.lng+"; bearing="+n+"; distance="+i+")");var G=y*P-M*x*g,N=Math.atan2(y*x+M*P*g,(1-l)*Math.sqrt(v*v+G*G)),j=l/16*m*(4+l*(4-3*m)),k=a+(Math.atan2(P*f,M*x-y*P*g)-(1-j)*l*v*(O+j*P*(R+j*x*(2*R*R-1)))),_=Math.atan2(v,-G);return{lat:this.toDegrees(N),lng:this.toDegrees(k),bearing:this.wrap360(this.toDegrees(_))}},t.prototype.inverse=function(t,i,e,s){void 0===e&&(e=100),void 0===s&&(s=!0);var a=t,o=i,r=this.toRadians(a.lat),h=this.toRadians(a.lng),c=this.toRadians(o.lat),p=this.toRadians(o.lng),u=Math.PI,l=Number.EPSILON,f=this.ellipsoid,g=f.a,d=f.b,M=f.f,y=p-h,L=(1-M)*Math.tan(r),v=1/Math.sqrt(1+L*L),m=L*v,w=(1-M)*Math.tan(c),b=1/Math.sqrt(1+w*w),E=w*b,O=Math.abs(y)>u/2||Math.abs(c-r)>u/2,P=y,x=null,R=null,S=O?u:0,D=0,G=O?-1:1,N=null,j=1,k=null,_=1,q=null,I=null,A=0;do{if(N=b*(x=Math.sin(P))*(b*x)+(v*E-m*b*(R=Math.cos(P)))*(v*E-m*b*R),Math.abs(N)<l)break;if(G=m*E+v*b*R,I=P,P=y+(1-(q=M/16*(_=1-(k=v*b*x/(D=Math.sqrt(N)))*k)*(4+M*(4-3*_))))*M*k*((S=Math.atan2(D,G))+q*D*((j=0!==_?G-2*m*E/_:0)+q*G*(2*j*j-1))),(O?Math.abs(P)-u:Math.abs(P))>u)throw new EvalError("λ > π")}while(Math.abs(P-I)>1e-12&&++A<e);if(A>=e){if(s)return this.inverse(t,new n.LatLng(i.lat,i.lng-.01),e,s);throw new EvalError("Inverse vincenty formula failed to converge after "+e+" iterations (start="+t.lat+"/"+t.lng+"; dest="+i.lat+"/"+i.lng+")")}var J=_*(g*g-d*d)/(d*d),T=J/1024*(256+J*(J*(74-47*J)-128)),B=d*(1+J/16384*(4096+J*(J*(320-175*J)-768)))*(S-T*D*(j+T/4*(G*(2*j*j-1)-T/6*j*(4*D*D-3)*(4*j*j-3)))),C=Math.abs(N)<l?0:Math.atan2(b*x,v*E-m*b*R),U=Math.abs(N)<l?u:Math.atan2(v*x,-m*b+v*E*R);return{distance:B,initialBearing:Math.abs(B)<l?NaN:this.wrap360(this.toDegrees(C)),finalBearing:Math.abs(B)<l?NaN:this.wrap360(this.toDegrees(U))}},t.prototype.intersection=function(t,i,e,s){var a=this.toRadians(t.lat),o=this.toRadians(t.lng),r=this.toRadians(e.lat),h=this.toRadians(e.lng),c=this.toRadians(i),p=this.toRadians(s),u=r-a,l=h-o,f=Math.PI,g=Number.EPSILON,d=2*Math.asin(Math.sqrt(Math.sin(u/2)*Math.sin(u/2)+Math.cos(a)*Math.cos(r)*Math.sin(l/2)*Math.sin(l/2)));if(Math.abs(d)<g)return t;var M=(Math.sin(r)-Math.sin(a)*Math.cos(d))/(Math.sin(d)*Math.cos(a)),y=(Math.sin(a)-Math.sin(r)*Math.cos(d))/(Math.sin(d)*Math.cos(r)),L=Math.acos(Math.min(Math.max(M,-1),1)),v=Math.acos(Math.min(Math.max(y,-1),1)),m=c-(Math.sin(h-o)>0?L:2*f-L),w=(Math.sin(h-o)>0?2*f-v:v)-p;if(0===Math.sin(m)&&0===Math.sin(w))return null;if(Math.sin(m)*Math.sin(w)<0)return null;var b=-Math.cos(m)*Math.cos(w)+Math.sin(m)*Math.sin(w)*Math.cos(d),E=Math.atan2(Math.sin(d)*Math.sin(m)*Math.sin(w),Math.cos(w)+Math.cos(m)*b),O=Math.asin(Math.sin(a)*Math.cos(E)+Math.cos(a)*Math.sin(E)*Math.cos(c));if(isNaN(O))return null;var P=o+Math.atan2(Math.sin(c)*Math.sin(E)*Math.cos(a),Math.cos(E)-Math.sin(a)*Math.sin(O));return new n.LatLng(this.toDegrees(O),this.toDegrees(P))},t.prototype.midpoint=function(t,i){var e=this.toRadians(t.lat),s=this.toRadians(t.lng),a=this.toRadians(i.lat),o=this.toRadians(i.lng-t.lng),r=Math.cos(e),h=0,c=Math.sin(e),p={x:r+Math.cos(a)*Math.cos(o),y:h+Math.cos(a)*Math.sin(o),z:c+Math.sin(a)},u=Math.atan2(p.z,Math.sqrt(p.x*p.x+p.y*p.y)),l=s+Math.atan2(p.y,p.x);return new n.LatLng(this.toDegrees(u),this.toDegrees(l))},t}(),r=function(){function t(t){this.geodesic=new o,this.options={wrap:!0,steps:3},this.options=s(s({},this.options),t),this.steps=void 0===this.options.steps?3:this.options.steps}return t.prototype.recursiveMidpoint=function(t,n,i){var e=[t,n],s=this.geodesic.midpoint(t,n);return this.options.wrap&&(s.lng=this.geodesic.wrap180(s.lng)),i>0?(e.splice.apply(e,a([0,1],this.recursiveMidpoint(t,s,i-1))),e.splice.apply(e,a([e.length-2,2],this.recursiveMidpoint(s,n,i-1)))):e.splice(1,0,s),e},t.prototype.line=function(t,n){return this.recursiveMidpoint(t,n,Math.min(8,this.steps))},t.prototype.circle=function(t,i){for(var e=[],s=0;s<this.steps+1;s++){var a=this.geodesic.direct(t,360/this.steps*s,i);e.push(new n.LatLng(a.lat,a.lng))}return e},t.prototype.multiLineString=function(t){var n=this,i=[];return t.forEach((function(t){for(var e=[],s=1;s<t.length;s++)e.splice.apply(e,a([e.length-1,1],n.line(t[s-1],t[s])));i.push(e)})),i},t.prototype.lineString=function(t){return this.multiLineString([t])[0]},t.prototype.splitLine=function(t,i){var e={point:new n.LatLng(89,-180),bearing:180},s={point:new n.LatLng(89,180),bearing:180};t.lng=Math.max(-179.9,t.lng),t.lng=Math.min(179.9,t.lng),i.lng=Math.max(-179.9,i.lng),i.lng=Math.min(179.9,i.lng);var a,o=this.geodesic.inverse(t,i);if((a=o.initialBearing>180?this.geodesic.intersection(t,o.initialBearing,e.point,e.bearing):this.geodesic.intersection(t,o.initialBearing,s.point,s.bearing))&&this.geodesic.inverse(t,a).distance<o.distance)return a.lng<-179.9999?[[t,a],[new n.LatLng(a.lat,a.lng+360),i]]:a.lng>179.9999?[[t,a],[new n.LatLng(a.lat,a.lng-360),i]]:[[t,a],[a,i]];return[[t,i]]},t.prototype.splitMultiLineString=function(t){var n=this,i=[];return t.forEach((function(t){for(var e=[t[0]],s=1;s<t.length;s++){var a=n.splitLine(t[s-1],t[s]);1===a.length?e.push(t[s]):(e.push(a[0][1]),i.push(e),e=a[1])}i.push(e)})),i},t.prototype.distance=function(t,n){return this.geodesic.inverse(t,n).distance},t.prototype.multilineDistance=function(t){var n=this,i=[];return t.forEach((function(t){for(var e=0,s=1;s<t.length;s++)e+=n.distance(t[s-1],t[s]);i.push(e)})),i},t.prototype.updateStatistics=function(t,n){var i={};return i.distanceArray=this.multilineDistance(t),i.totalDistance=i.distanceArray.reduce((function(t,n){return t+n}),0),i.points=0,t.forEach((function(t){i.points+=t.reduce((function(t){return t+1}),0)})),i.vertices=0,n.forEach((function(t){i.vertices+=t.reduce((function(t){return t+1}),0)})),i},t}();function h(t){return"object"==typeof t&&null!==t&&"lat"in t&&"lng"in t&&"number"==typeof t.lat&&"number"==typeof t.lng}function c(t){return t instanceof Array&&"number"==typeof t[0]&&"number"==typeof t[1]}function p(t){return t instanceof n.LatLng||(!!c(t)||!!h(t))}function u(t){if(t instanceof n.LatLng)return t;if(c(t))return new n.LatLng(t[0],t[1]);if(h(t))return new n.LatLng(t.lat,t.lng);throw new Error("L.LatLngExpression expected. Unknown object found.")}var l=function(t){function i(i,e){var a=t.call(this,[],e)||this;return a.defaultOptions={wrap:!0,steps:3},a.statistics={},a.points=[],n.Util.setOptions(a,s(s({},a.defaultOptions),e)),a.geom=new r(a.options),void 0!==i&&a.setLatLngs(i),a}return e(i,t),i.prototype.updateGeometry=function(){var n=[];if(this.points.length>0&&this.points[0].length>=2)if(n=this.geom.multiLineString(this.points),this.options.wrap){var i=this.geom.splitMultiLineString(n);t.prototype.setLatLngs.call(this,i)}else t.prototype.setLatLngs.call(this,n);else t.prototype.setLatLngs.call(this,n);this.statistics=this.geom.updateStatistics(this.points,n)},i.prototype.setLatLngs=function(t){return this.points=function(t){for(var n=[],i=function(i){if(p(i)){var e=[];return t.forEach((function(t){e.push(u(t))})),n.push(e),"break"}if(!(i instanceof Array))throw new Error("L.LatLngExpression[] | L.LatLngExpression[][] expected. Unknown object found.");if(!p(i[0]))throw new Error("L.LatLngExpression[] | L.LatLngExpression[][] expected. Unknown object found.");var s=[];i.forEach((function(t){s.push(u(t))})),n.push(s)},e=0,s=t;e<s.length;e++){if("break"===i(s[e]))break}return n}(t),this.updateGeometry(),this},i.prototype.addLatLng=function(t,n){var i=u(t);return 0===this.points.length?this.points.push([i]):void 0===n?this.points[this.points.length-1].push(i):n.push(i),this.updateGeometry(),this},i.prototype.fromGeoJson=function(t){var i=[],e=[];return"FeatureCollection"===t.type?e=t.features:"Feature"===t.type?e=[t]:["MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon"].includes(t.type)?e=[{type:"Feature",geometry:t,properties:{}}]:console.log('[Leaflet.Geodesic] fromGeoJson() - Type "'+t.type+'" not supported.'),e.forEach((function(t){switch(t.geometry.type){case"MultiPoint":case"LineString":i=a(i,[n.GeoJSON.coordsToLatLngs(t.geometry.coordinates,0)]);break;case"MultiLineString":case"Polygon":i=a(i,n.GeoJSON.coordsToLatLngs(t.geometry.coordinates,1));break;case"MultiPolygon":t.geometry.coordinates.forEach((function(t){i=a(i,n.GeoJSON.coordsToLatLngs(t,1))}));break;default:console.log('[Leaflet.Geodesic] fromGeoJson() - Type "'+t.geometry.type+'" not supported.')}})),i.length&&this.setLatLngs(i),this},i.prototype.distance=function(t,n){return this.geom.distance(u(t),u(n))},i}(n.Polyline),f=function(t){function i(i,e){var a=t.call(this,[],e)||this;a.defaultOptions={wrap:!0,steps:24,fill:!0,noClip:!0},a.statistics={},n.Util.setOptions(a,s(s({},a.defaultOptions),e));var o=a.options;return a.radius=void 0===o.radius?1e6:o.radius,a.center=void 0===i?new n.LatLng(0,0):u(i),a.geom=new r(a.options),a.update(),a}return e(i,t),i.prototype.update=function(){var t=this.geom.circle(this.center,this.radius);this.statistics=this.geom.updateStatistics([[this.center]],[t]),this.statistics.totalDistance=this.geom.multilineDistance([t]).reduce((function(t,n){return t+n}),0),this.setLatLngs(t)},i.prototype.distanceTo=function(t){var n=u(t);return this.geom.distance(this.center,n)},i.prototype.setLatLng=function(t){this.center=u(t),this.update()},i.prototype.setRadius=function(t){this.radius=t,this.update()},i}(n.Polyline);n.Geodesic=l,n.geodesic=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return new(l.bind.apply(l,a([void 0],t)))},n.GeodesicCircle=f,n.geodesiccircle=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return new(f.bind.apply(f,a([void 0],t)))},t.GeodesicCircleClass=f,t.GeodesicLine=l,Object.defineProperty(t,"__esModule",{value:!0})}));


/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),

/***/ "./css/trace.css":
/*!***********************!*\
  !*** ./css/trace.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./trace.css */ "../node_modules/css-loader/dist/cjs.js!./css/trace.css");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ "./js/Control.Traceroute.js":
/*!**********************************!*\
  !*** ./js/Control.Traceroute.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(L) {/* harmony import */ var _LayerGroup_Route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LayerGroup.Route */ "./js/LayerGroup.Route.js");
/* harmony import */ var _Handler_Traceroute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Handler.Traceroute */ "./js/Handler.Traceroute.js");
/* harmony import */ var _Handler_Traceroute__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Handler_Traceroute__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Handler_RouteBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Handler.RouteBase */ "./js/Handler.RouteBase.js");
/* harmony import */ var _Handler_BearingBase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Handler.BearingBase */ "./js/Handler.BearingBase.js");
/* harmony import */ var _Handler_TrackBase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Handler.TrackBase */ "./js/Handler.TrackBase.js");
/* harmony import */ var _Handler_ClearBase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Handler.ClearBase */ "./js/Handler.ClearBase.js");
/* harmony import */ var _Handler_ClearBase__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Handler_ClearBase__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var leaflet_geodesic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! leaflet.geodesic */ "../node_modules/leaflet.geodesic/dist/leaflet.geodesic.umd.min.js");
/* harmony import */ var leaflet_geodesic__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(leaflet_geodesic__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _css_trace_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../css/trace.css */ "./css/trace.css");
/* harmony import */ var _css_trace_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_css_trace_css__WEBPACK_IMPORTED_MODULE_7__);
// import L from 'leaflet';










L.Control.Traceroute = L.Control.extend({
  options: {
    tools: {
      route: {
        icon: '☡',// ⥉
        title: 'Start a route',
        handler: L.Handler.RouteBase,
        waypoint: {
          icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<span class='leaflet-control-traceroute-point'></span>", iconAnchor: [20, 18], iconSize:[40, 40]}),
          popup: p => {
            return L.Util.template("<strong>in :</strong> {in}<br /><strong>out :</strong> {out}<br /><strong>distance :</strong> +{distance}<br /><strong>Total distance :</strong> {totalDistance}", L.Control.Traceroute.extractData(p, 'waypoint'))
          },
          tooltip: p => {
            return L.Util.template("<strong>in :</strong> {in}<br /><strong>out :</strong> {out}<br /><strong>distance :</strong> +{distance}", L.Control.Traceroute.extractData(p, 'waypoint'))
          },
        },
        midpoint: {
          icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<div class='leaflet-control-traceroute-arrow'></div>", iconAnchor: [20, 18], iconSize:[40, 40]}),
          tooltip: 'Click to insert a waypoints here',
          opacity: 0.5
        },
        trace: { weight: 5, opacity: 0.5, color: 'black' },
        pointer: { dashArray: '8' },
      },
      bearing: {
        icon: '∡',// 🧭∢∠
        title: 'Radio Navigation',
        handler: L.Handler.BearingBase,
        marker: {
          icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<span class='leaflet-control-traceroute-losange'></span>", iconAnchor: [20, 18], iconSize:[40, 40]}),
          tooltip: p => {
            return L.Util.template("<strong>QDR :</strong> {qdr}<br /><strong>QDM :</strong> {qdm}<br /><strong>distance :</strong> +{distance}", L.Control.Traceroute.extractData(p, 'bearing'))
          },
        },
        trace: { dashArray: '5,5,1,5', opacity: 0.3, color: 'grey', },
        pointer: { dashArray: '8' }
      },
      track: {
        icon: '✈',// ✇
        title: 'Track Position',
        handler: L.Handler.TrackBase,
        marker: {
          icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<div class='leaflet-control-traceroute-airplane'></div>", iconAnchor: [20, 18], iconSize:[40, 40]}),
          tooltip: p => {
            return L.Util.template("<strong>accuracy :</strong> {accuracy}<br /><strong>altitude (+/-{altitudeAccuracy}):</strong> {altitude} ({vario}) <br /><strong>heading :</strong> {heading} ({bearing})<br /><strong>speed :</strong> {speed} ({estimatedSpeed})<br />last seen at <strong>{time}</strong>", L.Control.Traceroute.extractData(p, 'position'))
          },
        },
        circle: {},
        trace: { weight: 5, opacity: 0.5, color: 'black' },
        locate: { enableHighAccuracy: true, timeout: 5000, maximumAge: 0, setView: true }
      },
      clear: {
          icon: '✗',// ⥇
          title: 'Clear routes',
          handler: L.Handler.ClearBase
        },
    },
  },
  initialize: function (options) {
    // TODO: fix options merging for icons and other
    for (let [key, value] of Object.entries(this.options)) {
      if (options.hasOwnProperty(key)) {
        L.extend(options[key], value);
      }
    }
    L.Util.setOptions(this, options);

    // FIXME Make a deep merge of the options
    // function mergeOptions(defaultOptions, options) {
    //   for (const key in defaultOptions) {
    //     if (Object.prototype.toString.call(options[key]) === '[object Object]') {
    //       mergeOptions.call(defaultOptions[key], options[key]);
    //     } else if (typeof options[key] !== 'undefined') {
    //       defaultOptions[key] = options[key]
    //     }
    //   }
    // };
    //
    // mergeOptions(this.options, options);
    this.handler = new L.Handler.Traceroute(this);

    for (let tool of Object.values(this.options.tools)) {
      tool.handler = new tool.handler(this, tool);
    }

  },
  onAdd: function(map) {
    this._map = map;
    this._routes.addTo(this._map);

    let linksContainer = document.createElement('div');
    linksContainer.classList.add('leaflet-bar');
    L.DomEvent.disableClickPropagation(linksContainer);

    for (const tool of Object.values(this.options.tools)) {
      linksContainer.appendChild(
        this._createControl(tool.icon, tool.title, this._toggleMode(tool.handler))
      );
    }

    return linksContainer;
  },
  onRemove: function(map) {
    this._routes.removeTo(this._map);
    this.handlers.routeBase.disable();
    this.handlers.bearingStart.disable();
  },
  _createControl: function(label, title, fn) {
    let control = document.createElement('a');
    control.innerHTML = label;
    control.classList.add('leaflet-control-traceroute');
    control.setAttribute('title', title);
    control.setAttribute('href', '#');
    control.setAttribute('role', 'button');
    L.DomEvent.on(control, 'click', fn, this);

    return control;
  },
  _routes: L.layerGroup(),
  _toggleMode: function(handler) {
    return function (e) {
      if (e && e.target) {
        handler.target = e.target;
      }
      if(!handler.enabled()) {
        handler.enable();
      } else {
        handler.disable();
      }
      return handler.enabled();
    }
  },
  statics: {
    format(number, unit) {
      const one_NM = 1852;
      const one_mi = 1609.344;
      const one_ft = 0.3048;
      const one_min = 60;
      const one_hour = 3600;
      const one_kilo = 1000;

      if (typeof number !== 'number') {
        return `- ${unit}`
      }  else if (typeof unit === 'undefined' && number >=1000 ) {
        unit = 'km'
      }

      switch (unit) {
        case 'km': // from m
          return `${(number/one_kilo).toFixed(1)}${unit}`
        case 'mi': // from m
          return `${(number/one_mi).toFixed(1)}${unit}`
        case 'NM': // from m
          return `${(number/one_NM).toFixed(1)}${unit}`
        case 'km/h': //from m/s
          return `${(number/one_kilo*one_hour).toFixed(0)}${unit}`
        case 'ft/min': // from m/s
          return `${(number/one_ft*one_min).toFixed(0)}${unit}`
        case 'kt': // from m/s
          return `${(number/one_NM*one_hour).toFixed(0)}${unit}`
        case 'ft': // from m
          return `${(number/one_ft).toFixed(0)}${unit}`
        case '°':
          return `${number.toFixed(1)}${unit}`
        case 'time': // from timestamp
          return new Date(number).toUTCString().slice(-12)
        default:
        unit = 'm'
        case 'm':
          return `${(number).toFixed(0)}${unit}`
        }
      },
    extractData(layer, dataset) {
      switch (dataset) {
        case 'waypoint':
          return {
            out: this.format(layer.route.out, '°'),
            in: this.format(layer.route.in, '°'),
            distance: this.format(layer.route.distance, 'NM'),
            totalDistance: this.format(layer.route.totalDistance, 'NM'),
          }
        case 'bearing':
          return {
            qdr: this.format(layer.bearing.qdr, '°'),
            qdm: this.format(layer.bearing.qdm, '°'),
            distance: this.format(layer.bearing.distance, 'NM'),
          }
        case 'position':
          return {
            latitude: this.format(layer.position.latitude, '°'),
            longitude: this.format(layer.position.longitude, '°'),
            altitude: this.format(layer.position.altitude, 'ft'),
            vario: this.format(layer.position.vario, 'ft/min'),
            accuracy: this.format(layer.position.accuracy, 'm'),
            altitudeAccuracy: this.format(layer.position.altitudeAccuracy, 'm'),
            heading: this.format(layer.position.heading, '°'),
            bearing: this.format(layer.position.bearing, '°'),
            speed: this.format(layer.position.speed, 'kt'),
            estimatedSpeed: this.format(layer.position.estimatedSpeed, 'kt'),
            time: this.format(layer.position.timestamp, 'time'),
          }
      }
    }
  }
})

L.control.traceroute = function(opts) {
  return new L.Control.Traceroute(opts);
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/FeatureGroup.Ordered.js":
/*!************************************!*\
  !*** ./js/FeatureGroup.Ordered.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(L) {/* harmony import */ var _LayerGroup_Ordered__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LayerGroup.Ordered */ "./js/LayerGroup.Ordered.js");
/* harmony import */ var _LayerGroup_Ordered__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_LayerGroup_Ordered__WEBPACK_IMPORTED_MODULE_0__);
// import L from 'leaflet';


L.FeatureGroup.Ordered = L.LayerGroup.Ordered.extend({
  addLayer: function (layer) {
    if (this.hasLayer(layer)) {
      return this;
    }

    layer.addEventParent(this);

    L.LayerGroup.Ordered.prototype.addLayer.call(this, layer);

    // @event layeradd: LayerEvent
    // Fired when a layer is added to this `FeatureGroup`
    return this.fire('layeradd', {layer: layer});
  },
  insertLayer: function(layer, after) {
    if (this.hasLayer(layer)) {
      return this;
    }

    layer.addEventParent(this);

    L.LayerGroup.Ordered.prototype.insertLayer.call(this, layer, after);

    // @event layeradd: LayerEvent
    // Fired when a layer is added to this `FeatureGroup`
    return this.fire('layeradd', {layer: layer});
  },
  removeLayer: function (layer) {
    if (!this.hasLayer(layer)) {
      return this;
    }
    if (this._layers.has(layer)) {
      layer = this.getLayer(layer);
    }

    layer.removeEventParent(this);

    L.LayerGroup.Ordered.prototype.removeLayer.call(this, layer);

    // @event layerremove: LayerEvent
    // Fired when a layer is removed from this `FeatureGroup`
    return this.fire('layerremove', {layer: layer});
  },
  // @method setStyle(style: Path options): this
  // Sets the given path options to each layer of the group that has a `setStyle` method.
  setStyle: function (style) {
    return this.invoke('setStyle', style);
  },

  // @method bringToFront(): this
  // Brings the layer group to the top of all other layers
  bringToFront: function () {
    return this.invoke('bringToFront');
  },

  // @method bringToBack(): this
  // Brings the layer group to the back of all other layers
  bringToBack: function () {
    return this.invoke('bringToBack');
  },

  // @method getBounds(): LatLngBounds
  // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
  getBounds: function () {
    var bounds = new L.LatLngBounds();

    this._layers.forEach((layer) => {
      bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
    })
    return bounds;
  }
});

// L.featuregroup.ordered= function(layers, options) {
//   return new L.FeatureGroup.Ordered(layers, options);
// };

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/Handler.BearingBase.js":
/*!***********************************!*\
  !*** ./js/Handler.BearingBase.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(L) {/* harmony import */ var _Handler_BearingTrace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Handler.BearingTrace */ "./js/Handler.BearingTrace.js");


L.Handler.BearingBase = L.Handler.extend({
  initialize: function (control, options) {
    L.Util.setOptions(this, options);
    this._control = control;

    this.bearings = new L.FeatureGroup()
      .addTo(map);

    this.traces = new L.Polyline([], this.options.trace)
      .addTo(map);

    this.traceHandler = new L.Handler.BearingTrace(this.bearings, this.options);
  },
  addHooks: function() {
    this._control.options.tools.route.handler.disable();
    this._control.handler.enable();
    this.target.style.filter = 'invert(1)';

    this._control._routes.eachLayer(function(route) {
      route.waypoints.on('click', this._selectOrigin, this)
    }, this);

    this.bearings
      .bindTooltip(this.options.marker.tooltip, { direction: 'auto' })
      .unbindPopup()
      .eachLayer(marker => marker.dragging.enable());

    L.DomEvent
      .on(document, 'keydown', this._onKeyDown, this);
  },
  removeHooks: function() {
    L.DomEvent
      .off(document, 'keydown', this._onKeyDown, this);

      this.bearings
        .bindPopup(this.options.marker.tooltip, { direction: 'auto' })
        .unbindTooltip()
        .eachLayer(marker => marker.dragging.disable());

    this._control._routes.eachLayer(function(route) {
      route.waypoints.off('click', this._selectOrigin, this)
    }, this);

    this._control.handler.disable();
    this.target.style.filter = 'invert(0)';

    this.traceHandler.disable();
  },
  _selectOrigin: function(e) {
    this.traceHandler.origin = e.layer;
    this.traceHandler.enable();
  },

  _onKeyDown: function(e) {
    switch(e.keyCode) {
      case 27 : //ESC
        this.disable();
        break;
    }
  }
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/Handler.BearingTrace.js":
/*!************************************!*\
  !*** ./js/Handler.BearingTrace.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(L) {/* harmony import */ var _Marker_Bearing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Marker.Bearing */ "./js/Marker.Bearing.js");


L.Handler.BearingTrace = L.Handler.extend({
  initialize: function (bearings, options) {
    L.Util.setOptions(this, options);

    this.bearings = bearings;
    this._pointer = new L.Polyline([], options.pointer);
  },
  addHooks: function() {
    this._clearPointer();
    this._pointer
      .addTo(map);

    map
      .on('mousemove', this._drawPointer, this)
      .on('click', this._setBearing, this);

    L.DomEvent
      .on(document, 'keydown', this._onKeyDown, this);

    if (!this.origin) {
      this.disable();
    }
  },
  removeHooks: function() {
    this._clearPointer();
    this._pointer
      .removeFrom(map);

    map
      .off('mousemove', this._drawPointer, this)
      .off('click', this._setBearing, this);

    L.DomEvent
      .off(document, 'keydown', this._onKeyDown, this);

    this.origin = null;
  },
  _setBearing: function(e) {
    new L.Marker.Bearing(e.latlng, L.extend({ draggable:true }, this.options.marker, { trace: this.options.trace }) )
      .setOrigin(this.origin)
      .addTo(this.bearings);

    // this.origin.on('move', this._updateOrigin)
    this.disable();
  },
  _drawPointer: function(e) {
    this._pointer.setLatLngs([this.origin.getLatLng(), e.latlng]);
  },
  _clearPointer: function() {
    this._pointer.setLatLngs([]);
  },
  _onKeyDown: function(e) {
    switch(e.keyCode) {
      case 27 : this.disable(); break;//ESC
    }
  }
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/Handler.ClearBase.js":
/*!*********************************!*\
  !*** ./js/Handler.ClearBase.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(L) {L.Handler.ClearBase = L.Handler.extend({
  initialize: function (control, options) {
    L.Util.setOptions(this, options);
    this._control = control;
  },
  addHooks: function() {
    this.target.style.filter = 'invert(1)';
    this._control._routes.clearLayers();
    this._control.options.tools.track.handler.trace.setLatLngs([]);
    map.fire('traceroute:clear');

    this.disable();
  },
  removeHooks: function() {
    this.target.style.filter = 'invert(0)';
    return false;
  },
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/Handler.RouteBase.js":
/*!*********************************!*\
  !*** ./js/Handler.RouteBase.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(L) {/* harmony import */ var _Handler_RouteStart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Handler.RouteStart */ "./js/Handler.RouteStart.js");


// Handle while waiting to start/resume a route
L.Handler.RouteBase = L.Handler.extend({
  initialize: function (control, options) {
    L.Util.setOptions(this, options);
    this._control = control; // only for handlers (Base and Bearing)
// TODO: Send _routes here
  // this._routes = L.layerGroup()
  //   .addTo(map);
    this.startHandler = new L.Handler.RouteStart(control._routes, options);
  },
  addHooks: function() {
    this._control.options.tools.bearing.handler.disable();
    this._control.handler.enable();
    this.target.style.filter = 'invert(1)';

    L.DomEvent
      .on(document, 'keydown', this._onKeyDown, this);
    map
      .fire('traceroute:route:start', this._control);
    this.startHandler.enable();
  },
  removeHooks: function() {
    L.DomEvent
      .off(document, 'keydown', this._onKeyDown, this);
    map
      .fire('traceroute:route:stop', this._control);

    this.target.style.filter = 'invert(0)';
    this._control.handler.disable();
    this.startHandler.traceHandler.disable();
    this.startHandler.disable();
  },
  _onKeyDown: function(e) {
    switch(e.keyCode) {
      case 27 : this.disable(); break;//ESC
    }
  },
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/Handler.RouteEdit.js":
/*!*********************************!*\
  !*** ./js/Handler.RouteEdit.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(L) {// handle interactions route, even after it as been traced.
L.Handler.RouteEdit = L.Handler.extend({
  initialize: function (route) {
    this._route = route;
  },
  addHooks: function() {
    this._route.midpoints
      .bindTooltip(this._route.options.midpoint.tooltip, { direction: 'auto' })
      .on('click', this._route.createWaypoint, this._route);

    // FIXME: Tooltip Error: Unable to get source layer LatLng. with permanent: true, : https://github.com/Leaflet/Leaflet/issues/6938
    this._route.waypoints
      .bindTooltip(this._route.options.waypoint.tooltip, { direction: 'auto' })
      .unbindPopup()
      .on('contextmenu', this._removeLayer, this._route.waypoints)
      .eachLayer(layer => layer.dragging.enable());
  },

  removeHooks: function() {
    this._route.midpoints
      .unbindTooltip()
      .off('click', this._route.createWaypoint, this._route);

    this._route.waypoints
      .unbindTooltip()
      .bindPopup(this._route.options.waypoint.popup)
      .off('contextmenu', this._removeLayer, this._route.waypoints)
      .eachLayer(layer => layer.dragging.disable());
  },
  _removeLayer: function(e) {
    this.removeLayer(e.layer)
  },
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/Handler.RouteStart.js":
/*!**********************************!*\
  !*** ./js/Handler.RouteStart.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(L) {/* harmony import */ var _Handler_RouteTrace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Handler.RouteTrace */ "./js/Handler.RouteTrace.js");
/* harmony import */ var _Handler_RouteTrace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Handler_RouteTrace__WEBPACK_IMPORTED_MODULE_0__);


// Handle while control is enabled
L.Handler.RouteStart = L.Handler.extend({
  initialize: function(routes, options) {
    L.Util.setOptions(this, options);
    this._routes = routes; // only for routes
    this.traceHandler = new L.Handler.RouteTrace(this, routes, options);
  },
  addHooks: function() {
    map
      .on('click', this._startRoute, this)

    this._routes.eachLayer(function(route) {
      route.editHandler.enable();
      route.waypoints.on('click', this._resumeRoute, this)
    }, this);
  },
  removeHooks: function() {
    map
      .off('click', this._startRoute, this)

    this._routes.eachLayer(function(route) {
      route.editHandler.disable();
      route.waypoints.off('click', this._resumeRoute, this)
    }, this);
  },
  _startRoute: function(e) {
    this.traceHandler.enable();
    this.traceHandler._createPoint(e);
  },
  _resumeRoute: function(e) {
    this.traceHandler._route = this._routes.getLayer(e.layer.options.routeId);
    this.traceHandler._route.editHandler.disable();
    this.traceHandler.enable();
    },
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/Handler.RouteTrace.js":
/*!**********************************!*\
  !*** ./js/Handler.RouteTrace.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(L) {// Handle interactions while adding Waypoints one after another.
L.Handler.RouteTrace = L.Handler.extend({
  initialize: function(parent, routes, options) {
    L.Util.setOptions(this, options);
    this._parent = parent;
    this._routes = routes;
    this._pointerTrace = new L.Geodesic([], options.pointer);
  },
  addHooks: function() {
    this._parent.disable();
    this._clearPointerTrace();
    this._pointerTrace.addTo(map);
    map
      .on('mousemove', this._drawPointer, this)
      .on('click', this._createPoint, this);
    L.DomEvent
      .on(document, 'keydown', this._onKeyDown, this);

    if (!this._route) this._createRoute();

    this._route.waypoints
      .on('click', this._finishRouteIfLast, this);

  },
  removeHooks: function() {
    this._clearPointerTrace();
    this._pointerTrace.removeFrom(map);

    map
      .off('mousemove', this._drawPointer, this)
      .off('click', this._createPoint, this);
    L.DomEvent
      .off(document, 'keydown', this._onKeyDown, this);

    this._route.waypoints
      .off('click', this._finishRouteIfLast, this);

    this._route = null;
    this._parent.enable();
  },
  _createRoute: function() {
    map.fire('traceroute:route:new', this._route);
    return this._route = new L.LayerGroup.Route([], this.options)
      .addTo(this._routes);
  },
  _createPoint: function(e) {
    if (!this._route) this._createRoute();
    return this._route.createWaypoint(e);
  },
  _finishRouteIfLast: function(e) {
    if (e.layer === this._route.waypoints.last()) {
      this._finishRoute();
    }
  },
  _finishRoute: function() {
    if (this._route.clean()) {
      map.fire('traceroute:route:finish', this._route);
      this._route.editHandler.enable();
    } else {
      map.fire('traceroute:route:abort', this._route);
      this._route.remove();
    }
    this.disable();
    return this._route;
  },
  _drawPointer: function(e) {
    if(this._route && this._route.waypoints.last()) {
      this._pointerTrace.setLatLngs([this._route.waypoints.last().getLatLng(), e.latlng]);
    }
  },
  _clearPointerTrace: function() {
    this._pointerTrace.setLatLngs([]);
  },
  _onKeyDown: function(e) {
    switch(e.keyCode) {
      case 27 : //ESC
        this._finishRoute();
        break;
    }
  },
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/Handler.Traceroute.js":
/*!**********************************!*\
  !*** ./js/Handler.Traceroute.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(L) {// Handle while control is enabled
L.Handler.Traceroute = L.Handler.extend({
  initialize: function (control) {
    this._control = control;
    this._oldSettings = {};
  },
  addHooks: function() {
    // TODO: Make pointer customizable
    this._oldSettings.cursor = map._container.style.cursor;
    map._container.style.cursor = 'crosshair';
    this._oldSettings.doubleClickZoom = map.doubleClickZoom.enabled();
    map.doubleClickZoom.disable();
  },
  removeHooks: function() {
    map._container.style.cursor = this._oldSettings.cursor;
    if(this._oldSettings.doubleClickZoom) { map.doubleClickZoom.enable() }
  },
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/Handler.TrackBase.js":
/*!*********************************!*\
  !*** ./js/Handler.TrackBase.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(L) {/* harmony import */ var _Marker_Trackpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Marker.Trackpoint */ "./js/Marker.Trackpoint.js");



L.Handler.TrackBase = L.Handler.extend({
  initialize: function (control, options) {
    L.Util.setOptions(this, options);
    this._control = control;

    this.marker = new L.Marker.Trackpoint([],
      L.extend({ }, this.options.marker))
      .bindTooltip(this.options.marker.tooltip, { direction: 'auto' })

    this.trace = new L.Polyline([], this.options.trace)
    this.circle = new L.Circle([], this.options.circle)
  },
  addHooks: function() {
    this.target.style.filter = 'invert(1)';

    map
      .on('locationfound', this._locationFound, this)
      .on('locationerror', this._locationError, this)
      .locate(L.extend({ watch: true }, this.options.locate))
      .fire('traceroute:track:start', this);
    this.trace.addTo(map);
  },
  removeHooks: function() {
    this.target.style.filter = 'invert(0)';

    map
      .stopLocate()
      .fire('traceroute:track:stop', this)
      .off('locationfound', this._locationFound, this)
      .off('locationerror', this._locationError, this);
  },
  _locationFound: function(e) {
      let estimated =  {}
      if (map.hasLayer(this.marker)) {
          estimated = {
            bearing: (this.marker.bearing(e.latlng)),
            estimatedSpeed: this.marker.distance(e.latlng) / Math.floor((e.timestamp - this.marker.position.timestamp)/1000),
            vario: (this.marker.position.altitude - e.altitude) / Math.floor((e.timestamp - this.marker.position.timestamp)/1000)
          }
      }

    this.marker
      .setLatLng(e.latlng)
      .addTo(map)
      .setOpacity(1)
      // .bindTooltip(this.marker.options.tooltip, { direction: 'auto' })
      .decorate(L.extend(estimated, e))

    this.circle
      .setLatLng(e.latlng)
      .addTo(map)
      .setRadius(e.accuracy)
    this.trace
      .addTo(map)
      .addLatLng(e.latlng)

    map
      .fire('traceroute:track:found', e)
  },
  _locationError: function(e) {
    // Start a new polyine segment
    this.marker
      .setOpacity(0.5)
      // .bindTooltip('Location lost', { direction: 'auto' })
      .addTo(map);
  }
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/LayerGroup.Ordered.js":
/*!**********************************!*\
  !*** ./js/LayerGroup.Ordered.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(L) {// Standart LayerGroup use JS object to store layers. This is not suitable to maintain order (insertion or else) in the collection. here we use Map, and create some useful methods
// import L from 'leaflet';

L.LayerGroup.Ordered = L.LayerGroup.extend({
  initialize: function (layers, options) {
    L.Util.setOptions(this, options);

    this._layers = new Map;

    var i, len;

    if (layers) {
      for (i = 0, len = layers.length; i < len; i++) {
        this.addLayer(layers[i]);
      }
    }
  },
  addLayer: function (layer) {
    var id = this.getLayerId(layer);

    this._layers.set(id, layer);

    if (this._map) {
      this._map.addLayer(layer);
    }

    return this;
  },
  // @method insertLayer(layer: Layer, after: Number): this
  // Inserts the given layer to the group after the layer with the given internal ID.
  insertLayer: function(new_layer, after) {
    let newMap = new Map();
    this._layers.forEach((value, key, map) => {
      newMap.set(key, value);
      if(key === after) {
        newMap.set(this.getLayerId(new_layer), new_layer);
      }
    });
    this._layers = newMap;

    if (this._map) {
      this._map.addLayer(new_layer);
    }
    return this;
  },
  removeLayer: function (layer) {
    var id = this._layers.has(layer) ? layer : this.getLayerId(layer);

    if (this._map && this._layers.delete(id)) {
      this._map.removeLayer(layer);
    }

    return this;
  },
  hasLayer: function (layer) {
    return !!layer && (this._layers.has(layer) || this._layers.has(this.getLayerId(layer)));
  },
  invoke: function (methodName) {
    var args = Array.prototype.slice.call(arguments, 1)

    this._layers.forEach(layer => {
      if (layer[methodName]) {
        layer[methodName].apply(layer, args);
      }
    })

    return this;
  },
  eachLayer: function (method, context) {
    this._layers.forEach(layer => {
      method.call(context, layer);
    })
    
    return this;
  },
  getLayer: function (id) {
    return this._layers.get(id);
  },
  getLayers: function () {
    return Array.from(this._layers.values());
  },
  last: function() {
    return this.getLayers().pop();
  }
});

// L.layergroup.ordered= function(opts) {
//   return new L.LayerGroup.Ordered(opts);
// };

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/LayerGroup.Route.js":
/*!********************************!*\
  !*** ./js/LayerGroup.Route.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(L) {/* harmony import */ var _FeatureGroup_Ordered__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FeatureGroup.Ordered */ "./js/FeatureGroup.Ordered.js");
/* harmony import */ var _Marker_Waypoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Marker.Waypoint */ "./js/Marker.Waypoint.js");
/* harmony import */ var _Handler_RouteEdit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Handler.RouteEdit */ "./js/Handler.RouteEdit.js");
/* harmony import */ var _Handler_RouteEdit__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Handler_RouteEdit__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var leaflet_geodesic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! leaflet.geodesic */ "../node_modules/leaflet.geodesic/dist/leaflet.geodesic.umd.min.js");
/* harmony import */ var leaflet_geodesic__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(leaflet_geodesic__WEBPACK_IMPORTED_MODULE_3__);
// Custom layer Group used to sort anykind of layers for route tracing.
// import L from 'leaflet'






L.LayerGroup.Route = L.LayerGroup.extend({
  options: {
    bubblingMouseEvents: false,
    trace: {bubblingMouseEvents: false},
    waypoint: {bubblingMouseEvents: false, draggable:true},
    midpoint: {bubblingMouseEvents: false},
  },
  initialize: function(layer, options) {
    // FIXME: deepmerge issue
    for (let [key, value] of Object.entries(this.options)) {
      if (options.hasOwnProperty(key)) {
        L.extend(options[key], value);
      }
    }
    L.Util.setOptions(this, options);

    this._layers = {};
    this.editHandler = new L.Handler.RouteEdit(this);

    // Create container as LayerGroup fo markers and polylines
    this.trace = new L.Geodesic([], this.options.trace)
      .addTo(this);

    this.midpoints = new L.FeatureGroup()
      .addTo(this);

    this.waypoints = new L.FeatureGroup.Ordered()
      .on('layerremove', this.clean, this)
      .on('layeradd layerremove move', this._draw, this)
      // FIXME: context is not set to _mapToAdd
      .on('layeradd layerremove move', this._fireWithLayer, this._mapToAdd)
      .on('layeradd', function(e) {
        // FIXME: 'move' event is not propagated to FeatureGroup : https://github.com/Leaflet/Leaflet/issues/6937
        e.layer
          .on('move', this._draw, this)
          .on('move', this._fireWithLayer, this._mapToAdd)
      }, this)
      .addTo(this);
  },
  clean: function() {
    if (this.waypoints.getLayers().length < 2) {
      this.waypoints.clearLayers();
      return false;
    } else {
      return true;
    }
  },
  createWaypoint: function(e) {
    return new L.Marker.Waypoint(e.latlng, this.options.waypoint)
      .setSiblings(...(e.layer ? [e.layer.previous, e.layer.next] : [null, null]))
      .addTo(this.waypoints);
  },
  _draw: function(e) {
    this.trace.setLatLngs([]);
    this.midpoints.clearLayers();

    e.layer.start()
      .follow(layer => {
        layer
          .decorate();
        this.trace
          .addLatLng(layer.getLatLng());
        // if (layer.previous instanceof L.Marker.Waypoint) this.midpoints
        //   .addLayer(
        //     this._drawMidpoint(layer.previous, layer)
        //   );
      });

    this._mapToAdd.fire('traceroute:route:update', this);
  },
  _drawMidpoint: function(prev, next) {
    if (prev instanceof L.Marker.Waypoint && next instanceof L.Marker.Waypoint) {
      console.log ({i, f} = this.trace.geom.geodesic.inverse(prev.getLatLng(), next.getLatLng()))

      let rotation = this.trace.geom.geodesic.inverse(prev.getLatLng(), next.getLatLng());
      rotation = Math.round((rotation.initialBearing + rotation.finalBearing) / 2) % 360;
      let mp = new L.Marker(
        this.trace.geom.geodesic.midpoint(prev.getLatLng(), next.getLatLng()),
        L.extend({ rotationAngle: rotation, routeId: L.Util.stamp(this), insertAfter : L.Util.stamp(prev) }, this.options.midpoint))
        mp.previous = prev;
        mp.next = next;
        return mp
    } else {
      return null
    }
  },
  _fireWithLayer: function(e) {
    // FIXME: fire add and remove event
    this.fire(`traceroute:waypoint:${e.type.replace('layer','')}`, e.layer || e.target)
  },
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/Marker.Bearing.js":
/*!******************************!*\
  !*** ./js/Marker.Bearing.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(L) {/* harmony import */ var _Marker_Traceroute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Marker.Traceroute */ "./js/Marker.Traceroute.js");
/* harmony import */ var _Marker_Traceroute__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Marker_Traceroute__WEBPACK_IMPORTED_MODULE_0__);


L.Marker.Bearing = L.Marker.Traceroute.extend({
  initialize: function(latlng, options) {
    this.trace = new L.Polyline([], options.trace);
    delete options.trace;

    this
      .on('move', this._decorate, this)
      .on('move', this._draw, this)

    Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.call(this, latlng, options);
  },
  onAdd: function(map) {
    this.trace.addTo(map);
    Object.getPrototypeOf(Object.getPrototypeOf(this)).onAdd.call(this, map);
  },
  onRemove: function(map) {
    this.trace.remove();
    Object.getPrototypeOf(Object.getPrototypeOf(this)).onRemove.call(this, map);
  },
  bearing: {},
  setOrigin: function(origin) {
    this.origin = origin;
    origin
      .on('remove', this.remove, this)
      .on('move remove', this._decorate, this)
      .on('move remove', this._draw, this)
      .bearings.push(this);
    this
      ._decorate()
      ._draw();
    return this;
  },
  // TODO: assert if removeOrgin() could be useful.
  _decorate: function() {
    if (this.origin instanceof L.Marker.Waypoint) {
      this.bearing.qdr = Number(this.bearingTo(this.origin.getLatLng()).toPrecision(5));
      this.bearing.qdm = Number(this.origin.bearingTo(this._latlng).toPrecision(5));
      this.bearing.distance = Number(this.distanceTo(this.origin.getLatLng()).toPrecision(5));
    }
    this.toggleTooltip().toggleTooltip();
    return this
  },
  _draw: function() {
    this.trace.setLatLngs([this._latlng, this.origin.getLatLng()])
    return this
  },
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/Marker.Traceroute.js":
/*!*********************************!*\
  !*** ./js/Marker.Traceroute.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(L) {L.Marker.Traceroute = L.Marker.extend({
  options: {
    autoPan: true
  },
  bearingTo: function(latlng) {
    // https://github.com/makinacorpus/Leaflet.GeometryUtil
    let rad = Math.PI / 180,
        lat1 = this._latlng.lat * rad,
        lat2 = latlng.lat * rad,
        lon1 = this._latlng.lng * rad,
        lon2 = latlng.lng * rad,
        y = Math.sin(lon2 - lon1) * Math.cos(lat2),
        x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
  },
  distanceTo: function (latlng) {
    return map.distance(this._latlng, latlng);
  },
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/Marker.Trackpoint.js":
/*!*********************************!*\
  !*** ./js/Marker.Trackpoint.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(L) {/* harmony import */ var _Marker_Traceroute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Marker.Traceroute */ "./js/Marker.Traceroute.js");
/* harmony import */ var _Marker_Traceroute__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Marker_Traceroute__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var leaflet_rotatedmarker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet-rotatedmarker */ "../node_modules/leaflet-rotatedmarker/leaflet.rotatedMarker.js");
/* harmony import */ var leaflet_rotatedmarker__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet_rotatedmarker__WEBPACK_IMPORTED_MODULE_1__);



L.Marker.Trackpoint = L.Marker.Traceroute.extend({
  decorate: function(e) {
    this
      ._extractLocation(e)
      .setRotationAngle(e.heading || 0)
      .toggleTooltip().toggleTooltip();
  },
  // setHeading: function(latlng) {
  //   if (typeof this.position.heading == 'undefined') {
  //     this.position.heading = (this.bearingTo(latlng) -180) % 360;
  //   }
  //   this.setRotationAngle(this.position.heading)
  // },
  _extractLocation: function(e) {
    this.position = (({ latitude, longitude, altitude, vario, accuracy, altitudeAccuracy, heading, bearing, estimatedSpeed, speed, timestamp }) => ({ latitude, longitude, altitude, vario, accuracy, altitudeAccuracy, heading, bearing, estimatedSpeed, speed, timestamp }))(e)
    return this
  }
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "./js/Marker.Waypoint.js":
/*!*******************************!*\
  !*** ./js/Marker.Waypoint.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(L) {/* harmony import */ var _Marker_Traceroute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Marker.Traceroute */ "./js/Marker.Traceroute.js");
/* harmony import */ var _Marker_Traceroute__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Marker_Traceroute__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var leaflet_rotatedmarker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet-rotatedmarker */ "../node_modules/leaflet-rotatedmarker/leaflet.rotatedMarker.js");
/* harmony import */ var leaflet_rotatedmarker__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet_rotatedmarker__WEBPACK_IMPORTED_MODULE_1__);



L.Marker.Waypoint = L.Marker.Traceroute.extend({
  route: { in: 0, out: 0, distance: 0, totalDistance: 0 },
  bearings: [],
  addBearing: function(bearing) {
    this.bearings.push(bearing)
    bearing.origin = this;
    return this;
  },
  setSiblings: function(previous, next) {
    if (previous != null) { this.previous = previous }
    if (next != null) { this.next = next }
    this
      ._decorate()
      .fire('update', this, true);
    return this;
  },
  _decorate: function() {
    this.route.position = this._latlng;
    let geodesic = new L.Geodesic();

    if(this.previous instanceof L.Marker.Waypoint) {
      this.route.in = geodesic.inverse(this.previous.getLatLng(), this.getLatLng());
    }
    if(this.next instanceof L.Marker.Waypoint) {
      this.route.out = geodesic.inverse(this.getLatLng(), this.next.getLatLng());
    }
    this.togglePopup().togglePopup().toggleTooltip().toggleTooltip();
    return this;
  },
  follow: function(fcn) {
    let mkr = this;
    do {
      fcn.call(this, mkr);
      mkr = mkr.next;
    } while(mkr.next instanceof L.Marker.Waypoint)
  },
  start: function() {
    let mkr = this;
    while(mkr.previous instanceof L.Marker.Waypoint) {
      mkr = mkr.previous;
    }
    return mkr
  }
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! leaflet */ "leaflet")))

/***/ }),

/***/ "leaflet":
/*!********************!*\
  !*** external "L" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = L;

/***/ })

/******/ });
//# sourceMappingURL=leaflet-control-traceroute.js.map