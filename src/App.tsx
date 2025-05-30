import { BrowserRouter } from "react-router-dom"
import { AppRouter } from 'routers/app-router';
import { ToastProvider } from '@components/toast/ToastProvider';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <ToastProvider />
    </BrowserRouter>
  );
}

export default App;
