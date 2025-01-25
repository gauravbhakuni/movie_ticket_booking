import fetch from 'node-fetch';

const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=Phir%20Hera';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'dfa1df0f19msh8759aba06597a7cp1c0ca3jsnfdf429f6921b',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  }
};

const fetchData = async () => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

// Call the fetchData function
fetchData();
