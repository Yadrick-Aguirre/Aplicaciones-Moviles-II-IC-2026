import { View, Text, Image, StyleSheet } from "react-native";

export default function ZodiacCard({ item }) {
  return (
    <View style={styles.card}>
      <Image source={item.imagen} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{item.nombre}</Text>

        <Text style={styles.text}>Días: {item.rango}</Text>
        <Text style={styles.text}>Elemento: {item.elemento}</Text>
        <Text style={styles.text}>Astro: {item.astro}</Text>
        <Text style={styles.text}>Piedra: {item.piedra}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 10,
    resizeMode: "contain",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    marginBottom: 2,
  },
});
