import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { useCart } from '../context/CartContext';

// SCREENS
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import DetailsScreen from '../screens/DetailsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import PedidoEnCaminoScreen from '../screens/PedidoEnCaminoScreen';
import PedidoEntregadoScreen from '../screens/PedidoEntregadoScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ReceiptScreen from '../screens/ReceiptScreen';
import RegisterScreen from "../screens/RegisterScreen";
import SelectPaymentScreen from '../screens/SelectPaymentScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* =========================
   TABS
========================= */
function Tabs() {
  const { getItemCount } = useCart();   // ✔ ahora sí funciona

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: '#fff',
          height: 65,
          borderTopWidth: 0,
          elevation: 10,
        },

        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: '#9CA3AF',

        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'Menu') iconName = 'restaurant-outline';
          if (route.name === 'Cart') iconName = 'cart-outline';
          if (route.name === 'Perfil') iconName = 'person-outline';

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name={iconName} size={size} color={color} />

              {route.name === 'Cart' && getItemCount() > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -10,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    minWidth: 18,
                    height: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 4,
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 10 }}>
                    {getItemCount()}
                  </Text>
                </View>
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

/* =========================
   STACK PRINCIPAL
========================= */
export default function AppNavigator() {

  const [orders, setOrders] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MainTabs" component={Tabs} />

        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="PedidoEnCamino" component={PedidoEnCaminoScreen} />
        <Stack.Screen name="PedidoEntregado" component={PedidoEntregadoScreen} />
        <Stack.Screen name="SelectPayment" component={SelectPaymentScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />


        <Stack.Screen name="Receipt">
          {(props) => (
            <ReceiptScreen
              {...props}
              orders={orders}
              setOrders={setOrders}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="History">
          {(props) => (
            <HistoryScreen
              {...props}
              orders={orders}
            />
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
