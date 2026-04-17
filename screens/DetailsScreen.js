import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const { addToCart } = useCart();

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>

        <Text style={styles.desc}>
          Deliciosa opción preparada especialmente para ti 😋
        </Text>

        <Text style={styles.price}>${item.price.toFixed(2)}</Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            addToCart(item);
            navigation.navigate('Cart');
          }}
        >
          <Text style={styles.btnText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  image: {
    width: '100%',
    height: 250,
  },

  content: {
    padding: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: '900',
  },

  category: {
    color: '#6B7280',
    marginBottom: 10,
  },

  desc: {
    marginVertical: 10,
  },

  price: {
    fontSize: 22,
    color: '#FF6B00',
    fontWeight: 'bold',
  },

  btn: {
    marginTop: 20,
    backgroundColor: '#FF6B00',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
