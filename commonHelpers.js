import{S as d,i as m}from"./assets/vendor-8c59ed88.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const f=document.querySelector(".form");document.querySelector(".btn-search");const h=document.querySelector(".gallery-list"),a=document.querySelector(".loader");function c(e){m.show({message:e,image:"../img/bi_x-octagon.svg",messageColor:"#FFF",position:"topRight",backgroundColor:"#EF4040",maxWidth:"472px",imageWidth:24})}function l(e){h.innerHTML=e}function u(e,o){o?e.classList.remove("hidden"):e.classList.add("hidden")}const p=new d(".gallery-list a",{caption:!0,captionsData:"alt",captionDelay:250});f.addEventListener("submit",e=>{e.preventDefault();const o=e.target.elements.query.value.trim();l(""),u(a,!0),g(o).then(s=>{if(s.hits.length){const i=L(s.hits);l(i),p.refresh()}else c("Sorry, there are no images matching your search query. Please try again!")}).catch(()=>{c("Sorry, something went wrong. Try one more time.")}).finally(()=>{u(a,!1)})});function g(e){const o="https://pixabay.com/api/",s=new URLSearchParams({key:"44022790-a27ad4929b92e52df6d2f0bb4",q:e,image_type:"photo",orientation:"horizontal",safesearch:"true"}),i=`${o}?${s}`;return fetch(i).then(t=>t.json())}function y(e){return`<li>
    <a class="gallery-link" href="${e.largeImageURL}">
    <img 
        class="gallery-img" 
        src="${e.webformatURL}" 
        data-source="${e.largeImageURL}"
        alt="${e.tags}"></a>
    <div class="information">
     <div>
        <h3>Likes</h3>
        <p>${e.likes}</p>
     </div>
      <div>
          <h3>Views</h3>
          <p>${e.views}</p>
      </div>   
      <div>
        <h3>Comments</h3>
        <p>${e.comments}</p>
      </div>   
      <div>
        <h3>Downloads</h3>
        <p>${e.downloads}</p>
      </div>
    </div>
  </li>`}function L(e){return e.map(y).join("")}
//# sourceMappingURL=commonHelpers.js.map
