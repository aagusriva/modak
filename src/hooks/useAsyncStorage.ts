import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';

/**
 * Custom hook that handles favorite items saved on device storage.
 * This hook get items of storage when the screen that use it is being focused.
 * Also provides 2 methods for add a new item and delete another one
 */
const useAsyncStorage = () => {
  const [currentFavorites, setCurrentFavorites] = useState<number[]>([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      fetchFavoritesFromStorage();
    } else {
      setCurrentFavorites([]);
    }
  }, [isFocused]);

  /**
   * Get from device storage the ids list of favorite items saved before
   */
  const fetchFavoritesFromStorage = async () => {
    setLoading(true);
    try {
      const favorites = await AsyncStorage.getItem('favoritesArtic');
      if (favorites) {
        setCurrentFavorites(JSON.parse(favorites));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  /**
   * Receive an id and the current list of favorites and add a new one
   */
  const addNewFavorite = async (id: number, currentFavorites: number[]) => {
    try {
      if (currentFavorites.includes(id)) return false;
      const newFavorites = [...currentFavorites, id];
      await AsyncStorage.setItem(
        'favoritesArtic',
        JSON.stringify(newFavorites),
      );
      setCurrentFavorites(newFavorites);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  /**
   * Receive an id and the current list of favorites and delete it
   */
  const deleteFavorite = async (id: number, currentFavorites: number[]) => {
    try {
      if (!currentFavorites.includes(id)) return false;
      const newFavorites = currentFavorites.filter(c => c !== id);
      await AsyncStorage.setItem(
        'favoritesArtic',
        JSON.stringify(newFavorites),
      );
      setCurrentFavorites(newFavorites);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {
    currentFavorites,
    addNewFavorite,
    deleteFavorite,
    loading,
  };
};

export default useAsyncStorage;
