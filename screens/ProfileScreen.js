import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../utils/supabase";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data.user;

      setUser(currentUser);

      // ⭐ SOLO cargar perfil si hay usuario
      if (currentUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        if (profile) {
          setFullName(profile.full_name || "");
          setAddress(profile.address || "");
        }
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const saveProfile = async () => {
    if (!user) return; // ⭐ Seguridad extra

    await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName,
      address,
    });

    alert("Perfil actualizado");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  // ⭐ SI NO HAY USUARIO → Mostrar login / registro
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#333" }]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Crear cuenta nueva</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ⭐ SI HAY USUARIO → Mostrar perfil normal
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#333" }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8EE", padding: 20 },
  title: { fontSize: 28, fontWeight: "900", color: "#FF6B00", textAlign: "center", marginBottom: 20 },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 15, marginBottom: 15, elevation: 2 },
  label: { fontSize: 14, color: "#6B7280", marginBottom: 5 },
  value: { fontSize: 16, fontWeight: "bold" },
  input: { backgroundColor: "#F3F4F6", padding: 12, borderRadius: 12, marginTop: 5 },
  button: { backgroundColor: "#FF6B00", padding: 15, borderRadius: 20, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
