
export class App {
  async fetchPodcasts(apiKey, page=1, sort="recent_published_first"){
    const url = `https://listen-api.listennotes.com/api/v2/best_podcasts?sort=${sort}&page=${page}`;
    try{
      const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-ListenAPI-Key": apiKey,
      }
    });
     
    if(!response.ok){
      console.warn(`Server error: ${response.status} ${response.statusText}`);
      return null;
    }
    const json = await response.json();
    console.log(json);
    return json;

    }catch(error){
      console.log('Network error:', error);
      return null;
    }
  }
}