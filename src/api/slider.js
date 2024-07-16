import api from './api';

export const getSliderImage = () => {
    return api.get('/slider-image');
  };