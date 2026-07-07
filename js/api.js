
export class App {
  fetchPodcasts(apiKey){
    const url = "https://listen-api-test.listennotes.com/api/v2/best_podcasts?sort=recent_published_first&page=1";
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-ListenAPI-Key": apiKey,
      }
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        return json;
      });
      
  }
}