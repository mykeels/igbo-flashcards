if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),d={module:{uri:t},exports:o,require:l};s[t]=Promise.all(n.map((e=>d[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-e1498109"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BX-lQwVe.css",revision:null},{url:"assets/index-zQZKxO_C.js",revision:null},{url:"index.html",revision:"a38d4a1f877e5b4f3863e6ee41f90f3e"},{url:"registerSW.js",revision:"67d92876115994eebdafe83ecda6a729"},{url:"logo.svg",revision:"19654e9c9854413cb6526dfaa09218cf"},{url:"manifest.webmanifest",revision:"c7eebb063fced9d0012f109a2a18e254"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
