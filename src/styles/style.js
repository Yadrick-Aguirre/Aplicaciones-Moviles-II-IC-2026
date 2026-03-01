// Documentación interna: Estilos globales inspirados en la imagen del examen (Fake Store morado, grid de productos como cajas, footer).
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  header: { fontSize: 32, fontWeight: 'bold', color: '#6200EE', textAlign: 'center', marginVertical: 20 },
  categoryLabel: { fontSize: 18, fontWeight: '600', margin: 10, color: '#333' },
  pickerContainer: { borderWidth: 1, borderColor: '#6200EE', borderRadius: 8, margin: 10, backgroundColor: '#f8f8f8' },
  productCard: { flex: 1, margin: 8, padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 12, alignItems: 'center', backgroundColor: '#fafafa', elevation: 3 },
  productImage: { width: 120, height: 120, resizeMode: 'contain' },
  productTitle: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginTop: 8 },
  productPrice: { fontSize: 16, color: '#E91E63', marginTop: 4 },
  button: { backgroundColor: '#6200EE', padding: 12, borderRadius: 8, alignItems: 'center', margin: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  footer: { backgroundColor: '#6200EE', padding: 15, alignItems: 'center', marginTop: 20 },
  footerText: { color: '#fff', fontSize: 14 },
  total: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', margin: 15, color: '#333' },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
});