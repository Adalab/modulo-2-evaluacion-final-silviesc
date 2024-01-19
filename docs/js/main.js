const a=document.querySelector(".js-input"),m=document.querySelector(".js-btnSubmit");document.querySelector(".js-btnReset");const l=document.querySelector(".js-results"),o=document.querySelector(".js-favs");let s=[],n=[];function u(e){return`<li>
        <img src="${e.images.jpg.image_url}" alt="film photo" />
        <h3>${e.title}</h3>
    </li>`}function d(e){l.innerHTML="";for(let t=0;t<e.length;t++)l.innerHTML+=u(e[t])}function g(e){e.preventDefault();const t=a.value;fetch(`https://api.jikan.moe/v4/anime?q=${t}`).then(i=>i.json()).then(i=>{s=i.data,d(s)})}m.addEventListener("click",g);function r(e){o.innerHTML="";for(let t=0;t<e.length;t++){const i=document.createElement("li");i.innerHTML=`
            <img src="${e[t].images.jpg.image_url}" alt="film photo" />
            <h3>${e[t].title}</h3>
        `,o.appendChild(i)}}const f=e=>{const t=e.target.parentNode;if(t){t.classList.toggle("fav");const i=s.find(c=>c.title===t.querySelector("h3").textContent);n=JSON.parse(localStorage.getItem("favoriteFilms")),n.push(i),r(n),localStorage.setItem("favoriteFilms",JSON.stringify(n))}};l.addEventListener("click",f);const p=JSON.parse(localStorage.getItem("favoriteFilms"));r(p);
//# sourceMappingURL=main.js.map
