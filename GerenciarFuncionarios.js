import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GerenciarFuncionarios = () => {
    const navigation = useNavigation();

    const goToCadastroFuncionario = () => {
        navigation.navigate('CadastroFuncionario');
    };

    const goToGerenciarFuncionario = () => {
        navigation.navigate('ControllerFuncionarios');
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Cadastro de Funcionário" onPress={goToCadastroFuncionario} color="#8B0000" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Gerenciar Funcionário" onPress={goToGerenciarFuncionario} color="#8B0000" />
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
    buttonContainer: {
        marginBottom: 10,
        width: '80%',
    },
});

export default GerenciarFuncionarios;
