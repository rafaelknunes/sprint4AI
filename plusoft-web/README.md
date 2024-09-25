# Plusoft Front

### Estrutura do projeto

- app.json: Arquivo de configuração do Expo.
- App.tsx: Arquivo principal do aplicativo.
- babel.config.js e metro.config.js: Arquivos de configuração do Babel e do Metro bundler.
- package.json: Contém as dependências e scripts de inicialização, onde provavelmente está o npm start.
- assets e src: Pastas que provavelmente contêm os arquivos e componentes do projeto.

### Para rodar o projeto:

Atualizando scripts:

```bash
"scripts": {
  "start": "expo start --web"
}
```

- Para começar o projeto rode: npm start
- Para atualizar o cache rode: npx react-native start --reset-cache

### Deploy: Vercell