import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GerenciarCampoVinicola = () => {
    const navigation = useNavigation();

    const goToCadastroCampoVinicola = () => {
        navigation.navigate('CadastroVinicolaCampo');
    };

    const goToGerenciarCampoVinicola = () => {
        navigation.navigate('ControllerCampoVinicola');
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Cadastrar Campos " onPress={goToCadastroCampoVinicola} color="#8B0000" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Ver/Alterar Meus Champos" onPress={goToGerenciarCampoVinicola} color="#8B0000" />
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

export default GerenciarCampoVinicola;
