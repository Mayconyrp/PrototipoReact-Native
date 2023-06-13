import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

const ControllerEmpresas = () => {
    const [empresas, setEmpresas] = useState([]);
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [cnpjEmpresa, setCnpjEmpresa] = useState('');
    const [emailEmpresa, setEmailEmpresa] = useState('');
    const [telefoneEmpresa, setTelefoneEmpresa] = useState('');
    const [passwordEmpresa, setPasswordEmpresa] = useState('');
    const [currentEmpresaId, setCurrentEmpresaId] = useState(null);

    useEffect(() => {
        fetchEmpresas();
    }, []);

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

    const handleUpdateEmpresa = async (id) => {
        try {
            console.log('Atualizando empresa:', id);
            const response = await axios.put(`http://192.168.0.107:8080/empresas/${id}`, {
                nomeEmpresa,
                cnpjEmpresa,
                emailEmpresa,
                telefoneEmpresa,
                passwordEmpresa,
            });
            console.log('Empresa atualizada:', response.data);
            fetchEmpresas();
            setNomeEmpresa('');
            setCnpjEmpresa('');
            setEmailEmpresa('');
            setTelefoneEmpresa('');
            setPasswordEmpresa('');
            setCurrentEmpresaId(null);
        } catch (error) {
            console.error('Erro ao atualizar a empresa:', error);
        }
    };

    const handleDeleteEmpresa = async (id) => {
        try {
            await axios.delete(`http://192.168.0.107:8080/empresas/${id}`);
            console.log('Empresa excluída com sucesso');
            fetchEmpresas();
        } catch (error) {
            console.error('Erro ao excluir a empresa:', error);
        }
    };

    const showInputsAndSetCurrentEmpresaId = (id) => {
        const empresa = empresas.find((item) => item.id_empresa === id);
        if (empresa) {
            setNomeEmpresa(empresa.nome_empresa);
            setCnpjEmpresa(empresa.cnpj_empresa);
            setEmailEmpresa(empresa.email_empresa);
            setTelefoneEmpresa(empresa.telefone_empresa);
            setPasswordEmpresa(empresa.password);
        }
        setCurrentEmpresaId(id);
    };

    return (
        <View>
            <FlatList
                data={empresas}
                keyExtractor={(item) => String(item.id_empresa)}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>ID: {item.id_empresa}</Text>
                        <Text style={styles.itemText}>Nome: {item.nome_empresa}</Text>
                        <Text style={styles.itemText}>CNPJ: {item.cnpj_empresa}</Text>
                        <Text style={styles.itemText}>Email: {item.email_empresa}</Text>
                        <Text style={styles.itemText}>Telefone: {item.telefone_empresa}</Text>
                        <Text style={styles.itemText}>Password: {item.password}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonUpdate]}
                                onPress={() => showInputsAndSetCurrentEmpresaId(item.id_empresa)}
                            >
                                <Text style={styles.buttonText}>Atualizar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonDelete]}
                                onPress={() => handleDeleteEmpresa(item.id_empresa)}
                            >
                                <Text style={styles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                        {currentEmpresaId === item.id_empresa && (
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Novo Nome"
                                    value={nomeEmpresa}
                                    onChangeText={setNomeEmpresa}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Novo CNPJ"
                                    value={cnpjEmpresa}
                                    onChangeText={setCnpjEmpresa}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Novo Email"
                                    value={emailEmpresa}
                                    onChangeText={setEmailEmpresa}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Novo Telefone"
                                    value={telefoneEmpresa}
                                    onChangeText={setTelefoneEmpresa}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nova Senha"
                                    value={passwordEmpresa}
                                    onChangeText={setPasswordEmpresa}
                                />
                                <TouchableOpacity
                                    style={styles.updateButton}
                                    onPress={() => handleUpdateEmpresa(currentEmpresaId)}
                                >
                                    <Text style={styles.buttonText}>Atualizar Empresa</Text>
                                </TouchableOpacity>
                            </View>
                        )}
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    buttonUpdate: {
        backgroundColor: 'green',
    },
    buttonDelete: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
    },
    updateButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
});

export default ControllerEmpresas;
