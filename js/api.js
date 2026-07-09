
export class App {
  async getAuthHeaders(apiKey, apiSecret){
    const apiHeaderTime = Math.round(Date.now() /1000).toString();
    const payload = apiKey + apiSecret + apiHeaderTime;
    const bytes = new TextEncoder().encode(payload);
    const digest = await crypto.subtle.digest('SHA-1', bytes);
    const hex = [...new Uint8Array(digest)]
      .map(b => b.toString(16).padStart(2,'0'))
      .join('');
    return {apiHeaderTime, hex};
  }
  async fetchPodcasts(apiKey, apiSecret, offset=0/*signal*/){
    const url = `/api/1.0/podcasts/trending?max=20&current=${offset}`;
    const {apiHeaderTime, hex} = await this.getAuthHeaders(apiKey, apiSecret);
    try{
      const response = await fetch(url, {
      method: "GET",
      headers: {
        'Accept': "application/json",
        "X-Auth-Date": apiHeaderTime,
        "X-Auth-Key": apiKey,
        "Authorization": hex,
        "User-Agent": "SuperPuperPodcastPlayer"
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
  async searchPodcasts(apiKey, apiSecret, query, signal){
    const url = `/api/1.0/search/byterm?q=${encodeURIComponent(query)}`;
    const {apiHeaderTime, hex} = await this.getAuthHeaders(apiKey, apiSecret);
    try{
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': "application/json",
          "X-Auth-Date": apiHeaderTime,
          "X-Auth-Key": apiKey,
          "Authorization": hex,
          "User-Agent": "SuperPuperPodcastPlayer"
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
      console.log('Network error:', error);
      return null;
    }
  }
}