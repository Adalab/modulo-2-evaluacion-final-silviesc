const c=document.querySelector(".js-input"),d=document.querySelector(".js-btnSubmit");document.querySelector(".js-btnReset");const s=document.querySelector(".js-results"),r=document.querySelector(".js-favs");let l=[];function u(t){return`<li>
        <img src="${t.images.jpg.image_url}" alt="film photo" />
        <h3>${t.title}</h3>
    </li>`}function m(t){s.innerHTML="";for(let e=0;e<t.length;e++)s.innerHTML+=u(t[e])}function g(t){t.preventDefault();const e=c.value;fetch(`https://api.jikan.moe/v4/anime?q=${e}`).then(n=>n.json()).then(n=>{l=n.data,m(l)}).catch(n=>{console.error("Error reaching data:",n)})}d.addEventListener("click",g);function a(t){r.innerHTML="";for(let e=0;e<t.length;e++){const n=document.createElement("li");n.innerHTML=`
            <img src="${t[e].images.jpg.image_url}" alt="film photo" />
            <h3>${t[e].title}</h3>
        `,r.appendChild(n)}}const f=t=>{const e=t.target.parentNode;if(e){e.classList.add("fav");const n=l.find(o=>o.title===e.querySelector("h3").textContent),i=JSON.parse(localStorage.getItem("favoriteFilms"))||[];i.findIndex(o=>o.title===n.title)===-1?(i.push(n),a(i),localStorage.setItem("favoriteFilms",JSON.stringify(i))):console.log(`${n.title} ya está en la lista de favoritos.`)}};s.addEventListener("click",f);const h=JSON.parse(localStorage.getItem("favoriteFilms"));a(h);
//# sourceMappingURL=main.js.map
