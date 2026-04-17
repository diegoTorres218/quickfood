import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../components/BackButton";

export default function SelectPaymentScreen({ navigation, route }) {
  const { cartTotal = 0, items = [] } = route.params || {};

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />

      <Text style={styles.title}>Selecciona un método de pago</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() =>
          navigation.navigate("Payment", {
            cartTotal,
            items,
          })
        }
      >
        <Text style={styles.optionText}>💳 Tarjeta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, { backgroundColor: "#333" }]}
        onPress={() =>
          navigation.navigate("Receipt", {
            method: "cash",
            cartTotal,
            items,
          })
        }
      >
        <Text style={styles.optionText}>💵 Efectivo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8EE", padding: 20 },
  title: { fontSize: 28, fontWeight: "900", marginBottom: 30 },
  option: {
    backgroundColor: "#FF6B00",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  optionText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});
