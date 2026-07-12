import { addToPlaylist, removeFromPlaylist, isExist } from "./playlist.js";
export function buildLanding(arr, name){
  const container = document.getElementById('item-container');
  container.innerHTML = '';
  container.className = 'landing';
  const title = document.createElement('p');
  title.textContent = name;
  title.classList.add('main-title');
  container.appendChild(title);

  const grid = document.createElement('div');
  grid.classList.add('grid');
  container.appendChild(grid);

  
  if(arr===null){
    if(name === 'Playlist') toPlaylistPage(arr);
    return;
  } else{
    createGrid(arr);
    const div = document.createElement('div');
    div.id = "scroll-trigger";
    container.appendChild(div);
    if(name === 'Playlist') toPlaylistPage(arr);
  }
}

export function createGrid(arr){
  const grid = document.querySelector('.grid');
  arr.forEach((podcast) => grid.appendChild(createCard(podcast)));
}

function createCard(podcast){//podcast -- obj
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.link = `#/podcast/${podcast.id}`;
  card.innerHTML = 
  `<img class="card-image" src=${podcast.image || null} alt='card'>
   <div class="text-block">
    <span class="title">${podcast.title || podcast.title_original}</span>
    <span class="publisher">${ podcast.publisher || podcast.publisher_original}</span>
   </div>
  `;

  return card;
}

export function doLoading(){
  const loading = document.createElement('div');
  loading.classList.add('loading');
  loading.textContent = "Loading...";
  document.body.appendChild(loading);
  loading.stopPropagation;//ok?
}

export function removeLoading(){
  const loading = document.querySelector('.loading');
  loading.remove();
}

function toPlaylistPage(arr){
  const container = document.getElementById('item-container');
  container.insertAdjacentHTML('afterbegin', `
    <button class='button-back' data-back=''>
      <svg class='arrow' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
      </svg>
    </button>
    `);
  const grid = container.querySelector('.grid');
  const cardsNodeList = grid.querySelectorAll('.card');
  if(arr === null) return;
  console.log(arr);
  cardsNodeList.forEach((card, index) => {
    const ep = arr[index];
    const playlistButton = document.createElement('div');
    playlistButton.innerHTML = `
      <svg data-action='remove' class='remove-button' xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
      </svg>
      <svg data-action='add' class='add-button hidden' xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
      </svg>
    `;
    playlistButton.classList.add('button-remove');
    playlistButton.addEventListener('click', (e) => {
      e.stopPropagation(); 
      e.preventDefault();
      const currentSvg = e.target.closest('svg:not(.hidden)');
      if(!currentSvg) return;
      const removeSvg = playlistButton.querySelector('.remove-button');
      const addSvg = playlistButton.querySelector('.add-button');
      if (currentSvg.dataset.action === 'remove') {
        removeFromPlaylist(ep);
        removeSvg.classList.add('hidden');
        addSvg.classList.remove('hidden'); 
      } else {
        addToPlaylist(ep);
        addSvg.classList.add('hidden');
        removeSvg.classList.remove('hidden');
      }
      const playerEl = document.getElementById('player');
      if (playerEl) {
        const playerAdd = playerEl.querySelector('.add-button');
        const playerRemove = playerEl.querySelector('.remove-button');
        const playerName = playerEl.querySelector('.name-small');
        if (playerName && playerName.textContent === (ep.title || ep.title_original)) {
          if (isExist(ep)) {
            playerAdd.classList.add('hidden');
            playerRemove.classList.remove('hidden');
          } else {
           playerAdd.classList.remove('hidden');
           playerRemove.classList.add('hidden');
          }
        }
      }
    });
    card.appendChild(playlistButton);
  });
}