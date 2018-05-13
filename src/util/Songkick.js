// Songkick API information
const apiKey = "";
const searchArtistUrl = 'http://api.songkick.com/api/3.0/search/artists.json?apikey=';
const searchConcertsUrl = 'http://api.songkick.com/api/3.0/artists/'

const Songkick = {

  searchArtist(query){
    let urlToFetch = searchArtistUrl + apiKey + "&query=" + query;
    return fetch(urlToFetch)
    .then(response => response.json())
    .then(jsonResponse => jsonResponse.resultsPage.results.artist[0].id);
  },

  searchConcerts(artists){
    let concertDate = undefined;
    let concertName = undefined;
    let concertCity = undefined;
    let artistName = undefined;
    let artistId = artists.map(artist => this.searchArtist(artist));
    let urlToFetch = searchConcertsUrl + artistId + "/calendar.json?apikey=" + apiKey;
    return fetch(urlToFetch)
    .then(response => response.json())
    .then(jsonResponse => {
      concertDate = jsonResponse.resultsPage.results.event[0].start.date;
      concertName = jsonResponse.resultsPage.results.event[0].displayName;
      concertCity = jsonResponse.resultsPage.results.event[0].location.city;
      artistName = jsonResponse.resultsPage.results.event[0].performance[0].artist.displayName;
    })
    .then(() => {
      return {
        concertName: concertName,
        artist: artistName,
        city: concertCity,
        date: concertDate
      }
    });
  }

}

export default Songkick;
