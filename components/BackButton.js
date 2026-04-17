import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function BackButton({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ padding: 10 }}
    >
      <Ionicons name="arrow-back" size={28} color="#FF6B00" />
    </TouchableOpacity>
  );
}
