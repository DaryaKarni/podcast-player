
export function buildLanding(data){
  const container = document.getElementById('item-container');
  container.className = 'landing';
  const title = document.createElement('p');
  title.textContent = 'Best podcasts';
  title.classList.add('main-title');
  container.appendChild(title);

  const grid = document.createElement('div');
  grid.classList.add('grid');
  container.appendChild(grid);

  createGrid(data);

  const div = document.createElement('div');
  div.id = "scroll-trigger";
  container.appendChild(div);
}

export function createGrid(data){
  const grid = document.querySelector('.grid');
  data.podcasts.forEach((podcast) => grid.appendChild(createCard(podcast)));
}

function createCard(podcast){//podcast -- obj
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = 
  `<img class="card-image" src=${podcast.image} alt='card'>
   <div class="text-block">
    <span class="title">${podcast.title}</span>
    <span class="publisher">${podcast.publisher}</span>
   </div>
  `
  return card;
}
