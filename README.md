# Portfolio Arthur J. Regiani

Portfolio pessoal responsivo e moderno com efeitos visuais avançados, tema dark Solarized, e animações interativas.

## Sobre o Desenvolvedor

**Arthur José Regiani** é um desenvolvedor backend especializado em Java e tecnologias relacionadas. Atualmente cursando Análise e Desenvolvimento de Sistemas no Instituto Federal de Educação, Ciência e Tecnologia de São Paulo - Campus Araraquara.

## Estrutura do Projeto

O projeto foi organizado separando as responsabilidades em arquivos distintos:

```
landingpage/
├── advanced_profile.html  # Estrutura HTML principal
├── styles.css            # Todos os estilos CSS
├── script.js             # Funcionalidades JavaScript
└── README.md             # Documentação
```

### Descrição dos Arquivos

- **`advanced_profile.html`**: Contém a estrutura HTML semântica da landing page
- **`styles.css`**: Inclui variáveis CSS, animações, efeitos glassmorphism e componentes visuais
- **`script.js`**: Implementa efeitos interativos como Matrix rain, particles, typewriter, etc.

## Dependências Externas

O projeto utiliza as seguintes dependências via CDN:

- **Tailwind CSS**: Framework CSS utilitário para estilização rápida
- **Google Fonts**: Fontes JetBrains Mono e Inter para tipografia moderna
- **Ícones SVG**: Ícones inline para redes sociais e interface

## Como Executar Localmente

### Opção 1: Servidor HTTP Python
```bash
cd /caminho/para/landingpage
python3 -m http.server 8000
```
Acesse: `http://localhost:8000/advanced_profile.html`

### Opção 2: Live Server (VSCode)
1. Instale a extensão "Live Server" no VS Code
2. Clique com o botão direito em `advanced_profile.html`
3. Selecione "Open with Live Server"

### Opção 3: Servidor Node.js
```bash
npx serve .
```

## Tecnologias e Habilidades

Este portfolio demonstra proficiência nas seguintes tecnologias:

- **Backend**: Java, Python, Node.js
- **Frontend**: JavaScript, React, HTML5, CSS3
- **Banco de Dados**: SQL
- **Ferramentas**: Git, API REST
- **Mobile**: Kotlin

## Funcionalidades Técnicas

### Efeitos Visuais Avançados
- **Matrix Rain**: Caracteres caindo em background animado
- **Sistema de Partículas**: Partículas flutuantes com física básica
- **Glassmorphism**: Efeitos de vidro translúcido modernos
- **Parallax Scrolling**: Efeitos de profundidade durante navegação
- **Gradientes Animados**: Transições de cor dinâmicas

### Interações e UX
- **Typewriter Effect**: Texto digitado automaticamente na seção hero
- **Glitch Effects**: Efeitos especiais nas skill tags
- **Smooth Scrolling**: Navegação suave entre seções
- **Form Animations**: Feedback visual em formulários
- **Loading Animations**: Fade-in escalonado usando Intersection Observer

### Design Responsivo
- Abordagem mobile-first
- Breakpoints otimizados para todos os dispositivos
- Layout flexível com CSS Grid e Flexbox
- Tipografia adaptativa e escalável

## Paleta de Cores (Solarized Dark)

Utiliza o esquema de cores Solarized Dark profissional:

- **Base**: `#002b36` (fundo principal)
- **Cyan**: `#2aa198` (accent principal)
- **Blue**: `#268bd2` (accent secundário)
- **Magenta**: `#d33682` (destaques)
- **Violet**: `#6c71c4`
- **Green**: `#859900`
- **Yellow**: `#b58900`

## Projeto em Destaque

### WhatsApp Clone
Aplicativo de mensagens instantâneas desenvolvido em Java que replica as funcionalidades principais do WhatsApp, incluindo:
- Chat em tempo real com WebSockets
- Interface intuitiva e responsiva
- Gerenciamento de mensagens com Spring Boot
- Persistência de dados com MySQL

**Tecnologias**: Java, Spring Boot, WebSocket, MySQL
**Repositório**: [github.com/Arthurregiani/WhatsAppClone](https://github.com/Arthurregiani/WhatsAppClone)

## Performance e Otimização

- **CSS otimizado**: Uso de `transform` e `opacity` para animações suaves
- **JavaScript modular**: Código organizado em funções reutilizáveis com IIFE
- **Lazy loading**: Animações ativadas apenas quando elementos ficam visíveis
- **Debounce**: Eventos de scroll otimizados para performance
- **Minimal DOM manipulation**: Uso eficiente de seletores e cache de elementos

## Compatibilidade

- **Navegadores**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Dispositivos**: Desktop, tablet, smartphone
- **Acessibilidade**: Suporte a leitores de tela e navegação por teclado
- **Performance**: Otimizado para carregamento rápido em conexões lentas

## Stack Tecnológico

- **Marcação**: HTML5 semântico com estrutura acessível
- **Estilos**: CSS3 moderno (Custom Properties, Grid, Flexbox, Animations)
- **Scripting**: JavaScript ES6+ (Modules, Arrow Functions, Intersection Observer)
- **Framework**: Tailwind CSS para estilização utilitária
- **Fontes**: Google Fonts (JetBrains Mono, Inter)
- **Ícones**: SVG inline otimizado

## Contato

- **GitHub**: [github.com/Arthurregiani](https://github.com/Arthurregiani)
- **Instagram**: [@arthur_regiani](https://instagram.com/arthur_regiani)
- **Email**: [arthurregiani@gmail.com](mailto:arthurregiani@gmail.com)

---

**Desenvolvedor**: Arthur J. Regiani  
**Formação**: Análise e Desenvolvimento de Sistemas - IFSP Araraquara  
**Licença**: MIT  
**Última atualização**: Setembro 
