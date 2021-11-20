import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/screens/Home';
import AddItem from './src/screens/AddItem';
import List from './src/screens/List';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="List" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;