#  Hyperion Motors

Site de uma concessionária de carros esportivos e de luxo, desenvolvido em **React** com **Vite**. O projeto reúne página inicial, catálogo de veículos, página de detalhes de cada modelo, simulação, agendamento de visita e formulário de contato.

---

##  Funcionalidades

- **Página inicial** com seção hero em vídeo, principais escolhas, tópicos e seção sobre a empresa
- **Catálogo de veículos** com listagem e página de detalhes de cada modelo
- **Especificações técnicas** de cada carro
- **Visualização 3D** do veículo (Three.js)
- **Simulação** de compra
- **Agendamento** de visita
- **Contato** com envio de e-mail (EmailJS)
- **Página Sobre** com história, valores e especialidades
- **Navegação entre páginas** com React Router e tela de carregamento

---

##  Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router DOM](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [EmailJS](https://www.emailjs.com/)
- [Three.js](https://threejs.org/) (modelo 3D)
- [Framer Motion](https://www.framer.com/motion/) e [React Modal](https://reactcommunity.org/react-modal/) (versão `rotas`)
- CSS Modules

---

##  Estrutura do repositório

Este repositório contém duas versões do projeto, cada uma com o seu próprio `package.json`:

```
HyperionMotors/
├── rotas/                      # Versão completa, com todas as páginas e rotas
│   ├── public/                 # Logos, imagens e fotos dos carros
│   └── src/
│       ├── components/         # Header, Footer, Agendamento, ProdutoDetalhe...
│       ├── pages/              # Página Inicial, Sobre, Contato, Produtos, Simulação
│       ├── routes/             # Configuração das rotas
│       └── styles/
├── Hypreion Motors - Nicolas/  # Versão com os componentes e o modelo 3D
│   ├── public/
│   └── src/
├── .gitignore
└── README.md
```

---

##  Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm (já vem com o Node.js)

### Passo a passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/Nicolas-Farin/HyperionMotors.git
   ```

2. Entre na pasta da versão que você quer rodar:

   ```bash
   cd HyperionMotors/rotas
   # ou
   cd "HyperionMotors/Hypreion Motors - Nicolas"
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra no navegador o endereço que o Vite mostrar no terminal (normalmente `http://localhost:5173`).

### Outros comandos

| Comando           | O que faz                                  |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Inicia o servidor de desenvolvimento       |
| `npm run build`   | Gera a versão de produção na pasta `dist/` |
| `npm run preview` | Visualiza localmente a build de produção   |
| `npm run lint`    | Verifica o código com o ESLint             |

---

## 👨‍💻 Autor

**Nicolas Farineli**
GitHub: [@Nicolas-Farin](https://github.com/Nicolas-Farin)
