import AppRouter from "./router/appRouter";
import { BrowserRouter } from "react-router-dom";
import ScrollButton from './component/backTop/ScrollButton';
import { CartProvider } from "react-use-cart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App () {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <AppRouter />
          <ScrollButton />
          <ToastContainer limit={2} />
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;