import React, { useEffect, useState, createContext, PropsWithChildren } from "react";
import { API_BASE_URL } from '../../config'; 
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

type AuthContextProps = {
  isLoggedIn: boolean;
  signIn: (email: string, password: string) => void;
  register: (email: string, password: string) => void;  
  signOut: () => void;
  userEmail: string | null;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {

    const result = await signInWithEmailAndPassword(auth, email, password);
    setIsLoggedIn(true);
    setUserEmail(result.user.email);

  };


  const register = async (email: string, password: string) => {
    try {
      // Registrar o usuário no Firebase
      const result = await createUserWithEmailAndPassword(auth, email, password);
  
      // Definir o estado de login e e-mail
      setIsLoggedIn(true);
      setUserEmail(result.user.email);
  
      // Preparar o JSON para enviar à API do backend
      const userData = {
        name: result.user.displayName || "Novo Usuário", // Pega o nome do usuário ou coloca um nome genérico
        email: result.user.email, // O e-mail do usuário vindo do Firebase
        admin: false, // Definir o nível de admin (ajustar conforme necessário)
        address: "" // Preencher com endereço real, se disponível
      };
  
      // Enviar os dados para o backend
      const response = await fetch(`${API_BASE_URL}/api/User`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Convertendo os dados para JSON
      });
  
      if (!response.ok) {
        throw new Error('Erro ao enviar informações do usuário para o backend');
      }
  
      console.log('Usuário registrado com sucesso no backend!');
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };
  
  const signOut = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
  };


  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserEmail(user.email);
      } else {
        setIsLoggedIn(false);
        setUserEmail(null);
      }
    });

    return () => subscriber();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, signIn, register, signOut, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };



