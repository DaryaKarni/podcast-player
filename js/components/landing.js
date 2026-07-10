
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

  createGrid(arr);

  const div = document.createElement('div');
  div.id = "scroll-trigger";
  container.appendChild(div);
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