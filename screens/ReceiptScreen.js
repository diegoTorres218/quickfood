import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../components/BackButton";
import { useCart } from "../context/CartContext";
import { supabase } from "../utils/supabase";

export default function ReceiptScreen({ route, navigation }) {
  const { items = [], cartTotal = 0, method = "card" } = route.params || {};
  const { clearCart } = useCart();

  const [user, setUser] = useState(null);

  // Cargar usuario REAL de Supabase
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    loadUser();
  }, []);

  // Loader para evitar pantalla vacía
  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  // Cálculos
  const subtotal = cartTotal;
  const stateTax = subtotal * 0.105;
  const reducedTax = subtotal * 0.06;
  const municipalTax = subtotal * 0.01;
  const iva = 0;

  const totalTax = stateTax + reducedTax + municipalTax;
  const total = subtotal + totalTax;

  const handleContinue = async () => {
    console.log("handleContinue ejecutado");

    const order_number = Math.floor(100000 + Math.random() * 900000);
    const created_at = new Date().toISOString();

    const { error } = await supabase.from("orders").insert([
      {
        user_id: user.id,
        items,
        total,
        method,
        order_number,
        created_at,
      }
    ]);

    if (error) {
      console.log("ERROR GUARDANDO ORDEN:", JSON.stringify(error, null, 2));
      // seguimos navegando
    }

    clearCart();

    navigation.navigate("PedidoEnCamino", {
      items,
      cartTotal: total,
      method,
      orderId: order_number,
      date: created_at,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <BackButton navigation={navigation} />

      <Text style={styles.title}>🧾 Recibo</Text>

      <View style={styles.card}>
        <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text>State Tax (10.5%): ${stateTax.toFixed(2)}</Text>
        <Text>Reduced State Tax (6%): ${reducedTax.toFixed(2)}</Text>
        <Text>Municipal Tax (1%): ${municipalTax.toFixed(2)}</Text>
        <Text>IVA (0%): ${iva.toFixed(2)}</Text>

        <View style={styles.separator} />

        <Text>Total Tax: ${totalTax.toFixed(2)}</Text>
        <Text style={styles.total}>Total a pagar: ${total.toFixed(2)}</Text>

        <Text>Método: {method === "card" ? "Tarjeta" : "Efectivo"}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("CLICK EN CONTINUAR");
          handleContinue();
        }}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8EE", padding: 20 },
  title: { fontSize: 28, fontWeight: "900", color: "#FF6B00", textAlign: "center" },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 20 },
  separator: { height: 1, backgroundColor: "#ddd", marginVertical: 10 },
  total: { fontSize: 20, fontWeight: "bold", color: "#FF6B00" },
  button: { backgroundColor: "#FF6B00", padding: 15, borderRadius: 20, marginTop: 20 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
