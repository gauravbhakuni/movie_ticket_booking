import fetch from 'node-fetch';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

const url = 'https://imdb8.p.rapidapi.com/auto-complete?q=Phir%20Hera';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY!,
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
