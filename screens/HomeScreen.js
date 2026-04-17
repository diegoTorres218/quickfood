import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* LOGO */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoIcon}>🍽️</Text>
        </View>
      </View>

      {/* TITULO */}
      <Text style={styles.title}>QuickFood</Text>
      <Text style={styles.subtitle}>Tu comida favorita, entregada rápido y fresco</Text>

      {/* BOTÓN */}
     <TouchableOpacity
  style={styles.button}
  activeOpacity={0.8}
  onPress={() => navigation.navigate('MainTabs')}
>
  <Text style={styles.buttonText}>Explorar Restaurantes →</Text>
</TouchableOpacity>

      {/* TEXTO INFERIOR */}
      <Text style={styles.footer}>Ordena comida deliciosa con un solo clic</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8EE',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  logoContainer: {
    marginBottom: 20,
  },

  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoIcon: {
    fontSize: 50,
    color: '#fff',
  },

  title: {
  fontSize: 28,
  fontWeight: '900',
  color: '#111827',
  marginBottom: 10,
},

  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 30,
  },

  button: {
  backgroundColor: '#FF6B00',
  paddingVertical: 16,
  paddingHorizontal: 40,
  borderRadius: 30,
  marginTop: 10,
  elevation: 5,
},

buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

  footer: {
    marginTop: 40,
    color: '#6B7280',
    fontSize: 14,
  },
});
