
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
import "@radix-ui/themes/styles.css";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
    <QueryClientProvider client = {queryClient}>
        <App />
    </QueryClientProvider>
 

 
  </BrowserRouter>
);