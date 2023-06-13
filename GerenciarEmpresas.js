import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GerenciarEmpresas = () => {
    const navigation = useNavigation();

    const goToGerenciarEmpresas = () => {
        navigation.navigate('ControllerEmpresas');
    };


    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Alterar Informações de Usuarios" onPress={goToGerenciarEmpresas} color="#8B0000" />
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

export default GerenciarEmpresas;
