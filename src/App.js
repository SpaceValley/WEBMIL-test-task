import React from 'react';
import NavigationRoot from './navigation/NavigationRoot';
import NavigationService from './navigation/NavigationService';

const App = () => (
  <NavigationRoot
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }}
  />
);

export default App;
