import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const CadastroVinicolaCampo = () => {
    const [nomeGerente, setNomeGerente] = useState('');
    const [nomeVinicola, setNomeVinicola] = useState('');
    const [cepVinicola, setCepVinicola] = useState('');
    const [tipoUva, setTipoUva] = useState('');
    const [ultimaColheita, setUltimaColheita] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleCreateVinicola = async () => {
        setErrorMessage('');

        try {
            console.log('Enviando requisição para criar a vinícola');
            await axios.post('http://192.168.0.107:8080/vinicolas', {
                nome_gerente: nomeGerente,
                nome_vinicola: nomeVinicola,
                cep_vinicola: cepVinicola,
                tipo_uva: tipoUva,
                ultima_colheita: ultimaColheita
            });

            // Reset form fields
            setNomeGerente('');
            setNomeVinicola('');
            setCepVinicola('');
            setTipoUva('');
            setUltimaColheita('');

            console.log('Vinícola criada com sucesso');
            Alert.alert('Sucesso', 'Vinícola criada com sucesso');
        } catch (error) {
            console.error('Erro ao criar a vinícola:', error);
            setErrorMessage('Erro ao criar a vinícola');
            Alert.alert('Erro', 'Erro ao criar a vinícola');
        }
    };

    const formatCEP = (value) => {
        const cepDigitsOnly = value.replace(/\D/g, '');
        const cepFormatted = cepDigitsOnly.replace(/(\d{5})(\d{3})/, '$1-$2');
        return cepFormatted;
    };

    const handleCEPChange = (value) => {
        const formattedCEP = formatCEP(value);
        setCepVinicola(formattedCEP);
    };

    console.log('Renderização do componente CadastroVinicolaCampo');
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar nova Vinícola</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome do Gerente"
                value={nomeGerente}
                onChangeText={setNomeGerente}
            />
            <TextInput
                style={styles.input}
                placeholder="Nome da Vinícola"
                value={nomeVinicola}
                onChangeText={setNomeVinicola}
            />
            <TextInput
                style={styles.input}
                placeholder="CEP da Vinícola (Formato: 00000-000)"
                value={cepVinicola}
                onChangeText={handleCEPChange}
                keyboardType="numeric"
                maxLength={9}
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo de Uva"
                value={tipoUva}
                onChangeText={setTipoUva}
            />
            <TextInput
                style={styles.input}
                placeholder="Última Colheita"
                value={ultimaColheita}
                onChangeText={setUltimaColheita}
            />

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleCreateVinicola}>
                <Text style={styles.buttonText}>Criar Vinícola</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#8B0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
    },
});

export default CadastroVinicolaCampo;
