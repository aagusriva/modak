import axios from 'axios';
import {API_ARTIC_URL_V1} from './routes';

interface Pagination {
  page: number;
  limit: number;
}

interface ResponseSimpleGet {
  artist_title: string;
  id: number;
  thumbnail: {
    alt_text: string;
    height: number;
    lqip: string;
    width: number;
  };
  title: string;
}

export const getArticles = async (
  pagination: Pagination,
  query: string,
): Promise<ResponseSimpleGet[]> => {
  try {
    const resp = await axios({
      url: `${API_ARTIC_URL_V1}/artworks/search`,
      method: 'GET',
      params: {
        ...pagination,
        q: query,
        fields: 'id,title,artist_title,thumbnail',
      },
    });
    return resp.data.data;
  } catch (error) {
    console.log(error);
  }
  return [];
};
