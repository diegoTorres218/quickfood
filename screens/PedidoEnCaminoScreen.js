import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../components/BackButton";

export default function PedidoEnCaminoScreen({ navigation, route }) {
  const { method, cartTotal, items, orderId, date } = route.params;

const handleDelivered = () => {
  console.log("Pedido recibido");

  navigation.navigate("PedidoEntregado", {
    items,
    cartTotal,
    method,
    orderId,
    date,
  });
};



  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />

      <Text style={styles.title}>🚚 ¡Tu pedido está en camino!</Text>

      <Text style={styles.subtitle}>
        Tu comida está siendo preparada y será entregada pronto.
      </Text>

      <Text style={styles.time}>⏱️ Tiempo estimado: 20-30 minutos</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Recibo del Pedido</Text>

        <Text style={styles.text}>Orden #: {orderId}</Text>
        <Text style={styles.text}>Fecha: {date}</Text>

        <View style={styles.separator} />

        {items.map((item, index) => (
          <Text key={index} style={styles.text}>
            {item.name} x{item.qty} — ${(item.price * item.qty).toFixed(2)}
          </Text>
        ))}

        <View style={styles.separator} />

        <Text style={styles.total}>Total: ${cartTotal.toFixed(2)}</Text>

        <Text style={styles.text}>
          Método de pago: {method === "card" ? "Tarjeta 💳" : "Efectivo 💵"}
        </Text>
      </View>

      {/* BOTÓN VOLVER */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#333" }]}
       onPress={() => navigation.navigate("MainTabs")}

      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>

      {/* BOTÓN CONFIRMAR ENTREGA */}
      <TouchableOpacity style={styles.button} onPress={handleDelivered}>
        <Text style={styles.buttonText}>Ya recibí mi pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8EE", padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FF6B00",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
    color: "#444",
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 15, marginBottom: 5, color: "#333" },
  separator: { height: 1, backgroundColor: "#ddd", marginVertical: 10 },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B00",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#FF6B00",
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
