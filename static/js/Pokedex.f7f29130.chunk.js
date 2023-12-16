"use strict";(self.webpackChunkpaldea=self.webpackChunkpaldea||[]).push([[299],{2358:function(e,t,a){a.r(t),a.d(t,{default:function(){return C}});var l=a(3433),n=a(8182),r=a(4013),s=a(101),i=a(6731),c=a(6257),d=a(2116),o=a(184),x=function(e){var t=e.pokemon;return(0,o.jsxs)(o.Fragment,{children:[t.abilities.map((function(e){return(0,o.jsx)("span",{className:"rounded bg-blue-100 px-1.5 py-0.5 text-center text-xs font-semibold text-blue-800",children:e},e)})),t.hiddenAbility&&(0,o.jsx)("span",{className:"rounded bg-gray-100 px-1.5 py-0.5 text-center text-xs font-semibold text-gray-800",children:[t.hiddenAbility]})]})},u=function(e){var t=e.pokemon;return(0,o.jsx)(o.Fragment,{children:Array(6).fill(0).map((function(e,a){return{key:d.J$[d.xA[String(a)]],val:t.EVs[a]}})).filter((function(e){return e.val>0})).map((function(e){return"".concat(e.key,": ").concat(e.val)})).map((function(e){return(0,o.jsx)("span",{className:"rounded bg-blue-100 px-1.5 py-0.5 text-center text-xs font-semibold text-blue-800",children:e},e)}))})};function m(e){var t=e.pokemon,a=e.filter,l=e.display,r=d.Sw.includes(a.pokedex)?(t[a.pokedex]||0).toString().padStart(3,"0"):t.pid.toString().padStart(4,"0");return(0,o.jsxs)("div",{className:(0,n.Z)("mt-8 px-4 pt-2 md:mt-20","flex flex-col gap-y-2","rounded-xl bg-white","shadow-list-items hover:shadow-list-items--hover","hover:translate-x-[-0.2rem] hover:translate-y-[-0.2rem]","relative"),children:[(0,o.jsxs)("header",{className:"relative h-6 md:h-auto",children:[(0,o.jsxs)("span",{className:"hidden whitespace-nowrap md:block",children:["#",r]}),(0,o.jsx)(c.J.lA.JC,{pm:t,className:"absolute bottom-0 md:-right-8"})]}),(0,o.jsx)("hr",{className:"border-0 border-t-[1px] border-[#A29834]"}),(0,o.jsxs)("div",{className:"flex h-full flex-col justify-between gap-y-2",children:[(0,o.jsxs)("div",{className:(0,n.Z)("grid grid-cols-1 md:grid-cols-2"),children:[(0,o.jsxs)("div",{className:"flex flex-col items-center gap-y-1 md:items-start",children:[(0,o.jsxs)("p",{className:"text-center md:text-start",children:[(0,o.jsxs)("span",{className:"block whitespace-nowrap md:hidden",children:["#",r]}),t.nameZh,t.altForm&&(0,o.jsxs)("span",{className:"block text-xs font-thin",children:["(",t.altForm,")"]})]}),(0,o.jsx)("div",{className:"flex gap-x-1",children:t.types.map((function(e){return(0,o.jsx)(c.J.lA.Dy,{type:e},e)}))})]}),(0,o.jsx)("div",{className:"hidden md:block",children:(0,o.jsx)("div",{className:"flex flex-col gap-y-2",children:(0,o.jsx)(x,{pokemon:t})})})]}),(0,o.jsxs)("div",{className:(0,n.Z)(l.EVs||l.ability?"block":"hidden"),children:[l.ability&&(0,o.jsx)("p",{className:"mt-2 flex flex-col flex-wrap justify-center gap-2 whitespace-nowrap md:flex-row md:justify-start",children:(0,o.jsx)(x,{pokemon:t})}),l.EVs&&(0,o.jsx)("p",{className:"mt-2 flex flex-col flex-wrap justify-center gap-2 whitespace-nowrap md:flex-row md:justify-start",children:(0,o.jsx)(u,{pokemon:t})})]})]}),(0,o.jsx)(i.rU,{className:"stretchedLink",to:"/pokedex/".concat(t.nameZh).concat(t.altForm?"-"+t.altForm:"")})]})}function p(e){var t=e.value,a=e.onChange,l=e.display,s=e.toggleDisplay,i=e.hasFilter;return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("div",{className:"relative my-2 w-full",children:[(0,o.jsx)("div",{className:"pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",children:(0,o.jsx)(c.J.ol,{className:"h-5 w-5"})}),(0,o.jsx)("input",{type:"search",className:(0,n.Z)("block w-full rounded-full border border-gray-300","bg-gray-50 p-2 pl-10 text-sm text-gray-900","search"),placeholder:"\u641c\u5c0b \u540d\u7a31(\u4e2d/\u82f1/\u65e5), \u6a23\u5b50",value:t,onChange:function(e){a(e.target.value)}}),(0,o.jsxs)("div",{className:"absolute inset-y-0 right-0 flex items-center pr-3",children:[(0,o.jsx)(y,{checked:l.advancedFilter,toggleState:s("advancedFilter")}),i&&(0,o.jsx)("div",{className:"relative -top-3 right-6",children:(0,o.jsx)(r.z$,{})})]})]})})}var g=window.screen.width<768?1:3;function h(e){var t=e.currentPage,a=e.totalPages,l=e.updateNumberState;return(0,o.jsx)("nav",{children:(0,o.jsxs)("ul",{className:"inline-flex -space-x-px text-sm",children:[(0,o.jsx)("li",{children:(0,o.jsx)("button",{onClick:function(){return l("page",(function(e){return Math.max(1,e-1)}))},className:(0,n.Z)("ml-0 flex h-8 items-center justify-center","rounded-l-lg border border-gray-300","bg-white px-3 leading-tight text-gray-500","hover:bg-gray-100 hover:text-gray-700",1===t&&"cursor-not-allowed"),children:"\u524d\u4e00\u9801"})}),t>g&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("li",{children:(0,o.jsx)("button",{onClick:function(){return l("page",(function(){return 1}))},className:(0,n.Z)("ml-0 flex h-8 items-center justify-center","border border-gray-300","bg-white px-3 leading-tight text-gray-500","hover:bg-gray-100 hover:text-gray-700"),children:"1"})}),(0,o.jsx)("li",{className:(0,n.Z)("ml-0 flex h-8 items-center justify-center","border border-gray-300","bg-white px-3 leading-tight text-gray-500"),children:"..."})]}),new Array(a).fill(0).map((function(e,t){return t+1})).filter((function(e){return Math.abs(e-t)<g})).map((function(e){return(0,o.jsx)("li",{children:(0,o.jsx)("button",{onClick:function(){return l("page",(function(){return e}))},className:(0,n.Z)("ml-0 flex h-8 items-center justify-center","border border-gray-300","px-3 leading-tight","hover:bg-gray-100 hover:text-gray-700",e===t?"bg-gray-100 text-gray-700":"bg-white text-gray-500"),children:e})},e)})),a-t>=g&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("li",{className:(0,n.Z)("ml-0 flex h-8 items-center justify-center","border border-gray-300","bg-white px-3 leading-tight text-gray-500"),children:"..."}),(0,o.jsx)("li",{children:(0,o.jsx)("button",{onClick:function(){return l("page",(function(){return a}))},className:(0,n.Z)("ml-0 flex h-8 items-center justify-center","border border-gray-300","bg-white px-3 leading-tight text-gray-500","hover:bg-gray-100 hover:text-gray-700"),children:a})})]}),(0,o.jsx)("li",{children:(0,o.jsx)("button",{onClick:function(){l("page",(function(e){return Math.min(a,e+1)}))},className:(0,n.Z)("ml-0 flex h-8 items-center justify-center","rounded-r-lg border border-gray-300","bg-white px-3 leading-tight text-gray-500","hover:bg-gray-100 hover:text-gray-700",t===a&&"cursor-not-allowed"),children:"\u5f8c\u4e00\u9801"})})]})})}function f(e){var t=e.currentPage,a=e.totalPages,l=e.updateNumberState,r=e.length;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("button",{onClick:function(){return l("page",(function(e){return Math.max(1,e-1)}))},children:(0,o.jsx)(c.J.xh,{className:(0,n.Z)(1===t?"fill-gray-400":"fill-white")})}),(0,o.jsxs)("p",{children:["\u7b2c",t,"\u9801\uff0c\u5171",a,"\u9801 \uff5c ",r,"\u7a2e\u7b26\u5408"]}),(0,o.jsx)("button",{onClick:function(){return l("page",(function(e){return Math.min(a,e+1)}))},children:(0,o.jsx)(c.J.ZJ,{className:(0,n.Z)(t===a?"fill-gray-400":"fill-white")})})]})}function y(e){var t=e.checked,a=e.toggleState;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("input",{type:"checkbox",name:"filter",id:"filter",className:"hidden",checked:t,onChange:function(e){a(e.target.checked)}}),(0,o.jsx)("label",{htmlFor:"filter",className:"flex cursor-pointer flex-col items-center",children:(0,o.jsx)(c.J.wn,{className:"h-6 w-6"})})]})}function j(e){var t=e.list,a=e.currVal,l=e.updateState;return(0,o.jsx)("div",{className:"flex flex-wrap gap-4",children:t.map((function(e){return(0,o.jsx)("button",{className:(0,n.Z)("rounded-xl px-2 py-1","whitespace-nowrap shadow-list-items","string"===typeof a?a===e.val?"bg-secondary":"bg-secondary/40":a.has(e.val)?"bg-secondary":"bg-secondary/40"),onClick:function(){l(e.val)},children:e.name},e.name)}))})}function b(e){var t=e.filter,a=e.abilities,s=e.updateState,i=e.updateSetState,x=e.display,u=e.toggleDisplay,m=i("types"),g=s("ability"),h=[t.ability,t.EV].filter(Boolean).length>0||t.tags.size>0,f=[{value:t.ability,name:"\u7279\u6027",key:"ability"},{value:d.J$[t.EV]||"",name:"\u52aa\u529b\u503c",key:"EV"}],y=[(0,l.Z)(t.tags).map((function(e){return{value:e,name:"tag",key:"tags"}}))].flat();return(0,o.jsxs)("header",{children:[(0,o.jsxs)("div",{className:"flex flex-col justify-between gap-x-2 md:flex-row md:items-center",children:[(0,o.jsxs)("div",{className:"flex items-center gap-2",children:[(0,o.jsx)("div",{className:(0,n.Z)("rounded-xl p-2","bg-custom-red","hidden md:block"),children:(0,o.jsx)(c.J.VN,{className:"h-5 w-5 fill-current"})}),(0,o.jsx)("h2",{className:"text-xl",children:"\u5716\u9451\u6e05\u55ae"})]}),(0,o.jsx)("div",{className:"flex w-full items-center gap-x-3 md:w-96",children:(0,o.jsx)(p,{value:t.keyword,onChange:s("keyword"),display:x,toggleDisplay:u,hasFilter:h})})]}),(0,o.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,o.jsx)(r.c$,{title:"\u5716\u9451\u5206\u985e"}),(0,o.jsx)(j,{list:[{name:"\u5e15\u5e95\u4e9e",val:"paldea"},{name:"\u5317\u4e0a",val:"kitakami"},{name:"\u85cd\u8393",val:"blueberry"},{name:"\u6d17\u7fe0",val:"hisui"},{name:"\u5168\u570b",val:"national"},{name:"HOME\u5165\u5883 / \u6d3b\u52d5",val:"home"}],currVal:t.pokedex,updateState:s("pokedex")}),(0,o.jsx)(r.c$,{title:"\u5c6c\u6027"}),(0,o.jsx)("div",{className:"flex w-full flex-wrap justify-items-center gap-x-4 gap-y-3 pb-2 pl-2",children:Object.keys(d.oY).map((function(e){return(0,o.jsx)("button",{onClick:function(){return m(e)},children:(0,o.jsx)(c.J.lA.Dy,{type:e,className:(0,n.Z)("h-8 w-8",t.types.size>0&&!t.types.has(e)&&"opacity-30")})},e)}))})]}),(0,o.jsxs)("div",{className:(0,n.Z)("mt-2 flex-col gap-2",x.advancedFilter?"flex":"hidden"),children:[(0,o.jsx)(r.Fl,{title:"\u9032\u968e\u641c\u5c0b"}),(0,o.jsx)(r.c$,{title:"\u7279\u6027"}),(0,o.jsx)("div",{className:"block md:hidden",children:(0,o.jsx)(r.ZD,{text:"\u986f\u793a\u7279\u6027",checked:x.ability,handleChange:u("ability")})}),(0,o.jsxs)("div",{className:"relative mb-2 w-60",children:[(0,o.jsx)("div",{className:"pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",children:(0,o.jsx)(c.J.ol,{className:"h-5 w-5"})}),(0,o.jsx)("input",{type:"search",className:(0,n.Z)("block w-full rounded-lg border border-gray-300","bg-gray-50 p-2 pl-10 text-sm text-gray-900"),placeholder:"\u641c\u5c0b\u7279\u6027",value:t.ability,onChange:function(e){g(e.target.value)}})]}),(0,o.jsx)(j,{list:a.filter((function(e){return e.split("").some((function(e){return t.ability.includes(e)}))})).map((function(e){return{name:e,val:e}})),currVal:t.ability,updateState:g}),(0,o.jsx)(r.c$,{title:"\u52aa\u529b\u503c"}),(0,o.jsx)(r.ZD,{text:"\u986f\u793a\u52aa\u529b\u503c",checked:x.EVs,handleChange:u("EVs")}),(0,o.jsx)("span",{className:"text-sm",children:"(\u7be9\u9078\u55ae\u7368\u53ea\u6709\u9019\u6b64\u9805\u7684\u6e05\u55ae)"}),(0,o.jsx)(j,{list:[{name:"HP",val:"HP"},{name:"\u653b\u64ca",val:"Atk"},{name:"\u9632\u79a6",val:"Def"},{name:"\u7279\u653b",val:"SpA"},{name:"\u7279\u9632",val:"SpD"},{name:"\u901f\u5ea6",val:"Spe"}],currVal:t.EV,updateState:s("EV")}),(0,o.jsx)(r.c$,{title:"tags(\u8907\u9078\uff0c\u4ea4\u96c6)"}),(0,o.jsx)(j,{list:[{name:"\u50b3\u8aaa\u7684\u5bf6\u53ef\u5922",val:"\u50b3\u8aaa\u7684\u5bf6\u53ef\u5922"},{name:"\u5e7b\u4e4b\u5bf6\u53ef\u5922",val:"\u5e7b\u4e4b\u5bf6\u53ef\u5922"},{name:"\u6096\u8b2c\u5bf6\u53ef\u5922",val:"\u6096\u8b2c\u5bf6\u53ef\u5922"},{name:"\u51c6\u50b3\u8aaa\u7684\u5bf6\u53ef\u5922",val:"\u51c6\u50b3\u8aaa\u7684\u5bf6\u53ef\u5922"},{name:"\u6731\u7248\u9650\u5b9a",val:"\u6731\u7248\u9650\u5b9a"},{name:"\u7d2b\u7248\u9650\u5b9a",val:"\u7d2b\u7248\u9650\u5b9a"}],currVal:t.tags,updateState:i("tags")})]}),(0,o.jsxs)("div",{className:(0,n.Z)("flex-col gap-2",!1===x.advancedFilter&&h?"flex":"hidden"),children:[(0,o.jsx)(r.c$,{title:"\u9032\u968e\u7be9\u9078\u9805\u76ee\uff1a"}),(0,o.jsxs)("div",{className:"flex flex-wrap gap-4",children:[f.filter((function(e){return""!==e.value})).map((function(e){var t=e.value,a=e.name,l=e.key;return(0,o.jsxs)("span",{className:(0,n.Z)("flex items-center gap-x-2","rounded-xl bg-amber-100 px-2 py-1 shadow-list-items"),children:[a,"\uff1a",t,(0,o.jsx)(c.J.x8,{className:"h-3 w-3 cursor-pointer",onClick:function(){s(l)("")}})]},l)})),y.map((function(e){var t=e.value,a=e.name,l=e.key;return(0,o.jsxs)("span",{className:(0,n.Z)("flex items-center gap-x-2","rounded-xl bg-amber-100 px-2 py-1 shadow-list-items","whitespace-nowrap"),children:[a,"\uff1a",t,(0,o.jsx)(c.J.x8,{className:"h-3 w-3 cursor-pointer",onClick:function(){i(l)(t)}})]},"".concat(a,"-").concat(t))}))]})]})]})}var v=a(4942),N=a(1413),w=a(9439),k=a(2791),S=a(8745),Z="pokeDexPage";var C=function(){var e=function(){var e=(0,i.lr)(),t=(0,w.Z)(e,2),a=t[0],n=t[1],r=(0,k.useState)({advancedFilter:!1,EVs:!1,ability:!1}),s=(0,w.Z)(r,2),c=s[0],d=s[1],o=(0,S.JT)(Z),x={keyword:a.get("keyword")||"",pokedex:a.get("pokedex")||"paldea",page:Number(a.get("page")||1),types:new Set((a.get("types")||"").split("-").filter(Boolean)),ability:a.get("ability")||"",EV:a.get("EV")||"",tags:new Set((a.get("tags")||"").split("-").filter(Boolean))};return(0,k.useEffect)((function(){var e={};a.forEach((function(t,a){e[a]=t})),Object.keys(e).length>0&&localStorage.setItem(Z,JSON.stringify(e))}),[a]),{filter:x,updateState:function(e){return function(t){n(""===t?function(t){return t.delete(e),delete o[e],localStorage.setItem(Z,JSON.stringify(o)),t}:function(a){return a.has(e)&&a.get(e)===t?(a.delete(e),delete o[e]):(a.set(e,t),o[e]=t),a.delete("page"),delete o.page,localStorage.setItem(Z,JSON.stringify(o)),a})}},updateNumberState:function(e,t){n((function(a){var l=a.get(e)||"1",n=t(Number(l));return a.set(e,String(n)),a}))},updateSetState:function(e){return function(t){n((function(a){var n=new Set((a.get(e)||"").split("-").filter(Boolean));return n.has(t)?n.delete(t):n.add(t),0===n.size?(a.delete(e),delete o[e]):(a.set(e,(0,l.Z)(n).join("-")),o[e]=(0,l.Z)(n).join("-")),a.delete("page"),delete o.page,localStorage.setItem(Z,JSON.stringify(o)),a}))}},display:c,toggleDisplay:function(e){return function(t){d((function(a){return(0,N.Z)((0,N.Z)({},a),{},(0,v.Z)({},e,t))}))}}}}(),t=e.filter,a=e.updateState,c=e.updateNumberState,d=e.updateSetState,x=e.display,u=e.toggleDisplay,p=(0,s.C3)().pokemonList;if((0,k.useEffect)((function(){document.title="".concat(t.pokedex," Pok\xe9dex")}),[t.pokedex]),0===p.length)return(0,o.jsx)(r.gb,{});var g=(0,l.Z)(new Set(p.map((function(e){return e.abilities.concat([e.hiddenAbility||""])})).flat().filter(Boolean))).sort();p=(0,S.M$)(p,t);var y=Math.ceil(p.length/30),j=30*(t.page-1),C=p.slice(j,j+30);return(0,o.jsxs)("div",{className:"mb-4 flex flex-col gap-y-4",children:[(0,o.jsx)(b,{filter:t,abilities:g,updateState:a,updateSetState:d,display:x,toggleDisplay:u}),(0,o.jsx)(r.Hr,{}),(0,o.jsx)("p",{className:(0,n.Z)(p.length>0&&"hidden"),children:"\u67e5\u7121\u7b26\u5408\u9805\u76ee\uff0c\u8acb\u8abf\u6574\u641c\u5c0b\u9805\u76ee\u3002"}),p.length>0&&(0,o.jsx)("div",{className:"grid grid-cols-list-mobile justify-around gap-4 pt-4 pb-8 md:grid-cols-list",children:C.map((function(e){return(0,o.jsx)(m,{pokemon:e,filter:t,display:x},e.link)}))}),(0,o.jsx)("footer",{className:"hidden justify-end md:flex",children:(0,o.jsx)(h,{currentPage:t.page,totalPages:y,updateNumberState:c})}),(0,o.jsx)("footer",{className:(0,n.Z)("fixed bottom-0 left-0 right-0 flex h-12 items-center justify-between","bg-primary/60 px-4 text-white md:hidden"),children:(0,o.jsx)(f,{currentPage:t.page,totalPages:y,updateNumberState:c,length:p.length})})]})}}}]);
//# sourceMappingURL=Pokedex.f7f29130.chunk.js.map