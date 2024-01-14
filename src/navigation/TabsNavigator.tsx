import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen name={t('tabs.home')} component={HomeScreen} />
      <Tab.Screen name={t('tabs.favorites')} component={FavoriteScreen} />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
