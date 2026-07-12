import { addToPlaylist } from "./playlist.js";
import { removeFromPlaylist } from "./playlist.js";
import { isExist } from "./playlist.js";

export function buildDetails(podcast, player){
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
      <span class='title eps-title'>Episodes</span>
    </div>
  </div> 
  `;
  podcast.episodes.forEach((ep) => {
    const episode = document.createElement('div');
    episode.classList.add('episode');
    episode.dataset.id = ep.id;
    ep.publisher = podcast.publisher;
    episode.innerHTML = `
      <div class='ep-buttons'>
        <div class='ep-play-button'>
          <svg class = 'ep-pause' xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
          </svg>
          <svg class='ep-play hidden' xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
          </svg>
        </div>
        <div class='fav-button ep-fav-button'>
            <svg data-action='remove' class='remove-button hidden' xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
            <svg data-action='add' class='add-button' xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
        </div>
       </div>
      <div class='ep-left'>
        <span class='date'>${new Date(ep.pub_date_ms).toDateString()}</span>
        <span class='ep-title'>${ep.title}</span>
        <span class='ep-description'>${ep.description.replace('#SW7x7', '')}</span>
      </div>
      <span class='duration'>${Math.floor((ep.audio_length_sec) / 60) + ' min'}</span>     
    `;
    const playButton = episode.querySelector('.ep-play-button');
    const pauseSvg = playButton.querySelector('.ep-pause');
    const playSvg = playButton.querySelector('.ep-play');
    
    playButton.addEventListener('click', function(e){
      const eps = document.querySelectorAll('.episode');
      const currentEp = e.target.closest('.episode');
      eps.forEach((ep) => {
        if(ep !==  currentEp){
        ep.querySelector('.ep-pause').classList.remove('hidden');
        ep.querySelector('.ep-play').classList.add('hidden');
        ep.classList.remove('active');
        }
      })
      pauseSvg.classList.toggle('hidden');
      playSvg.classList.toggle('hidden');
      currentEp.classList.add('active');
      const isPlaying = pauseSvg.classList.contains('hidden');
      player.togglePlayer(ep, podcast.publisher, isPlaying);
    });

    const playlistButton = episode.querySelector('.fav-button');
    const addSvg = playlistButton.querySelector('.add-button');
    const removeSvg = playlistButton.querySelector('.remove-button');
    if(isExist(ep)){
      addSvg.classList.add('hidden');
      removeSvg.classList.remove('hidden');
    }
    playlistButton.addEventListener('click', function(e){
      const currentSvg = e.target.closest('svg:not(.hidden)');
      if(currentSvg.dataset.action === 'add'){
        
        console.log(ep);
        addToPlaylist(ep);
        addSvg.classList.add('hidden');
        removeSvg.classList.remove('hidden');
      }else{
        removeFromPlaylist(ep);
        addSvg.classList.remove('hidden');
        removeSvg.classList.add('hidden');
      }
      if (player.id === ep.id) {
        player.updateFavButtonState();
      }
    });

    const block = document.querySelector('.episodes-block');
    block.appendChild(episode);
  }); 
}

