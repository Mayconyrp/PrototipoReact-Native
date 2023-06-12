import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const ControllerEstoque = () => {
  const [estoque, setEstoque] = useState([]);

  useEffect(() => {
    const fetchEstoque = async () => {
      try {
        console.log('Buscando itens de estoque...');
        const response = await axios.get('http://192.168.0.107:8080/estoque');
        console.log('Itens de estoque encontrados:', response.data);
        setEstoque(response.data);
      } catch (error) {
        console.error('Erro ao buscar os itens de estoque:', error);
      }
    };

    fetchEstoque();
  }, []);

  return (
    <View>
      <FlatList
        data={estoque}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Uva: {item.uva}</Text>
            <Text style={styles.itemText}>Tipo de Uva: {item.tipo_uva}</Text>
            <Text style={styles.itemText}>Adubo: {item.adubo}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    marginBottom: 5,
  },
});

export default ControllerEstoque;
