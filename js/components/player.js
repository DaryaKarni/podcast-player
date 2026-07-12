export class Player{
  audio = new Audio();
  id = null;
  playPromise = null;
  currentTime = 0;
  // updateInfo(ep, publisher, isPlaying, currentTime, fullTime){
  //   this.id = ep.id
  //   this.name = ep.title;
  //   this.publisher = publisher;
  //   this.inPlaying = isPlaying;
  //   this.currentTime = currentTime;
  //   this.fullTime = fullTime;
  // }
  changeButton(isPlaying){
    const playerElement = document.getElementById('player');
    if (!playerElement) return;
    const buttonPlay = playerElement.querySelector('.ep-player-button');
    const svgPause = buttonPlay.querySelector('.pause');
    const svgPlay = buttonPlay.querySelector('.play');
    if (isPlaying) {
    svgPause.classList.add('hidden');
    svgPlay.classList.remove('hidden');
  } else {
    svgPause.classList.remove('hidden');
    svgPlay.classList.add('hidden');
  }
  }
  changePlayerState(isPlaying){
    if(isPlaying){
      this.playPromise = this.audio.play();
      if(this.playPromise){
        this.playPromise.catch(error => console.log("Browser's forbidden this track"));
      }
    } else{
      if(this.playPromise){
        this.playPromise.then(() => {
          this.audio.pause();
          this.playPromise = null;
        })
          .catch(() => {
            this.audio.pause();
            this.playPromise = null;
          }); ;
      } else{
        this.audio.pause();
      }
    }
  }
  togglePlayer(ep, publisher, isPlaying){
    const player = document.getElementById('player');
    this.currentTrack = ep;
    this.currentPublisher = publisher;
    if(!player){
      this.buildPlayer(ep, publisher);
      this.audio.src = ep.audio;
      this.id = ep.id;
    } else if (this.id !== ep.id){
        this.rerenderPlayer(ep, publisher);
        this.audio.src = ep.audio;
        this.id = ep.id;
    }
    this.changePlayerState(isPlaying);
    //this.updateInfo(ep, publisher, isPlaying, currentTime, fullTime);
    this.changeButton(isPlaying);
  }
  rerenderPlayer(ep, publisher){
    const player = document.getElementById('player');
    const img = player.querySelector('[data-img]');
    img.src = ep.image;
    const name = player.querySelector('.name-small');
    name.textContent = ep.title;
    const author = player.querySelector('.author-small');
    author.textContent = publisher;
    const point = player.querySelector('.progress-point');
    point.style.left= `0%`;
  }
  buildPlayer(ep, publisher){
    const player = document.createElement('div');
    player.id = 'player';
    player.className = 'player';
    player.innerHTML = `
      <div class='player-cover'>
        <image data-img='' src='${ep.image}' alt='podcats-image'>
        <div class='text-small'>
          <span class='name-small'>${ep.title}</span>
          <span class='author-small'>${publisher}</span>
        </div>  
        <div class='fav-button'>
          <svg class='add-button' xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
          <svg class='remove-button hidden' xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </div>
      </div>

      <div class='player-road'>
        <div class='up-player'>
          <div class='ep-player-button'>
            <svg class ='pause' xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
            </svg>
            <svg class='play hidden' xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
              <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
            </svg>
          </div>
        </div>
        <div class='down-player'>
          <span class='current time'>00:00</span>
            <div class='progress-bar'>
            <span class='progress-point'></span>
            </div>
          <span class='full time'>${Math.round(ep.audio_length_sec/60) +':'+ ep.audio_length_sec %60}</span>
        </div>
      </div>
    `;
    document.body.append(player);
    const buttonPlay = player.querySelector('.ep-player-button');
    buttonPlay.addEventListener('click', () => {
      const episode = document.querySelector(`[data-id='${this.id}']`);
      if(episode){
        const epButton = episode.querySelector('.ep-play-button');
        epButton.click();
      } else{
        this.togglePlayer(this.currentTrack, this.currentPublisher, !this.audio.paused);
      }
    });
    const currTimeEl = player.querySelector('.current');
    const point = player.querySelector('.progress-point');
    this.audio.addEventListener('timeupdate', () => {
      let secs = Math.floor(this.audio.currentTime);
      const mins = Math.floor(secs / 60);
      secs = secs % 60;
      currTimeEl.textContent = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
      const progress = this.audio.currentTime / this.audio.duration * 100;
      point.style.left= `${progress}%`;  
    });

    const progressBar = player.querySelector('.progress-bar');
    progressBar.addEventListener('click', (e) => {
      const barWidth = progressBar.clientWidth;
      const offsetX = e.offsetX;
      const percentage = (offsetX/barWidth) * 100;
      point.style.left = `${percentage}%`;
      if(this.audio.duration){
        this.audio.currentTime = (offsetX/barWidth) * this.audio.duration;
      }
    })
  }
}