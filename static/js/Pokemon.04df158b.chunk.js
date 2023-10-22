"use strict";(self.webpackChunkpaldea=self.webpackChunkpaldea||[]).push([[63],{4417:function(e,t,n){n.r(t),n.d(t,{default:function(){return b}});var r=n(885),s=n(7689),a=n(3700),l=n(101),i=n(1413),d=n(4925),c=n(6807),o=n(286),p=["data","status"],m=n(8182),x=n(2116),u=n(184);function h(e){var t=e.pm;return(0,u.jsx)("header",{children:(0,u.jsxs)("div",{className:"relative flex justify-center",children:[(0,u.jsx)("div",{className:"z-10 w-32",children:(0,u.jsx)(a.JO.lA.J,{pm:t})}),(0,u.jsx)("div",{className:(0,m.Z)("absolute -inset-x-4 bottom-0 z-0 h-3/5 md:inset-x-0","md:rounded-2xl","bg-gradient-to-b",x.jy[t.types[0]],x.Tm[t.types.length>1?t.types[1]:t.types[0]])})]})})}var f={0:[100,0],31:[87.5,12.5],63:[75,25],127:[50,50],191:[25,75],225:[12.5,87.5],254:[0,100],255:[0,0]},j=[{title:"\u82f1\u6587\u540d\u7a31",Content:function(e){var t=e.pm;return(0,u.jsx)(u.Fragment,{children:t.nameEn})}},{title:"\u65e5\u6587\u540d\u7a31",Content:function(e){var t=e.pm;return(0,u.jsx)(u.Fragment,{children:t.nameJp})}},{title:"\u5c6c\u6027",Content:function(e){var t=e.pm;return(0,u.jsx)("span",{className:"flex gap-2 text-white",children:t.types.map((function(e){return(0,u.jsxs)("span",{className:(0,m.Z)("flex items-center gap-1 rounded-xl pl-2 pr-3 text-sm",x.XI[e]),children:[(0,u.jsx)(a.JO.lA.D,{type:e,className:"h-6 w-6"}),e]},e)}))})}},{title:"\u6027\u5225\u6bd4\u4f8b",Content:function(e){var t=e.pm;return(0,u.jsxs)("span",{className:"flex gap-4 whitespace-nowrap",children:[(0,u.jsxs)("span",{children:["\u2642\uff1a",f[t.genderRatio][0],"%"]}),(0,u.jsxs)("span",{children:["\u2640\uff1a",f[t.genderRatio][1],"%"]})]})}},{title:"\u7279\u6027",Content:function(e){var t=e.pm;return(0,u.jsx)("span",{className:"flex flex-wrap justify-center gap-2 md:justify-start",children:t.abilities.map((function(e){return(0,u.jsx)("span",{className:(0,m.Z)("py-px","h-7 w-full md:w-2/5","border-2 border-solid border-secondary","rounded-full bg-secondary/30 text-center text-sm text-black","whitespace-nowrap"),children:e},e)}))})}},{title:"\u96b1\u85cf\u7279\u6027",Content:function(e){var t=e.pm;return(0,u.jsx)("span",{className:"flex flex-wrap justify-center gap-2 md:justify-start",children:(0,u.jsx)("span",{className:(0,m.Z)("py-px","h-7 w-full md:w-2/5","border-2 border-solid border-scarlet","rounded-full bg-scarlet/30 text-center text-sm text-black","whitespace-nowrap"),children:t.hiddenAbility})})}},{title:"\u86cb\u7fa4",Content:function(e){var t=e.pm;return(0,u.jsx)("span",{className:"flex gap-2",children:t.eggGroups.map((function(e){return(0,u.jsx)("span",{className:(0,m.Z)("py-px","h-7 w-1/2 md:w-2/5","border-2 border-solid border-secondary","rounded-full bg-secondary/30 text-center text-sm text-black","whitespace-nowrap"),children:e},e)}))})}}];function g(e){var t=e.pm;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(a.Fl,{title:"\u57fa\u672c\u8cc7\u8a0a"}),(0,u.jsx)("ul",{className:"grid grid-cols-2 gap-x-2 gap-y-4 md:gap-y-6",children:j.map((function(e,n){return(0,u.jsxs)("li",{className:(0,m.Z)("flex flex-col items-start","gap-1","md:flex-row md:text-left"),children:[(0,u.jsx)("span",{className:(0,m.Z)("md:py-px","pr-3 md:w-2/5 md:pr-0","border-b-[1px] border-solid border-custom-gold md:border-2","text-start text-sm text-black md:rounded-full md:text-center","whitespace-nowrap"),children:e.title}),(0,u.jsx)("p",{className:"w-full",children:(0,u.jsx)(e.Content,{pm:t})})]},n)}))})]})}var b=function(){var e=(0,s.s0)(),t=(0,s.UO)().nameId,n=void 0===t?"\u5674\u706b\u9f8d":t,m=n.split("-"),x=(0,r.Z)(m,2),f=x[0],j=x[1],b=(0,l.C3)().pokemonList,v=b.find((function(e){return e.nameZh===f&&(void 0===j||e.altForm===j)}))||{link:void 0},w=v.link;if(void 0===w){var y=b.find((function(e){return e.link===n}))||{link:void 0};w=y.link}void 0===w&&(w="4");var N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"906",t=(0,c.a)(["pokemon:".concat(e)],(function(){return(0,o.h)("/data/pm/".concat(e,".json"))})),n=t.data,r=t.status,s=(0,d.Z)(t,p);return(0,i.Z)({status:r,data:n},s)}(w),k=N.data,Z=N.status;return 0===b.length||"success"!==Z?(0,u.jsx)(u.Fragment,{}):(0,u.jsxs)("div",{className:"-mt-4 flex flex-col gap-2",children:[(0,u.jsx)(h,{pm:k}),(0,u.jsxs)("h2",{className:"text-2xl",children:["#",k.pid.toString().padStart(4,"0")," ",k.nameZh,k.altForm&&(0,u.jsxs)("span",{className:"text-sm",children:["(",k.altForm,")"]}),(0,u.jsx)("a",{href:"https://wiki.52poke.com/zh-hant/".concat(k.nameZh),target:"_blank",rel:"noreferrer",className:"ml-2 text-lg font-bold text-blue-800 underline",children:"wiki"})]}),(0,u.jsx)(g,{pm:k}),(0,u.jsx)(a.c$,{title:"\u9032\u5316"}),(0,u.jsxs)("details",{open:!0,children:[(0,u.jsx)("summary",{children:"\u9032\u5316"}),(0,u.jsx)("pre",{children:JSON.stringify(k.evolves,null,2)})]}),(0,u.jsx)(a.c$,{title:"\u62db\u5f0f"}),(0,u.jsxs)("details",{children:[(0,u.jsx)("summary",{children:"\u62db\u5f0f"}),(0,u.jsx)("pre",{children:JSON.stringify(k.moves,null,2)})]}),(0,u.jsx)("button",{onClick:function(){return e(-1)},children:"back"})]})}}}]);
//# sourceMappingURL=Pokemon.04df158b.chunk.js.map