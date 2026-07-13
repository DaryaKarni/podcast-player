import {App} from "./api.js";
import { buildLanding, createGrid, doLoading, removeLoading } from "./components/landing.js";
import { buildDetails } from "./components/details.js";
import {Router} from "./router.js";
import {Player} from './components/player.js';

const apiKey = '';
let page = 1;
let isLoading  = false;
let searchController = null;
const inputSearch = document.getElementById('search');

const myApp = new App();
const observer = new IntersectionObserver(loadMoreCards);

const router = new Router();
router.addRoute('#/', initApp);
router.addRoute('#/podcast/:id', initDetails);
router.addRoute('#/playlist', initPlaylist);

const player = new Player();

async function initApp(){
  const data = await myApp.fetchPodcasts(apiKey);
  if(data){
    console.log('data is loaded: next step - render');
    buildLanding(data.podcasts, 'Best podcasts');
    page++;
    const div = document.getElementById('scroll-trigger');
    observer.observe(div);
  }
}
async function initDetails(params){
  doLoading();
  const data = await myApp.fetchPodcastById(params.id);
  if(data){
    observer.disconnect();
    buildDetails(data, player);
  } else{
    router.handleRoute("#/404");
  } 
  removeLoading();  
}

async function initPlaylist(){
  doLoading();
  const podcasts = JSON.parse(localStorage.getItem('podcast-player:playlist'));
  if(podcasts){
  observer.disconnect();
  buildLanding( podcasts, 'Playlist');
  }else{
    buildLanding( null, 'Playlist');
  }
  removeLoading();  
}

async function loadMoreCards(entries){
  if(isLoading) return;

  if(page>=40) {
    observer.disconnect();
  }
  
  const entry = entries[0];
  if(entry.isIntersecting){
  isLoading = true;
  const data = await myApp.fetchPodcasts(apiKey, page);
  if(!data || !data.podcasts){
    console.log('Server cannot return podcasts(');
    isLoading = false;
    return;
  }
  createGrid(data.podcasts);
  page++;
  isLoading = false;
  }
}

function debounce(fn, delay){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  }
}

async function handleSearch(event){
  const query = event.target.value.trim();
  const container = document.querySelector('.landing');

  if(query === ''){
    observer.disconnect();
    initApp();
    return;
  } else {
    doLoading();
    if(container) container.innerHTML = '';
    observer.disconnect();
    if(searchController) searchController.abort();
    searchController  = new AbortController();
    try{
      const json = await myApp.searchPodcasts(apiKey, query, searchController.signal);
      if(json){
        const podcasts = [];
        json.results.forEach(res => podcasts.push(res.podcast));
        buildLanding(podcasts, 'Search results');
      }
    }catch(error){
      if(error.name === 'AbortError') return;
      console.log(`Error in Search: ${error.status}`);
    }finally{
      removeLoading();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  router.start();
});

inputSearch.addEventListener('input', debounce(handleSearch, 1000));
