import { AppRouter } from './routes';
import './assets/global.css';
import { AuthProvider } from './context/auth';

export const App =() => {
  
  
  return (
    <AuthProvider>
    <AppRouter />
    </AuthProvider>
    
  );
}


