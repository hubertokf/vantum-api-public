(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["list-widget"],{"0bd5":function(t,a,e){},"93bf":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"social"}},[e("v-container",{attrs:{"grid-list-xl":"",fluid:""}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{lg6:"",sm12:"",xs12:""}},[e("message-list")],1),e("v-flex",{attrs:{lg6:"",sm12:"",xs12:""}},[e("notification-list")],1),e("v-flex",{attrs:{lg7:"",sm12:"",xs12:""}},[e("plain-table")],1),e("v-flex",{attrs:{lg5:"",sm12:"",xs12:""}},[e("plain-table-order")],1),e("v-flex",{attrs:{lg12:"",sm12:"",xs12:""}},[e("post-list-card",{attrs:{items:t.posts}})],1)],1)],1)],1)},r=[],i=e("caf6"),l=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-card",[e("v-toolbar",{attrs:{card:"",dense:"",color:"transparent"}},[e("v-toolbar-title",[e("h4",[t._v("Message")])])],1),e("v-divider"),e("v-card-text",{staticClass:"pa-0"},[e("v-list",{staticClass:"pa-0",attrs:{"two-line":""}},[t._l(t.items,function(a,s){return[a.header?e("v-subheader",{key:a.header},[t._v(t._s(a.header))]):a.divider?e("v-divider",{key:s}):e("v-list-tile",{key:a.title,attrs:{avatar:""},on:{click:t.handleClick}},[e("v-list-tile-avatar",[e("img",{attrs:{src:a.avatar}})]),e("v-list-tile-content",[e("v-list-tile-title",{domProps:{innerHTML:t._s(a.title)}}),e("v-list-tile-sub-title",{domProps:{innerHTML:t._s(a.subtitle)}})],1)],1)]})],2),e("v-divider"),e("v-btn",{staticClass:"ma-0",attrs:{block:"",flat:""}},[t._v("All")]),e("v-divider")],1)],1)},o=[],n=[{avatar:"https://randomuser.me/api/portraits/men/1.jpg",title:"Brunch this weekend?",subtitle:"<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood ?"},{divider:!0,inset:!0},{avatar:"https://randomuser.me/api/portraits/men/2.jpg",title:'Summer BBQ <span class="grey--text text--lighten-1">4</span>',subtitle:"<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."},{divider:!0,inset:!0},{avatar:"https://randomuser.me/api/portraits/men/3.jpg",title:"Oui oui",subtitle:"<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"},{divider:!0,inset:!0},{avatar:"https://randomuser.me/api/portraits/men/1.jpg",title:"Dash",subtitle:"<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"}],c={data:function(){return{items:n}},methods:{handleClick:function(t){console.log(t)}}},d=c,v=e("2877"),u=e("6544"),p=e.n(u),m=e("8336"),b=e("b0af"),h=e("99d9"),f=e("ce7e"),x=e("8860"),_=e("ba95"),g=e("c954"),C=e("5d23"),V=e("e0c7"),y=e("71d9"),T=e("2a7f"),k=Object(v["a"])(d,l,o,!1,null,null,null),w=k.exports;p()(k,{VBtn:m["a"],VCard:b["a"],VCardText:h["b"],VDivider:f["a"],VList:x["a"],VListTile:_["a"],VListTileAvatar:g["a"],VListTileContent:C["b"],VListTileSubTitle:C["c"],VListTileTitle:C["d"],VSubheader:V["a"],VToolbar:y["a"],VToolbarTitle:T["b"]});var P=e("2fbb"),S=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-card",[e("v-toolbar",{attrs:{card:"",dense:"",color:"transparent"}},[e("v-toolbar-title",[e("h4",[t._v("Project")])]),e("v-spacer"),e("v-btn",{attrs:{icon:""}},[e("v-icon",[t._v("more_vert")])],1)],1),e("v-divider"),e("v-card-text",{staticClass:"pa-0"},[[e("v-data-table",{staticClass:"elevation-0",attrs:{headers:t.headers,items:t.projects,"hide-actions":""},scopedSlots:t._u([{key:"items",fn:function(a){return[e("td",[e("v-avatar",{attrs:{size:"36px"}},[e("img",{attrs:{src:a.item.avatar,alt:a.item.username}})])],1),e("td",[t._v(t._s(a.item.name))]),e("td",{staticClass:"text-xs-left"},[t._v(t._s(a.item.deadline))]),e("td",{staticClass:"text-xs-left"},[e("v-progress-linear",{attrs:{value:a.item.progress,height:"5",color:a.item.color}})],1),e("td",{staticClass:"text-xs-right"},[e("v-btn",{attrs:{flat:"",icon:"",color:"grey"}},[e("v-icon",[t._v("edit")])],1),e("v-btn",{attrs:{flat:"",icon:"",color:"grey"}},[e("v-icon",[t._v("delete")])],1)],1)]}}])})],e("v-divider")],2)],1)},j=[],L=e("24d2"),D={data:function(){return{headers:[{text:"",align:"center",sortable:!1,value:"avatar"},{text:"Name",align:"left",value:"name"},{text:"Deadline",value:"deadline"},{text:"Progress",value:"progress"},{text:"Action",value:"action",align:"right"}]}},computed:{projects:function(){return L["a"]}}},A=D,O=e("8212"),$=e("8fea"),B=e("132d"),I=e("8e36"),M=e("9910"),E=Object(v["a"])(A,S,j,!1,null,null,null),H=E.exports;p()(E,{VAvatar:O["a"],VBtn:m["a"],VCard:b["a"],VCardText:h["b"],VDataTable:$["a"],VDivider:f["a"],VIcon:B["a"],VProgressLinear:I["a"],VSpacer:M["a"],VToolbar:y["a"],VToolbarTitle:T["b"]});var F=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-card",[e("v-toolbar",{attrs:{card:"",dense:"",color:"transparent"}},[e("v-toolbar-title",[e("h4",[t._v("Order")])]),e("v-spacer"),e("v-btn",{attrs:{icon:""}},[e("v-icon",[t._v("more_vert")])],1)],1),e("v-divider"),e("v-card-text",{staticClass:"pa-0"},[[e("v-data-table",{staticClass:"elevation-0 table-striped",attrs:{headers:t.headers,items:t.items,"hide-actions":""},scopedSlots:t._u([{key:"items",fn:function(a){return[e("td",[t._v(t._s(a.item.id))]),e("td",{staticClass:"text-xs-left"},[t._v(t._s(a.item.product))]),e("td",{staticClass:"text-xs-left"},[t._v(t._s(a.item.price))]),e("td",{staticClass:"text-xs-left"},[e("v-chip",{attrs:{label:"",small:"",color:t.getColorByStatus(a.item.status),"text-color":"white"}},[t._v(t._s(a.item.status))])],1)]}}])})],e("v-divider")],2)],1)},J=[],G=[{id:"150",product:"iPhone6",price:"$699",status:"processing"},{id:"151",product:"iPad Pro",price:"$299",status:"sent"},{id:"300",product:"Microsoft surface",price:"$1,699",status:"processing"},{id:"320",product:"Galaxy S7 edge",price:"$729",status:"processing"},{id:"501",product:"128G SD Card",price:"$699",status:"delivered"}],N={data:function(){return{headers:[{text:"#",align:"left",sortable:!1,value:"id"},{text:"Product",value:"deadline"},{text:"Price",value:"progress"},{text:"Status",value:"status"}],items:G,colors:{processing:"blue",sent:"red",delivered:"green"}}},computed:{randomColor:function(){var t=Math.floor(Math.random()*this.colors.length);return this.colors[t]}},methods:{getColorByStatus:function(t){return this.colors[t]}}},z=N,Q=e("cc20"),R=Object(v["a"])(z,F,J,!1,null,null,null),W=R.exports;p()(R,{VBtn:m["a"],VCard:b["a"],VCardText:h["b"],VChip:Q["a"],VDataTable:$["a"],VDivider:f["a"],VIcon:B["a"],VSpacer:M["a"],VToolbar:y["a"],VToolbarTitle:T["b"]});var q=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-card",{staticClass:"post-card"},[e("v-toolbar",{attrs:{color:"transparent",flat:"",dense:"",card:""}},[e("v-toolbar-title",{staticClass:"subheading ft-200"},[t._v("Recent Posts")]),e("v-spacer"),e("v-btn",{attrs:{icon:""}},[e("v-icon",{staticClass:"text--secondary"},[t._v("more_vert")])],1)],1),e("v-divider"),e("v-card-text",{staticClass:"pa-0"},[e("ul",{staticClass:"post--list flex-list vertical"},t._l(t.items,function(a,s){return e("li",{key:s,staticClass:"post--item"},[e("a",{staticClass:" post--link pa-4 layout row ma-0 text--primary",attrs:{href:"#"}},[e("div",{staticClass:"post--media"},[e("img",{staticClass:"image-scale",attrs:{src:a.featuredImage,alt:"",height:"100"}})]),e("div",{staticClass:"post--content ml-3"},[e("h3",{staticClass:"title post--title"},[t._v("\n              "+t._s(a.title)+"\n            ")]),e("div",{staticClass:"post--desc py-2 text--secondary"},[t._v("\n              "+t._s(a.desc)+"\n            ")]),e("div",{staticClass:"post--meta o-flex justify-space-between"},[e("div",{staticClass:"post--author caption grey--text text--darken-1"},[e("span",[t._v(t._s(a.author))]),e("time",{staticClass:"px-2"},[t._v(t._s(a.createdAt))])]),e("div",{staticClass:"social"},[e("a",{staticClass:"grey--text text--darken-1",on:{click:t.handleThumb}},[e("v-icon",{attrs:{small:""}},[t._v("thumb_up")]),e("small",[t._v("100+")])],1),e("a",{staticClass:"grey--text text--darken-1 mx-3",on:{click:t.handleComment}},[e("v-icon",{attrs:{small:""}},[t._v("mode_comment")]),e("small",[t._v("12+")])],1),e("a",{staticClass:"grey--text text--darken-1",on:{click:t.handleFavorite}},[e("v-icon",{attrs:{small:""}},[t._v("favorite")]),e("small",[t._v("50+")])],1)])])])])])}),0)])],1)},K=[],U={props:{items:{type:[Array,Object]}},methods:{handleThumb:function(){},handleComment:function(){},handleFavorite:function(){}}},X=U,Y=(e("fdc53"),Object(v["a"])(X,q,K,!1,null,"04a71544",null)),Z=Y.exports;p()(Y,{VBtn:m["a"],VCard:b["a"],VCardText:h["b"],VDivider:f["a"],VIcon:B["a"],VSpacer:M["a"],VToolbar:y["a"],VToolbarTitle:T["b"]});var tt={components:{PostListCard:Z,MessageList:w,NotificationList:P["a"],PlainTable:H,PlainTableOrder:W},data:function(){return{}},computed:{posts:function(){return Object(i["a"])()}},methods:{handleClick:function(t){console.log(t)}}},at=tt,et=e("a523"),st=e("0e8f"),rt=e("a722"),it=Object(v["a"])(at,s,r,!1,null,null,null);a["default"]=it.exports;p()(it,{VContainer:et["a"],VFlex:st["a"],VLayout:rt["a"]})},fdc53:function(t,a,e){"use strict";var s=e("0bd5"),r=e.n(s);r.a}}]);
//# sourceMappingURL=list-widget.4fdd883b.js.map