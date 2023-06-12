import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CadastroEmpresa = () => {
  const navigation = useNavigation();
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [cnpjEmpresa, setCnpjEmpresa] = useState('');
  const [emailEmpresa, setEmailEmpresa] = useState('');
  const [telefoneEmpresa, setTelefoneEmpresa] = useState('');
  const [senha, setSenha] = useState('');

  const cadastrarEmpresa = () => {
    const novaEmpresa = {
      nome_empresa: nomeEmpresa,
      cnpj_empresa: cnpjEmpresa,
      email_empresa: emailEmpresa,
      telefone_empresa: telefoneEmpresa,
      password: senha,
    };

    axios
      .post('http://192.168.0.107:8080/empresas', novaEmpresa)
      .then((response) => {
        console.log('Nova empresa criada:', response.data);
        Alert.alert('Sucesso', 'Empresa criada com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao criar a empresa:', error);
        Alert.alert('Erro', 'Erro ao criar a empresa');
      });
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
      width: windowWidth * 0.8, // Utiliza 80% da largura da tela
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
      width: '100%', // Ocupa 100% da largura do inputContainer
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
              placeholder="Nome da Vinicola"
              style={styles.textInput}
              onChangeText={(text) => setNomeEmpresa(text)}
            />
            <TextInput
              placeholder="CNPJ"
              style={styles.textInput}
              onChangeText={(text) => setCnpjEmpresa(text)}
            />
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChangeText={(text) => setEmailEmpresa(text)}
            />
            <TextInput
              placeholder="Telefone"
              style={styles.textInput}
              onChangeText={(text) => setTelefoneEmpresa(text)}
            />
            <TextInput
              placeholder="Senha"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={(text) => setSenha(text)}
            />

            <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>

            <TouchableOpacity style={styles.button} onPress={cadastrarEmpresa}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.junteSe}
              onPress={() => navigation.navigate('TelaInicial')}
            >
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

export default CadastroEmpresa;
