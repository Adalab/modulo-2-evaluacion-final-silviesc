'use strict';

const input = document.querySelector('.js-input');
const btnSubmit = document.querySelector('.js-btnSubmit');
const btnReset = document.querySelector('.js-btnReset');
const listResults = document.querySelector('.js-results');
const invalidUrl = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'

let films = [];

function getFilmsApi (event) {
    event.preventDefault();
    const inputUser = input.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${inputUser}`)
    .then((response) => response.json())
    .then((data) => {
        const filmData = {
            title: data.title,
            img: data.images,
        };
        films.push(filmData);
        // renderFilmsList(films);
        console.log(filmData);
    })
}


function renderFilmList(films) {
    listResults.innerHTML = '';
    for (let i = 0; i < films.length; i++) {
      listResults.innerHTML += renderFilm(films[i]);
    }
}

function renderFilm(filmData) {
    const li = 
    `<li>
        <img src= "${filmData.img}" alt="film image" />
        <h3>${filmData.title}</h3>
    </li>`;
    return li;
}

btnSubmit.addEventListener('click', getFilmsApi);

/*PASOS A SEGUIR:
1. Coger el input del usuario
2. Añadirle un evento al botón de enviar, para que cuando hagamos click, pasen ciertas cosas
3. Hacer una función getFilmsApi para recoger los datos con la variable del input
4. Hacer una función que pinte esos datos dentro del apartado resultados
 */