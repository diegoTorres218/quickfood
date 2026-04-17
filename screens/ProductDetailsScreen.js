import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addItem } = useCart();

  return (
    <ScrollView style={styles.container}>
      
      {/* Imagen principal */}
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* Info */}
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>

      <Text style={styles.description}>
        {product.description || "Un delicioso platillo preparado con ingredientes frescos y de alta calidad."}
      </Text>

      {/* Botón agregar */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addItem(product);
          navigation.navigate("Cart");
        }}
      >
        <Text style={styles.buttonText}>Agregar al carrito</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EE",
    padding: 20,
  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
  },

  name: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FF6B00",
  },

  category: {
    color: "#6B7280",
    marginTop: 5,
    fontSize: 15,
  },

  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B00",
    marginTop: 10,
  },

  description: {
    marginTop: 15,
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 22,
  },

  button: {
    backgroundColor: "#FF6B00",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 25,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
