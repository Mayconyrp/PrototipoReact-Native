import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GerenciarEstoques = () => {
    const navigation = useNavigation();

    const goToCadastroEstoque = () => {
        navigation.navigate('CadastroEstoque');
    };

    const goToGerenciarEstoque = () => {
        navigation.navigate('ControllerEstoque');
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Cadastro de Estoque" onPress={goToCadastroEstoque} color="#8B0000" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Gerenciar Estoque" onPress={goToGerenciarEstoque} color="#8B0000" />
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

export default GerenciarEstoques;
