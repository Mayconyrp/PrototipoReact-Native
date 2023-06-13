import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';

const ControllerEstoque = () => {
    const [estoque, setEstoque] = useState([]);
    const [novaUva, setNovaUva] = useState('');
    const [novoTipoUva, setNovoTipoUva] = useState('');
    const [novoAdubo, setNovoAdubo] = useState('');
    const [showInputs, setShowInputs] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    useEffect(() => {
        fetchEstoque();
    }, []);

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

    const handleUpdateEstoque = async (id) => {
        try {
            console.log('Atualizando item de estoque:', id);
            await axios.put(`http://192.168.0.107:8080/estoque/${id}`, {
                uva: novaUva,
                tipo_uva: novoTipoUva,
                adubo: novoAdubo,
            });
            console.log('Item de estoque atualizado com sucesso!');
            fetchEstoque();
            setShowInputs(false); // Oculta os campos de entrada de texto após a atualização
        } catch (error) {
            console.error('Erro ao atualizar o item de estoque:', error);
        }
    };

    const handleDeleteEstoque = async (id) => {
        try {
            console.log('Excluindo item de estoque:', id);
            await axios.delete(`http://192.168.0.107:8080/estoque/${id}`);
            console.log('Item de estoque excluído com sucesso!');
            fetchEstoque();
        } catch (error) {
            console.error('Erro ao excluir o item de estoque:', error);
        }
    };

    const handleShowInputs = (id) => {
        setShowInputs(true); // Exibe os campos de entrada de texto ao clicar em "Atualizar"
        setSelectedItemId(id);
        setNovaUva('');
        setNovoTipoUva('');
        setNovoAdubo('');
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={estoque}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>Uva: {item.uva}</Text>
                        <Text style={styles.itemText}>Tipo de Uva: {item.tipo_uva}</Text>
                        <Text style={styles.itemText}>Adubo: {item.adubo}</Text>

                        {showInputs && selectedItemId === item.id && (
                            <>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Nova Uva:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={novaUva}
                                        onChangeText={setNovaUva}
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Novo Tipo de Uva:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={novoTipoUva}
                                        onChangeText={setNovoTipoUva}
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Novo Adubo:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={novoAdubo}
                                        onChangeText={setNovoAdubo}
                                    />
                                </View>
                            </>
                        )}

                        {!showInputs || selectedItemId !== item.id ? (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleShowInputs(item.id)}
                            >
                                <Text style={styles.buttonText}>Atualizar</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={[styles.button, styles.confirmButton]}
                                onPress={() => handleUpdateEstoque(item.id)}
                            >
                                <Text style={styles.buttonText}>Confirmar</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={[styles.button, styles.deleteButton]}
                            onPress={() => handleDeleteEstoque(item.id)}
                        >
                            <Text style={styles.buttonText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    itemContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemText: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    button: {
        marginTop: 10,
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
    },
    deleteButton: {
        backgroundColor: '#FF4C4C',
    },
});

export default ControllerEstoque;
