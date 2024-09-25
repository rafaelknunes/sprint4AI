import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },

  // estilo para o input do feedback
  inputStyled: {
    borderWidth: 1,
    borderColor: "#ccc", // Cor da borda
    borderRadius: 10, // Bordas arredondadas
    padding: 10, // Espaçamento interno
    backgroundColor: "#f0f0f0", // Fundo cinza claro
    fontSize: 16, // Tamanho da fonte
    marginBottom: 16, // Espaçamento inferior
    shadowColor: "#000", // Sombra para o input
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Elevação para sombra no Android
  },

  // Cada feedback ocupará uma linha

  feedbackItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  value: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#555',
  },

  // Outros estilos existentes, sem alterações
  welcome: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  footer: {
    backgroundColor: '#1f1a4f',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 12,
  },
  footContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  tabBar: {
    backgroundColor: '#1f1a4f',
  },
  tabBarIndicator: {
    backgroundColor: 'white',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    marginBottom: 16,
    width: '90%',
    alignSelf: 'center',
  },
  signOutContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: '5%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF4500',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    marginVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#f9f9f9',
  },



  messageBox: {
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  successBox: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
  },
  errorBox: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
  },
  messageText: {
    flex: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
    color: '#155724',
    fontSize: 16,
  },
  iframeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  iframe: {
    width: width,
    height: height,
  },

  label: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },

  // Página de feedback. Customização do sentiment

  sentimentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  sentimentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sentimentText: {
    fontSize: 18,
    marginLeft: 8,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },

  // Hyperlink para os termos e condições
  hyperlink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  // espaçamento entre os itens
  spacing: {
    marginBottom: 16, // Espaçamento padrão entre os elementos
  },

  picker: {
    height: 50, // Altura do picker
    width: '100%', // Ocupa 100% da largura do container
    borderWidth: 1, // Borda ao redor do picker
    borderColor: '#ccc', // Cor da borda
    borderRadius: 8, // Bordas arredondadas
    backgroundColor: '#fff', // Fundo branco
    marginBottom: 16, // Espaçamento inferior
  },


});

export default styles;
