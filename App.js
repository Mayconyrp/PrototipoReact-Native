import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importe as telas que você deseja navegar
import HomeScreen from './HomeScreen';
import TelaInicial from './TelaInicial';
import CadastroEmpresa from './CadastroEmpresas';
import CadastroEstoque from './CadastroEstoque';

//CRUD Funcionarios
import CadastroFuncionario from './CadastroFuncionario';
import ControllerFuncionarios from './ControllerFuncionarios';

//CRUD Empresas
import ControllerEmpresas from './ControllerEmpresas';

//Crud Estoque
import ControllerEstoque from './ControllerEstoque';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="CadastroEmpresa" component={CadastroEmpresa} />
        <Stack.Screen name="CadastroEstoque" component={CadastroEstoque} />
        <Stack.Screen name="CadastroFuncionario" component={CadastroFuncionario} />
        <Stack.Screen name="ControllerFuncionarios" component={ControllerFuncionarios} />
        <Stack.Screen name="ControllerEmpresas" component={ControllerEmpresas} />
        <Stack.Screen name="ControllerEstoque" component={ControllerEstoque} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
