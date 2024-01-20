import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';

const DetailsScreen = () => {
  const {t} = useTranslation();
  return (
    <View>
      <Text>{t('tabs.home.details')}</Text>
    </View>
  );
};

export default DetailsScreen;
