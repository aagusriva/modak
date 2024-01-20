import {SearchBar} from '@rneui/themed';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
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

const HomeScreen = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setData] = useState<Array<CardProps>>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const resp = await getArticles({page: 1, limit: 10});
    setData(
      resp.map(item => ({
        id: item.id,
        img: item.thumbnail.lqip,
        title: item.title,
        author: item.artist_title,
      })),
    );
    setLoading(false);
  };

  const handleOnChange = (search: string) => {
    setSearch(search);
  };

  if (loading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder={t('home.search.placeholder')}
        onChangeText={handleOnChange}
        value={search}
        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
        containerStyle={styles.searchBar}
      />
      <FlatList
        data={data}
        renderItem={({item}) => <CardItem {...item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 80
  },
  searchBar: {
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width * 0.94,
    alignSelf: 'center',
  },
});

export default HomeScreen;
