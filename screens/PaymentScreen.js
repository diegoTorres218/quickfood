import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BackButton from "../components/BackButton";

export default function PaymentScreen({ navigation, route }) {
  const { cartTotal = 0, items = [] } = route.params || {};

  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePay = () => {
    navigation.navigate("Receipt", {
      method: "card",
      cartTotal,
      items,
    });
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />

      <Text style={styles.title}>Pago con Tarjeta</Text>

      <TextInput
        style={styles.input}
        placeholder="Número de tarjeta"
        value={card}
        onChangeText={setCard}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 10 }]}
          placeholder="MM/AA"
          value={exp}
          onChangeText={setExp}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nombre del titular"
      />

      <TouchableOpacity style={styles.button} onPress={handlePay}>
        <Text style={styles.buttonText}>Pagar ${cartTotal.toFixed(2)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF8EE" },
  title: { fontSize: 28, fontWeight: "bold", marginVertical: 20 },
  input: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  row: { flexDirection: "row" },
  button: {
    backgroundColor: "#FF6B00",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 18, textAlign: "center" },
});
