
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RestaurantCard({ restaurant, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: restaurant.img }} style={styles.img} />

      <View style={styles.content}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.sub}>{restaurant.cuisine} • {restaurant.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 20, marginBottom: 15 },
  img: { width: '100%', height: 160, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  content: { padding: 15 },
  name: { fontWeight: 'bold' },
  sub: { color: '#6b7280' }
});
