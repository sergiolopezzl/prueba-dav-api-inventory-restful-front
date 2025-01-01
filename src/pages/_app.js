// src/pages/_app.js
import { AuthProvider } from '@context/AuthContext'; // Importamos el AuthProvider

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
