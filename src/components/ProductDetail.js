// Documentación interna: Detalle + botón comprar (add to cart Redux).
import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { styles } from '../styles/style';

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const buy = () => {
    dispatch(addItem(product));
    Alert.alert('Éxito', 'Producto agregado al carrito');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{product.title}</Text>
      <Image source={{ uri: product.image }} style={{ width: 250, height: 250, alignSelf: 'center', margin: 20 }} />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>${product.price}</Text>
      <Text>{product.description}</Text>
      <Text>Categoría: {product.category}</Text>
      <Text>Rating: {product.rating.rate} ⭐ ({product.rating.count})</Text>
      <TouchableOpacity style={styles.button} onPress={buy}>
        <Text style={styles.buttonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetail;