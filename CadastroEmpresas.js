import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions, Alert, StyleSheet } from 'react-native';
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

 

  return (
    <View style={styles.container}>
      <View style={styles.contFolhas}>
        <Image source={require('./assets/folhas.png')} style={styles.folhas} />
        <Image source={require('./assets/folhas.png')} style={[styles.folhas, styles.folhasOpacidade]} />
      </View>
      <View style={styles.card}>
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
 const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contFolhas: {
        flex:0.5,
    },
    inputContainer:{
      display:'flex',
      backgroundColor:'white',
      flexDirection:'column'
    },
    folhas: {
        width: 350,
        height: 150,
        right:150,
    },
    folhasOpacidade: {
        opacity: 0.5,
    },
    folhasRotate: {
        transform: [{ rotate: '180deg' }],
        left:150,
    },
    card: {
        backgroundColor: '#FFF',
        width: 300,
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
        alignItems: 'center',
        gap:10,
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
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        borderColor:'#188E04',
    },
    button: {
        backgroundColor: '#AD2365',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    junteSeButton: {
        marginBottom: 20,
    },
    junteSeText: {
        textAlign: 'center',
        fontSize: 14,
        marginBottom:10,
    },
    junteSeSpan: {
        fontWeight: 'bold',
        color:'#188E04'

    },
    junteSe:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      gap:5
    }
})

export default CadastroEmpresa;