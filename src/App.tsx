import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import TabsNavigator from './navigation/TabsNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <TabsNavigator />
    </NavigationContainer>
  );
}

export default App;
