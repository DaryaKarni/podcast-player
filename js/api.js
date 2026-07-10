
export class App {
  async fetchPodcasts(apiKey, page=1/*signal*/){
    let url;
    url = `https://listen-api-test.listennotes.com/api/v2/best_podcasts?sort=recent_published_first&page=1`;

    try{
      console.log(url);
      const response = await fetch(url, {
      method: "GET",
      headers: {
        'Accept': "application/json",
      },
      //signal: signal,
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
  async searchPodcasts(apiKey, query, signal){
    const url = `https://listen-api-test.listennotes.com/api/v2/search?q=${query}&type=podcast`;
    try{
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': "application/json",
        },
        signal: signal,
      });
      if(!response.ok){
        console.warn(`Server error: ${response.status} ${response.statusText}`);
        return null;
      }
      const json = await response.json();
      console.log(json);
      return json;
    }catch(e){
      if (error.name === 'AbortError') {
        throw error; 
      }
      console.log('Network error:', e);
      return null;
    }
  }
  async fetchPodcastById(id){
    console.log(id);
    const url = `https://listen-api-test.listennotes.com/api/v2/podcasts/${id}`;
    try{
      console.log(url);
      const response = await fetch(url, {
      method: "GET",
      headers: {
        'Accept': "application/json",
      },
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