import { MessagesContainer } from './components/MessagesContainer';
import { AuthProvider } from './context/AuthContext';
import { MainRouter } from './router/MainRouter';

function App() {
  return (
    <AuthProvider>
      <MessagesContainer>
        <MainRouter />
      </MessagesContainer>
    </AuthProvider>
  );
}

export default App;
