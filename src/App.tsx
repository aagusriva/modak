import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import TabsNavigator from './navigation/TabsNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import './locale/i18n';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabsNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
