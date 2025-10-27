# 🎬 **Movie App — Front-end**

Aplicação web moderna e responsiva desenvolvida em **React + TypeScript**, que
permite explorar filmes populares, pesquisar títulos, gerenciar favoritos e
editar informações do perfil do usuário.  
O deploy foi realizado na **Vercel**, garantindo performance, escalabilidade e
CI/CD automático.

---

> ⚠️ **Atenção:** Como o back-end do projeto está hospedado em um **plano
> gratuito**, o servidor entra em **modo de hibernação** após um período de
> inatividade (geralmente cerca de 15 minutos sem requisições).  
> Quando isso acontece, a **primeira requisição** após esse tempo pode demorar
> **30 segundos a 1 minuto** para responder.  
> Depois disso, o servidor “acorda” e as requisições voltam a ter desempenho
> normal.

---

## **Tecnologias Utilizadas**

- **React** — biblioteca principal para construção da interface
- **TypeScript** — tipagem estática e melhor manutenção do código
- **Axios** — consumo de APIs e integração com back-end
- **Tailwind CSS** — estilização rápida e responsiva
- **React Router DOM** — sistema de rotas dinâmico com proteção de acesso
- **React Hot Toast** — feedback visual para ações do usuário
- **Vite** — ambiente de build e desenvolvimento rápido

---

## **Arquitetura de Rotas**

O front-end é estruturado em torno do `BrowserRouter`, com um layout principal
(`MainTemplate`) e rotas públicas e privadas.

```tsx
<BrowserRouter>
  <MainTemplate>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/search' element={<SearchMovies />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/movie/:id' element={<MovieDetails />} />
      <Route path='/favorites/public/:publicId' element={<PublicFavorites />} />

      <Route
        path='/favorites'
        element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
      />

      <Route
        path='/profile'
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
    </Routes>
    <ScrollToTop />
  </MainTemplate>
</BrowserRouter>
```

### **Rotas Privadas**

O componente `PrivateRoute` garante que apenas usuários autenticados possam
acessar determinadas páginas.  
Caso o token JWT esteja ausente ou expirado, o usuário é redirecionado
automaticamente para `/login`.

---

## **Camada de Requisições**

Todas as chamadas HTTP são centralizadas em uma função utilitária (`request`),
que adiciona automaticamente o token de autenticação e trata erros de forma
padronizada:

```ts
async function request<T>(
  endpoint: string,
  options: AxiosRequestConfig = {},
  useAuth = false,
): Promise<T> {
  try {
    const config: AxiosRequestConfig = { url: endpoint, ...options };

    if (!useAuth) {
      config.headers = { ...(config.headers || {}) };
      delete config.headers.Authorization;
    }

    const res = await api.request<T>(config);
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      toast.info('Faça login novamente');
    }
    throw new Error(err.response?.data?.message || err.message);
  }
}
```

## **Configuração e Execução**

### **1. Clonar o repositório**

```bash
git clone https://github.com/CarlosMouraDev/TheMoviesProjectFrontEnd
cd TheMoviesProjectFrontEnd
```

### **2. Instalar dependências**

```bash
npm install
```

### **3. Configurar variáveis de ambiente**

Altere o arquivo `.env.example` na raiz do projeto de acordo com as instruções
dos comentários e renomeie para `.env`:

### **4. Executar o ambiente de desenvolvimento**

```bash
npm run dev
```

O projeto será iniciado em:  
👉 http://localhost:5173

---

## **Deploy**

O projeto está hospedado na **[Vercel](https://vercel.com)**.  
O processo de deploy é automático a cada push na branch principal (`main`),
garantindo **CI/CD contínuo** e builds otimizados.

---

## **Responsividade**

A interface foi construída com **Tailwind CSS** e desenhada para se adaptar
perfeitamente a:

- Smartphones
- Tablets
- Desktops

Os componentes utilizam breakpoints (`sm`, `md`, `lg`, `xl`) para garantir uma
experiência fluida em qualquer resolução.

---

## ✨ **Principais Funcionalidades**

- Listagem de filmes populares na página inicial
- Busca por títulos
- Visualização detalhada de filmes
- Sistema de favoritos (público e privado)
- Autenticação JWT com rotas protegidas
- Página de perfil com atualização de senha
- Login e criação de usuário
- Adicionar e remover filmes dos favoritos
- UI moderna, leve e responsiva

---

## **Desenvolvido por**

**Carlos Eduardo Moura Lemes**

📍 Deploy: [Vercel](https://the-movies-lemon.vercel.app/)
