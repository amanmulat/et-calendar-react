import e,{forwardRef as t,useRef as n,useMemo as r,useCallback as a,useEffect as o,isValidElement as i,cloneElement as l,useState as s}from"react";import c,{createPortal as u}from"react-dom";"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function d(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var f={exports:{}};f.exports=function(){var e=1e3,t=6e4,n=36e5,r="millisecond",a="second",o="minute",i="hour",l="day",s="week",c="month",u="quarter",d="year",f="date",h="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,y={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},g=function(e,t,n){var r=String(e);return!r||r.length>=t?e:""+Array(t+1-r.length).join(n)+e},v={s:g,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),r=Math.floor(n/60),a=n%60;return(t<=0?"+":"-")+g(r,2,"0")+":"+g(a,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var r=12*(n.year()-t.year())+(n.month()-t.month()),a=t.clone().add(r,c),o=n-a<0,i=t.clone().add(r+(o?-1:1),c);return+(-(r+(n-a)/(o?a-i:i-a))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:c,y:d,w:s,d:l,D:f,h:i,m:o,s:a,ms:r,Q:u}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},b="en",w={};w[b]=y;var x="$isDayjsObject",E=function(e){return e instanceof k||!(!e||!e[x])},D=function e(t,n,r){var a;if(!t)return b;if("string"==typeof t){var o=t.toLowerCase();w[o]&&(a=o),n&&(w[o]=n,a=o);var i=t.split("-");if(!a&&i.length>1)return e(i[0])}else{var l=t.name;w[l]=t,a=l}return!r&&a&&(b=a),a||!r&&b},C=function(e,t){if(E(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new k(n)},$=v;$.l=D,$.i=E,$.w=function(e,t){return C(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var k=function(){function y(e){this.$L=D(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[x]=!0}var g=y.prototype;return g.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if($.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var r=t.match(m);if(r){var a=r[2]-1||0,o=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],a,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)):new Date(r[1],a,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)}}return new Date(t)}(e),this.init()},g.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},g.$utils=function(){return $},g.isValid=function(){return!(this.$d.toString()===h)},g.isSame=function(e,t){var n=C(e);return this.startOf(t)<=n&&n<=this.endOf(t)},g.isAfter=function(e,t){return C(e)<this.startOf(t)},g.isBefore=function(e,t){return this.endOf(t)<C(e)},g.$g=function(e,t,n){return $.u(e)?this[t]:this.set(n,e)},g.unix=function(){return Math.floor(this.valueOf()/1e3)},g.valueOf=function(){return this.$d.getTime()},g.startOf=function(e,t){var n=this,r=!!$.u(t)||t,u=$.p(e),h=function(e,t){var a=$.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return r?a:a.endOf(l)},m=function(e,t){return $.w(n.toDate()[e].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},p=this.$W,y=this.$M,g=this.$D,v="set"+(this.$u?"UTC":"");switch(u){case d:return r?h(1,0):h(31,11);case c:return r?h(1,y):h(0,y+1);case s:var b=this.$locale().weekStart||0,w=(p<b?p+7:p)-b;return h(r?g-w:g+(6-w),y);case l:case f:return m(v+"Hours",0);case i:return m(v+"Minutes",1);case o:return m(v+"Seconds",2);case a:return m(v+"Milliseconds",3);default:return this.clone()}},g.endOf=function(e){return this.startOf(e,!1)},g.$set=function(e,t){var n,s=$.p(e),u="set"+(this.$u?"UTC":""),h=(n={},n[l]=u+"Date",n[f]=u+"Date",n[c]=u+"Month",n[d]=u+"FullYear",n[i]=u+"Hours",n[o]=u+"Minutes",n[a]=u+"Seconds",n[r]=u+"Milliseconds",n)[s],m=s===l?this.$D+(t-this.$W):t;if(s===c||s===d){var p=this.clone().set(f,1);p.$d[h](m),p.init(),this.$d=p.set(f,Math.min(this.$D,p.daysInMonth())).$d}else h&&this.$d[h](m);return this.init(),this},g.set=function(e,t){return this.clone().$set(e,t)},g.get=function(e){return this[$.p(e)]()},g.add=function(r,u){var f,h=this;r=Number(r);var m=$.p(u),p=function(e){var t=C(h);return $.w(t.date(t.date()+Math.round(e*r)),h)};if(m===c)return this.set(c,this.$M+r);if(m===d)return this.set(d,this.$y+r);if(m===l)return p(1);if(m===s)return p(7);var y=(f={},f[o]=t,f[i]=n,f[a]=e,f)[m]||1,g=this.$d.getTime()+r*y;return $.w(g,this)},g.subtract=function(e,t){return this.add(-1*e,t)},g.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var r=e||"YYYY-MM-DDTHH:mm:ssZ",a=$.z(this),o=this.$H,i=this.$m,l=this.$M,s=n.weekdays,c=n.months,u=n.meridiem,d=function(e,n,a,o){return e&&(e[n]||e(t,r))||a[n].slice(0,o)},f=function(e){return $.s(o%12||12,e,"0")},m=u||function(e,t,n){var r=e<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(p,(function(e,r){return r||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return $.s(t.$y,4,"0");case"M":return l+1;case"MM":return $.s(l+1,2,"0");case"MMM":return d(n.monthsShort,l,c,3);case"MMMM":return d(c,l);case"D":return t.$D;case"DD":return $.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return d(n.weekdaysMin,t.$W,s,2);case"ddd":return d(n.weekdaysShort,t.$W,s,3);case"dddd":return s[t.$W];case"H":return String(o);case"HH":return $.s(o,2,"0");case"h":return f(1);case"hh":return f(2);case"a":return m(o,i,!0);case"A":return m(o,i,!1);case"m":return String(i);case"mm":return $.s(i,2,"0");case"s":return String(t.$s);case"ss":return $.s(t.$s,2,"0");case"SSS":return $.s(t.$ms,3,"0");case"Z":return a}return null}(e)||a.replace(":","")}))},g.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},g.diff=function(r,f,h){var m,p=this,y=$.p(f),g=C(r),v=(g.utcOffset()-this.utcOffset())*t,b=this-g,w=function(){return $.m(p,g)};switch(y){case d:m=w()/12;break;case c:m=w();break;case u:m=w()/3;break;case s:m=(b-v)/6048e5;break;case l:m=(b-v)/864e5;break;case i:m=b/n;break;case o:m=b/t;break;case a:m=b/e;break;default:m=b}return h?m:$.a(m)},g.daysInMonth=function(){return this.endOf(c).$D},g.$locale=function(){return w[this.$L]},g.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),r=D(e,t,!0);return r&&(n.$L=r),n},g.clone=function(){return $.w(this.$d,this)},g.toDate=function(){return new Date(this.valueOf())},g.toJSON=function(){return this.isValid()?this.toISOString():null},g.toISOString=function(){return this.$d.toISOString()},g.toString=function(){return this.$d.toUTCString()},y}(),M=k.prototype;return C.prototype=M,[["$ms",r],["$s",a],["$m",o],["$H",i],["$W",l],["$M",c],["$y",d],["$D",f]].forEach((function(e){M[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),C.extend=function(e,t){return e.$i||(e(t,k,C),e.$i=!0),C},C.locale=D,C.isDayjs=E,C.unix=function(e){return C(1e3*e)},C.en=w[b],C.Ls=w,C.p={},C}();var h,m,p=d(f.exports),y={};Object.defineProperty(y,"__esModule",{value:!0});var g=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(r=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{!r&&l.return&&l.return()}finally{if(a)throw o}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},v=function(e){this.message=e,this.name="Exception"},b=function(e){var t=Math.floor(e/100)-Math.floor(e/400)-4;return(e-1)%4==3?t+1:t};function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){E(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function E(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function D(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],i=!0,l=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){l=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(l)throw a}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return C(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}m=y.toGregorian=function(e){var t=e.constructor===Array?e:[].slice.call(arguments);if(-1!==t.indexOf(0)||-1!==t.indexOf(null)||-1!==t.indexOf(void 0)||3!==t.length)throw new v("Malformed input can't be converted.");var n=g(t,3),r=n[0],a=n[1],o=n[2],i=b(r),l=r+7,s=[0,30,31,30,31,31,28,31,30,31,30,31,31,30],c=l+1;(c%4==0&&c%100!=0||c%400==0)&&(s[6]=29);var u=30*(a-1)+o;u<=37&&r<=1575?(u+=28,s[0]=31):u+=i-1,r-1==3&&(u+=1);for(var d=0,f=void 0,h=0;h<s.length;h++){if(u<=s[h]){d=h,f=u;break}d=h,u-=s[h]}d>4&&(l+=1);return[l,s=[8,9,10,11,12,1,2,3,4,5,6,7,8,9][d],f]},h=y.toEthiopian=function(e){var t=e.constructor===Array?e:[].slice.call(arguments);if(-1!==t.indexOf(0)||-1!==t.indexOf(null)||-1!==t.indexOf(void 0)||3!==t.length)throw new v("Malformed input can't be converted.");var n=g(t,3),r=n[0],a=n[1],o=n[2];if(10===a&&o>=5&&o<=14&&1582===r)throw new v("Invalid Date between 5-14 May 1582.");var i=[0,31,28,31,30,31,30,31,31,30,31,30,31],l=[0,30,30,30,30,30,30,30,30,30,5,30,30,30,30];(r%4==0&&r%100!=0||r%400==0)&&(i[2]=29);var s=r-8;s%4==3&&(l[10]=6);for(var c=b(r-8),u=0,d=1;d<a;d++)u+=i[d];u+=o;var f=s%4==0?26:25;r<1582||u<=277&&1582===r?(l[1]=0,l[2]=f):(f=c-3,l[1]=f);var h=void 0,m=void 0;for(h=1;h<l.length;h++){if(u<=l[h]){m=1===h||0===l[h]?u+(30-f):u;break}u-=l[h]}h>10&&(s+=1);return[s,[0,4,5,6,7,8,9,10,11,12,13,1,2,3,4][h],m]};var $=t((function(t,s){var c=t.element,d=t.popper,f=t.position,h=void 0===f?"bottom-center":f,m=t.containerStyle,p=t.containerClassName,y=void 0===p?"":p,g=t.arrow,v=t.arrowStyle,b=void 0===v?{}:v,w=t.arrowClassName,E=void 0===w?"":w,D=t.fixMainPosition,C=t.fixRelativePosition,$=t.offsetY,M=t.offsetX,O=t.animations,T=t.zIndex,N=void 0===T?0:T,S=t.popperShadow,H=t.onChange,I=t.active,A=void 0===I||I,B=t.portal,P=t.portalTarget,j="undefined"!=typeof window,L=j&&P instanceof HTMLElement,F=!0===g,W=d&&!0===A,Y=n(),z=n(),_=n(),G=n(),J=r((function(){return{position:h,fixMainPosition:D,fixRelativePosition:C,offsetY:$,offsetX:M,defaultArrow:F,animations:O,zIndex:N,onChange:H}}),[h,D,C,$,M,F,O,H,N]),R=a((function(){_.current&&(_.current.style.transition=""),z.current&&(z.current.parentNode.style.transition="")}),[]),U={element:x({display:"inline-block",height:"max-content"},m),arrow:x({visibility:"hidden",left:"0",top:"0",position:"absolute"},b),popper:{position:"absolute",left:"0",top:"0",willChange:"transform",visibility:"hidden",zIndex:N}};j&&!G.current&&(G.current=document.createElement("div"),G.current.data={portal:B,isValidPortalTarget:L}),o((function(){if(B&&!L){var e=G.current;return document.body.appendChild(e),function(){return document.body.removeChild(e)}}}),[B,L]),o((function(){if(!W)return R(),z.current.parentNode.style.visibility="hidden",void(_.current&&(_.current.style.visibility="hidden"));function e(e){e&&"resize"!==e.type&&!e.target.contains(Y.current)||(e&&R(),k(Y,z,_,J,e))}return e(),document.addEventListener("scroll",e,!0),window.addEventListener("resize",e),function(){document.removeEventListener("scroll",e,!0),window.removeEventListener("resize",e)}}),[W,J,R]),o((function(){var e={portal:B,isValidPortalTarget:L},t=G.current.data;JSON.stringify(e)!==JSON.stringify(t)&&(G.current.data=e,Y.current.refreshPosition())}),[B,L]);var X=e.createElement(e.Fragment,null,function(){if(!g||!W)return null;var t=e.createElement("div",{ref:_,style:U.arrow}),n=i(g)?{children:g}:{className:"ep-arrow ".concat(S?"ep-shadow":""," ").concat(E)};return l(t,n)}(),e.createElement("div",{className:S?"ep-popper-shadow":"",style:U.popper},e.createElement("div",{ref:z},d)));return e.createElement("div",{ref:function(e){if(e&&(e.removeTransition=R,e.refreshPosition=function(){return setTimeout((function(){return k(Y,z,_,J,{})}),10)}),Y.current=e,s instanceof Function)return s(e);s&&(s.current=e)},className:y,style:U.element},c,B&&j?u(X,L?P:G.current):X)}));function k(e,t,n,r,a){var o=r.position,i=r.fixMainPosition,l=r.fixRelativePosition,s=r.offsetY,c=void 0===s?0:s,u=r.offsetX,d=void 0===u?0:u,f=r.defaultArrow,h=r.animations,m=void 0===h?[]:h,p=r.zIndex,y=r.onChange;if(e.current&&t.current){var g,v,b,w,E=(v=void 0!==window.pageXOffset,b="CSS1Compat"===(document.compatMode||""),{scrollLeft:v?window.pageXOffset:b?document.documentElement.scrollLeft:document.body.scrollLeft,scrollTop:v?window.pageYOffset:b?document.documentElement.scrollTop:document.body.scrollTop}),C=E.scrollLeft,$=E.scrollTop,k=M(e.current,C,$),N=k.top,S=k.left,H=k.height,I=k.width,A=k.right,B=k.bottom,P=M(t.current,C,$),j=P.top,L=P.left,F=P.height,W=P.width,Y=document.documentElement,z=Y.clientHeight,_=Y.clientWidth,G=t.current.parentNode,J=function(e){if(!e)return[0,0];var t=D((e.style.transform.match(/translate\((.*?)px,\s(.*?)px\)/)||[]).map((function(e){return Number(e)})),3),n=t[1],r=void 0===n?0:n,a=t[2];return[r,void 0===a?0:a]}(G),R=D(J,2),U=R[0],X=R[1],V=function(e){var t=D(e.split("-"),2),n=t[0],r=void 0===n?"bottom":n,a=t[1],o=void 0===a?"center":a;"auto"===r&&(r="bottom"),"auto"===o&&(o="center");var i="top"===r||"bottom"===r,l="left"===r||"right"===r;return l&&("start"===o&&(o="top"),"end"===o&&(o="bottom")),i&&("start"===o&&(o="left"),"end"===o&&(o="right")),[r,o,i,l]}(o),Z=D(V,4),K=Z[0],q=Z[1],Q=Z[2],ee=Z[3],te=K,ne=function(e,t){return"translate(".concat(e,"px, ").concat(t,"px)")},re=I-W,ae=H-F,oe="left"===q?0:"right"===q?re:re/2,ie=re-oe,le="top"===q?0:"bottom"===q?ae:ae/2,se=ae-le,ce=S-L+U,ue=N-j+X,de=0,fe=0,he=O(e.current),me=[],pe=n.current,ye=M(pe,C,$)||{},ge=ye.height,ve=void 0===ge?0:ge,be=ye.width,we=void 0===be?0:be,xe=ce,Ee=ue,De={top:"bottom",bottom:"top",left:"right",right:"left"};for(Q&&(ce+=oe,ue+="top"===K?-F:H,f&&(ve=11,we=20)),ee&&(ce+="left"===K?-W:I,ue+=le,f&&(ve=20,we=11));he;)me.push(he),$e(M(he,C,$)),he=O(he.parentNode);$e({top:$,bottom:$+z,left:C,right:C+_,height:z,width:_}),Q&&(ue+="bottom"===te?c:-c),ee&&(ce+="right"===te?d:-d),ce-=de,ue-=fe,g=De[te],pe&&(Q&&((w=I<W)?xe+=I/2:xe=ce+W/2,xe-=we/2,"bottom"===te&&(Ee=ue,ue+=ve),"top"===te&&(Ee=(ue-=ve)+F),de<0&&de-oe<0&&(w?xe+=(oe-de)/2:I-oe+de<W&&(xe+=(I-oe+de-W)/2)),de>0&&de+ie>0&&(w?xe-=(de+ie)/2:I-de-ie<W&&(xe-=(I-de-ie-W)/2))),ee&&((w=H<F)?Ee+=H/2:Ee=ue+F/2,Ee-=ve/2,"left"===te&&(xe=(ce-=we)+W),"right"===te&&(xe=ce,ce+=we),fe<0&&fe-le<0&&(w?Ee+=(le-fe)/2:H-le+fe<F&&(Ee+=(H-le+fe-F)/2)),fe>0&&fe+se>0&&(w?Ee-=(fe+se)/2:H-fe-se<F&&(Ee-=(H-fe-se-F)/2))),pe.setAttribute("direction",g),pe.style.height=ve+"px",pe.style.width=we+"px",pe.style.transform=ne(xe,Ee),pe.style.visibility="visible",pe.style.zIndex=p+1),G.style.transform=ne(ce,ue);var Ce={popper:{top:ue,bottom:ue+F,left:ce,right:ce+W,height:F,width:W},element:{top:N,bottom:B,left:S,right:A,height:H,width:I},arrow:{top:Ee,bottom:Ee+ve,left:xe,right:xe+we,height:ve,width:we,direction:g},position:te+"-"+(0!==de?"auto":q),scroll:{scrollLeft:C,scrollTop:$},scrollableParents:me,event:a};a||m.forEach((function(e){e({popper:G,arrow:pe,data:x(x({},Ce),{},{getTransform:ne,mirror:De})})})),G.style.visibility="visible","function"==typeof y&&y(Ce)}function $e(e){var t=e.top,n=e.bottom,r=e.left,a=e.right,o=e.height,s=e.width;if(Q){var u=Math.round(N-t+H/2),f=Math.round(o/2);i||(N-(F+c+ve)<t&&u<=f&&"top"===te?(ue+=F+H,te="bottom"):B+F+c+ve>o+t&&u>=f&&"bottom"===te&&(ue-=F+H,te="top")),l||(S+oe<r&&(de=T(A-we>r?S+oe-r:-I+oe+we,de)),A-ie>a&&(de=T(S+we<a?A-ie-a:I-ie-we,de)))}if(ee){var h=Math.round(S-r+I/2),m=Math.round(s/2);i||(S-(W+d+we)<r&&h<m&&"left"===te?(ce+=I+W,te="right"):A+W+d+we>a&&h>m&&"right"===te&&(ce-=I+W,te="left")),l||(N+le<t&&(fe=T(B-ve>t?N+le-t:-H+le+ve,fe)),B-se>n&&(fe=T(N+ve<n?B-se-n:H-se-ve,fe)))}}}function M(e,t,n){if(e){var r=e.getBoundingClientRect(),a=r.top,o=r.left,i=r.width,l=r.height,s=a+n,c=o+t;return{top:s,bottom:s+l,left:c,right:c+i,width:i,height:l}}}function O(e){if(e&&"HTML"!==e.tagName){var t=window.getComputedStyle(e),n=function(e){return["auto","scroll"].includes(e)};return e.clientHeight<e.scrollHeight&&n(t.overflowX)||e.clientWidth<e.scrollWidth&&n(t.overflowY)?e:O(e.parentNode)}}function T(e,t){return Math.round(Math.abs(e))>Math.round(Math.abs(t))?e:t}!function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===n&&r.firstChild?r.insertBefore(a,r.firstChild):r.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}(".calendarContainerEt{width:320px}.gridSevenEt{display:grid;grid-template-columns:repeat(7,minmax(0,1fr))}.w-fullEt{width:100%}.dayText{color:#000;font-size:.9rem}.dayOfWeek{color:#000;font-size:.8rem}.centerGrid{display:grid;place-content:center}.rowHeight{height:2rem}.borderTop{border-top:1px solid #eee}.grayText{color:#a0a0a0}.backgroundBlue,.backgroundBlue:hover{background-color:#83b5ff;color:#fff}.dateWidthAndHeight{border-radius:50%;height:1.7rem;width:1.7rem}.currentMonth:hover,.selectedDate{background-color:#2a2a2a;color:#fff;cursor:pointer;transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.monthButtons{align-items:center;display:flex;gap:.5rem}.monthButton,.todayButton{cursor:pointer}.monthButton{height:20px;width:20px}.topActions{align-items:center;display:flex;font-weight:500;justify-content:space-between;margin-bottom:.5rem}.buttonStyle{background-size:cover;border:none;border-radius:50%;cursor:pointer;height:15px;margin-right:7px;width:15px}.buttonBackgroundEt{background:linear-gradient(180deg,#078930,#fcd116,#ce1126);background-size:cover}.buttonBackgroundEn{background:linear-gradient(.2deg,#3cf 4.8%,#36f 85.5%);background-size:cover}.Cal{background-color:#fff;border-radius:5px;box-shadow:0 2px 8px 0 rgba(99,99,99,.2);margin-top:0;padding:10px;user-select:none;width:fit-content}.datePickerContainerEt{background-color:#fff;border:2px solid #ccc;border-radius:4px;display:inline-block;height:100%;padding:5px 10px;position:relative}.datePickerContainerEt:hover{border:2px solid #83b5ff}.datePickerContainerEt:focus-within{border:2px solid #83b5ff}.blueOpen{border:2px solid #83b5ff}.dateInputStyle{border:none;box-sizing:border-box;cursor:pointer;flex-grow:1;outline:none;padding:8px 10px;user-select:none;width:100%}.calendarIcon{color:#555;cursor:pointer;margin-left:20px}.etIndividualInput{border:1px solid #ced4da;border-radius:4px;font-size:16px;margin-right:8px;outline:none;padding:10px;&:focus{border-color:#3f51b5;box-shadow:0 0 0 .2rem rgba(63,81,181,.25)}}.etHeight{min-height:200px}.etDateLabel{color:#555;font-size:14px;font-weight:600;margin-bottom:5px}");const N=e=>e%4==3?6:5,S=(e,t,n,r)=>n?1===e?N(t-1):30:r?12===e?N(t):30:13===e?N(t):30,H=(e=h(p().year(),p().month()+1,p().date())[1],t=h(p().year(),p().month()+1,p().date())[2])=>{const n=[],r=S(e,t,!0,!1);for(let a=r-((e,t,n)=>{const r=m(e,t,n);return p().year(r[0]).month(r[1]-1).date(r[2]).day()})(t,e,1)+1;a<=r;a++)n.push({day:a,isCurrentMonth:!1});for(let r=1;r<=S(e,t,!1,!1);r++)n.push({day:r,isCurrentMonth:!0,today:p().isSame(p().year(m(t,e,r)[0]).month(m(t,e,r)[1]-1).date(m(t,e,r)[2]),"day"),date:p().year(m(t,e,r)[0]).month(m(t,e,r)[1]-1).date(m(t,e,r)[2]).startOf("day")});const a=42-n.length;for(let r=S(e,t,!1,!1)+1;r<=S(e,t,!1,!1)+a;r++)r-S(e,t,!1,!1)<=S(e,t,!1,!0)?n.push({day:r-S(e,t,!1,!1),isCurrentMonth:!1}):n.push({day:r-(S(e,t,!1,!1)+S(e,t,!1,!0)),isCurrentMonth:!1});return n},I=["መስከረም","ጥቅምት","ኅዳር","ታህሳስ","ጥር","የካቲት","መጋቢት","ሚያዝያ","ግንቦት","ሰኔ","ሐምሌ","ነሐሴ","ጳጉሜ"],A=["Meskerem","Tikimt","Hidar","Tahsas","Tir","Yekatit","Megabit","Miazia","Genbot","Sene","Hamle","Nehase","Pagume"];var B={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},P=e.createContext&&e.createContext(B),j=window&&window.__assign||function(){return j=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},j.apply(this,arguments)},L=window&&window.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};function F(t){return t&&t.map((function(t,n){return e.createElement(t.tag,j({key:n},t.attr),F(t.child))}))}function W(t){return function(n){return e.createElement(Y,j({attr:j({},t.attr)},n),F(t.child))}}function Y(t){var n=function(n){var r,a=t.attr,o=t.size,i=t.title,l=L(t,["attr","size","title"]),s=o||n.size||"1em";return n.className&&(r=n.className),t.className&&(r=(r?r+" ":"")+t.className),e.createElement("svg",j({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},n.attr,a,l,{className:r,style:j(j({color:t.color||n.color},n.style),t.style),height:s,width:s,xmlns:"http://www.w3.org/2000/svg"}),i&&e.createElement("title",null,i),t.children)};return void 0!==P?e.createElement(P.Consumer,null,(function(e){return n(e)})):n(B)}function z(e){return W({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"polyline",attr:{fill:"none",strokeWidth:"2",points:"9 6 15 12 9 18"}}]})(e)}function _(e){return W({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"polyline",attr:{fill:"none",strokeWidth:"2",points:"9 6 15 12 9 18",transform:"matrix(-1 0 0 1 24 0)"}}]})(e)}function G(e){return W({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"polyline",attr:{fill:"none",strokeWidth:"2",points:"7 2 17 12 7 22"}}]})(e)}function J(e){return W({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"polyline",attr:{fill:"none",strokeWidth:"2",points:"7 2 17 12 7 22",transform:"matrix(-1 0 0 1 24 0)"}}]})(e)}const R=({en:t,am:n,selectedLang:r})=>e.createElement("div",null,"am"===r?n:t);function U(...e){return e.filter(Boolean).join(" ")}const X=({minDateIn:t,maxDateIn:r,selectedDate:a,toggleCalendarType:i,etToday:l,setEtToday:c,days:u,disableFuture:d,disabled:f,handleDateChange:m,lang:p,isFutureDate:y,etCurrentDate:g})=>{const[v,b]=s(!1),w=n(null),x=n(null);return o((()=>{if(w.current&&x.current){const e=x.current.offsetTop,t=x.current.offsetHeight,n=w.current.offsetHeight;w.current.scrollTop=e-n/2+t/2}}),[v]),e.createElement(e.Fragment,null,e.createElement("div",{className:"calendarContainerEt"},e.createElement("div",{className:"topActions"},e.createElement("span",null,e.createElement("button",{onClick:e=>i(e),className:"buttonStyle buttonBackgroundEt"}),e.createElement("span",{style:{cursor:"pointer"},onClick:()=>b(!v)},"am"===p?e.createElement(e.Fragment,null,I[l[1]-1],", ",l[0]):e.createElement(e.Fragment,null,A[l[1]-1],", ",l[0]))),!v&&e.createElement("div",{className:"monthButtons"},e.createElement(J,{onClick:()=>{return c((e=l[0],t=l[1],n=l[2],[e-1,t,n]));var e,t,n},className:"monthButton"}),e.createElement(_,{onClick:()=>{return c((e=l[0],t=l[1],n=l[2],1===t?[e-1,13,1]:[e,t-1,n]));var e,t,n},className:"monthButton"}),e.createElement("span",{onClick:()=>c(g),className:"todayButton"},e.createElement(R,{selectedLang:p,am:"ዛሬ",en:"Today"})),e.createElement(z,{onClick:()=>{return c((e=l[0],t=l[1],n=l[2],13===t?[e+1,1,n]:[e,t+1,n]));var e,t,n},className:"monthButton"}),e.createElement(G,{onClick:()=>{return c((e=l[0],t=l[1],n=l[2],[e+1,t,n]));var e,t,n},className:"monthButton"}))),v?e.createElement("div",{className:"yearsGridContainer",ref:w,style:{overflowY:"auto",maxHeight:"260px"}},e.createElement("div",{className:"yearsGrid",style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"10px"}},Array.from({length:200},((e,t)=>1900+t)).map((n=>{const a=l[0]===n;if(t){if(h(new Date(t).getFullYear(),new Date(t).getMonth()+1,new Date(t).getDate())[0]>n)return}if(r){if(h(new Date(r).getFullYear(),new Date(r).getMonth()+1,new Date(r).getDate())[0]<n)return}return e.createElement("div",{key:n,ref:a?x:null,onClick:e=>{e.stopPropagation(),b(!1),c([n,l[1],l[2]])},className:U("yearItem",a?"backgroundBlue":""),style:{padding:"5px",textAlign:"center"}},n)})))):e.createElement("div",{className:"etHeight"},e.createElement("div",{className:"gridSevenEt w-fullEt "},"am"===p?["እ","ሰ","ማ","ረ","ሐ","ዓ","ቅ"].map(((t,n)=>e.createElement("span",{key:n,className:"rowHeight dayOfWeek centerGrid"},t))):u.map(((t,n)=>e.createElement("span",{key:n,className:"rowHeight dayOfWeek centerGrid"},t)))),e.createElement("div",{className:" gridSevenEt w-fullEt etHeight"},H(l[1],l[0]).map((({day:n,isCurrentMonth:o,today:i,date:l},s)=>{const c=d&&y(l),u=a&&new Date(a).getTime()===new Date(l).getTime();return e.createElement("span",{key:s,onClick:()=>{o&&(f||c||t&&!(t<=l)||r&&!(r>=l)||m(l))},className:" rowHeight dayText rowHeight centerGrid borderTop"},e.createElement("span",{className:U(o?"":"grayText",t&&t>=l?"grayText":"",r&&r<=l?"grayText":"",f?"grayText":"",c?"grayText":"",i?"backgroundBlue ":"","dateWidthAndHeight centerGrid",o?"currentMonth":"",u?"selectedDate":"")},n))}))))))},V=["January","February","March","April","May","June","July","August","Septemper","October","November","December"],Z=e=>e%4==0&&e%100!=0||e%400==0,K=({minDateIn:t,maxDateIn:r,selectedDate:a,toggleCalendarType:i,today:l,setToday:c,days:u,disableFuture:d,disabled:f,handleDateChange:m,isFutureDate:y,currentDate:g})=>{const[v,b]=s(!1),w=n(null),x=n(null);return o((()=>{if(w.current&&x.current){const e=x.current.offsetTop,t=x.current.offsetHeight,n=w.current.offsetHeight;w.current.scrollTop=e-n/2+t/2}}),[v]),e.createElement(e.Fragment,null,e.createElement("div",{className:"calendarContainerEt"},e.createElement("div",{className:"topActions"},e.createElement("span",null,e.createElement("button",{onClick:e=>i(e),className:"buttonBackgroundEn buttonStyle"}),e.createElement("span",{style:{cursor:"pointer"},onClick:()=>b(!v)},V[l.month()],", ",l.year())),!v&&e.createElement("div",{className:"monthButtons"},e.createElement(J,{onClick:()=>c(l.year(l.year()-1)),className:"monthButton"}),e.createElement(_,{onClick:()=>c(l.month(l.month()-1)),className:"monthButton"}),e.createElement("span",{onClick:()=>c(g),className:"todayButton"},"Today"),e.createElement(z,{onClick:()=>c(l.month(l.month()+1)),className:"monthButton"}),e.createElement(G,{onClick:()=>c(l.year(l.year()+1)),className:"monthButton"}))),v?e.createElement("div",{className:"yearsGridContainer",ref:w,style:{overflowY:"auto",maxHeight:"260px"}},e.createElement("div",{className:"yearsGrid",style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"10px"}},Array.from({length:200},((e,t)=>1900+t)).map((n=>{const a=l.year()===n;return t&&new Date(t).getFullYear()>n||r&&new Date(r).getFullYear()<n?null:e.createElement("div",{key:n,ref:a?x:null,onClick:e=>{e.stopPropagation(),b(!1),c(l.year(n))},className:U("yearItem",a?"backgroundBlue":""),style:{padding:"5px"}},n)})))):e.createElement("div",{className:"etHeight"}," ",e.createElement("div",{className:"gridSevenEt w-fullEt"},u.map(((t,n)=>e.createElement("span",{key:n,className:"rowHeight dayOfWeek centerGrid"},t)))),e.createElement("div",{className:" gridSevenEt w-fullEt"},((e=p().month(),t=p().year())=>{const n=p().year(t).month(e).startOf("month"),r=p().year(t).month(e).endOf("month"),a=[];for(let e=0;e<n.day();e++){const t=n.date(e);h(t.year(),t.month()+1,t.date()),a.push({day:"",date:n.day(e),isCurrentMonth:!1,etDate:h(t.year(),t.month()+1,t.date())})}for(let e=n.date();e<=r.date();e++){const t=n.date(e);a.push({day:"",date:n.date(e),isCurrentMonth:!0,today:p().isSame(n.date(e),"day"),etDate:h(t.year(),t.month()+1,t.date())})}const o=42-a.length;for(let e=r.date()+1;e<=r.date()+o;e++)n.date(e),a.push({day:"",date:r.date(e).startOf("day"),firstDateOfMonth:n.date(e),isCurrentMonth:!1});return a})(l.month(),l.year()).map((({date:n,isCurrentMonth:o,today:i},l)=>{const s=d&&y(n),c=a&&new Date(a).getTime()===new Date(n).getTime();return e.createElement("span",{onClick:()=>{o&&(f||s||t&&!(t<=n)||r&&!(r>=n)||m(n))},key:l,className:"rowHeight dayText rowHeight centerGrid borderTop"},e.createElement("span",{className:U(o?"":"grayText",t&&t>=n?"grayText":"",r&&r<=n?"grayText":"",f?"grayText":"",s?"grayText":"",i?"backgroundBlue ":"","dateWidthAndHeight centerGrid",o?"currentMonth":"",c?"selectedDate":"")},n.date()))}))))))};function q(e){return W({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}},{tag:"line",attr:{x1:"16",y1:"2",x2:"16",y2:"6"}},{tag:"line",attr:{x1:"8",y1:"2",x2:"8",y2:"6"}},{tag:"line",attr:{x1:"3",y1:"10",x2:"21",y2:"10"}}]})(e)}const Q=({fullWidth:t,handleInputClick:r,date:a,setDate:o,handleDateChange:i,calendarTypeInt:l,showCalendar:s,label:c})=>{const u=n(null),d=n(null),f=n(null),h=e=>{e.target.select()},y=e=>{e.preventDefault(),e.target.focus(),e.target.select()},g=(e,t,n)=>{if(l){const r=m(e,t,n);i(p().year(r[0]).month(r[1]-1).date(r[2]).startOf("day"))}else i(p().year(e).month(t-1).date(n).startOf("day"))},v=e=>e.padStart(2,"0"),b=e=>{const{name:t,value:n}=e.target;n&&n.length<2&&"year"!==t&&o({...a,[t]:v(n)})},w=e=>{["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)&&e.preventDefault()},x=e=>{const{name:t,value:n}=e.target;if(!isNaN(n)&&!(0==+n&&n.length>1)&&!("day"===t&&13==+a.month&&l&&+n>6)&&!("month"===t&&+a.year&&+a.day&&+n>12&&+a.day>N(+a.year)&&l)&&("day"!==t||2!=+a.month&&4!=+a.month&&6!=+a.month&&9!=+a.month&&11!=+a.month||!(+n>30)||l)&&(!("month"===t&&+a.day&&+a.day>30)||l||2!=+n&&4!=+n&&6!=+n&&9!=+n&&11!=+n)){if("month"===t&&2==+n&&!l){if(+a.day>29)return;if(+a.day>28&&!Z(+a.year))return}if("day"===t&&2==+a.month&&!l){if(+n>29)return;if(+n>28&&!Z(+a.year))return}if("year"===t&&2==+a.month&&!l&&4===n.length){if(+a.day>29)return;if(+a.day>28&&!Z(+n))return}"day"===t&&13==+a.month&&l&&+n>5&&""!==+a.year&&N(+a.year)<+n||"month"===t&&+n>13&&l||"month"===t&&+n>12&&!l||"day"===t&&+n>30&&l||"day"===t&&+n>31||(o({...a,[t]:n}),4===a.year.length&&+a.month>0&&+a.day>0&&g(+a.year,+a.month,+a.day),"year"===t&&4===n.length&&+a.month>0&&+a.day>0&&g(+n,+a.month,+a.day),"month"===t&&+n>0&&4===a.year.length&&+a.day>0&&g(+a.year,+n,+a.day),"day"===t&&+n>0&&4===a.year.length&&+a.day>0&&g(+a.year,+a.month,+n),n.length>0&&"year"!==t&&("month"===t&&+n>1?f.current.focus():"day"===t&&n>3?u.current.focus():"month"===t&&2===n.length?f.current.focus():"day"===t&&2===n.length&&u.current.focus()))}};return e.createElement("div",{className:"datePickerContainerEt "+(s?"blueOpen":""),style:{width:t?"100%":"inherit",padding:"0.5rem"}},c&&e.createElement("label",{className:"etDateLabel"},c),e.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},e.createElement("div",null,e.createElement("input",{ref:d,autoComplete:"off",type:"text",value:a.day,onChange:x,onFocus:h,onMouseDown:y,onKeyDown:w,placeholder:"DD",onBlur:b,maxLength:"2",name:"day",className:"dateInputStyle",style:{width:"20px",textAlign:"left",padding:0}}),e.createElement("span",null,"/"),e.createElement("input",{ref:u,type:"text",value:a.month,onChange:x,onFocus:h,onBlur:b,onMouseDown:y,onKeyDown:w,placeholder:"MM",maxLength:"2",name:"month",autoComplete:"off",className:"dateInputStyle",style:{width:"23px",textAlign:"left",padding:0,paddingLeft:"1px"}}),e.createElement("span",null,"/"),e.createElement("input",{ref:f,type:"text",value:a.year,onChange:x,onMouseDown:y,onKeyDown:w,onFocus:h,placeholder:"YYYY",maxLength:"4",name:"year",className:"dateInputStyle",autoComplete:"off",style:{width:"45px",textAlign:"left",padding:0}}),e.createElement("span",{style:{fontSize:"12px"}},l?"ET":"GC")),e.createElement("div",{onClick:r,style:{cursor:"pointer"}},e.createElement(q,{className:"calendarIcon"}))))},ee=document.createElement("div");ee.setAttribute("id","date-picker-portal"),document.body.appendChild(ee);const te=({value:t,onChange:r,calendarType:a,minDate:i,maxDate:l,name:u,disabled:d=!1,disableFuture:f=!1,fullWidth:m,borderRadius:y,placeholder:g=!1,lang:v,label:b="Date"})=>{let w=null,x=null;i&&(w=new Date(i).setHours(0,0,0,0)),l&&(x=new Date(l).setHours(0,0,0,0));const[E,D]=s(null==a||a);o((()=>{D(null==a||a)}),[a]);const C=p(),k=h(C.year(),C.month()+1,C.date()),[M,O]=s(C),[T,N]=s(k),[S,H]=s({day:"",month:"",year:""}),I=["S","M","T","W","T","F","S"],A=n(null),B=n(null),[P,j]=s(t),L=e=>new Date(e).getTime()>(new Date).setHours(0,0,0,0),[F,W]=s(!1);o((()=>{j(t)}),[t]);const Y=e=>{if(x&&e>p(x)?e=p(x):w&&e<p(w)&&(e=p(w)),!0===E){const t=h(e.year(),e.month()+1,e.date());N(t),H({day:t[2]<10?`0${t[2]}`:t[2],month:t[1]<10?`0${t[1]}`:t[1],year:t[0]<10?`0${t[0]}`:t[0]})}else H({day:e.date()<10?`0${e.date()}`:e.date(),month:e.month()+1<10?`0${e.month()+1}`:e.month()+1,year:e.year()}),O(e);j(e),W(!1),r&&r(e)},z=e=>{if(E&&P)H({day:P.date()<10?`0${P.date()}`:P.date(),month:P.month()+1<10?`0${P.month()+1}`:P.month()+1,year:P.year()});else if(!E&&P){const e=h(P.year(),P.month()+1,P.date());H({day:e[2]<10?`0${e[2]}`:e[2],month:e[1]<10?`0${e[1]}`:e[1],year:e[0]<10?`0${e[0]}`:e[0]})}if(e.stopPropagation(),W(!0),P){O(P);const e=h(P.year(),P.month()+1,P.date());N(e)}else O(C),N(k);D(!E)};return o((()=>{function e(e){A.current&&!A.current.contains(e.target)&&W(!1)}return document.addEventListener("click",e),()=>document.removeEventListener("click",e)}),[]),o((()=>(document.body.appendChild(ee),()=>{document.body.removeChild(ee)})),[]),e.createElement(e.Fragment,null,e.createElement("div",null,c.createPortal(e.createElement($,{ref:A,zIndex:1e3,element:e.createElement(Q,{fullWidth:m,borderRadius:y,inputRef:B,handleInputClick:e=>{e.stopPropagation(),W((e=>!e))},placeholder:g,name:u,lang:v,label:b,date:S,setDate:H,handleDateChange:Y,calendarTypeInt:E,showCalendar:F}),popper:e.createElement("div",null," ",e.createElement("div",null,e.createElement("div",{className:"Cal"},!0===E&&e.createElement(X,{minDateIn:w,maxDateIn:x,selectedDate:P,toggleCalendarType:z,handleDateChange:Y,disabled:d,disableFuture:f,lang:v,etToday:T,setEtToday:N,days:I,isFutureDate:L,etCurrentDate:k}),!1===E&&e.createElement(K,{minDateIn:w,maxDateIn:x,selectedDate:P,toggleCalendarType:z,handleDateChange:Y,disabled:d,disableFuture:f,lang:v||!1,today:M,setToday:O,days:I,isFutureDate:L,currentDate:C})))),active:F,position:"bottom-start"}),ee)))};export{te as EtCalendar};
