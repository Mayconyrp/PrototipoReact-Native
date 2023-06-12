import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const ControllerEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        console.log('Buscando empresas...');
        const response = await axios.get('http://192.168.0.107:8080/empresas');
        console.log('Empresas encontradas:', response.data);
        setEmpresas(response.data);
      } catch (error) {
        console.error('Erro ao buscar as empresas:', error);
      }
    };

    fetchEmpresas();
  }, []);

  return (
    <View>
      <FlatList
        data={empresas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Nome: {item.nome_empresa}</Text>
            <Text style={styles.itemText}>CNPJ: {item.cnpj_empresa}</Text>
            <Text style={styles.itemText}>E-mail: {item.email_empresa}</Text>
            <Text style={styles.itemText}>Telefone: {item.telefone_empresa}</Text>
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

export default ControllerEmpresas;
