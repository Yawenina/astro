"use strict";(self.webpackChunkastro_docusaurus=self.webpackChunkastro_docusaurus||[]).push([[4659],{5896:(e,t,a)=>{a.d(t,{A:()=>p});var l=a(7953),n=a(8835),r=a(7307),s=a(6029),o=a(2246),i=a(4325);const c={sidebar:"sidebar_hxzd",sidebarItemTitle:"sidebarItemTitle_coe_",sidebarItemList:"sidebarItemList_fCvJ",sidebarItem:"sidebarItem_DAyu",sidebarItemLink:"sidebarItemLink_WP0Z",sidebarItemLinkActive:"sidebarItemLinkActive_bm1i"};function m(e){let{sidebar:t}=e;return l.createElement("aside",{className:"col col--3"},l.createElement("nav",{className:(0,n.A)(c.sidebar,"thin-scrollbar"),"aria-label":(0,i.T)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},l.createElement("div",{className:(0,n.A)(c.sidebarItemTitle,"margin-bottom--md")},t.title),l.createElement("ul",{className:(0,n.A)(c.sidebarItemList,"clean-list")},t.items.map((e=>l.createElement("li",{key:e.permalink,className:c.sidebarItem},l.createElement(o.A,{isNavLink:!0,to:e.permalink,className:c.sidebarItemLink,activeClassName:c.sidebarItemLinkActive},e.title)))))))}var u=a(6952);function d(e){let{sidebar:t}=e;return l.createElement("ul",{className:"menu__list"},t.items.map((e=>l.createElement("li",{key:e.permalink,className:"menu__list-item"},l.createElement(o.A,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active"},e.title)))))}function g(e){return l.createElement(u.GX,{component:d,props:e})}function h(e){let{sidebar:t}=e;const a=(0,s.l)();return t?.items.length?"mobile"===a?l.createElement(g,{sidebar:t}):l.createElement(m,{sidebar:t}):null}function p(e){const{sidebar:t,toc:a,children:s,...o}=e,i=t&&t.items.length>0;return l.createElement(r.A,o,l.createElement("div",{className:"container margin-vert--lg"},l.createElement("div",{className:"row"},l.createElement(h,{sidebar:t}),l.createElement("main",{className:(0,n.A)("col",{"col--7":i,"col--9 col--offset-1":!i}),itemScope:!0,itemType:"http://schema.org/Blog"},s),a&&l.createElement("div",{className:"col col--2"},a))))}},4752:(e,t,a)=>{a.d(t,{A:()=>x});var l=a(7953),n=a(8835),r=a(4739),s=a(9725);function o(e){let{children:t,className:a}=e;const{frontMatter:n,assets:o}=(0,r.e)(),{withBaseUrl:i}=(0,s.h)(),c=o.image??n.image;return l.createElement("article",{className:a,itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},c&&l.createElement("meta",{itemProp:"image",content:i(c,{absolute:!0})}),t)}var i=a(2246);const c={title:"title_N5xb"};function m(e){let{className:t}=e;const{metadata:a,isBlogPostPage:s}=(0,r.e)(),{permalink:o,title:m}=a,u=s?"h1":"h2";return l.createElement(u,{className:(0,n.A)(c.title,t),itemProp:"headline"},s?m:l.createElement(i.A,{itemProp:"url",to:o},m))}var u=a(4325),d=a(5985);const g={container:"container_vzr8"};function h(e){let{readingTime:t}=e;const a=function(){const{selectMessage:e}=(0,d.W)();return t=>{const a=Math.ceil(t);return e(a,(0,u.T)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:a}))}}();return l.createElement(l.Fragment,null,a(t))}function p(e){let{date:t,formattedDate:a}=e;return l.createElement("time",{dateTime:t,itemProp:"datePublished"},a)}function E(){return l.createElement(l.Fragment,null," \xb7 ")}function b(e){let{className:t}=e;const{metadata:a}=(0,r.e)(),{date:s,formattedDate:o,readingTime:i}=a;return l.createElement("div",{className:(0,n.A)(g.container,"margin-vert--md",t)},l.createElement(p,{date:s,formattedDate:o}),void 0!==i&&l.createElement(l.Fragment,null,l.createElement(E,null),l.createElement(h,{readingTime:i})))}function f(e){return e.href?l.createElement(i.A,e):l.createElement(l.Fragment,null,e.children)}function v(e){let{author:t,className:a}=e;const{name:r,title:s,url:o,imageURL:i,email:c}=t,m=o||c&&`mailto:${c}`||void 0;return l.createElement("div",{className:(0,n.A)("avatar margin-bottom--sm",a)},i&&l.createElement(f,{href:m,className:"avatar__photo-link"},l.createElement("img",{className:"avatar__photo",src:i,alt:r})),r&&l.createElement("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person"},l.createElement("div",{className:"avatar__name"},l.createElement(f,{href:m,itemProp:"url"},l.createElement("span",{itemProp:"name"},r))),s&&l.createElement("small",{className:"avatar__subtitle",itemProp:"description"},s)))}const A={authorCol:"authorCol_MxjQ",imageOnlyAuthorRow:"imageOnlyAuthorRow_t8BH",imageOnlyAuthorCol:"imageOnlyAuthorCol_wQzT"};function N(e){let{className:t}=e;const{metadata:{authors:a},assets:s}=(0,r.e)();if(0===a.length)return null;const o=a.every((e=>{let{name:t}=e;return!t}));return l.createElement("div",{className:(0,n.A)("margin-top--md margin-bottom--sm",o?A.imageOnlyAuthorRow:"row",t)},a.map(((e,t)=>l.createElement("div",{className:(0,n.A)(!o&&"col col--6",o?A.imageOnlyAuthorCol:A.authorCol),key:t},l.createElement(v,{author:{...e,imageURL:s.authorsImageUrls[t]??e.imageURL}})))))}function _(){return l.createElement("header",null,l.createElement(m,null),l.createElement(b,null),l.createElement(N,null))}var P=a(8596),k=a(3805);function T(e){let{children:t,className:a}=e;const{isBlogPostPage:s}=(0,r.e)();return l.createElement("div",{id:s?P.blogPostContainerID:void 0,className:(0,n.A)("markdown",a),itemProp:"articleBody"},l.createElement(k.A,null,t))}var w=a(837),I=a(9954),L=a(2324);function y(){return l.createElement("b",null,l.createElement(u.A,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))}function C(e){const{blogPostTitle:t,...a}=e;return l.createElement(i.A,(0,L.A)({"aria-label":(0,u.T)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t})},a),l.createElement(y,null))}const F={blogPostFooterDetailsFull:"blogPostFooterDetailsFull_MXKk"};function B(){const{metadata:e,isBlogPostPage:t}=(0,r.e)(),{tags:a,title:s,editUrl:o,hasTruncateMarker:i}=e,c=!t&&i,m=a.length>0;return m||c||o?l.createElement("footer",{className:(0,n.A)("row docusaurus-mt-lg",t&&F.blogPostFooterDetailsFull)},m&&l.createElement("div",{className:(0,n.A)("col",{"col--9":c})},l.createElement(I.A,{tags:a})),t&&o&&l.createElement("div",{className:"col margin-top--sm"},l.createElement(w.A,{editUrl:o})),c&&l.createElement("div",{className:(0,n.A)("col text--right",{"col--3":m})},l.createElement(C,{blogPostTitle:s,to:e.permalink}))):null}function x(e){let{children:t,className:a}=e;const s=function(){const{isBlogPostPage:e}=(0,r.e)();return e?void 0:"margin-bottom--xl"}();return l.createElement(o,{className:(0,n.A)(s,a)},l.createElement(_,null),l.createElement(T,null,t),l.createElement(B,null))}},837:(e,t,a)=>{a.d(t,{A:()=>m});var l=a(7953),n=a(4325),r=a(4431),s=a(2324),o=a(8835);const i={iconEdit:"iconEdit_phHI"};function c(e){let{className:t,...a}=e;return l.createElement("svg",(0,s.A)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,o.A)(i.iconEdit,t),"aria-hidden":"true"},a),l.createElement("g",null,l.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))}function m(e){let{editUrl:t}=e;return l.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:r.G.common.editThisPage},l.createElement(c,null),l.createElement(n.A,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}},3423:(e,t,a)=>{a.d(t,{A:()=>s});var l=a(7953),n=a(8835),r=a(2246);function s(e){const{permalink:t,title:a,subLabel:s,isNext:o}=e;return l.createElement(r.A,{className:(0,n.A)("pagination-nav__link",o?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t},s&&l.createElement("div",{className:"pagination-nav__sublabel"},s),l.createElement("div",{className:"pagination-nav__label"},a))}},352:(e,t,a)=>{a.d(t,{A:()=>o});var l=a(7953),n=a(8835),r=a(2246);const s={tag:"tag_CdAL",tagRegular:"tagRegular_vbzB",tagWithCount:"tagWithCount_jfrl"};function o(e){let{permalink:t,label:a,count:o}=e;return l.createElement(r.A,{href:t,className:(0,n.A)(s.tag,o?s.tagWithCount:s.tagRegular)},a,o&&l.createElement("span",null,o))}},9954:(e,t,a)=>{a.d(t,{A:()=>i});var l=a(7953),n=a(8835),r=a(4325),s=a(352);const o={tags:"tags_ddb3",tag:"tag_gDkf"};function i(e){let{tags:t}=e;return l.createElement(l.Fragment,null,l.createElement("b",null,l.createElement(r.A,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),l.createElement("ul",{className:(0,n.A)(o.tags,"padding--none","margin-left--sm")},t.map((e=>{let{label:t,permalink:a}=e;return l.createElement("li",{key:a,className:o.tag},l.createElement(s.A,{label:t,permalink:a}))}))))}},4739:(e,t,a)=>{a.d(t,{e:()=>o,i:()=>s});var l=a(7953),n=a(4388);const r=l.createContext(null);function s(e){let{children:t,content:a,isBlogPostPage:n=!1}=e;const s=function(e){let{content:t,isBlogPostPage:a}=e;return(0,l.useMemo)((()=>({metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:a})),[t,a])}({content:a,isBlogPostPage:n});return l.createElement(r.Provider,{value:s},t)}function o(){const e=(0,l.useContext)(r);if(null===e)throw new n.dV("BlogPostProvider");return e}},5985:(e,t,a)=>{a.d(t,{W:()=>c});var l=a(7953),n=a(6726);const r=["zero","one","two","few","many","other"];function s(e){return r.filter((t=>e.includes(t)))}const o={locale:"en",pluralForms:s(["one","other"]),select:e=>1===e?"one":"other"};function i(){const{i18n:{currentLocale:e}}=(0,n.A)();return(0,l.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:s(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),o}}),[e])}function c(){const e=i();return{selectMessage:(t,a)=>function(e,t,a){const l=e.split("|");if(1===l.length)return l[0];l.length>a.pluralForms.length&&console.error(`For locale=${a.locale}, a maximum of ${a.pluralForms.length} plural forms are expected (${a.pluralForms.join(",")}), but the message contains ${l.length}: ${e}`);const n=a.select(t),r=a.pluralForms.indexOf(n);return l[Math.min(r,l.length-1)]}(a,t,e)}}}}]);