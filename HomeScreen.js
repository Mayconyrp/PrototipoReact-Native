import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const goToTelaInicial = () => {
    navigation.navigate('TelaInicial');
  };

  const goToCadastroEmpresa = () => {
    navigation.navigate('CadastroEmpresa');
  };

  const goToCadastroEstoque = () => {
    navigation.navigate('CadastroEstoque');
  };

  const goToCadastroFuncionario = () => {
    navigation.navigate('CadastroFuncionario');
  };

  const goToControllerFuncionario = () => {
    navigation.navigate('ControllerFuncionarios');
  };
  const goToControllerEmpresas = () => {
    navigation.navigate('ControllerEmpresas');
  };
  const goToControllerEstoque = () => {
    navigation.navigate('ControllerEstoque');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Botões</Text>

      <View style={styles.buttonContainer}>
        <Button title="Ir para Tela Inicial" onPress={goToTelaInicial} color="#8B0000" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Ir para Cadastro de Empresa" onPress={goToCadastroEmpresa} color="#8B0000" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Ir para Cadastro de Estoque" onPress={goToCadastroEstoque} color="#8B0000" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Ir para Cadastro de Funcionário" onPress={goToCadastroFuncionario} color="#8B0000" />
      </View>

      <View style={styles.divider}></View>

      <View style={styles.buttonContainer}>
        <Button title="Controller de Empresa" onPress={goToControllerEmpresas} color="#800020" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Controller de Estoque" onPress={goToControllerEstoque} color="#800020" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Controller de Funcionário" onPress={goToControllerFuncionario} color="#800020" />
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
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 10,
    width: '80%',
  },
});

export default HomeScreen;
