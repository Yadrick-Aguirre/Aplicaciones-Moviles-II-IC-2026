// Documentación interna: Entry point. Provider Redux, navegación stack, carga AsyncStorage al inicio.
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from './src/store/userSlice';
import { addItem } from './src/store/cartSlice';
import Login from './src/components/Login';
import Products from './src/components/Products';
import ProductDetail from './src/components/ProductDetail';
import Cart from './src/components/Cart';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      try {
        const u = await AsyncStorage.getItem('user');
        const t = await AsyncStorage.getItem('token');
        const c = await AsyncStorage.getItem('cart');
        if (u && t) dispatch(setUser({ user: JSON.parse(u), token: t }));
        if (c) JSON.parse(c).forEach(i => dispatch(addItem(i)));
      } catch (e) { console.error('Load error:', e); }
    };
    load();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Products" component={Products} options={{ title: 'Productos' }} />
        <Stack.Screen name="Detail" component={ProductDetail} options={{ title: 'Detalle' }} />
        <Stack.Screen name="Cart" component={Cart} options={{ title: 'Carrito' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}