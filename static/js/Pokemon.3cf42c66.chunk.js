"use strict";(self.webpackChunkpaldea=self.webpackChunkpaldea||[]).push([[63],{4955:function(e,t,a){a.r(t),a.d(t,{default:function(){return L}});var n=a(885),s=a(2791),r=a(7689),l=a(8182),c=a(481),i=a(101),o=a(1413),d=a(4925),x=a(6807),u=a(286),m=["data","status"],p=a(2116),h=a(184);function f(e){var t=e.pm;return(0,h.jsx)("header",{className:"h-40",children:(0,h.jsxs)("div",{className:"relative flex h-full justify-center",children:[(0,h.jsx)("div",{className:"z-10 w-32",children:(0,h.jsx)(c.JO.lA.JC,{pm:t})}),(0,h.jsx)("div",{className:(0,l.Z)("absolute -inset-x-4 bottom-0 z-0 h-full","md:inset-x-0 md:-mx-4 md:rounded-t-xl","bg-gradient-to-b",p.jy[t.types[0]],p.Tm[t.types.length>1?t.types[1]:t.types[0]])})]})})}var v={0:[100,0],31:[87.5,12.5],63:[75,25],127:[50,50],191:[25,75],225:[12.5,87.5],254:[0,100],255:[0,0]},g=[{title:"\u82f1\u6587\u540d\u7a31",Content:function(e){var t=e.pm;return(0,h.jsx)(h.Fragment,{children:t.nameEn})}},{title:"\u65e5\u6587\u540d\u7a31",Content:function(e){var t=e.pm;return(0,h.jsx)(h.Fragment,{children:t.nameJp})}},{title:"\u5c6c\u6027",Content:function(e){var t=e.pm;return(0,h.jsx)("span",{className:"flex gap-2 text-white",children:t.types.map((function(e){return(0,h.jsxs)("span",{className:(0,l.Z)("flex items-center gap-1 rounded-xl pl-2 pr-3 text-sm",p.XI[e]),children:[(0,h.jsx)(c.JO.lA.Dy,{type:e,className:"h-6 w-6"}),e]},e)}))})}},{title:"\u6027\u5225\u6bd4\u4f8b",Content:function(e){var t=e.pm;return(0,h.jsxs)("span",{className:"flex gap-4 whitespace-nowrap",children:[(0,h.jsxs)("span",{children:["\u2642\uff1a",v[t.genderRatio][0],"%"]}),(0,h.jsxs)("span",{children:["\u2640\uff1a",v[t.genderRatio][1],"%"]})]})}},{title:"\u7279\u6027",Content:function(e){var t=e.pm;return(0,h.jsx)("span",{className:"flex flex-wrap justify-center gap-2 md:justify-start",children:t.abilities.map((function(e){return(0,h.jsx)("span",{className:(0,l.Z)("py-px","h-7 w-full md:w-2/5","border-2 border-solid border-secondary","rounded-full bg-secondary/30 text-center text-sm text-black","whitespace-nowrap"),children:e},e)}))})}},{title:"\u96b1\u85cf\u7279\u6027",Content:function(e){var t=e.pm;return null===t.hiddenAbility?(0,h.jsx)(h.Fragment,{}):(0,h.jsx)("span",{className:"flex flex-wrap justify-center gap-2 md:justify-start",children:(0,h.jsx)("span",{className:(0,l.Z)("py-px","h-7 w-full md:w-2/5","border-2 border-solid border-scarlet","rounded-full bg-scarlet/30 text-center text-sm text-black","whitespace-nowrap"),children:t.hiddenAbility})})}},{title:"\u86cb\u7fa4",Content:function(e){var t=e.pm;return(0,h.jsx)("span",{className:"flex gap-2",children:t.eggGroups.map((function(e){return(0,h.jsx)("span",{className:(0,l.Z)("py-px","h-7 w-1/2 md:w-2/5","border-2 border-solid border-secondary","rounded-full bg-secondary/30 text-center text-sm text-black","whitespace-nowrap"),children:e},e)}))})}}];function j(e){var t=e.pm;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(c.c$,{title:"\u57fa\u672c\u8cc7\u8a0a"}),(0,h.jsx)("ul",{className:"grid grid-cols-2 gap-x-2 gap-y-4 md:gap-y-6",children:g.map((function(e,a){return(0,h.jsxs)("li",{className:(0,l.Z)("flex flex-col items-start","gap-1","md:flex-row md:text-left"),children:[(0,h.jsx)("span",{className:(0,l.Z)("md:py-px","pr-3 md:w-2/5 md:pr-0","border-b-[1px] border-solid border-custom-gold md:border-2","text-start text-sm text-black md:rounded-full md:text-center","whitespace-nowrap"),children:e.title}),(0,h.jsx)("p",{className:"w-full",children:(0,h.jsx)(e.Content,{pm:t})})]},a)}))})]})}var b=100,y=[150,150],N=function(e,t){var a=2*e*Math.PI/360;return[y[0]+t*Math.cos(a),y[1]+t*Math.sin(a)]},w=function(e){var t=e.deg,a=N(t,b),n=N(t+180,b);return(0,h.jsx)("line",{x1:a[0],y1:a[1],x2:n[0],y2:n[1],stroke:"#FFFFFF",strokeWidth:"2"})},k=function(e){var t,a=e.deg,n=e.text,s=e.value,r=N(a,125),c=(null!==(t=null===n||void 0===n?void 0:n.length)&&void 0!==t?t:0)>2?"fill-red-600 stroke-[0.5px] stroke-red-600":"fill-slate-600";return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("text",{x:r[0],y:r[1]-5,fontSize:"1.1em",textAnchor:"middle",className:(0,l.Z)(c),children:n}),(0,h.jsx)("text",{x:r[0],y:r[1]+15,fontSize:"1.1em",textAnchor:"middle",className:(0,l.Z)(c),children:s})]})},Z=function(e){var t=e.value,a=N(0,0);return(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("text",{x:a[0],y:a[1]+10,fontSize:"1.5em",textAnchor:"middle",fill:"#f3f4f6",children:t})})};function S(e){var t=(0,n.Z)(e.stats,6),a=t[0],s=t[1],r=t[2],l=t[3],c=t[4],i=t[5],o=e.color,d=void 0===o?"#339DDF":o,x=(0,n.Z)(e.EVs,6),u=x[0],m=x[1],p=x[2],f=x[3],v=x[4],g=x[5],j=a+s+r+l+c+i,S=Array.from(Array(6).keys()).map((function(e,t){return 30+60*t})).map((function(e){return N(e,b)})),F=[N(270,a*b/255),N(330,s*b/170),N(30,r*b/184),N(90,i*b/200),N(150,c*b/184),N(210,l*b/170)],C=[{name:"HP",value:a,deg:270,plus:u},{name:"\u653b\u64ca",value:s,deg:330,plus:m},{name:"\u9632\u79a6",value:r,deg:30,plus:p},{name:"\u901f\u5ea6",value:i,deg:90,plus:g},{name:"\u7279\u9632",value:c,deg:150,plus:v},{name:"\u7279\u653b",value:l,deg:210,plus:f}];return(0,h.jsxs)("svg",{className:"h-auto w-full",viewBox:"0 0 ".concat(2*y[0]," ").concat(2*y[1]),children:[(0,h.jsx)("polygon",{points:S.flat().join(", "),fill:"#e9e9e9"}),(0,h.jsxs)("g",{children:[(0,h.jsx)(w,{deg:-30}),(0,h.jsx)(w,{deg:30}),(0,h.jsx)(w,{deg:90})]}),(0,h.jsx)("polygon",{points:F.flat().join(", "),className:d,fillOpacity:"0.6"}),(0,h.jsxs)("g",{children:[C.map((function(e){return(0,h.jsx)(k,{text:e.name+(e.plus>0?"+".concat(e.plus):""),value:e.value,deg:e.deg},e.deg)})),(0,h.jsx)(Z,{text:"total",value:j})]})]})}function F(e,t,a,n){var s=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r=arguments.length>5?arguments[5]:void 0;if(s)return Math.floor(Math.floor(2*e+t+a/4)*n/100+10+n);var l=Math.floor(2*e+t+a/4)*n/100+5;return void 0===r?Math.floor(l):"up"===r?Math.floor(1.1*l):Math.floor(.9*l)}function C(e){var t=e.pokemon,a=(0,s.useState)(75),r=(0,n.Z)(a,2),i=r[0],o=r[1],d=(0,s.useState)(F(t.baseStats[5],31,0,i,!1,void 0)-1),x=(0,n.Z)(d,2),u=x[0],m=x[1],f=Array(253).fill(0).map((function(e,t){return t})).map((function(e){return F(t.baseStats[5],31,e,i,!1,void 0)})).findIndex((function(e){return e>u})),v=[{name:"\u6700\u9ad8",individual:31,base:252,nature:"up"},{name:"\u6a19\u6e96",individual:31,base:252,nature:void 0},{name:"\u4e0a\u5347",individual:31,base:0,nature:"up"},{name:"\u521d\u59cb",individual:31,base:0,nature:void 0},{name:"\u4e0b\u964d",individual:31,base:0,nature:"down"},{name:"\u6700\u4f4e",individual:0,base:0,nature:"down"}];return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(c.c$,{title:"\u80fd\u529b\u503c"}),(0,h.jsxs)("div",{className:"grid grid-cols-12 gap-3 text-gray-600",children:[(0,h.jsx)("div",{className:"col-span-full flex justify-center md:col-span-5",children:(0,h.jsx)("div",{className:"w-10/12 md:w-full",children:(0,h.jsx)(S,{stats:t.baseStats,EVs:t.EVs,color:p.lm[t.types[0]]})})}),(0,h.jsxs)("div",{className:"col-span-12 space-y-3 md:col-span-7",children:[(0,h.jsxs)("label",{className:"block font-medium",children:["Lv\uff1a ",i]}),(0,h.jsx)("input",{type:"range",value:i,min:"1",max:"100",step:"1",className:"h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200",onChange:function(e){return o(parseInt(e.target.value))}}),(0,h.jsxs)("table",{className:"w-full table-fixed text-center text-sm",children:[(0,h.jsx)("thead",{className:"bg-gray-100 text-xs uppercase",children:(0,h.jsxs)("tr",{className:"bg-custom-gold/50 text-gray-100",children:[(0,h.jsx)("th",{scope:"col",className:"whitespace-nowrap py-1",children:"\u60c5\u5883"}),["Hp","\u653b\u64ca","\u9632\u79a6","\u7279\u653b","\u7279\u9632","\u901f\u5ea6"].map((function(e){return(0,h.jsx)("th",{scope:"col",className:"whitespace-nowrap py-1",children:e},e)}))]})}),(0,h.jsx)("tbody",{children:v.map((function(e){return(0,h.jsxs)("tr",{className:(0,l.Z)("border-b text-center","\u521d\u59cb"===e.name?"bg-gray-200":"hover:bg-gray-100 hover:text-gray-900"),children:[(0,h.jsx)("td",{className:"py-1",children:e.name}),t.baseStats.map((function(t,a){return(0,h.jsx)("td",{className:"py-1",children:F(t,e.individual,e.base,i,0===a,e.nature)},a)}))]},e.name)}))})]}),(0,h.jsx)("input",{type:"range",value:u,min:F(t.baseStats[5],31,0,i,!1,void 0)-1,max:F(t.baseStats[5],31,252,i,!1,void 0)-1,step:"1",className:"h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200",onChange:function(e){return m(parseInt(e.target.value))}}),(0,h.jsxs)("p",{children:["\u82e5\u5c0d\u624b\u7684\u901f\u5ea6",u," \uff0c\u9700\u8981",f,"\u9ede\u901f\u5ea6\u52aa\u529b\u503c\u624d\u80fd\u5148\u653b",(0,h.jsx)("span",{className:"block text-sm",children:"(\u540c\u7b49\u7d1a\u4e0b\uff0c\u6211\u65b9\u500b\u9ad4\u503c\u6eff\uff0c\u4e14\u7121\u6027\u683c\u5f71\u97ff\u4e0b)"})]})]}),(0,h.jsxs)("ul",{className:"col-span-12 text-center text-sm text-gray-500 md:text-start",children:[(0,h.jsx)("li",{className:"px-2",children:"\u6700\u9ad8\uff1a\u500b\u9ad4\u503c\u6700\u5927\u3001\u52aa\u529b\u503c\u6eff\u3001\u6027\u683c\u21e7"}),(0,h.jsx)("li",{className:"px-2",children:"\u6a19\u6e96\uff1a\u500b\u9ad4\u503c\u6700\u5927\u3001\u52aa\u529b\u503c\u6eff\u3001\u6027\u683c\uff0d"}),(0,h.jsx)("li",{className:"px-2",children:"\u4e0a\u5347\uff1a\u500b\u9ad4\u503c\u6700\u5927\u3001\u7121\u52aa\u529b\u503c\u3001\u6027\u683c\u21e7"}),(0,h.jsx)("li",{children:(0,h.jsx)("span",{className:"bg-gray-200 px-2 text-gray-600",children:"\u521d\u59cb\uff1a\u500b\u9ad4\u503c\u6700\u5927\u3001\u7121\u52aa\u529b\u503c\u3001\u6027\u683c\uff0d"})}),(0,h.jsx)("li",{className:"px-2",children:"\u4e0b\u964d\uff1a\u500b\u9ad4\u503c\u6700\u5927\u3001\u7121\u52aa\u529b\u503c\u3001\u6027\u683c\u21e9"}),(0,h.jsx)("li",{className:"px-2",children:"\u6700\u4f4e\uff1a\u500b\u9ad4\u503c\u6700\u4f4e\u3001\u7121\u52aa\u529b\u503c\u3001\u6027\u683c\u21e9"})]})]})]})}var M=a(6731),T={1:"row-span-1",2:"row-span-2",3:"row-span-3",8:"row-[span_8_/_span_8]"},O=function(e){var t=e.condition,a=e.className,n=void 0===a?"":a;return(0,h.jsx)("span",{className:(0,l.Z)("relative flex h-full w-full items-center text-right",n),children:(0,h.jsxs)("span",{className:(0,l.Z)("absolute","inset-x-0","top-1/2 -translate-y-1/3","text-sm","flex justify-center text-center","text-[12px] md:text-base"),children:[t," \u21e8"]})})},A=function(e){var t=e.pm,a=e.className,n=void 0===a?"":a;return(0,h.jsxs)("div",{className:(0,l.Z)(n,"h-24 w-24 md:h-28 md:w-28","relative -mt-6"),children:[(0,h.jsx)("span",{className:(0,l.Z)("absolute","rounded-full","inset-x-0 h-5 md:h-7","bg-gradient-to-r","top-2/3 -translate-y-2/3",p.jy[t.types[0]],p.Tm[t.types.length>1?t.types[1]:t.types[0]])}),(0,h.jsx)("span",{className:(0,l.Z)("absolute","inset-x-0","top-1/3 -translate-y-1/2"),children:(0,h.jsx)(c.JO.lA.JC,{pm:t})}),(0,h.jsxs)("span",{className:(0,l.Z)("absolute","inset-x-0","-bottom-1","text-xs md:text-base"),children:[t.nameZh,t.altForm?(0,h.jsxs)("span",{className:"text-xs",children:["(",t.altForm,")"]}):""]}),(0,h.jsx)(M.rU,{className:"stretchedLink",to:"/pokedex/".concat(t.nameZh).concat(t.altForm?"-"+t.altForm:"")})]})};function E(e){var t,a,n,s=e.pm,r=null!==(t=s.evolves)&&void 0!==t&&t.to.find((function(e){return e.to}))?"grid-cols-5":"grid-cols-3",c=T[(null===(a=s.evolves)||void 0===a?void 0:a.to.length)||1],i=0,o=null===(n=s.evolves)||void 0===n?void 0:n.to.reduce((function(e,t,a){var n,r=[],o=T[(null===(n=t.to)||void 0===n?void 0:n.length)||1],d="row-span-1"===c&&"row-span-2"===o?"row-span-2":"row-span-1";return 0===a&&s.evolves&&r.push((0,h.jsx)(A,{pm:s.evolves.from,className:(0,l.Z)("text-xs","row-span-1"===c&&"row-span-2"===o?"row-span-2":c)},i)),r=r.concat([(0,h.jsx)(O,{condition:t.condition,className:d},i+1),(0,h.jsx)(A,{pm:t,className:(0,l.Z)("text-xs",d)},i+2)]),e=e.concat(r.slice(0)),i+=3,t.to&&t.to.forEach((function(t){e=e.concat([(0,h.jsx)(O,{condition:t.condition},i),(0,h.jsx)(A,{pm:t,className:(0,l.Z)("text-xs")},i+1)]),i+=2})),e}),[]);return(0,h.jsx)("div",{className:(0,l.Z)("grid items-center justify-center gap-y-8 text-center","justify-items-center",r),children:o})}var P=a(4165),I=a(5861),J=[{header:"\u4f86\u6e90",value:function(e){if("TMPid"in e)return"TM".concat(e.TMPid.toString().padStart(3,"0"));if("level"in e&&!("pm"in e))return e.level<1?p.go[e.level.toString()]:"Lv".concat(e.level.toString().padStart(2,"0"));var t=e.level<1?p.go[e.level.toString()]:"Lv".concat(e.level.toString().padStart(2,"0"));return"".concat(e.pm.nameZh).concat(e.pm.altForm?"("+e.pm.altForm+")":"","-").concat(t)},meta:"w-2/12"},{header:"\u62db\u5f0f\u540d\u7a31",value:function(e){return(0,h.jsx)("a",{href:"https://wiki.52poke.com/zh-hant/".concat(e.nameZh,"\uff08\u62db\u5f0f\uff09"),target:"_blank",rel:"noreferrer",className:"text-blue-800 underline",children:e.nameZh})},meta:"w-2/12"},{header:"\u5c6c\u6027",value:function(e){return(0,h.jsx)(c.JO.lA.Dy,{type:e.type,className:"h-6 w-full"})},meta:"w-1/12"},{header:"\u5206\u985e",value:function(e){return(0,h.jsx)(c.JO.lA.KQ,{type:e.category,className:"h-6 w-full"})},meta:"w-1/12"},{header:"\u5a01\u529b",value:function(e){return e.power<1?p.DO[e.power.toString()]:e.power},meta:"w-2/12"},{header:"\u547d\u4e2d",value:function(e){return e.accuracy<1?p.DO[e.accuracy.toString()]:e.accuracy},meta:"w-2/12"},{header:"PP",value:function(e){return e.PP},meta:"w-1/12"}];function z(e){var t,a=e.move,n=e.onlyEvolve,s=e.setOnlyEvolve;return(0,h.jsxs)("div",{className:"flex w-full flex-col text-gray-500",children:[(0,h.jsxs)("h6",{className:"flex justify-between py-2 text-lg font-bold",children:[(0,h.jsx)("span",{children:"\u8aaa\u660e"}),(0,h.jsxs)("div",{className:"flex items-center",children:[(0,h.jsx)("input",{id:"showChild",type:"checkbox",checked:n,className:"h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-800 focus:ring-1 focus:ring-blue-800",onChange:function(e){return s(e.target.checked)}}),(0,h.jsx)("label",{htmlFor:"showChild",className:"ml-2 text-sm",children:"\u50c5\u986f\u793a\u9032\u5316\u578b"})]})]}),(0,h.jsx)("p",{children:a.description}),a.levelingUps.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("hr",{className:"my-3 h-px border-0 bg-gray-200"}),(0,h.jsx)("h6",{className:"py-2 text-lg font-bold",children:"\u5347\u7b49 / \u9032\u5316 / \u56de\u61b6\u62db\u5f0f"}),(0,h.jsx)("div",{className:"flex flex-wrap gap-2",children:a.levelingUps.filter((function(e){return!n||void 0===e.child})).map((function(e){var t="Lv".concat(e.level);return e.level<1&&(t=p.go[e.level]),(0,h.jsx)(c.OC,{pm:e,text:t},e.link)}))})]}),a.egg.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("hr",{className:"my-3 h-px border-0 bg-gray-200"}),(0,h.jsx)("h6",{className:"py-2 text-lg font-bold",children:"\u907a\u50b3\u62db\u5f0f(\u6a21\u4eff\u9999\u8349)"}),(0,h.jsx)("div",{className:"flex flex-wrap gap-2",children:a.egg.filter((function(e){return!n||void 0===e.child})).map((function(e){return(0,h.jsx)(c.OC,{pm:e},e.link)}))})]}),a.TM&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("hr",{className:"my-3 h-px border-0 bg-gray-200"}),(0,h.jsx)("h6",{className:"py-2 text-lg font-bold",children:"\u62db\u5f0f\u6a5f"}),(0,h.jsxs)("ul",{className:"text-gray-5000 max-w-md list-inside list-disc space-y-1 pb-2",children:[(0,h.jsxs)("li",{children:["\u7de8\u865f\uff1a#",a.TM.pid.toString().padStart(3,"0")]}),(0,h.jsxs)("li",{children:["\u806f\u76df\u9ede\u6578\uff1a",a.TM.leaguePoint]}),(0,h.jsxs)("li",{children:["\u6750\u6599\uff1a",a.TM.materials.map((function(e){return"".concat(e.part,"x").concat(e.count)})).join("; ")]})]}),(0,h.jsx)("div",{className:"flex flex-wrap gap-2",children:null===(t=a.TM)||void 0===t?void 0:t.pm.filter((function(e){return!n||void 0===e.child})).map((function(e){return(0,h.jsx)(c.OC,{pm:e},e.link)}))})]})]})}function _(e){var t=e.pm,a=t.moves.levelingUps.concat(t.moves.beforeEvolve).concat(t.moves.eggMoves).concat(t.moves.TMs),r=(0,s.useState)(new Set),c=(0,n.Z)(r,2),i=c[0],o=c[1],d=(0,s.useState)({}),x=(0,n.Z)(d,2),m=x[0],p=x[1],f=(0,s.useState)(!0),v=(0,n.Z)(f,2),g=v[0],j=v[1],b=function(){var e=(0,I.Z)((0,P.Z)().mark((function e(t,a){var n,s;return(0,P.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n=new Set(i)).has(t)){e.next=5;break}n.delete(t),e.next=11;break;case 5:if(n.add(t),void 0!==m[a]){e.next=11;break}return e.next=9,(0,u.h)("/data/move/".concat(a,".json"));case 9:s=e.sent,p((function(e){return e[a]=s,e}));case 11:o(n);case 12:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}();return(0,h.jsx)("div",{className:"-mx-4 md:mx-0",children:(0,h.jsxs)("ul",{className:"text-sm",children:[(0,h.jsx)("li",{className:(0,l.Z)("sticky top-0 flex bg-custom-gold/50","py-1 text-gray-100 md:-top-4"),children:J.map((function(e){return(0,h.jsx)("span",{className:(0,l.Z)("whitespace-nowrap py-1 px-2 text-center",e.meta),children:e.header},e.header)}))}),a.map((function(e){var t="".concat(e.pid,"-").concat("level"in e?e.level:e.TMPid),a=[(0,h.jsx)("li",{className:"flex cursor-pointer border-b-[1px] py-1",onClick:function(){b(t,e.nameZh)},children:J.map((function(t){return(0,h.jsx)("span",{className:(0,l.Z)("whitespace-nowrap py-1 px-2 text-center leading-6","flex justify-center",t.meta),children:t.value(e)},t.header)}))},t)];return i.has(t)&&a.push((0,h.jsx)("li",{className:(0,l.Z)("flex border-b-[1px] p-4","bg-slate-50"),children:(0,h.jsx)(z,{move:m[e.nameZh],onlyEvolve:g,setOnlyEvolve:j})},"".concat(t,"-d"))),a})).flat()]})})}function D(e){var t=e.title,a=e.selectTab,n=e.setTab;return(0,h.jsx)("li",{className:"mr-2",children:(0,h.jsx)("button",{className:(0,l.Z)("inline-block rounded-t-lg border-b-2 p-2 md:p-4",a===t?"border-custom-gold text-custom-gold":"border-transparent hover:border-gray-300 hover:text-gray-600"),onClick:function(){return n(t)},children:t})})}var L=function(){var e="pokemonPage",t=(0,r.s0)(),a=(0,r.UO)().nameId,l=void 0===a?"\u5674\u706b\u9f8d":a,p=l.split("-"),v=(0,n.Z)(p,2),g=v[0],b=v[1],y=(0,i.C3)().pokemonList,N=(0,s.useState)((function(){return localStorage.getItem(e)||"\u57fa\u672c\u8cc7\u8a0a"})),w=(0,n.Z)(N,2),k=w[0],Z=w[1];(0,s.useEffect)((function(){localStorage.setItem(e,k)}),[k]);var S=y.find((function(e){return e.nameZh===g&&(void 0===b||e.altForm===b)}))||{link:void 0},F=S.link;if(void 0===F){var M=y.find((function(e){return e.link===l}))||{link:void 0};F=M.link}void 0===F&&(F="4");var T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"906",t=(0,x.a)(["pokemon:".concat(e)],(function(){return(0,u.h)("/data/pm/".concat(e,".json"))})),a=t.data,n=t.status,s=(0,d.Z)(t,m);return(0,o.Z)({status:n,data:a},s)}(F),O=T.data,A=T.status;return 0===y.length||"success"!==A?(0,h.jsx)(h.Fragment,{}):(0,h.jsx)("div",{className:"flex w-full justify-center",children:(0,h.jsxs)("div",{className:"-mt-4 flex w-full max-w-3xl flex-col gap-4",children:[(0,h.jsx)(f,{pm:O}),(0,h.jsxs)("h2",{className:"-my-2 flex items-end gap-x-2 whitespace-nowrap text-2xl",children:["#",O.pid.toString().padStart(4,"0")," ",O.nameZh,O.altForm&&(0,h.jsxs)("span",{className:"text-sm",children:["(",O.altForm,")"]}),(0,h.jsx)("a",{href:"https://wiki.52poke.com/zh-hant/".concat(O.nameZh),target:"_blank",rel:"noreferrer",className:"ml-2 text-base font-bold text-blue-800 underline",children:"wiki"}),O.hisui&&(0,h.jsx)("a",{href:"https://huskyhsu.github.io/arceus/#/".concat(O.hisui.toString().padStart(3,"0")).concat("\u6d17\u7fe0"===O.altForm?"H":""),target:"_blank",rel:"noreferrer",className:"ml-2 text-base font-bold text-blue-800 underline",children:"\u6d17\u7fe0\u5716\u9451"})]}),(0,h.jsx)("div",{className:"border-b border-gray-200 text-center text-sm font-medium text-gray-500",children:(0,h.jsxs)("ul",{className:"-mb-px flex flex-wrap",children:[(0,h.jsx)(D,{title:"\u57fa\u672c\u8cc7\u8a0a",selectTab:k,setTab:Z}),(0,h.jsx)(D,{title:"\u9032\u5316\u9014\u5f91",selectTab:k,setTab:Z}),(0,h.jsx)(D,{title:"\u62db\u5f0f\u6e05\u55ae",selectTab:k,setTab:Z})]})}),"\u57fa\u672c\u8cc7\u8a0a"===k&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(j,{pm:O}),(0,h.jsx)(C,{pokemon:O})]}),"\u9032\u5316\u9014\u5f91"===k&&(0,h.jsx)(h.Fragment,{children:void 0!==O.evolves&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(c.c$,{title:"\u9032\u5316\u9014\u5f91"}),(0,h.jsx)(E,{pm:O})]})}),"\u62db\u5f0f\u6e05\u55ae"===k&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(c.c$,{title:"\u62db\u5f0f\u6e05\u55ae"}),(0,h.jsx)(_,{pm:O})]}),(0,h.jsx)("button",{onClick:function(){return t(-1)},children:"back"})]})})}}}]);
//# sourceMappingURL=Pokemon.3cf42c66.chunk.js.map