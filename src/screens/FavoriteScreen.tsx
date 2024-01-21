import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CardItem, {CardProps} from '../components/CardItem/CardItem';
import useAsyncStorage from '../hooks/useAsyncStorage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getArticlesById} from '../api/articles';

/**
 * Screen that renders a list of resumed items that have been saved as favorites.
 */
const FavoriteScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const {
    currentFavorites,
    addNewFavorite,
    deleteFavorite,
    loading: loadingFavorites,
  } = useAsyncStorage();
  const [data, setData] = useState<CardProps[]>([]);

  useEffect(() => {
    isFocused && fetchData(currentFavorites);
  }, [isFocused, currentFavorites]);

  /**
   * Fetch data from api and map it as card component needs
   */
  const fetchData = async (currentFavorites: number[]) => {
    if (currentFavorites.length === 0) return;
    setLoading(true);
    const resp = await getArticlesById(currentFavorites);
    const formattedData = resp.map(item => {
      return {
        id: item.id,
        img: item.thumbnail?.lqip || null,
        title: item.title,
        author: item.artist_title,
        handlePress: () => handlePressItem(item.id),
      };
    });
    setData(formattedData);
    setLoading(false);
  };

  const handlePressItem = (id: number) => {
    return navigation.navigate(...(['FavoritesDetails', {id}] as never));
  };

  const handleFavorite = (isFavorite: boolean, id: number) => {
    !isFavorite
      ? addNewFavorite(id, currentFavorites)
      : deleteFavorite(id, currentFavorites);
  };

  if (loading || loadingFavorites)
    return <ActivityIndicator style={{marginTop: 20}} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        ListEmptyComponent={<Text style={styles.noData}>{t('noData')}</Text>}
        renderItem={({item}) => (
          <CardItem
            {...item}
            isFavorite={currentFavorites.includes(item.id)}
            handleFavorite={handleFavorite}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 70,
  },
  searchBar: {
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width * 0.94,
    alignSelf: 'center',
  },
  noData: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default FavoriteScreen;
