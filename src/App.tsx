import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import TabsNavigator from './navigation/TabsNavigator';

import './locale/i18n';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <TabsNavigator />
    </NavigationContainer>
  );
}

export default App;
