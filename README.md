# 📚 Controle de Leituras

Um aplicativo web desenvolvido em React para gerenciar e acompanhar suas leituras, permitindo controlar o progresso dos livros que você lê.

## 🚀 Funcionalidades

- ✨ Cadastro de livros com informações detalhadas
- 📖 Acompanhamento do progresso de leitura
- 🔍 Busca por título ou autor
- 🔄 Filtros por status de leitura
- 📊 Ordenação por diferentes critérios
- 💾 Armazenamento local dos dados
- 📱 Interface responsiva para dispositivos móveis

## 🛠️ Tecnologias Utilizadas

- [React](https://react.dev/) - Biblioteca JavaScript para construção de interfaces
- [Styled Components](https://styled-components.com/) - Estilização com CSS-in-JS
- [React Router](https://reactrouter.com/) - Roteamento da aplicação
- [Vite](https://vitejs.dev/) - Build tool e ambiente de desenvolvimento
- [UUID](https://github.com/uuidjs/uuid) - Geração de IDs únicos
- [PropTypes](https://www.npmjs.com/package/prop-types) - Verificação de tipos em tempo de desenvolvimento

## ⚙️ Pré-requisitos

Antes de começar, você precisará ter instalado:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (normalmente vem com Node.js)

## 📥 Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/amauribsjr/controle-leituras.git
    ```

2. Acesse a pasta do projeto:
    ```bash
    cd controle-leituras
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

## 🚀 Como Executar

Para rodar o projeto em ambiente de desenvolvimento:
    ```bash
    npm run dev
    ```

O aplicativo estará disponível em `http://localhost:5173`

### Outros Comandos

- Criar build de produção:
    ```bash
    npm run build
    ```

- Visualizar versão de produção:
    ```bash
    npm run preview
    ```

- Executar linter:
    ```bash
    npm run lint
    ```
    
## 📱 Como Usar

1. **Adicionar um Livro**
   - Clique no botão "Adicionar Livro"
   - Preencha as informações solicitadas
   - Confirme o cadastro

2. **Atualizar Progresso**
   - Clique no botão de progresso do livro desejado
   - Digite a página atual
   - O status será atualizado automaticamente

3. **Filtrar Livros**
   - Use a barra de pesquisa para buscar por título ou autor
   - Utilize o seletor de status para filtrar por situação de leitura

4. **Ordenar Livros**
   - Use o seletor de ordenação para organizar por:
     - Título
     - Autor
     - Progresso
     - Status

## 🔍 Status de Leitura

- **Não iniciado**: Livro cadastrado mas ainda não começou a leitura
- **Lendo**: Livro em processo de leitura
- **Concluído**: Leitura finalizada

## 💻 Desenvolvimento

O projeto utiliza várias ferramentas de desenvolvimento:

- **ESLint**: Para garantir qualidade do código
- **Prettier**: Para formatação consistente
- **TypeScript**: Para tipagem estática (via @types)
- **SWC**: Para compilação rápida

## 📱 Responsividade

O aplicativo é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- Desktop: Layout completo
- Tablet (< 768px): Ajustes de layout
- Mobile (< 480px): Layout otimizado para dispositivos móveis

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
