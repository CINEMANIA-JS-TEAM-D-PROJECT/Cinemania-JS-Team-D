(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();function $(){const t=document.querySelector(".burger"),e=document.querySelector(".header-nav-links");!t||!e||t.addEventListener("click",function(){this.classList.toggle("active"),e.classList.toggle("active")})}function D(){const t=document.querySelector(".header-toggle-switch"),e=document.querySelector("body"),r=document.querySelectorAll(".header, .header-nav-links a, .burger"),l=document.querySelector(".header-navbar"),o=document.querySelector(".header-logo"),n=document.querySelector(".header-nav-links"),s=document.querySelector(".upcoming-section"),i=document.querySelector(".footer"),d=document.querySelector(".weekly-title"),u=document.querySelector(".pagination button"),c=document.querySelector("#search-input-catalog"),b=document.querySelector(".year-dropdown-btn"),f=document.querySelector(".year-dropdown-btn"),m=document.querySelector(".year-dropdown-content"),C=document.querySelectorAll(".year-option"),v=document.querySelector(".modal-content"),p=document.querySelector(".modal-content"),w=document.querySelector(".modal-film-btns"),a=document.querySelector("#genre-filter"),L=document.querySelector(".footer-modal-content");if(!t)return;localStorage.getItem("theme")==="dark"?(I(),t.classList.add("active")):(B(),t.classList.remove("active")),t.addEventListener("click",function(){this.classList.toggle("active"),this.classList.contains("active")?(I(),localStorage.setItem("theme","dark")):(B(),localStorage.setItem("theme","light"))});function I(){e&&(e.style.backgroundColor="white"),l&&(l.style.backgroundColor="white"),n&&(n.style.backgroundColor="white"),i&&(i.style.backgroundColor="white"),u&&(u.style.backgroundColor="#595959"),c&&(c.style.backgroundColor="white"),c&&(c.style.borderColor="black"),b&&(b.style.backgroundColor="white"),f&&(f.style.borderColor="black"),m&&(m.style.backgroundColor="white"),m&&(m.style.borderColor="black"),v&&(v.style.backgroundColor="white"),a&&(a.style.backgroundColor="white"),a&&(a.style.borderColor="#111111"),L&&(L.style.backgroundColor="white"),r.forEach(h=>{h.style.color="#282828"}),C.forEach(h=>{h.style.color="#282828"}),s&&(s.style.color="#282828"),o&&(o.style.color="#282828"),i&&(i.style.color="#282828"),d&&(d.style.color="#282828"),u&&(u.style.color="#595959"),f&&(f.style.color="#282828"),p&&(p.style.color="#111111"),w&&(w.style.color="#111111"),a&&(a.style.color="#111111")}function B(){e&&(e.style.backgroundColor="#111111"),l&&(l.style.backgroundColor="#111111"),n&&(n.style.backgroundColor="#111111"),i&&(i.style.backgroundColor="#111111"),c&&(c.style.backgroundColor="#111111"),c&&(c.style.borderColor="white"),b&&(b.style.backgroundColor="#111111"),f&&(f.style.borderColor="white"),m&&(m.style.backgroundColor="#111111"),m&&(m.style.borderColor="white"),v&&(v.style.backgroundColor="#111111"),a&&(a.style.backgroundColor="#111111"),a&&(a.style.borderColor="white"),L&&(L.style.backgroundColor="#111111"),r.forEach(h=>{h.style.color="white"}),C.forEach(h=>{h.style.color="white"}),s&&(s.style.color="white"),o&&(o.style.color="white"),i&&(i.style.color="white"),d&&(d.style.color="white"),f&&(f.style.color="white"),p&&(p.style.color="white"),w&&(w.style.color="white"),a&&(a.style.color="white")}}document.addEventListener("DOMContentLoaded",function(){$(),D();const t=window.location.pathname;let e="";t.includes("index.html")?e="home":t.includes("catalog.html")?e="catalog":t.includes("myLibrary.html")&&(e="library"),localStorage.setItem("activePage",e);const r=document.querySelectorAll(".header-nav-links a"),l=localStorage.getItem("activePage");r.forEach(o=>{o.dataset.page===l?o.classList.add("active"):o.classList.remove("active")})});function _(t){try{const e=document.getElementById("movie-modal"),r=document.getElementById("modal-content");r.innerHTML=`
    <div class="modal-window">
        <button class="modal-btn-close" id="modal-close" type="button">
          <svg width="30" height="30">   
            <line
              x1="0.0"
              y1="9.5"
              x2="10.5"
              y2="20.5"
              stroke="#f87719"
              stroke-width="2"
            />
            <line
              x1="0.0"
              y1="20.5"
              x2="10.5"
              y2="9.5"
              stroke="#f87719"
              stroke-width="2"
            />
          </svg>
        </button>
        <img class="modal-film-poster" src="${t.poster_path?`https://image.tmdb.org/t/p/w500${t.poster_path}`:"poster-placeholder.jpg"}"  alt="${t.title} poster"/>
        <div class="modal-film-infos">
          <h3 class="modal-film-title">${t.title}</h3>
          <table class="modal-film-stats">
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Vote / Votes</th>
              <td class="modal-film-tab-data">
                <span class="modal-window-accent-vote">${t.vote_average.toFixed(1)}</span>
                <span class="modal-window-accent-votes">${t.vote_count}</span>
              </td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Popularity</th>
              <td class="modal-film-tab-data">${t.popularity.toFixed(1)}</td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Genre</th>
              <td class="modal-film-tab-data">${t.genreNames}</td>
            </tr>
          </table>
          <h3 class="modal-film-desc-about">About</h3>
          <p class="modal-film-desc">${t.overview}</p>
          <div class="modal-film-btns">
            <button class="watch-trailer-btn"}>Watch trailer</button> 
            <button id="library-actions-btn" type="submit">Add to my library</button>
          </div>
        </div>
      </div>
  `,e.classList.add("show"),document.getElementById("modal-close").addEventListener("click",S),document.addEventListener("keydown",function o(n){n.key==="Escape"&&(S(),document.removeEventListener("keydown",o))}),e.addEventListener("click",function(o){o.target.closest(".modal-content")||S()}),P(t),document.querySelector(".watch-trailer-btn").addEventListener("click",()=>T(t.id))}catch(e){console.error("Error fetching movie details:",e)}}function O(t){const e="library",r=JSON.parse(localStorage.getItem(e))||[],l=r.findIndex(n=>n.id===t.id),o=document.querySelector("#library-actions-btn");l!==-1?(r.splice(l,1),localStorage.setItem(e,JSON.stringify(r)),o&&(o.textContent="Add to my library")):(r.push(t),localStorage.setItem(e,JSON.stringify(r)),o&&(o.textContent="Remove from my library"))}function P(t){const e=document.querySelector("#library-actions-btn"),o=(JSON.parse(localStorage.getItem("library"))||[]).some(n=>n.id===t.id);e&&(e.textContent=o?"Remove from my library":"Add to my library",e.addEventListener("click",()=>O(t)))}function S(){document.getElementById("movie-modal").classList.remove("show"),document.body.style.overflow="auto"}async function T(t){const r=`https://api.themoviedb.org/3/movie/${t}/videos?api_key=3c5d79694d82b9e1fe6883553a34fc2d&language=en-US`;try{const n=(await(await fetch(r)).json()).results.filter(s=>s.site==="YouTube"&&s.type==="Trailer");if(n.length>0){const i=`https://www.youtube.com/embed/${n[0].key}?autoplay=1`,d=document.getElementById("trailer-modal"),u=document.getElementById("trailer-frame");u.src=i,d.classList.remove("hidden"),document.body.style.overflow="hidden",document.getElementById("trailer-close-btn").addEventListener("click",()=>{d.classList.add("hidden"),u.src="",document.body.style.overflow="auto"}),d.addEventListener("click",function(c){c.target.closest(".trailer-modal-content")||(d.classList.add("hidden"),u.src="",document.body.style.overflow="auto")})}else alert("Trailer not found.")}catch(l){console.error("Error fetching trailer:",l),alert("Failed to load trailer.")}}const j="3c5d79694d82b9e1fe6883553a34fc2d",K="https://image.tmdb.org/t/p/original/",M=[{id:493529,title:"Dungeons & Dragons: Honor Among Thieves",backdrop_path:"/A7JQ7MIV5fkIxceI5hizRIe6DRJ.jpg",vote_average:7.6,overview:"A charming thief and a band of unlikely adventurers undertake an epic heist to retrieve a lost relic, but things go dangerously awry when they run afoul of..."},{id:447365,title:"Guardians of the Galaxy Vol. 3",backdrop_path:"/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",vote_average:8,overview:"Peter Quill, still reeling from the loss of Gamora, must rally his team to defend the universe and protect one of their own. A mission that could mean the end of the Guardians if not successful."},{id:603692,title:"John Wick: Chapter 4",backdrop_path:"/h8gHn0OzBoaefsYseUByqsmEDMY.jpg",vote_average:7.8,overview:"With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe."}];let y=0,g=[],q;async function J(){try{const e=await(await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${j}`)).json();return e.results&&e.results.length>0?e.results.slice(0,5):M}catch(t){return console.error("Error fetching trending movies:",t),M}}function N(t){const e=Math.floor(t/2),r=t%2>=1?1:0,l=5-e-r;let o="";for(let n=0;n<e;n++)o+='<span class="hero-star">★</span>';r&&(o+='<span class="hero-star">★</span>');for(let n=0;n<l;n++)o+='<span class="hero-star" style="opacity: 0.5;">★</span>';return o}function W(t){const e=document.getElementById("slider-dots");if(!e){console.error("Slider dots container not found");return}e.innerHTML="";for(let r=0;r<t;r++){const l=document.createElement("span");l.classList.add("dot"),r===y&&l.classList.add("active"),l.addEventListener("click",()=>x(r)),e.appendChild(l)}}function E(){document.querySelectorAll(".dot").forEach((e,r)=>{r===y?e.classList.add("active"):e.classList.remove("active")})}function x(t){y=t,k(),A(),E()}function H(){y=(y+1)%g.length,k(),E()}function Y(){y=(y-1+g.length)%g.length,k(),E()}function A(){clearInterval(q),q=setInterval(H,7e3)}function k(){const t=document.getElementById("hero");if(!t){console.error("Hero element not found");return}const e=g[y],r=`
        <div class="hero-slide fade">
            <img src="${K+e.backdrop_path}" alt="${e.title}" class="hero-bg" loading="lazy">
            <div class="hero-content">
                <h1 class="hero-title">${e.title}</h1>
                <div class="hero-rating">
                    ${N(e.vote_average)}
                </div>
                <p class="hero-description">${e.overview}</p>
                <div class="hero-buttons">
                    <a href="javascript:void(0)" class="hero-btn hero-btn-primary">Watch trailer</a>
                    <a href="javascript:void(0)" class="hero-btn hero-btn-secondary" >More details</a>
                </div>
            </div>
        </div>
    `;t.innerHTML=r,document.querySelector(".hero-btn-secondary").addEventListener("click",()=>{_(e)}),document.querySelector(".hero-btn-primary").addEventListener("click",()=>{T(e.id)})}async function F(){try{g=await J();const t=document.getElementById("hero-container");if(!t){console.error("Hero container not found");return}t.insertAdjacentHTML("beforeend",`
          <button class="slider-nav prev" onclick="prevSlide()">❮</button>
          <button class="slider-nav next" onclick="nextSlide()">❯</button>
      `),W(g.length),k(),A()}catch(t){console.error("Error loading hero slider:",t)}}document.addEventListener("DOMContentLoaded",function(){try{const t=[{id:"hero-container",name:"Hero Container"},{id:"hero",name:"Hero Section"}],e=[];t.forEach(r=>{document.getElementById(r.id)||e.push(r.name)}),e.length>0&&console.error("Missing HTML elements:",e.join(", ")),F()}catch(t){console.error("Error during DOM content loaded event:",t)}});window.nextSlide=H;window.prevSlide=Y;window.goToSlide=x;document.addEventListener("DOMContentLoaded",function(){const t=new Date().getFullYear(),e=document.querySelector(".footer-text");e.innerHTML=e.innerHTML.replace("2023",t);const r=document.getElementById("teamModal"),l=document.getElementById("teamLink"),o=document.getElementById("closeModal");l.addEventListener("click",function(){r.classList.add("show"),document.body.style.overflow="hidden"}),o.addEventListener("click",function(){r.classList.remove("show"),document.body.style.overflow="auto"}),window.addEventListener("click",function(s){s.target===r&&(r.classList.remove("show"),document.body.style.overflow="auto")}),window.addEventListener("keydown",function(s){s.key==="Escape"&&r.classList.contains("show")&&(r.classList.remove("show"),document.body.style.overflow="auto")});const n=document.getElementById("scrollUpBtn");window.addEventListener("scroll",function(){window.scrollY>300?n.classList.add("show"):n.classList.remove("show")}),n.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})});export{_ as o};
//# sourceMappingURL=main-CIQFArmN.js.map
