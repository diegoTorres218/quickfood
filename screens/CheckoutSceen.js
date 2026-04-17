import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';

export default function CheckoutScreen({ route, navigation }) {
  const { cartTotal = 0, items = [] } = route.params || {};

  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleConfirm = () => {
    navigation.navigate("Receipt", {
      cartTotal,
      items,
      method: paymentMethod,
    });
  };

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />

      <Text style={styles.title}>Finalizar Pedido</Text>

      {/* 💳 MÉTODO DE PAGO */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Método de pago</Text>

        {/* TARJETA */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => setPaymentMethod("card")}
        >
          <Text style={paymentMethod === "card" ? styles.active : styles.text}>
            💳 Tarjeta
          </Text>
        </TouchableOpacity>

        {/* EFECTIVO */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => setPaymentMethod("cash")}
        >
          <Text style={paymentMethod === "cash" ? styles.active : styles.text}>
            💵 Efectivo
          </Text>
        </TouchableOpacity>
      </View>

      {/* 💳 FORMULARIO TARJETA */}
      {paymentMethod === "card" ? (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Información de tarjeta</Text>

          <TextInput style={styles.input} placeholder="Número de tarjeta" />
          <TextInput style={styles.input} placeholder="MM/AA" />
          <TextInput style={styles.input} placeholder="CVV" />
          <TextInput style={styles.input} placeholder="Nombre del titular" />
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={{ fontSize: 16 }}>
            💵 Pagarás en efectivo al recibir el pedido
          </Text>
        </View>
      )}

      {/* BOTÓN */}
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>
          Confirmar - ${cartTotal.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8EE", padding: 20 },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FF6B00",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  option: {
    padding: 10,
  },

  text: {
    fontSize: 16,
    color: "#333",
  },

  active: {
    fontSize: 16,
    color: "#FF6B00",
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#FF6B00",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
