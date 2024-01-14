import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';

const HomeScreen = () => {
  const {t} = useTranslation();
  return (
    <View>
      <Text>{t('home.title')}</Text>
    </View>
  );
};

export default HomeScreen;
