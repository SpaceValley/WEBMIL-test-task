import React from 'react';
import NavigationRoot from './NavigationRoot';
import NavigationService from './NavigationService';

const App = () => (
  <NavigationRoot
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }}
  />
);

export default App;
