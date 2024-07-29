
import api from "./api";

export const getTopImage = async (page, selectedTab) => {
  try {
    const response = await api.get(`/images/${page}/${selectedTab}`);
    return response.data.img;
  } catch (error) {
    console.error('Error fetching the top image', error);
    return null;
  }
};


