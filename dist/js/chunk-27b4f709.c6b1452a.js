(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-27b4f709"],{"69db":function(e,t,l){"use strict";l("a953")},a953:function(e,t,l){},bf3d:function(e,t,l){"use strict";l.r(t);var n=l("7a23"),o=function(e){return Object(n["pushScopeId"])("data-v-793a5add"),e=e(),Object(n["popScopeId"])(),e},c={class:"row"},r={class:"col-6"},a={id:"addNewForm"},u=o((function(){return Object(n["createElementVNode"])("label",{for:"userId"},"個人ID",-1)})),i=["value"],d=o((function(){return Object(n["createElementVNode"])("label",{for:"userName"},"名稱",-1)})),m=["value"],b=o((function(){return Object(n["createElementVNode"])("label",{for:"productName"},"商品名稱",-1)})),s=o((function(){return Object(n["createElementVNode"])("label",{for:"productType"},"類別",-1)})),p=["value"],f=o((function(){return Object(n["createElementVNode"])("label",{for:"productQuality"},"品質",-1)})),j=["disabled"],O=["value"],v=o((function(){return Object(n["createElementVNode"])("div",{class:"d-none"},[Object(n["createElementVNode"])("label",{for:"productAmount"},"數量"),Object(n["createElementVNode"])("input",{id:"productAmount",type:"text",placeholder:"商品數量",autocomplete:"off"})],-1)})),N=o((function(){return Object(n["createElementVNode"])("label",{for:"productMessage"},"商品描述",-1)})),V=o((function(){return Object(n["createElementVNode"])("span",null,"販售方式",-1)})),E=o((function(){return Object(n["createElementVNode"])("label",{for:"sakuraCoin"},"櫻花幣",-1)})),y=o((function(){return Object(n["createElementVNode"])("label",{for:"Barter"},"以物易物",-1)})),h=o((function(){return Object(n["createElementVNode"])("label",{for:"productPrice"},"想要換得的物品",-1)})),g=o((function(){return Object(n["createElementVNode"])("label",{for:"productPrice"},"櫻花幣價格",-1)})),k=o((function(){return Object(n["createElementVNode"])("label",{for:"productImg"},"商品圖片",-1)})),B={class:"input-file"},w=o((function(){return Object(n["createElementVNode"])("i",{class:"icon-trashcan"},null,-1)})),M=Object(n["createTextVNode"])("移除 "),x=[w,M],I=o((function(){return Object(n["createElementVNode"])("div",{class:"col-6"},[Object(n["createElementVNode"])("div",{class:"text-center fs-7"},"商品預覽")],-1)})),U=o((function(){return Object(n["createElementVNode"])("section",{id:"addNewBox"},[Object(n["createElementVNode"])("h4",null,"注意事項"),Object(n["createElementVNode"])("ol",null,[Object(n["createElementVNode"])("li",null,"櫻花幣需要買家收到貨之後，在此交易系統上確認完成此交易櫻花幣才會轉帳。"),Object(n["createElementVNode"])("li",null,"物品交換則需要自行承擔信用風險,過於特殊的商品管理員可能無法補償"),Object(n["createElementVNode"])("li",null,"賣家需要自行截圖留存,發生問題時要附上截圖。")]),Object(n["createElementVNode"])("div",{class:"submit"},[Object(n["createElementVNode"])("button",{type:"button"},"我已經閱讀注意事項，確定上架"),Object(n["createElementVNode"])("button",{type:"button"},"清除已輸入的內容")])],-1)}));function Q(e,t,l,o,w,M){return Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],null,[Object(n["createElementVNode"])("section",c,[Object(n["createElementVNode"])("div",r,[Object(n["createElementVNode"])("form",a,[Object(n["createElementVNode"])("div",null,[u,Object(n["createElementVNode"])("input",{id:"userId",type:"text",value:M.getUserId,autocomplete:"off",readonly:""},null,8,i)]),Object(n["createElementVNode"])("div",null,[d,Object(n["createElementVNode"])("input",{id:"userName",type:"text",value:M.getUserName,autocomplete:"off",readonly:""},null,8,m)]),Object(n["createElementVNode"])("div",null,[b,Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{id:"productName",type:"text",placeholder:"例：汞動式散彈槍",autocomplete:"off","onUpdate:modelValue":t[0]||(t[0]=function(e){return w.form.title=e})},null,512),[[n["vModelText"],w.form.title]])]),Object(n["createElementVNode"])("div",null,[s,Object(n["withDirectives"])(Object(n["createElementVNode"])("select",{id:"productType","onUpdate:modelValue":t[1]||(t[1]=function(e){return w.form.class=e}),onChange:t[2]||(t[2]=function(e){return M.changeProductType(e)})},[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(w.product.type,(function(e){return Object(n["openBlock"])(),Object(n["createElementBlock"])("option",{key:e.value,value:e.value},Object(n["toDisplayString"])(e.label),9,p)})),128))],544),[[n["vModelSelect"],w.form.class]])]),Object(n["createElementVNode"])("div",null,[f,Object(n["withDirectives"])(Object(n["createElementVNode"])("select",{id:"productQuality","onUpdate:modelValue":t[3]||(t[3]=function(e){return w.form.quality=e}),disabled:M.notHasQuality},[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(w.product.quality,(function(e){return Object(n["openBlock"])(),Object(n["createElementBlock"])("option",{key:e.value,value:e.value},Object(n["toDisplayString"])(e.label),9,O)})),128))],8,j),[[n["vModelSelect"],w.form.quality]])]),v,Object(n["createElementVNode"])("div",null,[N,Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{id:"productMessage",type:"text",placeholder:"例：攻擊500%",autocomplete:"off","onUpdate:modelValue":t[4]||(t[4]=function(e){return w.form.message=e})},null,512),[[n["vModelText"],w.form.message]])]),Object(n["createElementVNode"])("div",null,[V,Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{type:"radio",name:"saleMethod",id:"sakuraCoin",value:"sakuraCoin",checked:"","onUpdate:modelValue":t[5]||(t[5]=function(e){return w.form.saleMethod=e})},null,512),[[n["vModelRadio"],w.form.saleMethod]]),E,Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{type:"radio",name:"saleMethod",id:"Barter",value:"Barter","onUpdate:modelValue":t[6]||(t[6]=function(e){return w.form.saleMethod=e})},null,512),[[n["vModelRadio"],w.form.saleMethod]]),y]),Object(n["createElementVNode"])("div",null,["Barter"==w.form.saleMethod?(Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],{key:0},[h,Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{id:"productPrice",type:"text",placeholder:"例：100金屬碇",autocomplete:"off","onUpdate:modelValue":t[7]||(t[7]=function(e){return w.form.game_item=e})},null,512),[[n["vModelText"],w.form.game_item]])],64)):(Object(n["openBlock"])(),Object(n["createElementBlock"])(n["Fragment"],{key:1},[g,Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{id:"productPrice",type:"number",placeholder:"輸入販售價格",autocomplete:"off","onUpdate:modelValue":t[8]||(t[8]=function(e){return w.form.money=e})},null,512),[[n["vModelText"],w.form.money,void 0,{number:!0}]])],64))]),Object(n["createElementVNode"])("div",null,[k,Object(n["createElementVNode"])("div",B,[Object(n["createElementVNode"])("input",{id:"productImg",type:"file",accept:".png, .jpg, .jpeg, .gif",onChange:t[9]||(t[9]=function(e){return M.getFiles(e)})},null,32),Object(n["createElementVNode"])("button",{type:"button",onClick:t[10]||(t[10]=function(e){return M.clearFile()})},x)])])])]),I]),U],64)}var D={data:function(){return{form:{title:"",class:"weapon",quality:"primitive",message:"",saleMethod:"",game_item:"",money:"",isRootUser:"",my_file:"",isBlueprint:""},product:{type:[{value:"weapon",label:"武器",hasQuality:!0},{value:"armor",label:"防具",hasQuality:!0},{value:"props",label:"道具",hasQuality:!1},{value:"resource",label:"資源",hasQuality:!1},{value:"blueprint",label:"藍圖",hasQuality:!0},{value:"other",label:"其他",hasQuality:!1}],quality:[{value:"primitive",label:"原始"},{value:"ramshackle",label:"普通"},{value:"apprentice",label:"優秀"},{value:"journeyman",label:"精良"},{value:"mastercraft",label:"史詩"},{value:"ascendant",label:"傳說"}]}}},methods:{getFiles:function(e){this.form.my_file=e.target.files[0]},clearFile:function(){document.getElementById("productImg").value=null,this.my_file=""},changeProductType:function(e){var t=this;this.product.type.some((function(l){return l.value==e.target.value&&(l.hasQuality?void 0:(t.form.quality="primitive",!0))}))}},computed:{getUserId:function(){return this.$store.state.userId},getUserName:function(){return this.$store.state.userName},notHasQuality:function(){var e=this;return!this.product.type.some((function(t){return t.value==e.form.class&&t.hasQuality}))}},watch:{},created:function(){},mounted:function(){}},F=(l("69db"),l("6b0d")),T=l.n(F);const _=T()(D,[["render",Q],["__scopeId","data-v-793a5add"]]);t["default"]=_}}]);
//# sourceMappingURL=chunk-27b4f709.c6b1452a.js.map