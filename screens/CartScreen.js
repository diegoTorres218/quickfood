import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const { cart, increaseQty, decreaseQty, removeItem, getTotal } = useCart();

  const total = getTotal();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu Carrito</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>

              <View style={styles.qtyRow}>
                <TouchableOpacity style={styles.qtyButton} onPress={() => decreaseQty(item.id)}>
                  <Text style={styles.qtyText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyNumber}>{item.qty}</Text>

                <TouchableOpacity style={styles.qtyButton} onPress={() => increaseQty(item.id)}>
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Text style={{ color: "red", fontWeight: "bold" }}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Total */}
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
      </View>

      {/* Botón pagar */}
      <TouchableOpacity
        style={styles.payButton}
        onPress={() =>
          navigation.navigate("Checkout", {
            cartTotal: total,
            items: cart,
          })
        }
      >
        <Text style={styles.payText}>Ir a pagar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8EE", padding: 20 },
  title: { fontSize: 28, fontWeight: "900", color: "#FF6B00", textAlign: "center" },
  card: { flexDirection: "row", backgroundColor: "#fff", padding: 12, borderRadius: 20, marginBottom: 15, elevation: 3 },
  image: { width: 80, height: 80, borderRadius: 15, marginRight: 15 },
  name: { fontSize: 16, fontWeight: "bold" },
  price: { color: "#6B7280", marginTop: 3 },
  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  qtyButton: { backgroundColor: "#FF6B00", width: 30, height: 30, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  qtyText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  qtyNumber: { marginHorizontal: 10, fontSize: 16, fontWeight: "bold" },
  totalBox: { flexDirection: "row", justifyContent: "space-between", marginTop: 10, paddingVertical: 10 },
  totalText: { fontSize: 20, fontWeight: "bold" },
  totalAmount: { fontSize: 20, fontWeight: "bold", color: "#FF6B00" },
  payButton: { backgroundColor: "#FF6B00", padding: 15, borderRadius: 20, alignItems: "center", marginTop: 10 },
  payText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
