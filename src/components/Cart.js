// Documentación interna: Muestra carrito con imagen del producto, botones + / - para cantidad, subtotal por ítem, total general, eliminar ítem.
// Al presionar "Cancelar Compra": muestra modal de confirmación Sí/No → Si "Sí": limpia carrito → alerta + navega a Products.
// Al presionar "Pagar": simula pago (limpia carrito) → alerta + navega a Products.
// Modal personalizado para que funcione en web y móvil.
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Modal, 
  Alert 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../store/cartSlice';
import { styles } from '../styles/style';

const Cart = ({ navigation }) => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para mostrar/ocultar modal

  const getSubtotal = (item) => (item.price * item.quantity).toFixed(2);
  const grandTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // Función para ir a la pantalla de productos
  const irAProductos = () => {
    navigation.navigate('Products');
  };

  const renderCartItem = ({ item }) => (
    <View style={[styles.cartItem || { padding: 12, borderBottomWidth: 1, borderColor: '#eee' }, { flexDirection: 'row', alignItems: 'center' }]}>
      <Image
        source={{ uri: item.image }}
        style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12, backgroundColor: '#f0f0f0' }}
        resizeMode="contain"
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }} numberOfLines={2}>{item.title}</Text>
        <Text style={{ color: '#888', marginTop: 4 }}>Precio: ${item.price.toFixed(2)}</Text>
        <Text style={{ fontWeight: '600', marginTop: 4 }}>Subtotal: ${getSubtotal(item)}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 }}>
        <TouchableOpacity
          style={{ backgroundColor: '#6200EE', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => item.quantity > 1 && dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>-</Text>
        </TouchableOpacity>

        <Text style={{ marginHorizontal: 12, fontSize: 16, fontWeight: 'bold' }}>{item.quantity}</Text>

        <TouchableOpacity
          style={{ backgroundColor: '#6200EE', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => dispatch(removeItem(item.id))}>
        <Text style={{ color: 'red', fontSize: 24, marginLeft: 12 }}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Carrito de Compras</Text>

      {items.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 18, color: '#888' }}>
          Tu carrito está vacío
        </Text>
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={renderCartItem}
            keyExtractor={item => item.id.toString()}
            style={{ flex: 1 }}
          />

          <Text style={styles.total}>Gran Total: ${grandTotal}</Text>

          {/* BOTÓN CANCELAR COMPRA - CON MODAL PERSONALIZADO */}
          <TouchableOpacity
            style={[styles.button || { padding: 12, borderRadius: 8, margin: 10 }, { backgroundColor: '#FF5722' }]}
            onPress={() => {
              console.log("Botón Cancelar presionado - abriendo modal de confirmación");
              setShowConfirmModal(true); // Muestra el modal
            }}
          >
            <Text style={styles.buttonText || { color: '#fff', fontWeight: 'bold' }}>Cancelar Compra</Text>
          </TouchableOpacity>

          {/* BOTÓN PAGAR - MANTENEMOS COMO TE FUNCIONA */}
          <TouchableOpacity
            style={[styles.button || { padding: 12, borderRadius: 8, margin: 10 }, { backgroundColor: '#4CAF50' }]}
            onPress={() => {
              dispatch(clearCart());
              Alert.alert(
                '¡Pago simulado exitoso!',
                `Total pagado: $${grandTotal}\n\nEl carrito ha sido vaciado.`,
                [
                  {
                    text: 'OK',
                    onPress: () => irAProductos()
                  }
                ]
              );
            }}
          >
            <Text style={styles.buttonText || { color: '#fff', fontWeight: 'bold' }}>Pagar (${grandTotal})</Text>
          </TouchableOpacity>
        </>
      )}

      {/* MODAL PERSONALIZADO DE CONFIRMACIÓN PARA CANCELAR */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, width: '80%', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>Cancelar Compra</Text>
            <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 25 }}>
              ¿Estás seguro de que quieres cancelar la compra y vaciar el carrito?
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
              <TouchableOpacity
                style={{ backgroundColor: '#ccc', padding: 12, borderRadius: 8, width: '40%', alignItems: 'center' }}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={{ color: '#000', fontWeight: 'bold' }}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: '#FF5722', padding: 12, borderRadius: 8, width: '40%', alignItems: 'center' }}
                onPress={() => {
                  dispatch(clearCart());
                  setShowConfirmModal(false);
                  Alert.alert("Compra cancelada", "El carrito ha sido vaciado completamente.");
                  irAProductos();
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Cart;