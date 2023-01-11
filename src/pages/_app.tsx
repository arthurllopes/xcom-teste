import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createServer, Model } from 'miragejs'

export default function App({ Component, pageProps }: AppProps) {
  createServer({

    models: {
      transaction: Model,
    },
  
    seeds(server) {
      server.db.loadData({
        transactions: [
          {
            id: 1,
            title: 'Freelance de website',
            type: 'income',
            category: 'Dev',
            price: 6000,
            date: new Date('2021-02-12 09:00:00'),
          },
          {
            id: 2,
            title: 'Aluguel',
            type: 'outcome',
            category: 'Casa',
            price: 1100,
            date: new Date('2021-02-14 11:00:00'),
          }
        ]
      })
    },
  
    routes() {
  
      this.namespace = 'api';
  
      this.get('/transactions', () => (
         this.schema.all('transaction')
      ))
  
      this.post('/transactions', (schema, req) => {
        const data = JSON.parse(req.requestBody)
        return schema.create('transaction', data)
      })
    }
  })
  return <Component {...pageProps} />
}
