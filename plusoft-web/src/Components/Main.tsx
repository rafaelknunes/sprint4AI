import React, { useContext } from "react";
import MainStack from "../Navigation/MainStack";  // Seu Auth Stack para Login e Cadastro
import AppStack from "../Navigation/AppStack";  // O Stack Navigator com o Top Tabs
import { AuthContext } from "../Context/AuthContext";

const Main = () => {
  const { isLoggedIn } = useContext(AuthContext); 

  // Se o usuário estiver logado, redireciona para o AppStack (que contém o TopTabNavigator com o botão de Sign Out)
  // Caso contrário, redireciona para o MainStack (Login e Cadastro)
  return isLoggedIn ? <AppStack /> : <MainStack />;
};

export default Main;
