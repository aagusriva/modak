import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';

const useAsyncStorage = () => {
  const [currentFavorites, setCurrentFavorites] = useState<number[]>([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isFocused && fetchFavoritesFromStorage();
  }, [isFocused]);

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
    loading
  };
};

export default useAsyncStorage;
