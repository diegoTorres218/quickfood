import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

const menuItems = [
  { id: 1, name: "Hamburguesa Clásica", category: "Comida", price: 8.99, image: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
  { id: 2, name: "Pizza Margherita", category: "Comida", price: 12.99, image: "https://images.unsplash.com/photo-1601924582971-df56b1b1a1a1" },
  { id: 3, name: "Coca-Cola", category: "Bebidas", price: 2.99, image: "https://images.unsplash.com/photo-1581091215367-59ab6b7a7b1f" },
  { id: 4, name: "Jugo Natural", category: "Bebidas", price: 3.99, image: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7" },
  { id: 5, name: "Cake", category: "Postres", price: 5.99, image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31" },
  { id: 6, name: "Helado", category: "Postres", price: 4.99, image: "https://images.unsplash.com/photo-1589712235278-9b2d6b9d3b0c" },
];

export default function MenuScreen() {
  const navigation = useNavigation();
  const { addItem } = useCart();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');

  const filteredMenu = menuItems.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'Todos' || item.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuestro Menú</Text>

      {/* 🔍 BUSCADOR */}
      <TextInput
        placeholder="Buscar comida..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* 📂 CATEGORÍAS */}
      <View style={styles.categories}>
        {['Todos', 'Comida', 'Bebidas', 'Postres'].map(cat => (
          <TouchableOpacity key={cat} onPress={() => setCategory(cat)}>
            <Text style={category === cat ? styles.activeCat : styles.cat}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ProductDetail", { product: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addItem(item)}
            >
              <Text style={styles.addText}>+ Agregar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
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
    marginBottom: 10,
  },

  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
  },

  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },

  cat: { color: "#777" },

  activeCat: {
    color: "#FF6B00",
    fontWeight: "bold",
    borderBottomWidth: 2,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },

  image: { width: "100%", height: 160, borderRadius: 15 },

  info: { marginTop: 10 },

  name: { fontSize: 18, fontWeight: "bold" },

  category: { color: "#6B7280", marginTop: 3 },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B00",
    marginTop: 5,
  },

  addButton: {
    backgroundColor: "#FF6B00",
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 12,
    alignItems: "center",
  },

  addText: { color: "#fff", fontWeight: "bold" },
});
