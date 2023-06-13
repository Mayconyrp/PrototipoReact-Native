import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const WeatherCard = () => {
    const [cep, setCep] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [vinicolas, setVinicolas] = useState([]);
    const API_KEY = '57decebcbb3e8343fde5fcb48ae8b86a';

    const navigation = useNavigation();

    const formatCep = (value) => {
        value = value.replace(/\D/g, '');
        value = value.slice(0, 8);
        value = value.replace(/(\d{5})(\d)/, '$1-$2');

        return value;
    };

    const fetchData = async (cepValue) => {
        if (cepValue) {
            try {
                const weatherResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${cepValue},BR&units=metric&lang=pt_br&appid=${API_KEY}`
                );

                setWeatherData(weatherResponse.data);

                const vinicolasResponse = await axios.get(`http://172.26.38.209:8080/vinicolas/cep/${cepValue}`);
                if (vinicolasResponse.data.nome_gerente) {
                    setVinicolas([vinicolasResponse.data]);
                } else {
                    setVinicolas([]);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSearch = () => {
        setWeatherData(null);
        setVinicolas([]);
        fetchData(cep);
    };

    const handleChangeCep = (value) => {
        const formattedCep = formatCep(value);
        setCep(formattedCep);
    };

    const handleGerenciar = () => {
        navigation.navigate('Gerenciar');
    };

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Temperatura</Text>
                    {weatherData ? (
                        <Text style={styles.cardInfo}>{`${Math.round(weatherData.main.temp)}°C`}</Text>
                    ) : (
                        <Text style={styles.cardInfo}>-</Text>
                    )}
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Chuva</Text>
                    {weatherData && weatherData.rain && weatherData.rain['1h'] !== undefined ? (
                        <Text style={styles.cardInfo}>{`${weatherData.rain['1h']} mm`}</Text>
                    ) : (
                        <Text style={styles.cardInfo}>-</Text>
                    )}
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Umidade</Text>
                    {weatherData ? (
                        <Text style={styles.cardInfo}>{`${weatherData.main.humidity}%`}</Text>
                    ) : (
                        <Text style={styles.cardInfo}>-</Text>
                    )}
                </View>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Digite o CEP"
                keyboardType="numeric"
                value={cep}
                onChangeText={handleChangeCep}
            />

            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity>

            <View style={styles.vinicolasContainer}>
                <Text style={styles.vinicolasTitle}>Vinícolas Próximas:</Text>
                {vinicolas.length > 0 ? (
                    <FlatList
                        data={vinicolas}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.vinicolaCard}>
                                <Text style={styles.vinicolaName}>{item.nome}</Text>
                                <Text style={styles.vinicolaAddress}>{item.endereco}</Text>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.noVinicolasText}>Nenhuma vinícola encontrada</Text>
                )}
            </View>

            <TouchableOpacity style={styles.gerenciarButton} onPress={handleGerenciar}>
                <Text style={styles.gerenciarButtonText}>Gerenciar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        width: '30%',
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardInfo: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#8B0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    vinicolasContainer: {
        flex: 1,
        width: '100%',
    },
    vinicolasTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    vinicolaCard: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    vinicolaName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    vinicolaAddress: {
        fontSize: 12,
    },
    noVinicolasText: {
        fontStyle: 'italic',
    },
    gerenciarButton: {
        backgroundColor: '#8B0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    gerenciarButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default WeatherCard;
