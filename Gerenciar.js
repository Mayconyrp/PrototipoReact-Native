import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Gerenciar = () => {
    const navigation = useNavigation();
    /*
        const goToCadastroFuncionario = () => {
            navigation.navigate('CadastroFuncionario');
        };
    
        const goToGerenciarFuncionario = () => {
            navigation.navigate('ControllerFuncionarios');
        };
    */
    const goToGerenciarFuncionario = () => {
        navigation.navigate('GerenciarFuncionarios');
    };
    const goToGerenciarEstoques = () => {
        navigation.navigate('GerenciarEstoques');
    };
    const goToGerenciarEmpresas = () => {
        navigation.navigate('GerenciarEmpresas');
    };


    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Administrar Funcionarios" onPress={goToGerenciarFuncionario} color="#8B0000" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Administrar Estoque" onPress={goToGerenciarEstoques} color="#8B0000" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Painel Administrativo (Admin)" onPress={goToGerenciarEmpresas} color="#8B0000" />
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

export default Gerenciar;
