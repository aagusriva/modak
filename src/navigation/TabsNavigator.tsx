import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';
import HomeNavigator from './HomeNavigator';
import {COLORS} from '../constants/Colors';
import {Icon} from '@rneui/base';
import FavoritesNavigator from './FavoritesNavigator';

const Tab = createBottomTabNavigator();

/**
 * Navigator stack for all application. Use Tabs and there are two of them.
 * Tabs: HomeTab, FavoriteTab
 */
const TabsNavigator = () => {
  const {t} = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          headerShown: false,
          title: t('tabs.home.home'),
          tabBarIcon: props => (
            <Icon
              type="material"
              name="home"
              color={props.focused ? COLORS.primary : COLORS.grey}
              size={30}
            />
          ),
          tabBarActiveTintColor: COLORS.primary,
        }}
      />
      <Tab.Screen
        name="FavoriteTab"
        component={FavoritesNavigator}
        options={{
          headerShown: false,
          title: t('tabs.favorites.favorites'),
          tabBarIcon: props => (
            <Icon
              type="material"
              name="auto-awesome"
              color={props.focused ? COLORS.primary : COLORS.grey}
              size={30}
            />
          ),
          tabBarActiveTintColor: COLORS.primary,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
