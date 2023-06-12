import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import axios from 'axios';

const ControllerFuncionarios = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [salario, setSalario] = useState('');
    const [funcao, setFuncao] = useState('');
    const [funcionarioId, setFuncionarioId] = useState('');

    useEffect(() => {
        const fetchFuncionarios = async () => {
            try {
                console.log('Buscando funcionários...');
                const response = await axios.get('http://192.168.0.107:8080/funcionarios');
                console.log('Funcionários encontrados:', response.data);
                setFuncionarios(response.data);
            } catch (error) {
                console.error('Erro ao buscar os funcionários:', error);
            }
        };

        fetchFuncionarios();
    }, []);

    useEffect(() => {
        const fetchFuncionario = async () => {
            try {
                console.log(`Buscando funcionário com ID ${funcionarioId}...`);
                const response = await axios.get(`http://192.168.0.107:8080/funcionarios/${funcionarioId}`);
                console.log('Funcionário encontrado:', response.data);
                const funcionario = response.data;
                setNome(funcionario.nome_funcionario);
                setCpf(funcionario.cpf_funcionario);
                setSalario(funcionario.salario_funcionario);
                setFuncao(funcionario.funcao_funcionario);
            } catch (error) {
                console.error('Erro ao buscar o funcionário:', error);
            }
        };

        if (funcionarioId) {
            fetchFuncionario();
        }
    }, [funcionarioId]);

    const handleUpdateFuncionario = (id) => {
        console.log(`Atualizando funcionário com ID ${id}...`);
        setFuncionarioId(id);
        setModalVisible(true);
    };

    const updateFuncionario = async () => {
        try {
            const response = await axios.put(`http://192.168.0.107:8080/funcionarios/${funcionarioId}`, {
                nome_funcionario: nome,
                cpf_funcionario: cpf,
                salario_funcionario: salario,
                funcao_funcionario: funcao,
            });
            console.log('Funcionário atualizado:', response.data);
            // Atualizar a lista de funcionários com o funcionário atualizado
            const updatedFuncionarios = funcionarios.map((funcionario) => {
                if (funcionario.id === funcionarioId) {
                    return response.data;
                }
                return funcionario;
            });
            setFuncionarios(updatedFuncionarios);
            setModalVisible(false);
        } catch (error) {
            console.error('Erro ao atualizar o funcionário:', error);
        }
    };

    const handleDeleteFuncionario = async (id) => {
        console.log(`Excluindo funcionário com ID ${id}...`);
        try {
            await axios.delete(`http://192.168.0.107:8080/funcionarios/${id}`);
            console.log('Funcionário excluído com sucesso');
            // Remover o funcionário da lista de funcionários
            const updatedFuncionarios = funcionarios.filter((funcionario) => funcionario.id !== id);
            setFuncionarios(updatedFuncionarios);
        } catch (error) {
            console.error('Erro ao excluir o funcionário:', error);
        }
    };

    return (
        <View>
            <FlatList
                data={funcionarios}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>Nome: {item.nome_funcionario}</Text>
                        <Text style={styles.itemText}>CPF: {item.cpf_funcionario}</Text>
                        <Text style={styles.itemText}>Salário: {item.salario_funcionario}</Text>
                        <Text style={styles.itemText}>Função: {item.funcao_funcionario}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleUpdateFuncionario(item.id)}
                            >
                                <Text style={styles.buttonText}>Atualizar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.deleteButton]}
                                onPress={() => handleDeleteFuncionario(item.id)}
                            >
                                <Text style={styles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Novo nome"
                            value={nome}
                            onChangeText={setNome}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Novo CPF"
                            value={cpf.toString()}
                            onChangeText={setCpf}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Novo salário"
                            value={salario.toString()}
                            onChangeText={setSalario}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nova função"
                            value={funcao}
                            onChangeText={setFuncao}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={updateFuncionario}>
                            <Text style={styles.buttonText}>Atualizar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        backgroundColor: '#31506F',
        marginLeft: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 4,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    modalButton: {
        backgroundColor: '#31506F',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
        marginTop: 10,
    },
    cancelButton: {
        backgroundColor: 'red',
    },
});

export default ControllerFuncionarios;
