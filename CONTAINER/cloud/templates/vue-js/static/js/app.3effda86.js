(function(e){function t(t){for(var r,u,l=t[0],a=t[1],i=t[2],d=0,b=[];d<l.length;d++)u=l[d],Object.prototype.hasOwnProperty.call(c,u)&&c[u]&&b.push(c[u][0]),c[u]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]);s&&s(t);while(b.length)b.shift()();return o.push.apply(o,i||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,l=1;l<n.length;l++){var a=n[l];0!==c[a]&&(r=!1)}r&&(o.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},c={app:0},o=[];function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],a=l.push.bind(l);l.push=t,l=l.slice();for(var i=0;i<l.length;i++)t(l[i]);var s=a;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},4396:function(e,t,n){"use strict";n("d671")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),c=n("cf05"),o=n.n(c),u=Object(r["d"])("img",{alt:"Vue logo",src:o.a},null,-1);function l(e,t,n,c,o,l){var a=Object(r["l"])("HelloWorld");return Object(r["h"])(),Object(r["c"])(r["a"],null,[u,Object(r["f"])(a,{msg:"Vue.js on Serverless Cloud"})],64)}n("b0c0");var a=function(e){return Object(r["j"])("data-v-64cd8248"),e=e(),Object(r["i"])(),e},i={class:"hello"},s=a((function(){return Object(r["d"])("p",null,[Object(r["e"])(" For a guide and recipes on how to configure / customize this project,"),Object(r["d"])("br"),Object(r["e"])(" check out the "),Object(r["d"])("a",{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"},"vue-cli documentation"),Object(r["e"])(". ")],-1)})),d=a((function(){return Object(r["d"])("p",null," The information below is being fetched from your Serverless Cloud API: ",-1)})),b={key:0},f={key:1},p=a((function(){return Object(r["d"])("strong",null,"No users found",-1)})),j=[p],O={key:2,id:"users"},h=a((function(){return Object(r["d"])("h3",null,"Edit this Vue.js app locally:",-1)})),v=a((function(){return Object(r["d"])("p",null,[Object(r["e"])(" Open a separate terminal, run "),Object(r["d"])("code",null,"cd frontend"),Object(r["e"])(" and then "),Object(r["d"])("code",null,"npm i"),Object(r["e"])(" to install the Vue.js dependencies. Run "),Object(r["d"])("code",null,"npm run serve"),Object(r["e"])(" to launch a local version enabling you to make changes and view them locally. If you want to connect to your personal developer instance from your local Vue project, update the "),Object(r["d"])("code",null,"axios.defaults.baseURL"),Object(r["e"])(" in "),Object(r["d"])("code",null,"/frontend/src/main.js"),Object(r["e"])(" to your URL. ")],-1)}));function g(e,t,n,c,o,u){return Object(r["h"])(),Object(r["c"])("div",i,[Object(r["d"])("h1",null,Object(r["m"])(n.msg),1),s,d,o.loading?(Object(r["h"])(),Object(r["c"])("div",b,"Loading users...")):0==o.users.length?(Object(r["h"])(),Object(r["c"])("div",f,j)):(Object(r["h"])(),Object(r["c"])("div",O,[(Object(r["h"])(!0),Object(r["c"])(r["a"],null,Object(r["k"])(o.users,(function(e){return Object(r["h"])(),Object(r["c"])("div",{key:e.id},[Object(r["d"])("strong",null,Object(r["m"])(e.value.name)+": ",1),Object(r["d"])("span",{class:Object(r["g"])(e.value.status)},Object(r["m"])(e.value.status),3)])})),128))])),h,v])}var m=n("bc3a"),y=n.n(m),w={name:"HelloWorld",props:{msg:String},data:function(){return{users:[],loading:!0}},created:function(){var e=this;y.a.get("/api/users").then((function(t){e.users=t.data.users,e.loading=!1})).catch((function(t){console.log(t),e.loading=!1}))}},k=(n("7f13"),n("6b0d")),_=n.n(k);const x=_()(w,[["render",g],["__scopeId","data-v-64cd8248"]]);var P=x,S={name:"App",components:{HelloWorld:P}};n("4396");const V=_()(S,[["render",l]]);var L=V;y.a.defaults.baseURL="",Object(r["b"])(L).mount("#app")},"7f13":function(e,t,n){"use strict";n("bee1")},bee1:function(e,t,n){},cf05:function(e,t,n){e.exports=n.p+"img/logo.82b9c7a5.png"},d671:function(e,t,n){}});
//# sourceMappingURL=app.3effda86.js.map