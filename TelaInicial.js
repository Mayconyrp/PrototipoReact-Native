import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TelaInicial = () => {
    const navigation = useNavigation();

    const handleCadastroEmpresa = () => {
        navigation.navigate('CadastroEmpresa');
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
                    <TextInput placeholder="CNPJ" style={styles.textInput} />
                    <TextInput placeholder="SENHA" secureTextEntry={true} style={styles.textInput} />
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WeatherCard')}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.junteSeButton} onPress={handleCadastroEmpresa}>
                        <Text style={styles.junteSeText}>Ainda não é membro? <Text style={styles.junteSeSpan}>Junte-se agora!</Text></Text>
                    </TouchableOpacity>
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
        backgroundColor: '#ffffff',
        width: 300,
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
    },
    junteSeSpan: {
        fontWeight: 'bold',
        color:'#188E04'

    },
});


export default TelaInicial;