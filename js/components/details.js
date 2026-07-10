export function buildDetails(podcast){
  const container = document.getElementById('item-container');
  container.innerHTML = '';
  container.className = 'details';
  container.innerHTML = `
  <button class='button-back' data-back=''>
    <svg class='arrow' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
    </svg>
  </button>
  <div class="podcast-block">
    <div class="podcast-description-block">
      <img class="card-image-detailed" src=${podcast.image || null} alt='card'>
      <div class="text-block">
        <span class="title">${podcast.title}</span>
        <span class="publisher">${ podcast.publisher}</span>
        <span class="description">${podcast.description.replace('#SW7x7', '')}</span>
      </div>
    </div>
    <div class="episodes-block">
      <span class='title'>Episodes</span>
    </div>
  </div> 
  `;
  podcast.episodes.forEach((ep) => {
    const episode = document.createElement('div');
    episode.classList.add('episode');
    episode.innerHTML = `
      <div class='ep-left'>
        <span class='date'>${new Date(ep.pub_date_ms).toDateString()}</span>
        <span class='ep-title'>${ep.title}</span>
        <span class='ep-description'>${ep.description.replace('#SW7x7', '')}</span>
      </div>
      <span class='duration'>${Math.floor((ep.audio_length_sec) / 60) + ' min'}</span>     
    `;
    const block = document.querySelector('.episodes-block');
    block.appendChild(episode);
    });
}
function createEpisodesBlock(episodes){
  
}