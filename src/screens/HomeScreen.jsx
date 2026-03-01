import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  Image,
  View,
} from "react-native";

import ZodiacCard from "../components/ZodiacCard";
import { ZODIAC, PORTADA } from "../data/zodiac";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Zodiaco</Text>

      <View style={styles.portadaContainer}>
        <Image source={PORTADA} style={styles.portada} />
      </View>

      <FlatList
        data={ZODIAC}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ZodiacCard item={item} />}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 10,
  },
  portadaContainer: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 14,
  },
  portada: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  list: {
    paddingBottom: 24,
  },
});
