// Documentación interna: Lista productos con filtro por categoría. Usa FlatList grid.
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Picker } from 'react-native';
import axios from 'axios';
import { API_URL } from './config/config';
import { styles } from '../styles/style';
import { useSelector } from 'react-redux';

const Products = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [selected, setSelected] = useState('all');
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    axios.get(`${API_URL}/products/categories`).then(res => setCategories(['all', ...res.data]));
    fetchProducts();
  }, []);

  const fetchProducts = async (cat = 'all') => {
    const url = cat === 'all' ? `${API_URL}/products` : `${API_URL}/products/category/${cat}`;
    const res = await axios.get(url);
    setProducts(res.data);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate('Detail', { product: item })}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fake Store</Text>
      <Text style={styles.categoryLabel}>Categoría:</Text>
      <Picker style={styles.pickerContainer} selectedValue={selected} onValueChange={v => { setSelected(v); fetchProducts(v); }}>
        {categories.map(c => <Picker.Item key={c} label={c.charAt(0).toUpperCase() + c.slice(1)} value={c} />)}
      </Picker>
      <FlatList data={products} renderItem={renderItem} keyExtractor={i => i.id.toString()} numColumns={2} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.buttonText}>Carrito ({cartItems.length})</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Primera Prueba Parcial-Aplicaciones Moviles II-IC2026</Text>
        <Text style={styles.footerText}>Desarrollada por: Yadrick Aguirre Trejos</Text>
      </View>
    </View>
  );
};

export default Products;