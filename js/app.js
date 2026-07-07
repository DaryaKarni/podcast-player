import {App} from "./api.js";

const apiKey = '19125b38937843268f8e26c1f3dff321';
const myApp = new App();

async function initApp(){
  const data = await myApp.fetchPodcasts(apiKey);
  if(data){
    console.log('data is loaded: next step - render');
  }
}

document.addEventListener('DOMContentLoaded', initApp);