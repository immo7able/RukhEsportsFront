import axios from 'axios';

export const getTopImage = async (page, selectedTab) => {
  try {
    const response = await axios.get('/images', {
      params: { page, tab: selectedTab },
    });
    return response.data.url;
  } catch (error) {
    console.error('Error fetching the top image', error);
    return null;
  }
};


// страницы 

// team
// news
// tournaments
// matches


// табы переключения

// pubg
// hok
// mob