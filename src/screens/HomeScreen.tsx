import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Text, View} from 'react-native';

const HomeScreen = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);

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

  if (loading) return <ActivityIndicator />;

  return (
    <View>
      <Text>{t('home.title')}</Text>
    </View>
  );
};

export default HomeScreen;
