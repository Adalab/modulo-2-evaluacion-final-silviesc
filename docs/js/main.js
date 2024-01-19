const d=document.querySelector(".js-input"),u=document.querySelector(".js-btnSubmit"),m=document.querySelector(".js-btnReset"),r=document.querySelector(".js-results"),l=document.querySelector(".js-favs"),c=document.querySelector(".js-popup");let o=[];function g(e){return`<li class="item">
        <img src="${e.images.jpg.image_url}" alt="film photo" />
        <h3>${e.title}</h3>
    </li>`}function f(e){r.innerHTML="";for(let t=0;t<e.length;t++)r.innerHTML+=g(e[t])}function p(e){e.preventDefault();const t=d.value;fetch(`https://api.jikan.moe/v4/anime?q=${t}`).then(n=>n.json()).then(n=>{o=n.data,f(o)}).catch(n=>{console.error("Error reaching data:",n)})}u.addEventListener("click",p);function a(e){l.innerHTML="";for(let t=0;t<e.length;t++){const n=document.createElement("li");n.innerHTML=`
            <img src="${e[t].images.jpg.image_url}" alt="film photo" />
            <h3>${e[t].title}</h3>
        `,l.appendChild(n)}}const h=e=>{const t=e.target.parentNode;if(t){t.classList.add("fav");const n=o.find(s=>s.title===t.querySelector("h3").textContent),i=JSON.parse(localStorage.getItem("favoriteFilms"))||[];i.findIndex(s=>s.title===n.title)===-1?(i.push(n),a(i),localStorage.setItem("favoriteFilms",JSON.stringify(i)),c.innerHTML=""):c.innerHTML=`${n.title} ya está en la lista de favoritos.`}};r.addEventListener("click",h);const v=JSON.parse(localStorage.getItem("favoriteFilms"));a(v);function S(e){e.preventDefault,l.innerHTML="",localStorage.clear()}m.addEventListener("click",S);
//# sourceMappingURL=main.js.map
