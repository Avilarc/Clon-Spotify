const API_URL = 'http://localhost:5000/api';

export const getAlbums = async () => {
  try {
    const response = await fetch(`${API_URL}/albums`);
    if (!response.ok) throw new Error('Failed to fetch albums');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

export const getSongs = async () => {
  try {
    const response = await fetch(`${API_URL}/songs`);
    if (!response.ok) throw new Error('Failed to fetch songs');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

export const getAlbumById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/albums/${id}`);
    if (!response.ok) throw new Error('Failed to fetch album');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
};
