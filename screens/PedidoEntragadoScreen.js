import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PedidoEntregadoScreen({ route, navigation }) {
  const { items = [], total = 0 } = route.params || {};

  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  const date = new Date().toLocaleString();

  return (
    <ScrollView style={styles.container}>

      {/* Ícono de éxito */}
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle-outline" size={140} color="#22C55E" />
      </View>

      {/* Mensaje */}
      <Text style={styles.title}>¡Pedido entregado!</Text>
      <Text style={styles.subtitle}>
        Esperamos que disfrutes tu comida. Gracias por confiar en QuickFood.
      </Text>

      {/* RECIBO */}
      <View style={styles.receipt}>
        <Text style={styles.receiptTitle}>Recibo del Pedido</Text>

        <Text style={styles.receiptLine}>Número de pedido: #{orderNumber}</Text>
        <Text style={styles.receiptLine}>Fecha: {date}</Text>

        <View style={styles.divider} />

        {items.map((item, index) => (
          <View key={index} style={styles.receiptItem}>
            <Text style={styles.itemName}>{item.name} × {item.qty}</Text>
            <Text style={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.receiptItem}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>

        <Text style={styles.paymentMethod}>Método de pago: Tarjeta</Text>
      </View>

      {/* Botón */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Volver a comprar</Text>
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

  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#22C55E",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },

  receipt: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginTop: 30,
    elevation: 3,
  },

  receiptTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF6B00",
  },

  receiptLine: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },

  receiptItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  itemName: {
    fontSize: 16,
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B00",
  },

  paymentMethod: {
    marginTop: 10,
    fontSize: 14,
    color: "#6B7280",
  },

  button: {
    backgroundColor: "#FF6B00",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
