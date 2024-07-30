import api from './api';

export const getSliderImage = async () => {
  try {
    const response = await api.get('/images/slider-image');
    return response;
  } catch (error) {
    console.error('Error fetching slider image', error);
    return null;
  }
};

export const uploadSliderImage = async (formData) => {
  try {
    const response = await api.post('/admin/uploadSliderImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading slider image', error);
    throw error;
  }
};