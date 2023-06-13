import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const ControllerVinicola = () => {
    const [vinicolas, setVinicolas] = useState([]);

    useEffect(() => {
        const fetchVinicolas = async () => {
            try {
                const response = await axios.get('http://192.168.0.107:8080/vinicolas');
                console.log('Dados da API:', response.data);
                setVinicolas(response.data);
            } catch (error) {
                console.error('Erro ao buscar as vinícolas:', error);
            }
        };

        fetchVinicolas();
    }, []);

    console.log('Vinícolas:', vinicolas);

    const renderVinicolaCard = ({ item }) => (
        <View key={item.id} style={styles.vinicolaCard}>
            <Text style={styles.vinicolaName}>Nome: {item.nome_vinicola}</Text>
            <Text style={styles.vinicolaInfo}>Tipo de Uva: {item.tipo_uva}</Text>
            <Text style={styles.vinicolaInfo}>Última Colheita: {item.ultima_colheita}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vinícolas</Text>
            <FlatList
                data={vinicolas}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderVinicolaCard}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    vinicolaCard: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    vinicolaName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    vinicolaInfo: {
        fontSize: 14,
    },
});

export default ControllerVinicola;
