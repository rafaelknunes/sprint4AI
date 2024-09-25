import { NavigationProp } from "@react-navigation/native";

type AuthStack = {
  Login: undefined;
  Cadastro: undefined;
};

type AuthNavigation = NavigationProp<AuthStack>;

export { AuthStack, AuthNavigation };
   

  