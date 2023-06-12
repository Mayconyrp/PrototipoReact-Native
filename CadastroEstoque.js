import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CadastroEstoque = () => {
  const navigation = useNavigation();

  const [uva, setUva] = useState('');
  const [tipoUva, setTipoUva] = useState('');
  const [adubo, setAdubo] = useState('');
  const [mensagem, setMensagem] = useState('');

  const cadastrarEstoque = async () => {
    try {
      const response = await axios.post('http://192.168.0.107:8080/estoque', {
        uva,
        tipo_uva: tipoUva,
        adubo,
      });
      console.log('Item de estoque criado:', response.data);
      setMensagem('Item de estoque criado com sucesso');
      setUva('');
      setTipoUva('');
      setAdubo('');
    } catch (error) {
      console.error('Erro ao criar o item de estoque:', error);
      setMensagem('Erro ao criar o item de estoque');
    }
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
              placeholder="Nome da Uva"
              style={styles.textInput}
              onChangeText={setUva}
              value={uva}
            />
            <TextInput
              placeholder="Tipo de Uva"
              style={styles.textInput}
              onChangeText={setTipoUva}
              value={tipoUva}
            />
            <TextInput
              placeholder="Adubo"
              style={styles.textInput}
              onChangeText={setAdubo}
              value={adubo}
            />

            <TouchableOpacity style={styles.button} onPress={cadastrarEstoque}>
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
        {mensagem !== '' && (
          <View style={styles.mensagemContainer}>
            <Text style={styles.mensagemText}>{mensagem}</Text>
          </View>
        )}
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
  mensagemContainer: {
    backgroundColor: 'rgba(49, 80, 111, 0.8)',
    borderRadius: 8,
    padding: 8,
    marginTop: 16,
  },
  mensagemText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
};

export default CadastroEstoque;
