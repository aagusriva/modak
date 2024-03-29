import {useTranslation} from 'react-i18next';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import FavoriteScreen from '../screens/FavoriteScreen';

const Stack = createNativeStackNavigator();

/**
 * Navigator stack for favorites tab
 * Screns: Favorites (list of them), FavoritesDetails (detail screen of a selected item)
 */
const FavoritesNavigator = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{title: t('tabs.favorites.favorites')}}
      />
      <Stack.Screen
        name="FavoritesDetails"
        component={DetailsScreen}
        options={{title: t('tabs.favorites.details')}}
      />
    </Stack.Navigator>
  );
};

export default FavoritesNavigator;
