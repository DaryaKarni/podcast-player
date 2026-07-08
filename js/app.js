import {App} from "./api.js";
import { buildLanding, createGrid } from "./components/landing.js";

const apiKey = '19125b38937843268f8e26c1f3dff321';
let page = 1;
let isLoading  = false;

const myApp = new App();
const observer = new IntersectionObserver(loadMoreCards);

async function initApp(){
  const data = await myApp.fetchPodcasts(apiKey);
  if(data){
    console.log('data is loaded: next step - render');
    buildLanding(data);
    page = data.next_page_number;
    const div = document.getElementById('scroll-trigger');
    observer.observe(div);
  }
}

async function loadMoreCards(entries){
  if(isLoading) return;
  if(page === null) {
    observer.disconnect();
    return;
  }
  if(page === 42) {
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
  createGrid(data);
  page = data.next_page_number;
  isLoading = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
