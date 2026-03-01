import { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

const CURSOS_INICIALES = [
  { codigo: "INF-101", nombre: "Fundamentos de Programación", nivel: "I", creditos: 3 },
  { codigo: "INF-202", nombre: "Estructuras de Datos", nivel: "II", creditos: 4 },
  { codigo: "INF-215", nombre: "Bases de Datos I", nivel: "II", creditos: 3 },
  { codigo: "INF-303", nombre: "Desarrollo Móvil", nivel: "III", creditos: 4 },
  { codigo: "INF-320", nombre: "Redes y Comunicaciones", nivel: "III", creditos: 3 },
];

const COSTO_POR_CREDITO = 12000;

function CursoItem({ item, colorFondo, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.item, { backgroundColor: colorFondo }]}>
      <Text style={styles.codigo}>{item.codigo}</Text>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.detalle}>
        Nivel: {item.nivel} • Créditos: {item.creditos}
      </Text>
    </Pressable>
  );
}

export default function App() {
  const [disponibles, setDisponibles] = useState(CURSOS_INICIALES);
  const [seleccionados, setSeleccionados] = useState([]);

  function moverADeseados(curso) {
    setDisponibles((prev) => prev.filter((c) => c.codigo !== curso.codigo));
    setSeleccionados((prev) => [...prev, curso]);
  }

  function devolverADisponibles(curso) {
    setSeleccionados((prev) => prev.filter((c) => c.codigo !== curso.codigo));
    setDisponibles((prev) => [...prev, curso]);
  }

  const totalCreditos = useMemo(
    () => seleccionados.reduce((acc, c) => acc + c.creditos, 0),
    [seleccionados]
  );

  const costoMatricula = useMemo(
    () => totalCreditos * COSTO_POR_CREDITO,
    [totalCreditos]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Matrícula de Cursos</Text>

      <Text style={styles.subtitulo}>Cursos disponibles</Text>
      <FlatList
        data={disponibles}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <CursoItem
            item={item}
            colorFondo="#BFE9FF" // celeste
            onPress={() => moverADeseados(item)}
          />
        )}
        ListEmptyComponent={<Text style={styles.vacio}>No hay cursos disponibles.</Text>}
      />

      <Text style={[styles.subtitulo, { marginTop: 14 }]}>Cursos por matricular</Text>
      <FlatList
        data={seleccionados}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <CursoItem
            item={item}
            colorFondo="#C8F7C5" // verde claro
            onPress={() => devolverADisponibles(item)}
          />
        )}
        ListEmptyComponent={<Text style={styles.vacio}>Aún no has seleccionado cursos.</Text>}
      />

      <View style={styles.resumen}>
        <Text style={styles.resumenTexto}>Total de créditos: {totalCreditos}</Text>
        <Text style={styles.resumenTexto}>
          Costo matrícula: ₡{costoMatricula.toLocaleString("es-CR")}
        </Text>
        <Text style={styles.nota}>₡12,000 por crédito</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titulo: { fontSize: 24, fontWeight: "900", marginBottom: 10 },
  subtitulo: { fontSize: 18, fontWeight: "800", marginBottom: 8 },
  item: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  codigo: { fontWeight: "900", fontSize: 14 },
  nombre: { fontSize: 16, fontWeight: "700", marginTop: 2 },
  detalle: { marginTop: 4, fontSize: 13 },
  vacio: { paddingVertical: 8, fontStyle: "italic" },
  resumen: {
    marginTop: 14,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  resumenTexto: { fontSize: 16, fontWeight: "800", marginBottom: 4 },
  nota: { fontSize: 12, opacity: 0.75, marginTop: 4 },
});
