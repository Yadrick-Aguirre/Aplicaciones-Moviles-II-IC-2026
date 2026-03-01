// Documentación interna: Muestra carrito con imagen del producto, botones + / - para cantidad, subtotal por ítem, total general, eliminar ítem, cancelar y pagar (simulado). Usa Redux y AsyncStorage para persistencia.
import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Alert, 
  StyleSheet 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../store/cartSlice';
import { styles } from '../styles/style'; // Tus estilos globales

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calcula subtotal de un ítem
  const getSubtotal = (item) => (item.price * item.quantity).toFixed(2);

  // Calcula gran total
  const grandTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const renderCartItem = ({ item }) => (
    <View style={[styles.cartItem, { flexDirection: 'row', alignItems: 'center', padding: 12 }]}>
      {/* Imagen del producto (mini, 60x60) */}
      <Image
        source={{ uri: item.image }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 8,
          marginRight: 12,
          backgroundColor: '#f0f0f0',
        }}
        resizeMode="contain"
      />

      {/* Info del producto */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={{ color: '#888', marginTop: 4 }}>
          Precio unitario: ${item.price.toFixed(2)}
        </Text>
        <Text style={{ fontWeight: '600', marginTop: 4 }}>
          Subtotal: ${getSubtotal(item)}
        </Text>
      </View>

      {/* Controles de cantidad: - cantidad + */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#6200EE',
            width: 32,
            height: 32,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if (item.quantity > 1) {
              dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
            }
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>-</Text>
        </TouchableOpacity>

        <Text style={{ marginHorizontal: 12, fontSize: 16, fontWeight: 'bold' }}>
          {item.quantity}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: '#6200EE',
            width: 32,
            height: 32,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Botón eliminar */}
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
            keyExtractor={(item) => item.id.toString()}
            style={{ flex: 1 }}
          />

          {/* Gran total */}
          <Text style={styles.total}>
            Gran Total: ${grandTotal}
          </Text>

          {/* Botones de acción */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FF5722' }]}
            onPress={() => {
              Alert.alert('Cancelar', '¿Seguro que quieres vaciar el carrito?', [
                { text: 'No', style: 'cancel' },
                { text: 'Sí', onPress: () => { dispatch(clearCart()); Alert.alert('Cancelado'); } },
              ]);
            }}
          >
            <Text style={styles.buttonText}>Cancelar Compra</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert('Pagar', `Total a pagar: $${grandTotal}\n(Compra simulada)`, [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Pagar Ahora', onPress: () => { dispatch(clearCart()); Alert.alert('¡Pagado!', 'Compra completada (simulada)'); } },
              ]);
            }}
          >
            <Text style={styles.buttonText}>Pagar (${grandTotal})</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Cart;