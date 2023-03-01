import '@/styles/globals.css'
import { StoreProvider } from '@/utils/Strore'

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
