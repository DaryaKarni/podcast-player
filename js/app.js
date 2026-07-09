import {App} from "./api.js";
import { buildLanding, createGrid, doLoading, removeLoading } from "./components/landing.js";

const apiKey = import.meta.env.VITE_PODCAST_API_KEY;
const apiSecret = import.meta.env.VITE_PODCAST_API_SECRET;

let offset = 0;
let isLoading  = false;
let searchController = null;
const inputSearch = document.getElementById('search');

const myApp = new App();
const observer = new IntersectionObserver(loadMoreCards);

async function initApp(){
  const data = await myApp.fetchPodcasts(apiKey, apiSecret);
  if(data){
    console.log('data is loaded: next step - render');
    buildLanding(data.feeds, 'Best podcasts');
    offset+=20;
    const div = document.getElementById('scroll-trigger');
    observer.observe(div);
  }
}

async function loadMoreCards(entries){
  if(isLoading) return;

  if(offset >= 60) {
    observer.disconnect();
  }
  
  const entry = entries[0];
  if(entry.isIntersecting){
  isLoading = true;
  const data = await myApp.fetchPodcasts(apiKey, apiSecret, offset);
  if(!data || !data.feeds){
    console.log('Server cannot return podcasts(');
    isLoading = false;
    return;
  }
  createGrid(data.feeds);
  offset+=20;
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
    if(container) container.innerHTML = '';
    offset = 0;
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
      const json = await myApp.searchPodcasts(apiKey, apiSecret, query, searchController.signal);
      if(json){
        buildLanding(json.feeds, 'Search results');
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
  initApp();
});

inputSearch.addEventListener('input', debounce(handleSearch, 1000));
