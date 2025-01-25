import fetch from 'node-fetch';

const fetchNowPlayingMovies = async () => {
  const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTExMmZiZWNjMDc0MGQ4MDc0MTU1OWFmNDk0MTE4ZCIsInN1YiI6IjY2MjRmODk5ZTg5NGE2MDE3ZDNiNTlhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.twGYy_kFojrRKtAHnpabKdvMERA1jvAzxqDNOwNe8Vo'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

export default fetchNowPlayingMovies;
