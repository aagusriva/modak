import {SearchBar} from '@rneui/themed';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import CardItem, {CardProps} from '../components/CardItem/CardItem';
import {getArticles} from '../api/articles';
import {debounce} from 'lodash';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {COLORS} from '../constants/Colors';
import {Icon} from '@rneui/base';
import useAsyncStorage from '../hooks/useAsyncStorage';

/**
 * Screen that renders a list of all resumed items.
 * Search by input if user types something and handles pagination
 */
const HomeScreen = () => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setData] = useState<Array<CardProps>>([]);
  const [searching, setSearching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const searchBarRef = useRef(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
  });
  const isLoadingMore = useRef(false);
  const noMoreResults = useRef(false);
  const {currentFavorites, addNewFavorite, deleteFavorite} = useAsyncStorage();

  useEffect(() => {
    isFocused && fetchData(search);
  }, [isFocused, pagination]);

  useEffect(() => {
    // When user goes away from this screen we need to reset all states that handles pagination
    if (!isFocused) {
      setSearching(false);
      setSearch('');
      setPagination({
        page: 1,
        limit: 20,
      });
    }
  }, [isFocused]);

  /**
   * Fetch data from api and map it as card component needs.
   * Also handles what data save on component state depends on if user are on page 2 or more
   */
  const fetchData = async (query: string) => {
    !searching &&
      (isLoadingMore.current ? setLoadingMore(true) : setLoading(true));
    const resp = await getArticles(pagination, query);
    !searching &&
      (isLoadingMore.current ? setLoadingMore(false) : setLoading(false));
    const formattedData = resp.map(item => {
      return {
        id: item.id,
        img: item.thumbnail?.lqip || null,
        title: item.title,
        author: item.artist_title,
        handlePress: () => handlePressItem(item.id),
      };
    });
    if (formattedData.length === 0) {
      // Stop pagination because there are no more results to come
      setData([]);
      noMoreResults.current = true;
    } else {
      if (pagination.page === 1) {
        // First render so data are this one, we need to reset the stae
        setData(formattedData);
      } else {
        // Add new data to list at the end becouse user has reached end of list
        setData(prev => [...prev, ...formattedData]);
      }
    }
    isLoadingMore.current = false;
    setSearching(false);
  };
  
  /**
   * Handle event to load more data with pagination
   */
  const loadMore = () => {
    if (isLoadingMore.current === false && noMoreResults.current === false) {
      const currentPage = pagination.page;
      setPagination({
        page: currentPage + 1,
        limit: 20,
      });
      isLoadingMore.current = true;
    }
  };

  const resetAndFech = () => {
    setPagination({page: 1, limit: 20});
    noMoreResults.current = false;
  };

  /**
   * Execute request without trigger multiple times
   */
  const requestCompaniesCallback = useCallback(debounce(resetAndFech, 500), []);

  useEffect(() => {
    requestCompaniesCallback();
  }, [search]);

  /**
   * Update search state
   * @param {string} text
   */
  const handleChangeText = (text: string) => {
    setSearching(true);
    setSearch(text);
  };

  const handlePressItem = (id: number) => {
    return navigation.navigate(...(['Details', {id}] as never));
  };

  const handleFavorite = (isFavorite: boolean, id: number) => {
    !isFavorite
      ? addNewFavorite(id, currentFavorites)
      : deleteFavorite(id, currentFavorites);
  };

  if (loading) return <ActivityIndicator style={{marginTop: 20}} />;

  return (
    <View style={styles.container}>
      <SearchBar
        ref={searchBarRef}
        placeholder={t('home.search.placeholder')}
        onChangeText={handleChangeText}
        value={search}
        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
        containerStyle={styles.searchBar}
        showLoading={searching}
        searchIcon={
          <Icon
            type="material"
            name="search"
            color={COLORS.secondary}
            size={30}
          />
        }
        clearIcon={
          <Icon
            type="material"
            name="cancel"
            color={COLORS.secondary}
            size={30}
            onPress={() => setSearch('')}
          />
        }
      />
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
        onEndReached={loadMore}
      />
      {loadingMore && <ActivityIndicator />}
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

export default HomeScreen;
