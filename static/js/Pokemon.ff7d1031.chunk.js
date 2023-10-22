"use strict";(self.webpackChunkpaldea=self.webpackChunkpaldea||[]).push([[63],{4890:function(e,t,n){n.r(t),n.d(t,{default:function(){return M}});var a=n(885),s=n(7689),r=n(3700),l=n(101),i=n(1413),c=n(4925),d=n(6807),o=n(286),x=["data","status"],u=n(8182),m=n(2116),p=n(184);function h(e){var t=e.pm;return(0,p.jsx)("header",{children:(0,p.jsxs)("div",{className:"relative flex justify-center",children:[(0,p.jsx)("div",{className:"z-10 w-32",children:(0,p.jsx)(r.JO.lA.J,{pm:t})}),(0,p.jsx)("div",{className:(0,u.Z)("absolute -inset-x-4 bottom-0 z-0 h-3/5 md:inset-x-0","md:rounded-2xl","bg-gradient-to-b",m.jy[t.types[0]],m.Tm[t.types.length>1?t.types[1]:t.types[0]])})]})})}var f={0:[100,0],31:[87.5,12.5],63:[75,25],127:[50,50],191:[25,75],225:[12.5,87.5],254:[0,100],255:[0,0]},j=[{title:"\u82f1\u6587\u540d\u7a31",Content:function(e){var t=e.pm;return(0,p.jsx)(p.Fragment,{children:t.nameEn})}},{title:"\u65e5\u6587\u540d\u7a31",Content:function(e){var t=e.pm;return(0,p.jsx)(p.Fragment,{children:t.nameJp})}},{title:"\u5c6c\u6027",Content:function(e){var t=e.pm;return(0,p.jsx)("span",{className:"flex gap-2 text-white",children:t.types.map((function(e){return(0,p.jsxs)("span",{className:(0,u.Z)("flex items-center gap-1 rounded-xl pl-2 pr-3 text-sm",m.XI[e]),children:[(0,p.jsx)(r.JO.lA.D,{type:e,className:"h-6 w-6"}),e]},e)}))})}},{title:"\u6027\u5225\u6bd4\u4f8b",Content:function(e){var t=e.pm;return(0,p.jsxs)("span",{className:"flex gap-4 whitespace-nowrap",children:[(0,p.jsxs)("span",{children:["\u2642\uff1a",f[t.genderRatio][0],"%"]}),(0,p.jsxs)("span",{children:["\u2640\uff1a",f[t.genderRatio][1],"%"]})]})}},{title:"\u7279\u6027",Content:function(e){var t=e.pm;return(0,p.jsx)("span",{className:"flex flex-wrap justify-center gap-2 md:justify-start",children:t.abilities.map((function(e){return(0,p.jsx)("span",{className:(0,u.Z)("py-px","h-7 w-full md:w-2/5","border-2 border-solid border-secondary","rounded-full bg-secondary/30 text-center text-sm text-black","whitespace-nowrap"),children:e},e)}))})}},{title:"\u96b1\u85cf\u7279\u6027",Content:function(e){var t=e.pm;return null===t.hiddenAbility?(0,p.jsx)(p.Fragment,{}):(0,p.jsx)("span",{className:"flex flex-wrap justify-center gap-2 md:justify-start",children:(0,p.jsx)("span",{className:(0,u.Z)("py-px","h-7 w-full md:w-2/5","border-2 border-solid border-scarlet","rounded-full bg-scarlet/30 text-center text-sm text-black","whitespace-nowrap"),children:t.hiddenAbility})})}},{title:"\u86cb\u7fa4",Content:function(e){var t=e.pm;return(0,p.jsx)("span",{className:"flex gap-2",children:t.eggGroups.map((function(e){return(0,p.jsx)("span",{className:(0,u.Z)("py-px","h-7 w-1/2 md:w-2/5","border-2 border-solid border-secondary","rounded-full bg-secondary/30 text-center text-sm text-black","whitespace-nowrap"),children:e},e)}))})}}];function g(e){var t=e.pm;return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(r.Fl,{title:"\u57fa\u672c\u8cc7\u8a0a"}),(0,p.jsx)("ul",{className:"grid grid-cols-2 gap-x-2 gap-y-4 md:gap-y-6",children:j.map((function(e,n){return(0,p.jsxs)("li",{className:(0,u.Z)("flex flex-col items-start","gap-1","md:flex-row md:text-left"),children:[(0,p.jsx)("span",{className:(0,u.Z)("md:py-px","pr-3 md:w-2/5 md:pr-0","border-b-[1px] border-solid border-custom-gold md:border-2","text-start text-sm text-black md:rounded-full md:text-center","whitespace-nowrap"),children:e.title}),(0,p.jsx)("p",{className:"w-full",children:(0,p.jsx)(e.Content,{pm:t})})]},n)}))})]})}var v=n(2791),y=100,b=[150,150],N=function(e,t){var n=2*e*Math.PI/360;return[b[0]+t*Math.cos(n),b[1]+t*Math.sin(n)]},w=function(e){var t=e.deg,n=N(t,y),a=N(t+180,y);return(0,p.jsx)("line",{x1:n[0],y1:n[1],x2:a[0],y2:a[1],stroke:"#FFFFFF",strokeWidth:"2"})},k=function(e){var t,n=e.deg,a=e.text,s=e.value,r=N(n,125),l=(null!==(t=null===a||void 0===a?void 0:a.length)&&void 0!==t?t:0)>2?"fill-red-600 stroke-1 stroke-red-600":"fill-slate-600";return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("text",{x:r[0],y:r[1]-5,fontSize:"1.1em",textAnchor:"middle",className:(0,u.Z)(l),children:a}),(0,p.jsx)("text",{x:r[0],y:r[1]+15,fontSize:"1.1em",textAnchor:"middle",className:(0,u.Z)(l),children:s})]})},F=function(e){var t=e.value,n=N(0,0);return(0,p.jsx)(p.Fragment,{children:(0,p.jsx)("text",{x:n[0],y:n[1]+10,fontSize:"1.5em",textAnchor:"middle",fill:"#f3f4f6",children:t})})};function Z(e){var t=(0,a.Z)(e.stats,6),n=t[0],s=t[1],r=t[2],l=t[3],i=t[4],c=t[5],d=e.color,o=void 0===d?"#339DDF":d,x=(0,a.Z)(e.EVs,6),u=x[0],m=x[1],h=x[2],f=x[3],j=x[4],g=x[5],v=n+s+r+l+i+c,Z=Array.from(Array(6).keys()).map((function(e,t){return 30+60*t})).map((function(e){return N(e,y)})),C=[N(270,n*y/255),N(330,s*y/165),N(30,r*y/184),N(90,c*y/200),N(150,i*y/154),N(210,l*y/170)],S=[{name:"HP",value:n,deg:270,plus:u},{name:"\u653b\u64ca",value:s,deg:330,plus:m},{name:"\u9632\u79a6",value:r,deg:30,plus:h},{name:"\u901f\u5ea6",value:c,deg:90,plus:g},{name:"\u7279\u9632",value:i,deg:150,plus:j},{name:"\u7279\u653b",value:l,deg:210,plus:f}];return(0,p.jsxs)("svg",{className:"h-auto w-full",viewBox:"0 0 ".concat(2*b[0]," ").concat(2*b[1]),children:[(0,p.jsx)("polygon",{points:Z.flat().join(", "),fill:"#e9e9e9"}),(0,p.jsxs)("g",{children:[(0,p.jsx)(w,{deg:-30}),(0,p.jsx)(w,{deg:30}),(0,p.jsx)(w,{deg:90})]}),(0,p.jsx)("polygon",{points:C.flat().join(", "),fill:o,fillOpacity:"0.6"}),(0,p.jsxs)("g",{children:[S.map((function(e){return(0,p.jsx)(k,{text:e.name+(e.plus>0?"+".concat(e.plus):""),value:e.value,deg:e.deg},e.deg)})),(0,p.jsx)(F,{text:"total",value:v})]})]})}var C=n(239);function S(e,t,n,a){var s=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r=arguments.length>5?arguments[5]:void 0;if(s)return Math.floor(Math.floor(2*e+t+n/4)*a/100+10+a);var l=Math.floor(2*e+t+n/4)*a/100+5;return void 0===r?Math.floor(l):"up"===r?Math.floor(1.1*l):Math.floor(.9*l)}function A(e){var t=e.pokemon,n=(0,v.useState)(75),s=(0,a.Z)(n,2),l=s[0],i=s[1],c=[{name:"\u6700\u9ad8",individual:31,base:252,nature:"up"},{name:"\u6a19\u6e96",individual:31,base:252,nature:void 0},{name:"\u4e0a\u5347",individual:31,base:0,nature:"up"},{name:"\u521d\u59cb",individual:31,base:0,nature:void 0},{name:"\u4e0b\u964d",individual:31,base:0,nature:"down"},{name:"\u6700\u4f4e",individual:0,base:0,nature:"down"}];return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(r.Fl,{title:"\u80fd\u529b\u503c"}),(0,p.jsxs)("div",{className:"grid grid-cols-12 gap-3",children:[(0,p.jsx)("div",{className:"col-span-full flex justify-center md:col-span-5",children:(0,p.jsx)("div",{className:"w-10/12 md:w-full",children:(0,p.jsx)(Z,{stats:t.baseStats,EVs:t.EVs,color:C.Ox[t.types[0]]})})}),(0,p.jsxs)("div",{className:"col-span-12 space-y-3 md:col-span-7",children:[(0,p.jsxs)("label",{className:"block font-medium text-gray-600",children:["Lv\uff1a ",l]}),(0,p.jsx)("input",{type:"range",value:l,min:"1",max:"100",step:"1",className:"h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-100",onChange:function(e){return i(parseInt(e.target.value))}}),(0,p.jsxs)("table",{className:"w-full table-fixed text-center text-sm text-gray-600",children:[(0,p.jsx)("thead",{className:"bg-gray-100 text-xs uppercase text-gray-700",children:(0,p.jsxs)("tr",{className:"bg-custom-gold/50 text-gray-100",children:[(0,p.jsx)("th",{scope:"col",className:"whitespace-nowrap py-1",children:"\u60c5\u5883"}),["Hp","\u653b\u64ca","\u9632\u79a6","\u7279\u653b","\u7279\u9632","\u901f\u5ea6"].map((function(e){return(0,p.jsx)("th",{scope:"col",className:"whitespace-nowrap py-1",children:e},e)}))]})}),(0,p.jsx)("tbody",{children:c.map((function(e){return(0,p.jsxs)("tr",{className:(0,u.Z)("border-b text-center","\u521d\u59cb"===e.name?"bg-gray-200 text-gray-600":"hover:bg-gray-200 hover:text-gray-600"),children:[(0,p.jsx)("td",{className:"py-1",children:e.name}),t.baseStats.slice(0,6).map((function(t,n){return(0,p.jsx)("td",{className:"py-1",children:S(t,e.individual,e.base,l,0===n,e.nature)},n)}))]},e.name)}))})]})]}),(0,p.jsxs)("ul",{className:"col-span-12 text-center text-sm text-gray-500 md:text-start",children:[(0,p.jsx)("li",{className:"px-2",children:"\u6700\u9ad8\uff1a\u500b\u9ad4\u503c\u6700\u5927\u3001\u52aa\u529b\u503c\u6eff\u3001\u6027\u683c\u21e7"}),(0,p.jsx)("li",{className:"px-2",children:"\u6a19\u6e96\uff1a\u500b\u9ad4\u503c\u6700\u5927\u3001\u52aa\u529b\u503c\u6eff\u3001\u6027\u683c\uff0d"}),(0,p.jsx)("li",{className:"px-2",children:"\u4e0a\u5347\uff1a\u500b\u9ad4\u503c\u6700\u5927\u3001\u7121\u52aa\u529b\u503c\u3001\u6027\u683c\u21e7"}),(0,p.jsx)("li",{children:(0,p.jsx)("span",{className:"bg-gray-200 px-2 text-gray-600",children:"\u521d\u59cb\uff1a\u500b\u9ad4\u503c\u6700\u5927\u3001\u7121\u52aa\u529b\u503c\u3001\u6027\u683c\uff0d"})}),(0,p.jsx)("li",{className:"px-2",children:"\u4e0b\u964d\uff1a\u500b\u9ad4\u503c\u6700\u5927\u3001\u7121\u52aa\u529b\u503c\u3001\u6027\u683c\u21e9"}),(0,p.jsx)("li",{className:"px-2",children:"\u6700\u4f4e\uff1a\u500b\u9ad4\u503c\u6700\u4f4e\u3001\u7121\u52aa\u529b\u503c\u3001\u6027\u683c\u21e9"})]})]})]})}var M=function(){var e=(0,s.s0)(),t=(0,s.UO)().nameId,n=void 0===t?"\u5674\u706b\u9f8d":t,u=n.split("-"),m=(0,a.Z)(u,2),f=m[0],j=m[1],v=(0,l.C3)().pokemonList,y=v.find((function(e){return e.nameZh===f&&(void 0===j||e.altForm===j)}))||{link:void 0},b=y.link;if(void 0===b){var N=v.find((function(e){return e.link===n}))||{link:void 0};b=N.link}void 0===b&&(b="4");var w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"906",t=(0,d.a)(["pokemon:".concat(e)],(function(){return(0,o.h)("/data/pm/".concat(e,".json"))})),n=t.data,a=t.status,s=(0,c.Z)(t,x);return(0,i.Z)({status:a,data:n},s)}(b),k=w.data,F=w.status;return 0===v.length||"success"!==F?(0,p.jsx)(p.Fragment,{}):(0,p.jsxs)("div",{className:"-mt-4 flex flex-col gap-4",children:[(0,p.jsx)(h,{pm:k}),(0,p.jsxs)("h2",{className:"text-2xl",children:["#",k.pid.toString().padStart(4,"0")," ",k.nameZh,k.altForm&&(0,p.jsxs)("span",{className:"text-sm",children:["(",k.altForm,")"]}),(0,p.jsx)("a",{href:"https://wiki.52poke.com/zh-hant/".concat(k.nameZh),target:"_blank",rel:"noreferrer",className:"ml-2 font-bold text-blue-800 underline",children:"wiki"})]}),(0,p.jsx)(g,{pm:k}),(0,p.jsx)(A,{pokemon:k}),(0,p.jsx)(r.c$,{title:"\u9032\u5316"}),(0,p.jsxs)("details",{open:!0,children:[(0,p.jsx)("summary",{children:"\u9032\u5316"}),(0,p.jsx)("pre",{children:JSON.stringify(k.evolves,null,2)})]}),(0,p.jsx)(r.c$,{title:"\u62db\u5f0f"}),(0,p.jsxs)("details",{children:[(0,p.jsx)("summary",{children:"\u62db\u5f0f"}),(0,p.jsx)("pre",{children:JSON.stringify(k.moves,null,2)})]}),(0,p.jsx)("button",{onClick:function(){return e(-1)},children:"back"})]})}}}]);
//# sourceMappingURL=Pokemon.ff7d1031.chunk.js.map