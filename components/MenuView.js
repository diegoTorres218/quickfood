
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MenuView({ restaurant, onBack }) {
  return (
    <View>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Image source={{ uri: restaurant.img }} style={styles.hero} />

      <Text style={styles.title}>{restaurant.name}</Text>

      {restaurant.menu.map((item) => (
        <View key={item.id} style={styles.item}>
          <Image source={{ uri: item.foodImg }} style={styles.img} />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  back: { color: '#ff6b00', marginBottom: 10, fontWeight: 'bold' },
  hero: { width: '100%', height: 180, borderRadius: 20, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: '900', marginBottom: 10 },
  item: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 15, marginBottom: 10 },
  img: { width: 70, height: 70, borderRadius: 10, marginRight: 10 },
  name: { fontWeight: 'bold' },
  desc: { color: '#6b7280', fontSize: 12 },
  price: { color: '#ff6b00', fontWeight: '900', marginTop: 5 }
});
