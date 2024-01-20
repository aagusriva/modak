import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoriteScreen from '../screens/FavoriteScreen';
import {useTranslation} from 'react-i18next';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          headerShown: false,
          title: t('tabs.home.home')
        }}
      />
      <Tab.Screen
        name="FavoriteTab"
        component={FavoriteScreen}
        options={{title: t('tabs.favorites')}}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
