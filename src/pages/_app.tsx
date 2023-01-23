import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from '../styles/theme';
import { OrdersContextProvider } from '../context/useOrders';
import  createServer  from '../services/mirage';

export default function App({ Component, pageProps }: AppProps) {
  createServer
  return(
    <OrdersContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </OrdersContextProvider>
  )
}
