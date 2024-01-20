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
import CardItem from '../components/CardItem/CardItem';
import {Icon} from '@rneui/base';

const HomeScreen = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resp = await axios({
        url: 'https://api.artic.edu/api/v1/artworks',
        method: 'GET',
        params: {
          page: 1,
          limit: 1,
        },
      });
      console.log(resp.data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleOnChange = (search: string) => {
    setSearch(search);
  };

  if (loading) return <ActivityIndicator />;

  return (
    <View>
      <SearchBar
        placeholder={t('home.search.placeholder')}
        onChangeText={handleOnChange}
        value={search}
        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
        containerStyle={styles.searchBar}
      />
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={({item}) => <CardItem />}
        keyExtractor={item => item.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: 'transparent',
    width: Dimensions.get('window').width * 0.94,
    alignSelf: 'center',
  },
});

export default HomeScreen;
