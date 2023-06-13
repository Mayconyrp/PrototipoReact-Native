import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

const WeatherCard = () => {
    const [cep, setCep] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [vinicolas, setVinicolas] = useState([]);
    const API_KEY = '57decebcbb3e8343fde5fcb48ae8b86a';

    //VALIDACAO DO CEP
    const formatCep = (value) => {
        value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        value = value.slice(0, 8); // Limita o CEP a 8 dígitos
        value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona o traço do CEP

        return value;
    };

    const fetchData = async (cepValue) => {
        if (cepValue) {
            try {
                // Obter dados climáticos com base no CEP e país (Brasil) API CLIMA
                const weatherResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${cepValue},BR&units=metric&lang=pt_br&appid=${API_KEY}`
                );

                setWeatherData(weatherResponse.data);
                console.log('Dados climáticos:', weatherResponse.data);

                // Buscar as vinícolas com base no CEP API LOCAL
                const vinicolasResponse = await axios.get(`http://172.26.38.209:8080/vinicolas/cep/${cepValue}`);
                console.log('Resposta da API de vinícolas:', vinicolasResponse.data); // Adicione este console.log
                if (vinicolasResponse.data.nome_gerente) {
                    setVinicolas([vinicolasResponse.data]);
                    console.log('Vinícolas:', [vinicolasResponse.data]);
                } else {
                    setVinicolas([]);
                    console.log('Nenhuma vinícola encontrada para o CEP fornecido');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSearch = () => {
        console.log('CEP buscado:', cep);
        setWeatherData(null);
        setVinicolas([]);
        fetchData(cep);
    };

    const handleChangeCep = (value) => {
        const formattedCep = formatCep(value);
        setCep(formattedCep);
    };

    console.log('WeatherData:', weatherData);

    return (
        /* CARDS DO TOP DA PAGINA */
        <View style={styles.container}>
            {/* Seção do clima */}
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    {/* Título: Temperatura */}
                    <Text style={styles.cardTitle}>Temperatura</Text>
                    {/* Exibe a temperatura atual, se disponível, caso contrário, exibe um traço */}
                    {weatherData ? (
                        <Text style={styles.cardInfo}>{`${Math.round(weatherData.main.temp)}°C`}</Text>
                    ) : (
                        <Text style={styles.cardInfo}>-</Text>
                    )}
                </View>
                <View style={styles.card}>
                    {/* Título: Chuva */}
                    <Text style={styles.cardTitle}>Chuva</Text>
                    {/* Exibe a quantidade de chuva nas últimas 1 hora, se disponível, caso contrário, exibe um traço */}
                    {weatherData && weatherData.rain && weatherData.rain['1h'] !== undefined ? (
                        <Text style={styles.cardInfo}>{`${weatherData.rain['1h']} mm`}</Text>
                    ) : (
                        <Text style={styles.cardInfo}>-</Text>
                    )}
                </View>
                <View style={styles.card}>
                    {/* Título: Umidade */}
                    <Text style={styles.cardTitle}>Umidade</Text>
                    {/* Exibe a umidade atual, se disponível, caso contrário, exibe um traço */}
                    {weatherData ? (
                        <Text style={styles.cardInfo}>{`${weatherData.main.humidity}%`}</Text>
                    ) : (
                        <Text style={styles.cardInfo}>-</Text>
                    )}
                </View>
            </View>

            {/* Campo de entrada do CEP */}
            <TextInput
                style={styles.input}
                placeholder="Digite o CEP"
                keyboardType="numeric"
                value={cep}
                onChangeText={handleChangeCep}
            />

            {/* Botão de busca */}
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity>

            {/* Seção das vinícolas */}
            <View style={styles.vinicolasContainer}>
                {/* Verifica se há vinícolas encontradas */}
                {vinicolas.length > 0 ? (
                    /* FLAT LIST QUE EXIBE O RESULTADO DE BUSCA REFERENTE AO BD*/
                    <FlatList
                        data={vinicolas}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.vinicolaCard}>
                                {/* Exibe o nome da vinícola */}
                                <Text style={styles.vinicolaName}>{`Nome Vinícola: ${item.nome_vinicola}`}</Text>
                                {/* Exibe o nome do gerente */}
                                <Text style={styles.vinicolaInfo}>{`Gerente: ${item.nome_gerente}`}</Text>
                                {/* Exibe o tipo de uva */}
                                <Text style={styles.vinicolaInfo}>{`Tipo de uva: ${item.tipo_uva}`}</Text>
                                {/* Exibe a data da última colheita */}
                                <Text style={styles.vinicolaInfo}>{`Última colheita: ${item.ultima_colheita}`}</Text>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.noVinicolasText}>Nenhuma vinícola encontrada para o CEP fornecido</Text>
                )}
            </View>
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
        marginBottom: 20,
    },
    card: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 8,
        marginRight: 10,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardInfo: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 20,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#3377ff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    vinicolasContainer: {
        flex: 1,
        width: '100%',
    },
    vinicolaCard: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    vinicolaName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    vinicolaInfo: {
        fontSize: 16,
    },
    noVinicolasText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default WeatherCard;