import HomeScreen from '../screens/HomeScreen';
import {useTranslation} from 'react-i18next';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

/**
 * Navigator stack for home tab
 * Screns: Home (list of all items), Details (detail screen of a selected item)
 */
const HomeNavigator = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: t('tabs.home.home')}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{title: t('tabs.home.details')}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
