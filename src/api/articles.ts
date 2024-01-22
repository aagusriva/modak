import axios from 'axios';
import {API_ARTIC_URL_V1} from './routes';

interface Pagination {
  page: number;
  limit: number;
}

interface ResponseSimpleGet {
  data: Array<{
    artist_title: string;
    id: number;
    title: string;
    image_id: string;
  }>;
  config: {
    iiif_url: string;
  };
}

/**
 * Return a list of articles with pagination and searching.
 * Return the following props of items: id, title, artist_title, description, image_id
 */
export const getArticles = async (
  pagination: Pagination,
  query: string,
): Promise<ResponseSimpleGet | null> => {
  try {
    const resp = await axios({
      url: `${API_ARTIC_URL_V1}/artworks/search`,
      method: 'GET',
      params: {
        ...pagination,
        q: query,
        fields: 'id,title,artist_title,description,image_id',
      },
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

/**
 * Return a complete article searched by id.
 */
export const getArticleById = async (id: number) => {
  try {
    const resp = await axios({
      url: `${API_ARTIC_URL_V1}/artworks/${id}`,
      method: 'GET',
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

/**
 * Return a list of articles with no pagination and no searching, but fetching by a list of ids.
 * Return the following props of items: id, title, artist_title, description, image_id
 */
export const getArticlesById = async (
  ids: number[],
): Promise<ResponseSimpleGet | null> => {
  try {
    const resp = await axios({
      url: `${API_ARTIC_URL_V1}/artworks`,
      method: 'GET',
      params: {
        ids: ids.join(','),
        fields: 'id,title,artist_title,description,image_id',
      },
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
