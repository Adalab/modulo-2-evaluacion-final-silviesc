'use strict';

const input = document.querySelector('.js-input');
const btnSubmit = document.querySelector('.js-btnSubmit');
const btnReset = document.getElementById('reset');
const listResults = document.querySelector('.js-results');
const listFavorites = document.querySelector('.js-favs');
const message = document.querySelector('.js-popup');
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

//Botón para eliminar una película de favoritos
const handleRemoveFav = (event) => {
    event.preventDefault();
    const cancelClicked = event.target.closest('.js-cancel');
    if (cancelClicked) {
        const cancelFilm = cancelClicked.previousElementSibling.textContent;
        const cancelIndex = storedFavFilms.findIndex(film => film.title === cancelFilm);
        if (cancelIndex !== -1) {
            storedFavFilms.splice(cancelIndex, 1);
            localStorage.setItem('favoriteFilms', JSON.stringify(storedFavFilms));
            renderFavList(storedFavFilms);
        }
    }
}

//Esto es para que me pinte las pelis favoritas nada mas cargar la página
let storedFavFilms = JSON.parse(localStorage.getItem('favoriteFilms')) || [];
renderFavList(storedFavFilms);

//Funciones para que, al hacer click en una pelicula, se añada a la lista de favoritas y cambie el color en resultados
//También añadimos un condicional para que guarde cada elemento clickado solo una vez

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
    let cancelIcons = document.querySelectorAll('.js-cancel');
    for (const icon of cancelIcons) {
        icon.addEventListener('click', handleRemoveFav)
    }
}

const handleFavorites = (event) => {
    event.preventDefault();
    const filmClicked = event.target.closest('.li'); //para que solo aplique estilos al li pinchado, no a todo el contenedor si pincho mal
    if (filmClicked) {
        filmClicked.classList.add('favResult');
        const favData = films.find(film => film.title === filmClicked.querySelector('h3').textContent);
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



