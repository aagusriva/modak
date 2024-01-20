import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoriteScreen from '../screens/FavoriteScreen';
import {useTranslation} from 'react-i18next';
import HomeNavigator from './HomeNavigator';
import {COLORS} from '../constants/Colors';
import {Icon} from '@rneui/base';

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
        component={FavoriteScreen}
        options={{
          title: t('tabs.favorites'),
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
