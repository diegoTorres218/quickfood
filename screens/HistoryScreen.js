import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../components/BackButton";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../utils/supabase";

export default function HistoryScreen({ navigation }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setOrders(data);
      setLoading(false);
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando historial...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Text style={styles.title}>Historial de Órdenes</Text>

      {orders.length === 0 ? (
        <Text style={styles.empty}>No tienes órdenes todavía.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.order_number.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("PedidoEnCamino", {
                  method: item.method,
                  cartTotal: item.total,
                  items: item.items,
                  orderId: item.order_number,
                  date: item.created_at,
                })
              }
            >
              <Text style={styles.orderId}>Orden #{item.order_number}</Text>
              <Text style={styles.date}>{new Date(item.created_at).toLocaleString()}</Text>
              <Text style={styles.total}>Total: ${item.total.toFixed(2)}</Text>
              <Text style={styles.method}>
                Método: {item.method === "card" ? "Tarjeta 💳" : "Efectivo 💵"}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
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
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 3,
  },
  orderId: { fontSize: 18, fontWeight: "bold" },
  date: { fontSize: 14, color: "#666", marginBottom: 5 },
  total: { fontSize: 16, fontWeight: "bold", color: "#FF6B00" },
  method: { fontSize: 14, marginTop: 5 },
});
