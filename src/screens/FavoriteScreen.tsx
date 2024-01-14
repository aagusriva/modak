import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';

const FavoriteScreen = () => {
  const {t} = useTranslation();
  return (
    <View>
      <Text>{t('favorite.title')}</Text>
    </View>
  );
};

export default FavoriteScreen;
