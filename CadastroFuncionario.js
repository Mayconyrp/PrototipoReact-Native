import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CadastroFuncionario = () => {
    const navigation = useNavigation();
    const [nomeFuncionario, setNomeFuncionario] = useState('');
    const [cpfFuncionario, setCpfFuncionario] = useState('');
    const [salarioFuncionario, setSalarioFuncionario] = useState('');
    const [funcaoFuncionario, setFuncaoFuncionario] = useState('');

    const cadastrarFuncionario = () => {
        console.log('Dados do funcionário a ser cadastrado:');
        console.log('Nome:', nomeFuncionario);
        console.log('CPF:', cpfFuncionario);
        console.log('Salário:', salarioFuncionario);
        console.log('Função:', funcaoFuncionario);

        axios
            .post('http://192.168.0.107:8080/funcionarios', {
                nome_funcionario: nomeFuncionario,
                cpf_funcionario: cpfFuncionario,
                salario_funcionario: salarioFuncionario,
                funcao_funcionario: funcaoFuncionario,
            })
            .then((response) => {
                console.log('Resposta da API:', response.data);
                alert('Funcionário cadastrado com sucesso!');
                navigation.navigate('TelaInicial');
            })
            .catch((error) => {
                console.error('Erro ao cadastrar o funcionário:', error);
                alert('Erro ao cadastrar o funcionário');
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.contFolhas}>
                <Image source={require('./assets/folhas.png')} style={styles.folhas} />
                <Image source={require('./assets/folhas.png')} style={[styles.folhas, styles.folhasOpacidade]} />
            </View>
            <View style={styles.card2}>
                <View style={styles.imgLogo}>
                    <Image source={require('./assets/LogoWineYardsAPP.png')} style={styles.logo} />
                </View>
                <View style={styles.inputs}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Nome do Funcionário"
                            style={styles.textInput}
                            onChangeText={(text) => setNomeFuncionario(text)}
                        />
                        <TextInput
                            placeholder="CPF do Funcionário"
                            style={styles.textInput}
                            onChangeText={(text) => setCpfFuncionario(text)}
                        />
                        <TextInput
                            placeholder="Salário do Funcionário"
                            style={styles.textInput}
                            onChangeText={(text) => setSalarioFuncionario(text)}
                        />
                        <TextInput
                            placeholder="Função do Funcionário"
                            style={styles.textInput}
                            onChangeText={(text) => setFuncaoFuncionario(text)}
                        />

                        <TouchableOpacity style={styles.button} onPress={cadastrarFuncionario}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.junteSe} onPress={() => navigation.navigate('TelaInicial')}>
                            <Text style={styles.junteSeText}>Já tem uma conta?</Text>
                            <Text style={styles.junteSeSpan}>Entre agora mesmo!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.contFolhas}>
                <Image source={require('./assets/folhas.png')} style={[styles.folhas, styles.folhasOpacidade, styles.folhasRotate]} />
                <Image source={require('./assets/folhas.png')} style={[styles.folhas, styles.folhasRotate]} />
            </View>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contFolhas: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    folhas: {
        width: 100,
        height: 100,
    },
    folhasOpacidade: {
        opacity: 0.5,
    },
    folhasRotate: {
        transform: [{ rotate: '180deg' }],
    },
    card2: {
        backgroundColor: '#ffffff',
        width: windowWidth * 0.8,
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
        alignItems: 'center',
    },
    imgLogo: {
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
    },
    inputs: {
        width: '100%',
        marginTop: 20,
    },
    inputContainer: {
        padding: 10,
        marginBottom: 10,
    },
    textInput: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
    forgotPassword: {
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#31506F',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    junteSe: {
        marginBottom: 20,
    },
    junteSeText: {
        textAlign: 'center',
        fontSize: 14,
    },
    junteSeSpan: {
        fontWeight: 'bold',
    },
};

export default CadastroFuncionario;
