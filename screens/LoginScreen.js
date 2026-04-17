import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../utils/supabase";

export default function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState(""); // email o teléfono
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Si es email
    if (identifier.includes("@")) {
      const { error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password,
      });

      if (error) return alert(error.message);
      return;
    }

    // Si es teléfono → buscar email asociado
    const { data } = await supabase
      .from("profiles")
      .select("id")
      .eq("phone", identifier)
      .single();

    if (!data) return alert("Teléfono no encontrado");

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password,
    });

    if (error) return alert(error.message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput style={styles.input} placeholder="Correo o teléfono" value={identifier} onChangeText={setIdentifier} />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8EE", padding: 20, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "900", color: "#FF6B00", textAlign: "center", marginBottom: 30 },
  input: { backgroundColor: "#fff", padding: 15, borderRadius: 15, marginBottom: 15, elevation: 2 },
  button: { backgroundColor: "#FF6B00", padding: 15, borderRadius: 15, marginTop: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },
  link: { marginTop: 15, textAlign: "center", color: "#FF6B00", fontWeight: "bold" },
});
