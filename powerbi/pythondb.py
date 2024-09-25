import pyodbc
import pandas as pd

# Conectar ao SQL Server no Azure
conn = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=tcp:plusoftserver.database.windows.net,1433;'
    'DATABASE=plusoftdb;'
    'UID=rafaelknunes;'
    'PWD=Klanfer1984@;'
    'Encrypt=yes;'
    'TrustServerCertificate=no;'
    'Connection Timeout=30;'
)

cursor = conn.cursor()

# Carregar o arquivo Excel
df = pd.read_excel('Pasta1.xlsx', engine='openpyxl')

# Exibir os dados carregados (opcional)
print(df.head())

# Definir o comando de inserção sem FeedbackId
insert_query = """
INSERT INTO Feedbacks (UserEmail, CreatedAt, DateLastUpdated, Content, Sentiment, Issue, Product, Company, SaleSuggestion, SaleCategory, SaleValue, SaleReasoning, SaleStatus)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
"""

# Iterar sobre as linhas do DataFrame e inserir os dados, sem FeedbackId
for index, row in df.iterrows():
    cursor.execute(insert_query,
                   row['UserEmail'],
                   row['CreatedAt'],
                   row['DateLastUpdated'],
                   row['Content'],
                   row['Sentiment'],
                   row['Issue'],
                   row['Product'],
                   row['Company'],
                   row['SaleSuggestion'],
                   row['SaleCategory'],
                   row['SaleValue'],
                   row['SaleReasoning'],
                   row['SaleStatus'])

# Confirmar a transação
conn.commit()

# Fechar a conexão
cursor.close()
conn.close()

