(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["routes"],{"12e3":function(t,e,i){"use strict";var a=i("6f68"),n=i.n(a);n.a},2341:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{staticClass:"pa-0 mail-reply",attrs:{fluid:"","fill-height":"",id:"mailReply"}},[i("v-layout",{staticClass:"mail-reply--layout",attrs:{column:""}},[i("v-toolbar",{staticClass:"mail-reply--toolbar",attrs:{flat:"",fixed:"",app:""}},[i("v-toolbar-title",[i("v-avatar",{attrs:{size:"32"}},[i("img",{attrs:{src:t.mail.from.avatar}})]),i("span",[t._v(" "+t._s(t.mail.from.name))])],1),i("v-spacer"),i("v-spacer"),i("v-btn",{attrs:{icon:""}},[i("v-icon",{attrs:{color:"yellow",small:""}},[t._v("star")])],1),i("div",{staticClass:"caption"},[t._v(t._s(t.formatDate(t.mail.created_at)))]),i("v-btn",{attrs:{icon:"",small:""}},[i("v-icon",{attrs:{small:""}},[t._v("reply")])],1),i("v-btn",{attrs:{icon:"",small:""}},[i("v-icon",{attrs:{small:""}},[t._v("reply_all")])],1),i("v-btn",{attrs:{icon:"",small:""}},[i("v-icon",{attrs:{small:""}},[t._v("delete")])],1),i("v-btn",{attrs:{icon:"",small:""}},[i("v-icon",{attrs:{small:""}},[t._v("expand_more")])],1)],1),i("v-flex",{staticClass:"mail-reply--content"},[i("vue-perfect-scrollbar",{staticClass:"mail-reply--scrollbar"},[i("v-card",[i("v-card-text",{staticClass:"pa-4"},[i("div",{staticClass:"mail-reply--item"},[i("div",{staticClass:"layout column"},[i("h3",{staticClass:"headline"},[t._v("Hi Michael")]),i("div",{staticClass:"text--secondary my-4",domProps:{innerHTML:t._s(t.mail.content)}}),i("h4",[t._v("\n                  "+t._s(t.mail.from.name)+",\n                  "),i("br"),t._v("\n                  Thanks\n                ")]),i("v-divider",{staticClass:"my-4"}),i("div",{staticClass:"py-3"},[i("v-alert",{attrs:{outline:"",color:"primary",icon:"attach_file",value:!0}},[t._v("\n                    Weekly Report\n                  ")])],1),i("v-card",[i("v-card-text",{staticClass:"pa-0"},[i("v-text-field",{attrs:{counter:"",placeholder:"Your reply here","full-width":"","multi-line":""}})],1),i("v-toolbar",{attrs:{dense:"",flat:""}},[i("v-btn",{attrs:{icon:""}},[i("v-icon",[t._v("attach_file")])],1),i("v-btn",{attrs:{icon:""}},[i("v-icon",[t._v("link")])],1),i("v-btn",{attrs:{icon:""}},[i("v-icon",[t._v("camera")])],1),i("v-spacer"),i("v-btn",{attrs:{flat:"",icon:""}},[i("v-icon",[t._v("send")])],1)],1)],1)],1)])])],1)],1)],1)],1)],1)},n=[],s=i("9d63"),l=i.n(s),r=i("7e82"),o={components:{VuePerfectScrollbar:l.a},data:function(){return{selected:[2],mailActions:[{href:"#",title:"Delete",click:function(t){console.log(t)}},{href:"Mark as read",title:"Mark as read",click:function(t){console.log(t)}},{href:"Spam",title:"Spam",click:function(t){console.log(t)}}]}},computed:{mail:function(){return Object(r["c"])(this.$route.params.uuid)}},created:function(){window.AppMail=this},methods:{computeMailPath:function(t){return"/mail/0/"+t},formatDate:function(t){return new Date(t).toLocaleDateString()}}},c=o,u=i("2877"),v=i("6544"),d=i.n(v),f=(i("a57f"),i("9d26")),p=i("b64a"),h=i("98a1"),m=i("00ab"),b=i("58df"),g=Object(b["a"])(p["a"],h["a"],m["a"]).extend({name:"v-alert",props:{dismissible:Boolean,icon:String,outline:Boolean,type:{type:String,validator:function(t){return["info","error","success","warning"].includes(t)}}},computed:{computedColor:function(){return this.type&&!this.color?this.type:this.color||"error"},computedIcon:function(){if(this.icon||!this.type)return this.icon;switch(this.type){case"info":return"$vuetify.icons.info";case"error":return"$vuetify.icons.error";case"success":return"$vuetify.icons.success";case"warning":return"$vuetify.icons.warning"}}},methods:{genIcon:function(){return this.computedIcon?this.$createElement(f["a"],{class:"v-alert__icon"},this.computedIcon):null},genDismissible:function(){var t=this;return this.dismissible?this.$createElement("a",{class:"v-alert__dismissible",on:{click:function(){t.isActive=!1}}},[this.$createElement(f["a"],{props:{right:!0}},"$vuetify.icons.cancel")]):null}},render:function(t){var e=[this.genIcon(),t("div",this.$slots.default),this.genDismissible()],i=this.outline?this.setTextColor:this.setBackgroundColor,a=t("div",i(this.computedColor,{staticClass:"v-alert",class:{"v-alert--outline":this.outline},directives:[{name:"show",value:this.isActive}],on:this.$listeners}),e);return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[a]):a}}),_=i("8212"),y=i("8336"),x=i("b0af"),C=i("99d9"),V=i("a523"),k=i("ce7e"),w=i("0e8f"),T=i("132d"),S=i("a722"),A=i("9910"),L=i("2677"),D=i("71d9"),I=i("2a7f"),M=Object(u["a"])(c,a,n,!1,null,null,null);e["default"]=M.exports;d()(M,{VAlert:g,VAvatar:_["a"],VBtn:y["a"],VCard:x["a"],VCardText:C["b"],VContainer:V["a"],VDivider:k["a"],VFlex:w["a"],VIcon:T["a"],VLayout:S["a"],VSpacer:A["a"],VTextField:L["a"],VToolbar:D["a"],VToolbarTitle:I["b"]})},"2fdb":function(t,e,i){"use strict";var a=i("5ca1"),n=i("d2c8"),s="includes";a(a.P+a.F*i("5147")(s),"String",{includes:function(t){return!!~n(this,t,s).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},5147:function(t,e,i){var a=i("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(i){try{return e[a]=!1,!"/./"[t](e)}catch(n){}}return!0}},5368:function(t,e,i){"use strict";var a=i("c37a"),n=i("ad54"),s=i("5e28");e["a"]=a["a"].extend({name:"selectable",mixins:[n["a"],s["a"]],model:{prop:"inputValue",event:"change"},props:{color:{type:String,default:"accent"},id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(t){return{lazyValue:t.inputValue}},computed:{computedColor:function(){return this.isActive?this.color:this.validationState},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some(function(i){return t.valueComparator(i,e)}):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive}},watch:{inputValue:function(t){this.lazyValue=t}},methods:{genLabel:function(){if(!this.hasLabel)return null;var t=a["a"].options.methods.genLabel.call(this);return t.data.on={click:this.onChange},t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-label":this.label,"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.id,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown},ref:"input"})},onBlur:function(){this.isFocused=!1},onChange:function(){var t=this;if(!this.isDisabled){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var a=i.length;i=i.filter(function(i){return!t.valueComparator(i,e)}),i.length===a&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})},"57e7":function(t,e,i){"use strict";var a=i("5ca1"),n=i("c366")(!1),s=[].indexOf,l=!!s&&1/[1].indexOf(1,-0)<0;a(a.P+a.F*(l||!i("2f21")(s)),"Array",{indexOf:function(t){return l?s.apply(this,arguments)||0:n(this,t,arguments[1])}})},"5e28":function(t,e,i){"use strict";var a=i("a026"),n=i("80d2");e["a"]=a["default"].extend({name:"comparable",props:{valueComparator:{type:Function,default:n["h"]}}})},6762:function(t,e,i){"use strict";var a=i("5ca1"),n=i("c366")(!0);a(a.P,"Array",{includes:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),i("9c6c")("includes")},"6f68":function(t,e,i){},"89b1":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"media",attrs:{id:"media"}},[i("v-toolbar",{staticClass:"elevation-0 transparent media-toolbar"},[i("v-btn-toggle",[i("v-btn",{attrs:{flat:""}},[i("v-icon",{attrs:{color:"primary"}},[t._v("cloud_upload")]),t._v("\n         Upload\n      ")],1),i("v-btn",{attrs:{flat:""}},[i("v-icon",{attrs:{color:"primary"}},[t._v("folder")]),t._v("\n          Add Folder\n      ")],1)],1),i("v-spacer"),i("v-btn-toggle",{model:{value:t.view,callback:function(e){t.view=e},expression:"view"}},[i("v-btn",{attrs:{flat:"",value:"list"}},[i("v-icon",{attrs:{color:"primary"}},[t._v("view_headline")])],1),i("v-btn",{attrs:{flat:"",value:"grid"}},[i("v-icon",{attrs:{color:"primary"}},[t._v("view_list")])],1)],1)],1),i("v-divider"),i("div",{staticClass:"layout row media-layout"},[i("div",{staticClass:"media-content flex transparent"},[i("vue-perfect-scrollbar",{staticClass:"media-content--warp"},["grid"===t.view?i("v-container",{attrs:{fluid:""}},[i("v-layout",{staticClass:"x-grid-lg",attrs:{row:"",wrap:""}},[t._l(t.folders,function(e,a){return i("v-flex",{key:"folder"+a,staticClass:"pa-2",attrs:{lg4:"",sm12:"",xs12:""}},[i("v-card",{attrs:{flat:"",tile:""}},[i("v-responsive",{attrs:{height:"150px"}},[i("v-icon",{staticClass:"mx-auto",attrs:{size:"135",color:"indigo"}},[t._v("folder")])],1),i("v-divider"),i("v-card-title",[t._v("\n                  "+t._s(e.name)+"\n                ")])],1)],1)}),t._l(t.files,function(e,a){return i("v-flex",{key:a,staticClass:"pa-2",attrs:{lg4:"",sm12:"",xs12:""}},[i("a",{staticClass:"d-flex",on:{click:function(i){return t.showDetail(e)}}},[i("v-card",{attrs:{flat:"",tile:""}},[i("v-responsive",{attrs:{height:"150px",width:"150px"}},[t.isImage(e)?i("img",{attrs:{src:e.path,alt:""}}):i("v-icon",{staticClass:"mx-auto",attrs:{size:"135"}},[t._v("insert_drive_file")])],1),i("v-divider"),i("v-card-title",[t._v("\n                    "+t._s(e.fileName)+"\n                  ")])],1)],1)])})],2)],1):i("v-layout",{attrs:{column:""}},[i("v-list",{staticClass:"transparent",attrs:{dense:""}},t._l(t.files,function(e,a){return i("v-list-tile",{key:"list-file-"+a,attrs:{avatar:""},on:{click:function(i){return t.showDetail(e)}}},[i("v-list-tile-avatar",[i("v-icon",[t._v(t._s(t.mimeIcons(e)))])],1),i("v-list-tile-content",[i("div",{staticClass:"container pl-0"},[i("div",{staticClass:"layout row"},[i("div",{staticClass:"flex"},[t._v(t._s(e.fileName))]),i("v-spacer"),i("div",{staticClass:"caption"},[t._v("\n                      "+t._s(e?t.formateDate(e.ctime):"")+"\n                    ")])],1)])])],1)}),1)],1)],1)],1)])],1)},n=[],s=(i("6762"),i("2fdb"),i("f248")),l=i.n(s),r=i("3f5e"),o=i("9d63"),c=i.n(o),u={components:{VuePerfectScrollbar:c.a},props:{type:{type:String,default:"image"}},data:function(){return{size:"lg",view:"grid",selectedFile:{path:"/static/icon/empty_file.svg"},imageMime:["image/jpeg","image/png","image/svg+xml"],folders:[{name:"bg",lastModified:"2018-03-03"},{name:"cards",lastModified:"2018-03-03"},{name:"avatar",lastModified:"2018-03-03"}]}},computed:{mediaMenu:function(){return r["b"]},files:function(){return Object(r["a"])()}},methods:{isImage:function(t){return this.imageMime.includes(t.fileType)},mimeIcons:function(t){return this.imageMime.includes(t.fileType)?"image":"insert_drive_file"},showDetail:function(t){this.selectedFile=t},fileSize:function(t){return l.a.format(t)},formateDate:function(t){return t?new Date(t).toLocaleDateString():""},computeFileImage:function(t){return this.isImage(t)?t.path:"/static/icon/file_empty.svg"}}},v=u,d=(i("12e3"),i("2877")),f=i("6544"),p=i.n(f),h=i("8336"),m=i("a609"),b=i("b0af"),g=i("12b2"),_=i("a523"),y=i("ce7e"),x=i("0e8f"),C=i("132d"),V=i("a722"),k=i("8860"),w=i("ba95"),T=i("c954"),S=i("5d23"),A=i("6b53"),L=i("9910"),D=i("71d9"),I=Object(d["a"])(v,a,n,!1,null,"437e2bc1",null);e["default"]=I.exports;p()(I,{VBtn:h["a"],VBtnToggle:m["a"],VCard:b["a"],VCardTitle:g["a"],VContainer:_["a"],VDivider:y["a"],VFlex:x["a"],VIcon:C["a"],VLayout:V["a"],VList:k["a"],VListTile:w["a"],VListTileAvatar:T["a"],VListTileContent:S["b"],VResponsive:A["a"],VSpacer:L["a"],VToolbar:D["a"]})},"94a7":function(t,e,i){},a57f:function(t,e,i){},ac7c:function(t,e,i){"use strict";i("94a7");var a=i("9d26"),n=i("5368"),s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t};e["a"]={name:"v-checkbox",mixins:[n["a"]],props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$vuetify.icons.checkboxIndeterminate"},onIcon:{type:String,default:"$vuetify.icons.checkboxOn"},offIcon:{type:String,default:"$vuetify.icons.checkboxOff"}},data:function(t){return{inputIndeterminate:t.indeterminate}},computed:{classes:function(){return{"v-input--selection-controls":!0,"v-input--checkbox":!0}},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon}},watch:{indeterminate:function(t){this.inputIndeterminate=t}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",s({},this.$attrs,{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.computedColor)),this.$createElement(a["a"],this.setTextColor(this.computedColor,{props:{dark:this.dark,light:this.light}}),this.computedIcon)])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}}},ad54:function(t,e,i){"use strict";var a=i("3ccf"),n=i("a026");e["a"]=n["default"].extend({name:"rippleable",directives:{Ripple:a["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),t.on=Object.assign({click:this.onChange},this.$listeners),this.$createElement("div",t)):null},onChange:function(){}}})},bf5a:function(t,e,i){},cc20:function(t,e,i){"use strict";i("bf5a");var a=i("58df"),n=i("9d26"),s=i("b64a"),l=i("6a18"),r=i("98a1"),o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t};e["a"]=Object(a["a"])(s["a"],l["a"],r["a"]).extend({name:"v-chip",props:{close:Boolean,disabled:Boolean,label:Boolean,outline:Boolean,selected:Boolean,small:Boolean,textColor:String,value:{type:Boolean,default:!0}},computed:{classes:function(){return o({"v-chip--disabled":this.disabled,"v-chip--selected":this.selected&&!this.disabled,"v-chip--label":this.label,"v-chip--outline":this.outline,"v-chip--small":this.small,"v-chip--removable":this.close},this.themeClasses)}},methods:{genClose:function(t){var e=this,i={staticClass:"v-chip__close",on:{click:function(t){t.stopPropagation(),e.$emit("input",!1)}}};return t("div",i,[t(n["a"],"$vuetify.icons.delete")])},genContent:function(t){return t("span",{staticClass:"v-chip__content"},[this.$slots.default,this.close&&this.genClose(t)])}},render:function(t){var e=this.setBackgroundColor(this.color,{staticClass:"v-chip",class:this.classes,attrs:{tabindex:this.disabled?-1:0},directives:[{name:"show",value:this.isActive}],on:this.$listeners}),i=this.textColor||this.outline&&this.color;return t("span",this.setTextColor(i,e),[this.genContent(t)])}})},d2c8:function(t,e,i){var a=i("aae3"),n=i("be13");t.exports=function(t,e,i){if(a(e))throw TypeError("String#"+i+" doesn't accept regex!");return String(n(t))}},e9d2:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{staticClass:"pa-0 mail-list",attrs:{fluid:"","fill-height":"",id:"mailList"}},[i("v-layout",{staticClass:"mail-list--layout",attrs:{column:""}},[i("v-toolbar",{staticClass:"elevation-1 mail-list--toolbar",attrs:{fixed:"",app:""}},[i("v-checkbox",{staticClass:"check-all",attrs:{row:"","hide-details":""}}),i("v-menu",{attrs:{"offset-y":"",origin:"center center","nudge-bottom":0,transition:"scale-transition"}},[i("v-btn",{attrs:{slot:"activator",icon:"",large:"",flat:""},slot:"activator"},[i("v-avatar",{attrs:{size:"32px"}},[i("v-icon",[t._v("arrow_drop_down")])],1)],1),i("v-list",{staticClass:"pa-0"},t._l(t.mailActions,function(e,a){return i("v-list-tile",{key:a,attrs:{to:e.href?null:{name:e.name},href:e.href,ripple:"ripple",disabled:e.disabled,target:e.target,rel:"noopener"},on:{click:e.click}},[e.icon?i("v-list-tile-action",[i("v-icon",[t._v(t._s(e.icon))])],1):t._e(),i("v-list-tile-content",[i("v-list-tile-title",[t._v(t._s(e.title))])],1)],1)}),1)],1),i("v-spacer"),i("v-btn",{attrs:{icon:"",flat:""}},[i("v-icon",[t._v("refresh")])],1),i("v-btn",{attrs:{icon:"",flat:""}},[i("v-icon",[t._v("keyboard_arrow_left")])],1),i("v-btn",{attrs:{icon:"",flat:""}},[i("v-icon",[t._v("keyboard_arrow_right")])],1)],1),i("vue-perfect-scrollbar",{staticClass:"mail-list--scrollbar"},[i("v-flex",{staticClass:"mail-content white"},[i("v-tabs",{attrs:{"fixed-tabs":"",grow:""}},[i("v-tab",[t._v("\n            Primary\n          ")]),i("v-tab",[t._v("\n            Social\n          ")]),i("v-tab",[t._v("\n            Promotions\n          ")])],1),i("v-list",{staticClass:"mail-list--list",attrs:{"two-line":""}},[t._l(t.mails,function(e,a){return[i("v-list-tile",{key:a,attrs:{avatar:"",ripple:"",to:t.computeMailPath(e.uuid)}},[i("v-list-tile-action",[i("v-checkbox")],1),i("v-list-tile-avatar",[i("img",{attrs:{src:e.from.avatar}})]),i("v-list-tile-content",[i("v-list-tile-title",[t._v(t._s(e.from.name))]),i("v-list-tile-sub-title",[t._v(t._s(e.title))])],1),i("v-list-tile-action",[i("v-list-tile-action-text",[t._v(t._s(t.formatDate(e.created_at)))]),t.selected.indexOf(a)<0?i("v-icon",{attrs:{color:"grey lighten-1"},on:{click:function(e){return t.toggle(a)}}},[t._v("star_border")]):i("v-icon",{attrs:{color:"yellow darken-2"}},[t._v("star")])],1)],1),i("v-divider",{key:"divider"+a})]})],2)],1)],1)],1)],1)},n=[],s=(i("57e7"),i("9d63")),l=i.n(s),r=i("7e82"),o={components:{VuePerfectScrollbar:l.a},props:{mailType:{type:String,default:"All"}},data:function(){return{selected:[2],mailActions:[{href:"#",title:"Delete",click:function(t){console.log(t)}},{href:"Mark as read",title:"Mark as read",click:function(t){console.log(t)}},{href:"Spam",title:"Spam",click:function(t){console.log(t)}}]}},computed:{mails:function(){return Object(r["d"])(this.$route.params.mailType)}},created:function(){var t=this;this.$on("MAIL_REPLY_DIALOG_CLOSE",function(){t.replayDialog=!1}),window.AppMail=this},methods:{computeMailPath:function(t){return{path:"/mail/0/"+t}},formatDate:function(t){return new Date(t).toLocaleString()},toggle:function(t){var e=this.selected.indexOf(t);e>-1?this.selected.splice(e,1):this.selected.push(t)}}},c=o,u=i("2877"),v=i("6544"),d=i.n(v),f=i("8212"),p=i("8336"),h=i("ac7c"),m=i("a523"),b=i("ce7e"),g=i("0e8f"),_=i("132d"),y=i("a722"),x=i("8860"),C=i("ba95"),V=i("40fe"),k=i("5d23"),w=i("c954"),T=i("e449"),S=i("9910"),A=i("71a3"),L=i("fe57"),D=i("71d9"),I=Object(u["a"])(c,a,n,!1,null,null,null);e["default"]=I.exports;d()(I,{VAvatar:f["a"],VBtn:p["a"],VCheckbox:h["a"],VContainer:m["a"],VDivider:b["a"],VFlex:g["a"],VIcon:_["a"],VLayout:y["a"],VList:x["a"],VListTile:C["a"],VListTileAction:V["a"],VListTileActionText:k["a"],VListTileAvatar:w["a"],VListTileContent:k["b"],VListTileSubTitle:k["c"],VListTileTitle:k["d"],VMenu:T["a"],VSpacer:S["a"],VTab:A["a"],VTabs:L["a"],VToolbar:D["a"]})},ebf0:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",{staticClass:"mail",attrs:{id:"mail"}},[i("v-toolbar",{staticClass:"mail-toolbar",attrs:{fixed:"",app:"",flat:"",dark:"",color:"indigo","clipped-left":"",id:"topbar"}},[i("v-toolbar-side-icon",{staticClass:"hidden-sm-and-up",on:{click:t.toggleDrawer}}),i("v-avatar",{staticClass:"hidden-sm-and-down"},[i("img",{attrs:{src:"/static/m.png",alt:"Vue Material Mail"}})]),i("v-toolbar-title",{staticClass:"ml-0 pl-3"},[i("span",{staticClass:"hidden-sm-and-down"},[t._v("Mail")])]),i("v-spacer"),i("v-text-field",{staticClass:"hidden-sm-and-down",attrs:{flat:"","solo-inverted":"","prepend-icon":"search",label:"What are you looking for?"}}),i("v-btn",{attrs:{icon:""}},[i("v-icon",[t._v("notifications")])],1),i("v-menu",{attrs:{"offset-y":"",origin:"center center","nudge-bottom":10,transition:"scale-transition"}},[i("v-btn",{attrs:{slot:"activator",icon:"",large:"",flat:""},slot:"activator"},[i("v-avatar",{attrs:{size:"32px"}},[i("img",{attrs:{src:"https://randomuser.me/api/portraits/men/1.jpg"}})])],1),i("v-list",{staticClass:"pa-0"},t._l(t.items,function(e,a){return i("v-list-tile",{key:a,attrs:{to:e.href?null:{name:e.name},href:e.href,ripple:"ripple",disabled:e.disabled,target:e.target,rel:"noopener"},on:{click:e.click}},[e.icon?i("v-list-tile-action",[i("v-icon",[t._v(t._s(e.icon))])],1):t._e(),i("v-list-tile-content",[i("v-list-tile-title",[t._v(t._s(e.title))])],1)],1)}),1)],1)],1),i("v-navigation-drawer",{staticClass:"mail-drawer",attrs:{fixed:"",clipped:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[i("div",{staticClass:"layout column pa-3"},[i("v-btn",{attrs:{large:"",block:"",color:"red",dark:""},on:{click:function(e){e.stopPropagation(),t.dialog=!0}}},[t._v(" + COMPOSE")])],1),i("v-list",{staticClass:"mail-list",attrs:{dense:""}},[t._l(t.menus,function(e){return[e.heading?i("v-layout",{key:e.heading,attrs:{row:"","align-center":""}},[i("v-flex",{attrs:{xs12:""}},[e.heading?i("v-subheader",[t._v("\n              "+t._s(e.heading)+"\n            ")]):t._e(),i("v-divider")],1)],1):i("v-list-tile",{key:e.text,attrs:{to:e.to}},[e.icon?i("v-list-tile-action",[i("v-icon",{attrs:{color:e.iconColor,small:e.iconSize}},[t._v(t._s(e.icon))])],1):t._e(),i("v-list-tile-content",[i("v-list-tile-title",[t._v(t._s(e.title))])],1)],1)]})],2)],1),i("v-content",[i("transition",[i("router-view")],1)],1),i("v-dialog",{attrs:{"max-width":"640px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("compose")],1)],1)},n=[],s=(i("57e7"),i("7e82")),l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",[i("v-toolbar",{attrs:{color:"primary",dark:""}},[i("v-icon",{attrs:{color:"white"}},[t._v("arrow_back")]),i("v-toolbar-title",[t._v("Compose")]),i("v-spacer"),i("v-btn",{attrs:{icon:""}},[i("v-icon",{attrs:{color:"white"}},[t._v("send")])],1)],1),i("v-container",{staticClass:"pa-0 mt-2",attrs:{fluid:""}},[i("v-layout",{attrs:{wrap:""}},[i("v-flex",{attrs:{xs2:""}},[i("v-subheader",[t._v("To")])],1),i("v-flex",{staticClass:"text-xs-right",attrs:{xs10:""}},[i("v-chip",[i("v-avatar",[i("img",{attrs:{src:"https://randomuser.me/api/portraits/men/92.jpg"}})]),t._v("\n          Trevor Hansen\n        ")],1),i("v-chip",[i("v-avatar",[i("img",{attrs:{src:"https://randomuser.me/api/portraits/men/91.jpg"}})]),t._v("\n          Alex Nelson\n        ")],1)],1),i("v-divider"),i("v-flex",{attrs:{xs2:""}},[i("v-subheader",[t._v("CC")])],1),i("v-flex",{staticClass:"text-xs-right",attrs:{xs10:""}},[i("v-chip",[i("v-avatar",[i("img",{attrs:{src:"https://randomuser.me/api/portraits/men/92.jpg"}})]),t._v("\n          John Doe\n        ")],1)],1),i("v-flex",{attrs:{xs12:""}},[i("v-divider"),i("v-text-field",{attrs:{label:"Subject",value:"Plans for the weekend","single-line":"","full-width":"","hide-details":""}})],1),i("v-flex",{attrs:{xs12:""}},[i("v-divider"),i("v-text-field",{attrs:{label:"Message",counter:"",max:"120","full-width":"","multi-line":"","single-line":""},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1)],1)],1)],1)},r=[],o={data:function(){return{title:"Hi,\nI just wanted to check in and see if you had any plans the upcoming weekend. We are thinking of heading up to Napa"}}},c=o,u=i("2877"),v=i("6544"),d=i.n(v),f=i("8212"),p=i("8336"),h=i("b0af"),m=i("cc20"),b=i("a523"),g=i("ce7e"),_=i("0e8f"),y=i("132d"),x=i("a722"),C=i("9910"),V=i("e0c7"),k=i("2677"),w=i("71d9"),T=i("2a7f"),S=Object(u["a"])(c,l,r,!1,null,null,null),A=S.exports;d()(S,{VAvatar:f["a"],VBtn:p["a"],VCard:h["a"],VChip:m["a"],VContainer:b["a"],VDivider:g["a"],VFlex:_["a"],VIcon:y["a"],VLayout:x["a"],VSpacer:C["a"],VSubheader:V["a"],VTextField:k["a"],VToolbar:w["a"],VToolbarTitle:T["b"]});var L={components:{Compose:A},props:{source:String},data:function(){return{selected:[2],dialog:null,drawer:null,replayDialog:null,menus:s["a"],items:[{icon:"account_circle",href:"#",title:"Profile",click:function(t){console.log(t)}},{icon:"settings",href:"#",title:"Settings",click:function(t){console.log(t)}},{icon:"fullscreen_exit",href:"#",title:"Logout",click:function(t){console.log(t)}}],mailActions:[{href:"#",title:"Delete",click:function(t){console.log(t)}},{href:"Mark as read",title:"Mark as read",click:function(t){console.log(t)}},{href:"Spam",title:"Spam",click:function(t){console.log(t)}}]}},created:function(){var t=this;this.$on("MAIL_REPLY_DIALOG_CLOSE",function(){t.replayDialog=!1}),window.AppMail=this},methods:{handleClick:function(t){console.log(t)},goBack:function(){this.$router.go(-1)},toggleDrawer:function(){this.drawer=!this.drawer},toggle:function(t){var e=this.selected.indexOf(t);e>-1?this.selected.splice(e,1):this.selected.push(t)}}},D=L,I=i("7496"),M=i("549c"),$=i("169a"),O=i("8860"),B=i("ba95"),P=i("40fe"),j=i("5d23"),F=i("e449"),E=i("f774"),z=i("706c"),N=Object(u["a"])(D,a,n,!1,null,null,null);e["default"]=N.exports;d()(N,{VApp:I["a"],VAvatar:f["a"],VBtn:p["a"],VContent:M["a"],VDialog:$["a"],VDivider:g["a"],VFlex:_["a"],VIcon:y["a"],VLayout:x["a"],VList:O["a"],VListTile:B["a"],VListTileAction:P["a"],VListTileContent:j["b"],VListTileTitle:j["d"],VMenu:F["a"],VNavigationDrawer:E["a"],VSpacer:C["a"],VSubheader:V["a"],VTextField:k["a"],VToolbar:w["a"],VToolbarSideIcon:z["a"],VToolbarTitle:T["b"]})},f248:function(t,e,i){"use strict";
/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */t.exports=r,t.exports.format=o,t.exports.parse=c;var a=/\B(?=(\d{3})+(?!\d))/g,n=/(?:\.0*|(\.[^0]+)0+)$/,s={b:1,kb:1024,mb:1<<20,gb:1<<30,tb:Math.pow(1024,4),pb:Math.pow(1024,5)},l=/^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;function r(t,e){return"string"===typeof t?c(t):"number"===typeof t?o(t,e):null}function o(t,e){if(!Number.isFinite(t))return null;var i=Math.abs(t),l=e&&e.thousandsSeparator||"",r=e&&e.unitSeparator||"",o=e&&void 0!==e.decimalPlaces?e.decimalPlaces:2,c=Boolean(e&&e.fixedDecimals),u=e&&e.unit||"";u&&s[u.toLowerCase()]||(u=i>=s.pb?"PB":i>=s.tb?"TB":i>=s.gb?"GB":i>=s.mb?"MB":i>=s.kb?"KB":"B");var v=t/s[u.toLowerCase()],d=v.toFixed(o);return c||(d=d.replace(n,"$1")),l&&(d=d.replace(a,l)),d+r+u}function c(t){if("number"===typeof t&&!isNaN(t))return t;if("string"!==typeof t)return null;var e,i=l.exec(t),a="b";return i?(e=parseFloat(i[1]),a=i[4].toLowerCase()):(e=parseInt(t,10),a="b"),Math.floor(s[a]*e)}}}]);
//# sourceMappingURL=routes.a6764055.js.map