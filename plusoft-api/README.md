# SPRINT 3 - Challenge Plusoft

# Integrantes TDSS e TDSA

- Diogo Dias Rodrigues Gallina - RM98605 – 2TDSS
- João Dubas Leal Kleye Souza - RM76153 – 2TDSS
- Pedro Henrique Couto Archilha - RM550450 – 2TDSS
- Pedro Henrique Lourenço Rodrigues - RM98402 – 2TDSS
- Rafael Klanfer Nunes - RM99791 – 2TDSA

--------------

# Banco de Dados

- Servidor: SQL Server na Azure
    - nome: plusoftserver (plusoftserver.database.windows.net)
    - usuário: rafaelknunes
    - senha: "principal"
- Banco de Dados: dbPlusoft
    - connection string: Server=tcp:plusoftserver.database.windows.net,1433;Initial Catalog=plusoftdb;Persist Security Info=False;User ID=rafaelknunes;Password={your_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;

--------------




# Instruções para rodar a API

Para rodar o projeto, lembre-se de habilitar a geração de arquivo de comentários XML nas propriedades do projeto no Visual Studio.

Também é preciso realizar a migrations para geração do banco de dados com o comando:

```	
dotnet ef database update
```

Por fim, altere as credenciais do banco de dados para sua conta Oracle da FIAP. Arquivo de configuração: appsettings.json


--------------

# Explicação da arquitetura

Este projeto foi desenvolvido em .NET 8.0. Usamos alguns princípios de DDD (Domain-Driven Design) para organizar a estrutura do projeto. Contudo, a arquitetura do projeto é dividida em camadas, cada uma com sua responsabilidade específica. Por exemplo, há uma separação clara de responsabilidades com o uso de repositories (`DepartamentoRepository`, `EmpregadoRepository`).

- **Camada de Apresentação**: 
  - Contida em `Controllers`, responsável pela exposição dos endpoints. Também representada no Program.cs.

- **Camada de Aplicação/Negócio**:
  - Essa camada lida com a lógica de negócios e coordena as interações entre a camada de apresentação e a camada de dados. Representada nos controladores e no repository.

- **Camada de Dados**:
  - As pastas `Data` e `Migrations` são responsáveis pelo acesso ao banco e pela migração da base de dados.

- **Camada de Domínio**:
  - Os modelos na pasta `Models` contêm as definições de entidades, formando a base da estrutura de dados da aplicação.


### Escolha entre Abordagem Monolítica e Microservices

1. **Abordagem Monolítica:**
   - Nosso projeto segue a arquitetura monolítica. Ou seja, um único projeto (`Hal9000`) contém toda a lógica de APIs, incluindo configuração, lógica de repositórios, e classes de serviço. Decidimos por este caminho pois exige uma complexidade menor, facilitando o rápido desenvolvimento do nosso MVP. Além disso, nesste tipo de abordagem os custos são menores.
   
2. **Abordagem Microservices:**
   - Já numa abordagem de microserviços teríamos que ter uma infraestrutura distribuída, mecanismos de comunicação inter-serviço, e orquestração, que não são necessários neste momento. No entanto, a abordagem de microservices tem suas vantagens, como escalabilidade independente, desenvolvimento desacoplado.

Dito isso, no futuro, conforme o projeto cresça e a complexidade aumente, a abordagem de microservices pode ser mais adequada.

--------------

# Padrão de Criação de API

No controlador de Departamentos, usamos `AppConfigurationManager` para acessar as configurações da aplicação. Esse gerenciador de configurações foi registrado como um **singleton** na API. O **Singleton Pattern** garante que a classe `AppConfigurationManager` tenha apenas uma instância ao longo do ciclo de vida da aplicação e que essa instância seja compartilhada por todas as partes que a utilizam.

```csharp
// Program.cs
builder.Services.AddSingleton<AppConfigurationManager>();  // Registro como Singleton
```

#### Utilização no controlador:
No controlador `DepartamentosController`, injetamos o `AppConfigurationManager` para acessar as configurações:

```csharp
public DepartamentosController(IDepartamentoRepository departamentoRepository, IEmpregadoRepository empregadoRepository, AppConfigurationManager configManager)
{
    _departamentoRepository = departamentoRepository;
    _empregadoRepository = empregadoRepository;
    _configManager = configManager;  // Injetando o ConfigurationManager
}
```

A função `GetApplicationSetting` no `AppConfigurationManager` acessa as configurações armazenadas no `appsettings.json`, usando a chave `"Singleton"` para recuperar o valor correspondente:

```csharp
var mySettingValue = _configManager.GetApplicationSetting("Singleton");
```
--------------

# Design Patterns Utilizados

- Repository Pattern: Utilizado para abstrair a camada de dados e facilitar a manutenção do projeto. Podemos ver a implementação do Repository Pattern nos arquivos `DepartamentoRepository` e `EmpregadoRepository`. Isso ajuda na interação com o banco de dados e facilita a manutenção do projeto.

- Dependency Injection: Utilizado para injetar dependências em classes. Isso facilita a manutenção do projeto e a troca de implementações de classes. Podemos ver a implementação de Dependency Injection no arquivo `Startup.cs`, que por default já vem configurado.

- Scoped Pattern: O padrão Scoped garante que os repositórios (EmpregadoRepository, DepartamentoRepository) sejam instanciados uma vez por requisição e descartados após a conclusão da mesma, o que é essencial para o bom funcionamento de interações com o banco de dados e gerenciamento de transações.

```csharp
// Adicionando o serviço do EmpregadoRepository
builder.Services.AddScoped<IEmpregadoRepository, EmpregadoRepository>();

// Adicionando o serviço do DepartamentoRepository
builder.Services.AddScoped<IDepartamentoRepository, DepartamentoRepository>();
```

--------------


