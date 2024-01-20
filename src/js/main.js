'use strict';

const input = document.querySelector('.js-input');
const btnSubmit = document.querySelector('.js-btnSubmit');
const btnReset = document.getElementById('reset');
const listResults = document.querySelector('.js-results');
const listFavorites = document.querySelector('.js-favs');
const message = document.querySelector('.js-popup');
const cancelIcon = document.querySelector('.js-cancel');
const invalidUrl = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
const placeholderURL = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let films = [];
let favFilms = [];

//Funciones para recoger buscar los datos en la API y pintarlos en la lista de resultados
function renderFilm(filmData) {
    let imageUrl = filmData.images.jpg.image_url;
    if (imageUrl === invalidUrl) {
        imageUrl = placeholderURL;
    } 
    const li = 
    `<li class="li">
        <img src="${imageUrl}" alt="film photo" />
        <h3>${filmData.title}</h3>
    </li>`;
    return li;
}

function renderFilmList(films) {
    listResults.innerHTML = '';
    for (let i = 0; i < films.length; i++) {
      listResults.innerHTML += renderFilm(films[i]);
    }
}

function getFilmsApi (event) {
    event.preventDefault();
    const inputUser = input.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${inputUser}`)
    .then((response) => response.json())
    .then((result) => {
        films = result.data;
        renderFilmList(films);
    })
    .catch((error) => {
        console.error('Error reaching data:', error);
    });
}

btnSubmit.addEventListener('click', getFilmsApi);


//Funciones para que, al hacer click en una pelicula, se añada a la lista de favoritas y cambie el color
//También añadimos dentro el condicional para que guarde cada elemento clickado solo una vez

function renderFavList (favFilms) {
    listFavorites.innerHTML = '';
    for (let i = 0; i < favFilms.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${favFilms[i].images.jpg.image_url === invalidUrl ? placeholderURL : favFilms[i].images.jpg.image_url}" alt="film photo" />
            <h3>${favFilms[i].title}</h3>
            <i class="fa-regular fa-circle-xmark js-cancel"></i>
        `;
        listFavorites.appendChild(li);
        li.classList.add('favAside');
    }
}

const handleFavorites = (event) => {
    const filmClicked = event.target.closest('.li'); //para que solo aplique estilos al li pinchado, no a todo el contenedor si pincho mal
    if (filmClicked) {
        filmClicked.classList.add('favResult');
        const favData = films.find(film => film.title === filmClicked.querySelector('h3').textContent);
        const storedFavFilms = JSON.parse(localStorage.getItem('favoriteFilms')) || [];
        const existingIndex = storedFavFilms.findIndex(film => film.title === favData.title);
        if (existingIndex === -1) {
            storedFavFilms.push(favData);
            renderFavList(storedFavFilms);
            localStorage.setItem('favoriteFilms', JSON.stringify(storedFavFilms));
            message.innerHTML = '';
            message.classList.remove('header__message');
        } else {
            message.innerHTML = `${favData.title} ya está en la lista de favoritos.`;
            message.classList.add('header__message');
            setTimeout(() => {
                message.innerHTML = '';
                message.classList.remove('header__message');
            }, 3000);
        }
    }
}

listResults.addEventListener('click', handleFavorites);

//Esto es para que me pinte las pelis favs nada mas cargar la página
const storedFavFilms = JSON.parse(localStorage.getItem('favoriteFilms')) || [];
renderFavList(storedFavFilms);

//Función de reset
function handleReset (event) {
    event.preventDefault();
    favFilms = [];
    films = [];
    renderFavList(favFilms);
    renderFilmList(films);
    input.value = '';
    localStorage.clear();
}

btnReset.addEventListener('click', handleReset);

//Botón de eliminar de cada película

// const handleRemoveFav = (event) => {
//     event.preventDefault();
//     const filmClicked = event.target.closest('.js-cancel');
//     if (filmClicked) {
//         //quitar esa pelicula del array de favfilms, borrarla tb del localstorage y quitarla del html

//     }
// }

// listFavorites.addEventListener('click', handleRemoveFav);