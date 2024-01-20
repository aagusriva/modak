import {SearchBar} from '@rneui/themed';
import axios from 'axios';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import CardItem, {CardProps} from '../components/CardItem/CardItem';
import {getArticles} from '../api/articles';
import {debounce} from 'lodash';
import {useIsFocused, useNavigation} from '@react-navigation/native';

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

  useEffect(() => {
    if (!isFocused) {
      setSearching(false);
      setSearch('');
      setData([]);
    } else {
      fetchData(search);
    }
  }, [isFocused, pagination]);

  const fetchData = async (query: string) => {
    !searching &&
      (isLoadingMore.current ? setLoadingMore(true) : setLoading(true));
    const resp = await getArticles(pagination, query);
    !searching &&
      (isLoadingMore.current ? setLoadingMore(false) : setLoading(false));
    const formattedData: CardProps[] = resp.map(item => ({
      id: item.id,
      img: item.thumbnail?.lqip || null,
      title: item.title,
      author: item.artist_title,
      handlePress: () => handlePressItem(item.id),
    }));
    if (pagination.page === 1 && formattedData.length === 0) {
      setData([]);
      noMoreResults.current = true;
    } else {
      if (pagination.page === 1) {
        setData(formattedData);
      } else {
        if (formattedData.length > 0) {
          setData(prev => [...prev, ...formattedData]);
        } else {
          // Stop pagination because there are no more results to come
          noMoreResults.current = true;
        }
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
    return navigation.navigate('Details', {id});
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
      />
      <FlatList
        data={data}
        renderItem={({item}) => <CardItem {...item} />}
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
});

export default HomeScreen;
