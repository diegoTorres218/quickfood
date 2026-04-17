import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { supabase } from "../utils/supabase";

export default function HistoryScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) {
        setOrders(data);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando historial...</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>No tienes pedidos aún 🛒</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Historial de pedidos</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>
              {new Date(item.created_at).toLocaleString()}
            </Text>

            <Text style={styles.text}>
              Método: {item.method === "card" ? "Tarjeta 💳" : "Efectivo 💵"}
            </Text>

            <Text style={styles.text}>
              Total: ${Number(item.total).toFixed(2)}
            </Text>

            <Text style={styles.itemsTitle}>Items:</Text>

            {item.items?.map((p, index) => (
              <Text key={index} style={styles.item}>
                {p.name} x{p.qty}
              </Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EE",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FF6B00",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
  },

  date: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 5,
  },

  text: {
    fontSize: 16,
    marginBottom: 5,
  },

  itemsTitle: {
    marginTop: 10,
    fontWeight: "bold",
  },

  item: {
    fontSize: 14,
    color: "#444",
  },

  empty: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 50,
  },
});
