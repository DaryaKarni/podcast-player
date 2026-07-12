
function getPlaylist(){ 
  const arrJSON = localStorage.getItem('podcast-player:playlist');
  return arrJSON ? JSON.parse(arrJSON) : [];
}

export function addToPlaylist(ep){
  const playlist = getPlaylist();
  if(!isExist(ep)){
    playlist.push(ep);
    localStorage.setItem('podcast-player:playlist', JSON.stringify(playlist));
    console.log(`episode added to playlist: ${JSON.stringify(playlist)}`);
  }
}
export function removeFromPlaylist(ep){
  const playlist = getPlaylist();
  if(isExist(ep)){
    const updatedPlaylist = playlist.filter((item) => item.id !== ep.id);
    localStorage.setItem('podcast-player:playlist', JSON.stringify(updatedPlaylist));
    console.log('episode removed from playlist');
  }
}

export function isExist(ep){
  const playlist = getPlaylist();
  const isExist = playlist.some(item => item.id === ep.id);
  return isExist;
}
