(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user-profile"],{"169a":function(t,e,i){"use strict";i("caad"),i("45fc"),i("a9e3"),i("2532"),i("498a");var a=i("5530"),n=i("ade3"),s=(i("368e"),i("480e")),r=i("4ad4"),o=i("b848"),c=i("75eb"),l=i("e707"),u=i("e4d3"),d=i("21be"),v=i("f2e7"),h=i("a293"),m=i("58df"),f=i("d9bd"),g=i("80d2"),p=Object(m["a"])(r["a"],o["a"],c["a"],l["a"],u["a"],d["a"],v["a"]);e["a"]=p.extend({name:"v-dialog",directives:{ClickOutside:h["a"]},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data:function(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200}},computed:{classes:function(){var t;return t={},Object(n["a"])(t,"v-dialog ".concat(this.contentClass).trim(),!0),Object(n["a"])(t,"v-dialog--active",this.isActive),Object(n["a"])(t,"v-dialog--persistent",this.persistent),Object(n["a"])(t,"v-dialog--fullscreen",this.fullscreen),Object(n["a"])(t,"v-dialog--scrollable",this.scrollable),Object(n["a"])(t,"v-dialog--animated",this.animate),t},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(t){t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind())},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created:function(){this.$attrs.hasOwnProperty("full-width")&&Object(f["d"])("full-width",this)},beforeMount:function(){var t=this;this.$nextTick((function(){t.isBooted=t.isActive,t.isActive&&t.show()}))},beforeDestroy:function(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick((function(){t.animate=!0,window.clearTimeout(t.animateTimeout),t.animateTimeout=window.setTimeout((function(){return t.animate=!1}),150)}))},closeConditional:function(t){var e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):l["a"].options.methods.hideScroll.call(this)},show:function(){var t=this;!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((function(){t.$refs.content.focus(),t.bind()}))},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside:function(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown:function(t){if(t.keyCode===g["w"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var e=this.getActivator();this.$nextTick((function(){return e&&e.focus()}))}this.$emit("keydown",t)},onFocusin:function(t){if(t&&this.retainFocus){var e=t.target;if(e&&![document,this.$refs.content].includes(e)&&!this.$refs.content.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((function(t){return t.contains(e)}))){var i=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');i.length&&i[0].focus()}}},genContent:function(){var t=this;return this.showLazyContent((function(){return[t.$createElement(s["a"],{props:{root:!0,light:t.light,dark:t.dark}},[t.$createElement("div",{class:t.contentClasses,attrs:Object(a["a"])({role:"document",tabindex:t.isActive?0:void 0},t.getScopeIdAttrs()),on:{keydown:t.onKeydown},style:{zIndex:t.activeZIndex},ref:"content"},[t.genTransition()])])]}))},genTransition:function(){var t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent:function(){var t={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:this.onClickOutside,args:{closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{}};return this.fullscreen||(t.style={maxWidth:"none"===this.maxWidth?void 0:Object(g["g"])(this.maxWidth),width:"auto"===this.width?void 0:Object(g["g"])(this.width)}),this.$createElement("div",t,this.getContentSlot())}},render:function(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},"16b7":function(t,e,i){"use strict";i("a9e3");var a=i("2b0e");e["a"]=a["a"].extend().extend({name:"delayable",props:{openDelay:{type:[Number,String],default:0},closeDelay:{type:[Number,String],default:0}},data:function(){return{openTimeout:void 0,closeTimeout:void 0}},methods:{clearDelay:function(){clearTimeout(this.openTimeout),clearTimeout(this.closeTimeout)},runDelay:function(t,e){var i=this;this.clearDelay();var a=parseInt(this["".concat(t,"Delay")],10);this["".concat(t,"Timeout")]=setTimeout(e||function(){i.isActive={open:!0,close:!1}[t]},a)}}})},"21be":function(t,e,i){"use strict";i("99af"),i("caad"),i("2532");var a=i("2909"),n=i("2b0e"),s=i("80d2");e["a"]=n["a"].extend().extend({name:"stackable",data:function(){return{stackElement:null,stackExclude:null,stackMinZIndex:0,isActive:!1}},computed:{activeZIndex:function(){if("undefined"===typeof window)return 0;var t=this.stackElement||this.$refs.content,e=this.isActive?this.getMaxZIndex(this.stackExclude||[t])+2:Object(s["s"])(t);return null==e?e:parseInt(e)}},methods:{getMaxZIndex:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=this.$el,i=[this.stackMinZIndex,Object(s["s"])(e)],n=[].concat(Object(a["a"])(document.getElementsByClassName("v-menu__content--active")),Object(a["a"])(document.getElementsByClassName("v-dialog__content--active"))),r=0;r<n.length;r++)t.includes(n[r])||i.push(Object(s["s"])(n[r]));return Math.max.apply(Math,i)}}})},"2fa4":function(t,e,i){"use strict";i("20f6");var a=i("80d2");e["a"]=Object(a["i"])("spacer","div","v-spacer")},"368e":function(t,e,i){},"480e":function(t,e,i){"use strict";i("7db0");var a=i("7560");e["a"]=a["a"].extend({name:"v-theme-provider",props:{root:Boolean},computed:{isDark:function(){return this.root?this.rootIsDark:a["a"].options.computed.isDark.call(this)}},render:function(){return this.$slots.default&&this.$slots.default.find((function(t){return!t.isComment&&" "!==t.text}))}})},"4ad4":function(t,e,i){"use strict";i("caad"),i("45fc"),i("b0c0"),i("b64b");var a=i("53ca"),n=i("16b7"),s=i("f2e7"),r=i("58df"),o=i("80d2"),c=i("d9bd"),l=Object(r["a"])(n["a"],s["a"]);e["a"]=l.extend({name:"activatable",props:{activator:{default:null,validator:function(t){return["string","object"].includes(Object(a["a"])(t))}},disabled:Boolean,internalActivator:Boolean,openOnHover:Boolean},data:function(){return{activatorElement:null,activatorNode:[],events:["click","mouseenter","mouseleave"],listeners:{}}},watch:{activator:"resetActivator",openOnHover:"resetActivator"},mounted:function(){var t=Object(o["r"])(this,"activator",!0);t&&["v-slot","normal"].includes(t)&&Object(c["b"])('The activator slot must be bound, try \'<template v-slot:activator="{ on }"><v-btn v-on="on">\'',this),this.addActivatorEvents()},beforeDestroy:function(){this.removeActivatorEvents()},methods:{addActivatorEvents:function(){if(this.activator&&!this.disabled&&this.getActivator()){this.listeners=this.genActivatorListeners();for(var t=Object.keys(this.listeners),e=0,i=t;e<i.length;e++){var a=i[e];this.getActivator().addEventListener(a,this.listeners[a])}}},genActivator:function(){var t=Object(o["q"])(this,"activator",Object.assign(this.getValueProxy(),{on:this.genActivatorListeners(),attrs:this.genActivatorAttributes()}))||[];return this.activatorNode=t,t},genActivatorAttributes:function(){return{role:"button","aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genActivatorListeners:function(){var t=this;if(this.disabled)return{};var e={};return this.openOnHover?(e.mouseenter=function(e){t.getActivator(e),t.runDelay("open")},e.mouseleave=function(e){t.getActivator(e),t.runDelay("close")}):e.click=function(e){var i=t.getActivator(e);i&&i.focus(),e.stopPropagation(),t.isActive=!t.isActive},e},getActivator:function(t){if(this.activatorElement)return this.activatorElement;var e=null;if(this.activator){var i=this.internalActivator?this.$el:document;e="string"===typeof this.activator?i.querySelector(this.activator):this.activator.$el?this.activator.$el:this.activator}else if(1===this.activatorNode.length||this.activatorNode.length&&!t){var a=this.activatorNode[0].componentInstance;e=a&&a.$options.mixins&&a.$options.mixins.some((function(t){return t.options&&["activatable","menuable"].includes(t.options.name)}))?a.getActivator():this.activatorNode[0].elm}else t&&(e=t.currentTarget||t.target);return this.activatorElement=e,this.activatorElement},getContentSlot:function(){return Object(o["q"])(this,"default",this.getValueProxy(),!0)},getValueProxy:function(){var t=this;return{get value(){return t.isActive},set value(e){t.isActive=e}}},removeActivatorEvents:function(){if(this.activator&&this.activatorElement){for(var t=Object.keys(this.listeners),e=0,i=t;e<i.length;e++){var a=i[e];this.activatorElement.removeEventListener(a,this.listeners[a])}this.listeners={}}},resetActivator:function(){this.removeActivatorEvents(),this.activatorElement=null,this.getActivator(),this.addActivatorEvents()}}})},"75eb":function(t,e,i){"use strict";i("4160"),i("159b");var a=i("ade3"),n=i("53ca"),s=i("9d65"),r=i("80d2"),o=i("58df"),c=i("d9bd");function l(t){var e=Object(n["a"])(t);return"boolean"===e||"string"===e||t.nodeType===Node.ELEMENT_NODE}e["a"]=Object(o["a"])(s["a"]).extend({name:"detachable",props:{attach:{default:!1,validator:l},contentClass:{type:String,default:""}},data:function(){return{activatorNode:null,hasDetached:!1}},watch:{attach:function(){this.hasDetached=!1,this.initDetach()},hasContent:function(){this.$nextTick(this.initDetach)}},beforeMount:function(){var t=this;this.$nextTick((function(){if(t.activatorNode){var e=Array.isArray(t.activatorNode)?t.activatorNode:[t.activatorNode];e.forEach((function(e){if(e.elm&&t.$el.parentNode){var i=t.$el===t.$el.parentNode.firstChild?t.$el:t.$el.nextSibling;t.$el.parentNode.insertBefore(e.elm,i)}}))}}))},mounted:function(){this.hasContent&&this.initDetach()},deactivated:function(){this.isActive=!1},beforeDestroy:function(){try{if(this.$refs.content&&this.$refs.content.parentNode&&this.$refs.content.parentNode.removeChild(this.$refs.content),this.activatorNode){var t=Array.isArray(this.activatorNode)?this.activatorNode:[this.activatorNode];t.forEach((function(t){t.elm&&t.elm.parentNode&&t.elm.parentNode.removeChild(t.elm)}))}}catch(e){console.log(e)}},methods:{getScopeIdAttrs:function(){var t=Object(r["n"])(this.$vnode,"context.$options._scopeId");return t&&Object(a["a"])({},t,"")},initDetach:function(){var t;this._isDestroyed||!this.$refs.content||this.hasDetached||""===this.attach||!0===this.attach||"attach"===this.attach||(t=!1===this.attach?document.querySelector("[data-app]"):"string"===typeof this.attach?document.querySelector(this.attach):this.attach,t?(t.appendChild(this.$refs.content),this.hasDetached=!0):Object(c["c"])("Unable to locate target ".concat(this.attach||"[data-app]"),this))}}})},bbdc:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.loading?i("app-loader"):i("v-card",{staticClass:"mx-auto",attrs:{width:"700",elevation:"24",tile:""}},[i("v-img",{attrs:{height:"100%",src:"/images/beautiful-harvard-university.jpg",gradient:"to top right, rgba(0,0,0,.33), rgba(25,32,72,.53)"}},[i("v-row",{staticClass:"fill-height",attrs:{align:"start"}},[i("v-col",{attrs:{"align-self":"center",cols:"12",md:"4"}},[i("v-avatar",{staticClass:"profile",attrs:{size:"164",tile:""}},[i("v-img",{attrs:{"aspect-ratio":"1",src:"/images/1014-512.png"}})],1),i("div",{staticClass:"ml-4"},[i("v-list-item",{attrs:{color:"rgba(0, 0, 0, .4)",dark:""}},[i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v("Full name:")]),i("v-list-item-subtitle",{staticClass:"fullname"},[t._v(t._s(t.userInfo.name))])],1)],1),i("v-list-item",{attrs:{color:"rgba(0, 0, 0, .4)",dark:""}},[i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v("Email:")]),i("v-list-item-subtitle",[t._v(t._s(t.userInfo.email))])],1)],1)],1),i("div",{staticClass:"mx-10"},[i("app-edit-form")],1)],1),i("v-col",{attrs:{cols:"12",md:"8"}},[i("v-row",{attrs:{align:"center",justify:"center"}},[i("div",{staticClass:"d-flex align-center justify-center"},[i("v-img",{staticClass:"shrink logo-img ",attrs:{alt:"University Logo",contain:"",src:"/images/university-logo.png",transition:"scale-transition",width:"90"}})],1)]),i("v-row",[i("v-col",[i("v-list-item",{attrs:{color:"rgba(0, 0, 0, .4)",dark:""}},[i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v("Departmant:")]),i("v-list-item-subtitle",[t._v(t._s(t.userInfo.department))])],1)],1)],1),i("v-col",[i("v-list-item",{attrs:{color:"rgba(0, 0, 0, .4)",dark:""}},[i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v("Courses:")]),i("v-list-item-subtitle",t._l(t.courses,(function(e,a){return i("v-list-item",{key:a,attrs:{color:"rgba(0, 0, 0, .4)",dark:""}},[i("v-list-item-content",[i("v-list-item-subtitle",[t._v(t._s(e))])],1)],1)})),1)],1)],1)],1)],1)],1)],1)],1)],1)},n=[],s=(i("d81d"),i("96cf"),i("1da1")),r=i("5530"),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[i("v-btn",t._g({staticClass:"mb-2",attrs:{color:"primary",dark:""}},a),[t._v("Edit")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",{attrs:{color:"blue darken-3",dark:"",loading:t.isUpdating},scopedSlots:t._u([{key:"progress",fn:function(){return[i("v-progress-linear",{attrs:{absolute:"",color:"green lighten-3",height:"4",indeterminate:""}})]},proxy:!0}])},[i("v-img",{attrs:{height:"200",src:"/images/beautiful-harvard-university.jpg"}},[i("v-row",{attrs:{align:"center",justify:"center"}},[i("div",{staticClass:"d-flex align-center justify-center"},[i("v-img",{staticClass:"shrink logo-img ",attrs:{alt:"University Logo",contain:"",src:"/images/university-logo.png",transition:"scale-transition",width:"100"}})],1)]),i("v-row",{attrs:{align:"center",justify:"center"}},[i("v-col",{staticClass:"text-center"},[i("h3",{staticClass:"headline"},[t._v("University System")])])],1)],1),i("v-form",{ref:"updateForm",nativeOn:{submit:function(e){return t.updateForm(e)}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-container",[i("v-row",[i("v-col",{attrs:{cols:"12",md:"6"}},[i("v-text-field",{attrs:{rules:[t.rules.required()],disabled:t.isUpdating,filled:"",color:"blue-grey lighten-2",label:"Name"},model:{value:t.user.name,callback:function(e){t.$set(t.user,"name",e)},expression:"user.name"}})],1),i("v-col",{attrs:{cols:"12",md:"6"}},[i("v-text-field",{attrs:{rules:[t.rules.required(),t.rules.email],disabled:t.isUpdating,filled:"",color:"blue-grey lighten-2",label:"Email"},model:{value:t.user.email,callback:function(e){t.$set(t.user,"email",e)},expression:"user.email"}})],1)],1),i("v-row",[i("v-col",{attrs:{cols:"12",md:"6"}},[i("v-text-field",{attrs:{rules:[t.rules.required()],disabled:t.isUpdating,filled:"",color:"blue-grey lighten-2",label:"Department"},model:{value:t.user.department,callback:function(e){t.$set(t.user,"department",e)},expression:"user.department"}})],1)],1)],1),i("v-divider"),i("v-card-actions",[i("v-btn",{attrs:{type:"button",loading:t.isUpdating,color:"blue-grey darken-3",depressed:""},on:{click:t.resetForm}},[i("v-icon",{attrs:{left:""}},[t._v("mdi-update")]),t._v(" Reset ")],1),i("v-spacer"),i("v-btn",{attrs:{type:"submit",disabled:!t.valid,loading:t.isUpdating,color:"blue-grey darken-3",depressed:""}},[i("v-icon",{attrs:{left:""}},[t._v("mdi-update")]),t._v(" Update Now ")],1)],1)],1)],1)],1)},c=[],l=(i("b0c0"),i("77f6")),u=i("2f62"),d=i("b728"),v={name:"EditeForm",data:function(){return{rules:l["a"],dialog:!1,valid:!1,isUpdating:!1,user:null}},computed:Object(r["a"])({},Object(u["c"])(["userInfo"])),created:function(){this.user={name:this.userInfo.name,email:this.userInfo.email,department:this.userInfo.department}},methods:Object(r["a"])({},Object(u["b"])([d["d"]]),{updateForm:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return t.preventDefault(),i.prev=1,i.next=4,e[d["d"]](e.user);case 4:i.next=10;break;case 6:i.prev=6,i.t0=i["catch"](1),e.clearForm(),console.error(i.t0);case 10:e.isUpdating=!1,e.dialog=!1;case 12:case"end":return i.stop()}}),i,null,[[1,6]])})))()},resetForm:function(){this.user={name:this.userInfo.name,email:this.userInfo.email,department:this.userInfo.department}}})},h=v,m=i("2877"),f=i("6544"),g=i.n(f),p=i("8336"),b=i("b0af"),y=i("99d9"),x=i("62ad"),A=i("a523"),k=i("169a"),w=i("ce7e"),C=i("4bd4"),O=i("132d"),j=i("adda"),$=i("8e36"),E=i("0fd9"),_=i("2fa4"),I=i("8654"),D=Object(m["a"])(h,o,c,!1,null,"5af605f0",null),N=D.exports;g()(D,{VBtn:p["a"],VCard:b["a"],VCardActions:y["a"],VCol:x["a"],VContainer:A["a"],VDialog:k["a"],VDivider:w["a"],VForm:C["a"],VIcon:O["a"],VImg:j["a"],VProgressLinear:$["a"],VRow:E["a"],VSpacer:_["a"],VTextField:I["a"]});var V=i("2126"),S={name:"Profile",components:{AppEditForm:N,AppLoader:V["a"]},data:function(){return{loading:!1}},computed:Object(r["a"])({},Object(u["c"])(["userInfo","userCourses"]),{courses:function(){return this.userCourses.map((function(t){return t.title}))}}),created:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,t.loading=!0,e.next=4,t[d["c"]]();case 4:return e.next=6,t[d["b"]]();case 6:e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.error(e.t0);case 11:t.loading=!1;case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))()},methods:Object(r["a"])({},Object(u["b"])([d["c"],d["b"]]))},T=S,B=i("8212"),L=i("da13"),F=i("5d23"),U=Object(m["a"])(T,a,n,!1,null,"1573a292",null);e["default"]=U.exports;g()(U,{VAvatar:B["a"],VCard:b["a"],VCol:x["a"],VImg:j["a"],VListItem:L["a"],VListItemContent:F["a"],VListItemSubtitle:F["b"],VListItemTitle:F["c"],VRow:E["a"]})},e4d3:function(t,e,i){"use strict";var a=i("2b0e");e["a"]=a["a"].extend({name:"returnable",props:{returnValue:null},data:function(){return{isActive:!1,originalValue:null}},watch:{isActive:function(t){t?this.originalValue=this.returnValue:this.$emit("update:return-value",this.originalValue)}},methods:{save:function(t){var e=this;this.originalValue=t,setTimeout((function(){e.isActive=!1}))}}})}}]);
//# sourceMappingURL=user-profile.9a13d448.js.map