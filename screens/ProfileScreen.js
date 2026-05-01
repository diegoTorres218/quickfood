import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../utils/supabase";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data.user;
      setUser(currentUser);

      if (currentUser) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("full_name, email, phone, address")
          .eq("id", currentUser.id)
          .single();

        setProfile(profileData);
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace("Login");
  };

  const handleSave = async () => {
    if (!user || !profile) return;

    await supabase.from("profiles").upsert({
      id: user.id,
      full_name: profile.full_name,
      phone: profile.phone,
      email: user.email,
      address: profile.address,
    });

    alert("Perfil actualizado");
    setEditing(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18 }}>Cargando...</Text>
      </View>
    );
  }

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

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Mi Perfil</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          style={styles.avatar}
        />
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={[styles.input, !editing && styles.disabledInput]}
          value={profile?.full_name || ""}
          editable={editing}
          onChangeText={(text) =>
            setProfile({ ...profile, full_name: text })
          }
        />

        <Text style={styles.label}>Número de teléfono</Text>
        <TextInput
          style={[styles.input, !editing && styles.disabledInput]}
          value={profile?.phone || ""}
          editable={editing}
          keyboardType="phone-pad"
          onChangeText={(text) => setProfile({ ...profile, phone: text })}
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={[styles.input, !editing && styles.disabledInput]}
          value={profile?.address || ""}
          editable={editing}
          onChangeText={(text) => setProfile({ ...profile, address: text })}
        />
      </View>

            {!editing ? (
        <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
          <Text style={styles.buttonText}>Editar perfil</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>
      )}

      {/* ⭐ BOTÓN PARA VER HISTORIAL ⭐ */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("History")}
      >
        <Text style={styles.buttonText}>Historial de órdenes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#333" }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8EE", padding: 20 },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#FF6B00",
    textAlign: "center",
    marginBottom: 20,
  },
  avatarContainer: { alignItems: "center", marginBottom: 25 },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 100,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#FF6B00",
  },
  email: { fontSize: 16, color: "#6B7280", fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 4,
  },
  label: { fontSize: 14, color: "#6B7280", marginBottom: 5, marginTop: 10 },
  input: {
    backgroundColor: "#F3F4F6",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: "#E5E7EB",
    color: "#6B7280",
  },
  button: {
    backgroundColor: "#FF6B00",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "bold" },
});
